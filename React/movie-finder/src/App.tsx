import React, { useEffect, useRef, useState } from "react";
import useFavoriteStore from "./store/favoriteStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // zustand store
  const favorites = useFavoriteStore((state) => state.favorites);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite);

  const [activeTab, setActiveTab] = useState<
    "popular" | "search" | "favorites" | "myMovies"
  >("popular");

  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  // 영화 추가용 state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieOverview, setNewMovieOverview] = useState("");
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  // 수정용 state
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOverview, setEditOverview] = useState("");

  // 모달
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // 클릭한 영화 정보
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  // 모달 열기 함수
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchMyMovies();
  }, []);

  // 내 영화 목록 불러오기
  useEffect(() => {
    if (activeTab === "myMovies") {
      fetchMyMovies();
    }
  }, [activeTab]);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const apikey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=ko-KR&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log("영화 데이터:", data.results);
    } catch (error) {
      console.error("영화 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyMovies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      const data = await response.json();
      setMyMovies(data);
    } catch (error) {
      console.error("내 영화 목록 불러오기 실패:", error);
    }
  };

  // 영화 추가 함수
  const addMovie = async () => {
    if (!newMovieTitle.trim()) {
      alert("영화 제목을 입력해주세요!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newMovieTitle,
          overview: newMovieOverview,
        }),
      });

      if (response.ok) {
        alert("🎉 영화가 추가되었습니다!");
        setNewMovieTitle("");
        setNewMovieOverview("");
        setIsAddingMovie(false);
        fetchMyMovies(); // 목록 새로고침
      }
    } catch (error) {
      console.error("영화 추가 실패:", error);
      alert("영화 추가에 실패했습니다 😢");
    }
  };

  // 영화 수정 함수
  const updateMovie = async (id: number) => {
    if (!editTitle.trim()) {
      alert("영화 제목을 입력해주세요!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          overview: editOverview,
        }),
      });

      if (response.ok) {
        alert("영화가 수정되었습니다! ✏️");
        setEditingMovie(null);
        setEditTitle("");
        setEditOverview("");
        fetchMyMovies(); // 목록 새로고침
      }
    } catch (error) {
      console.error("영화 수정 실패:", error);
      alert("영화 수정에 실패했습니다 😢");
    }
  };

  // 편집 모드 시작
  const startEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setEditTitle(movie.title);
    setEditOverview(movie.overview || "");
  };

  // 편집 취소
  const cancelEdit = () => {
    setEditingMovie(null);
    setEditTitle("");
    setEditOverview("");
  };

  // 영화 삭제 함수
  const deleteMovie = async (id: number, title: string) => {
    if (!window.confirm(`"${title}" 영화를 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("🗑️ 영화가 삭제되었습니다!");
        fetchMyMovies(); // 목록 새로고침
      }
    } catch (error) {
      console.error("영화 삭제 실패:", error);
      alert("영화 삭제에 실패했습니다 😢");
    }
  };

  const searchMovies = async (query: string) => {
    if (query.trim() === "") {
      fetchPopularMovies();
      setIsSearchMode(false);
      return;
    }

    try {
      setLoading(true);
      setIsSearchMode(true);
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log("검색 결과:", data.results);
    } catch (error) {
      console.log("검색 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎬</div>
          <h1>로딩 중...</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "48px", margin: "0 0 10px 0" }}>
          🎬 Movie Finder
        </h1>
        <p style={{ color: "#999", fontSize: "18px" }}>
          {activeTab === "favorites"
            ? "내가 좋아하는 영화들"
            : activeTab === "myMovies"
            ? "MariaDB에 저장된 내 영화들"
            : isSearchMode
            ? `"${searchTerm}" 검색 결과`
            : "TMDB 인기 영화 TOP 20"}
        </p>

        {/* 검색창 */}
        <div
          style={{
            maxWidth: "600px",
            margin: "30px auto 0",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="영화 제목을 입력하세요 (예: 아바타, 어벤져스)"
            style={{
              flex: 1,
              padding: "15px 20px",
              fontSize: "16px",
              border: "2px solid #444",
              borderRadius: "10px",
              backgroundColor: "#2a2a2a",
              color: "white",
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "15px 30px",
              fontSize: "16px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#5568d3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#667eea")
            }
          >
            🔍 검색
          </button>
          {isSearchMode && (
            <button
              onClick={() => {
                setSearchTerm("");
                setIsSearchMode(false);
                fetchPopularMovies();
                inputRef.current?.focus();
              }}
              style={{
                padding: "15px 30px",
                fontSize: "16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              X 초기화
            </button>
          )}
        </div>

        {/* 탭 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() => {
              setActiveTab("popular");
              setIsSearchMode(false);
              setSearchTerm("");
              fetchPopularMovies();
            }}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: activeTab === "popular" ? "#667eea" : "#444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
          >
            🔥 인기 영화
          </button>

          {/* 내 영화 탭 */}
          <button
            onClick={() => {
              setActiveTab("myMovies");
              setIsSearchMode(false);
              setSearchTerm("");
            }}
            style={{
              backgroundColor: activeTab === "myMovies" ? "#667eea" : "#444",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🎬 내 영화 ({myMovies.length})
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: activeTab === "favorites" ? "#667eea" : "#444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
          >
            💖 즐겨찾기 ({favorites.length})
          </button>
        </div>
      </div>

      {/* 검색 결과 없을 때 */}
      {activeTab !== "favorites" && !loading && movies.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "10px 40px",
            color: "#999",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            검색 결과가 없습니다
          </h2>
          <p style={{ fontSize: "16px" }}>다른 검색어를 입력해보세요</p>
        </div>
      )}

      {/* 영화 목록 (인기/검색) */}
      {activeTab !== "favorites" &&
        activeTab !== "myMovies" &&
        !loading &&
        movies.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "30px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  /* 영화 카드 스타일 */ backgroundColor: "#2a2a2a",
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                }}
                onClick={() => openModal(movie)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 12px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
                }}
              >
                {/* 포스터 */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "64px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    🎬
                  </div>
                )}

                <div style={{ padding: "15px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      margin: "0 0 8px 0",
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {movie.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "10px",
                      borderTop: "1px solid #444",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#ffd700",
                      }}
                    >
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </div>

                  {/* 즐겨찾기 탭 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFavorite(movie.id)) {
                        removeFavorite(movie.id);
                      } else {
                        addFavorite(movie);
                      }
                    }}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: isFavorite(movie.id)
                        ? "#f44336"
                        : "#667eea",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {isFavorite(movie.id) ? "💔 즐겨찾기 해제" : "💖 즐겨찾기"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* 즐겨찾기 탭 */}
      {activeTab === "favorites" && (
        <div>
          {favorites.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 40px",
                color: "#999",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>💖</div>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                아직 즐겨찾기한 영화가 없어요
              </h2>
              <p style={{ fontSize: "16px" }}>
                마음에 드는 영화를 즐겨찾기에 추가해보세요!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "30px",
                maxWidth: "1400px",
                margin: "0 auto",
              }}
            >
              {favorites.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: "15px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => openModal(movie)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 12px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.3)";
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "300px",
                        backgroundColor: "#444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "64px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      🎬
                    </div>
                  )}

                  <div style={{ padding: "15px" }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 8px 0",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {movie.title}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "10px",
                        borderTop: "1px solid #444",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#ffd700",
                        }}
                      >
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#999",
                        }}
                      >
                        {movie.release_date?.split("-")[0]}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(movie.id);
                      }}
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        padding: "10px",
                        fontSize: "14px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s",
                      }}
                    >
                      💔 즐겨찾기 해제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 내 영화 탭 */}
      {activeTab === "myMovies" && (
        <div>
          {/* 영화 추가 버튼 & 폼 */}
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto 40px",
              padding: "20px",
              backgroundColor: "#2a2a2a",
              borderRadius: "15px",
            }}
          >
            {!isAddingMovie ? (
              <button
                onClick={() => setIsAddingMovie(true)}
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "18px",
                  backgroundColor: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✨ 새 영화 추가하기 ✨
              </button>
            ) : (
              <div style={{ color: "white" }}>
                <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
                  ✨ 새 영화 추가 ✨
                </h3>
                <input
                  type="text"
                  placeholder="영화 제목"
                  value={newMovieTitle}
                  onChange={(e) => setNewMovieTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    fontSize: "16px",
                    border: "2px solid #444",
                    borderRadius: "8px",
                    backgroundColor: "#1a1a1a",
                    color: "white",
                    outline: "none",
                  }}
                />
                <textarea
                  placeholder="줄거리"
                  value={newMovieOverview}
                  onChange={(e) => setNewMovieOverview(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    fontSize: "16px",
                    border: "2px solid #444",
                    borderRadius: "8px",
                    backgroundColor: "#1a1a1a",
                    color: "white",
                    outline: "none",
                    minHeight: "100px",
                    resize: "vertical",
                  }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={addMovie}
                    style={{
                      flex: 1,
                      padding: "12px",
                      fontSize: "16px",
                      backgroundColor: "#667eea",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    💾 저장
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingMovie(false);
                      setNewMovieTitle("");
                      setNewMovieOverview("");
                    }}
                    style={{
                      flex: 1,
                      padding: "12px",
                      fontSize: "16px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    ❌ 취소
                  </button>
                </div>
              </div>
            )}
          </div>

          {myMovies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 40px",
                color: "#999",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎬</div>
              <h2>아직 추가한 영화가 없어요</h2>
              <p>영화를 추가해보세요!</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "30px",
                padding: "40px 20px",
              }}
            >
              {myMovies.map((movie) => (
                <div key={movie.id}>
                  {editingMovie?.id === movie.id ? (
                    // 편집 모드
                    <div
                      style={{
                        backgroundColor: "#2a2a2a",
                        borderRadius: "15px",
                        padding: "20px",
                        color: "white",
                      }}
                    >
                      <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>
                        ✏️ 영화 수정
                      </h3>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                          fontSize: "16px",
                          border: "2px solid #444",
                          borderRadius: "8px",
                          backgroundColor: "#1a1a1a",
                          color: "white",
                          outline: "none",
                        }}
                      />
                      <textarea
                        value={editOverview}
                        onChange={(e) => setEditOverview(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "15px",
                          fontSize: "14px",
                          border: "2px solid #444",
                          borderRadius: "8px",
                          backgroundColor: "#1a1a1a",
                          color: "white",
                          outline: "none",
                          minHeight: "80px",
                          resize: "vertical",
                        }}
                      />
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => updateMovie(movie.id)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            fontSize: "14px",
                            backgroundColor: "#667eea",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          💾 저장
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            flex: 1,
                            padding: "10px",
                            fontSize: "14px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          ❌ 취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 일반 모드
                    <div
                      style={{
                        backgroundColor: "#2a2a2a",
                        borderRadius: "15px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "300px",
                          backgroundColor: "#444",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                        onClick={() => openModal(movie)}
                      >
                        🎬
                      </div>
                      <div style={{ padding: "15px" }}>
                        <h3
                          style={{
                            fontSize: "18px",
                            marginBottom: "8px",
                            color: "white",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {movie.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#999",
                            marginBottom: "12px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {movie.overview || "줄거리 없음"}
                        </p>

                        {/* 편집 버튼 */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit(movie);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "14px",
                            backgroundColor: "#667eea",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          ✏️ 편집 ✏️
                        </button>

                        {/* 삭제 버튼 */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMovie(movie.id, movie.title);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "14px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          🗑️ 삭제 🗑️
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 영화 상세 모달 */}
      {isModalOpen && selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#2a2a2a",
              borderRadius: "20px",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#f44336",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                zIndex: 10,
              }}
            >
              X
            </button>

            {/* 포스터와 정보 */}
            <div style={{ display: "flex", gap: "30px", padding: "40px" }}>
              {/* 포스터 */}
              <div style={{ flexShrink: 0 }}>
                {selectedMovie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    style={{
                      width: "300px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "300px",
                      height: "450px",
                      backgroundColor: "#444",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "80px",
                    }}
                  >
                    🎬
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div style={{ flex: 1, color: "white" }}>
                <h1
                  style={{
                    fontSize: "32px",
                    margin: "0 0 20px 0",
                    paddingRight: "40px",
                  }}
                >
                  {selectedMovie.title}
                </h1>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    fontSize: "18px",
                  }}
                >
                  <span style={{ color: "#ffd700", fontWeight: "bold" }}>
                    ⭐ {selectedMovie.release_date}
                  </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      marginBottom: "10px",
                      color: "#667eea",
                    }}
                  >
                    줄거리
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#ddd",
                    }}
                  >
                    {selectedMovie.overview || "줄거리 정보가 없습니다."}
                  </p>
                </div>

                {/* 즐겨찾기 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFavorite(selectedMovie.id)) {
                      removeFavorite(selectedMovie.id);
                    } else {
                      addFavorite(selectedMovie);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    fontSize: "16px",
                    backgroundColor: isFavorite(selectedMovie.id)
                      ? "#f44336"
                      : "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  {isFavorite(selectedMovie.id)
                    ? "💔 즐겨찾기 해제"
                    : "💖 즐겨찾기"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
