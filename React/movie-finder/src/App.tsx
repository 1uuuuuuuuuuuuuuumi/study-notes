import React, { useEffect, useRef, useState } from "react";
import useFavoriteStore from "./store/favoriteStore";

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
  const favorites = useFavoriteStore(state => state.favorites);
  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const removeFavorite = useFavoriteStore(state => state.removeFavorite);
  const isFavorite = useFavoriteStore(state => state.isFavorite);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

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
          {isSearchMode ? `"${searchTerm}" 검색 결과` : "TMDB 인기 영화 TOP 20"}
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
      </div>

      {/* 검색 결과 없을 때 */}
      {!loading && movies.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '10px 40px',
          color: "#999"
        }}>
          <div style={{fontSize: '64px', marginBottom: '20px'}}>🔍</div>
          <h2 style={{fontSize: '24px', marginBottom: '10px'}}>검색 결과가 없습니다</h2>
          <p style={{fontSize: '16px'}}>
            다른 검색어를 입력해보세요
          </p>
        </div>
      )}

      {/* 영화 목록 */}
      {!loading && movies.length > 0 && (
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
              backgroundColor: "#2a2a2a",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.4)";
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

              {/* 즐겨찾기 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if(isFavorite(movie.id)){
                    removeFavorite(movie.id);
                  } else {
                    addFavorite(movie);
                  }
                }}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '10px',
                  fontSize: '14px',
                  backgroundColor: isFavorite(movie.id) ? '#f44336' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {isFavorite(movie.id) ? '💔 즐겨찾기 해제' : '💖 즐겨찾기'}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
      
      
    </div>
  );
}

export default App;
