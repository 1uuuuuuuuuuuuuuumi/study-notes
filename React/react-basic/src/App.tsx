import React, { useRef } from "react";

function App() {
  // DOM 요소에 접근하기 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // input에 포커스 주기
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // 섹션으로 스크롤
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scroll({top: 0, behavior: 'smooth'});
  };

  return (
    <div style={{fontFamily: "Arial"}}>
      {/* 고정 헤더 */}
      <div style={{
        position: "sticky",
        top: 0,
        padding: "20px",
        backgroundColor: "#2196F3",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: "100"
      }}>
        <h1>🎯 useRef - Dom 조작</h1>

        {/* 네비게이션 버튼들 */}
        <div style={{display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px"}}>
          <button
            onClick={() => scrollToSection(section1Ref)}
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              color: "#2196F3",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            📝 Section 1
          </button>

          <button
            onClick={() => scrollToSection(section2Ref)}
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              color: "#2196F3",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🎨 Section 2
          </button>
          
          <button
            onClick={() => scrollToSection(section3Ref)}
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              color: "#2196F3",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🚀 Section 3
          </button>

          <button
            onClick={scrollToTop}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ⬆️ 맨 위로
          </button>
        </div>
      </div>

      {/* Section 1: Input 포커스 */}
      <div
        ref={section1Ref}
        style={{
          minHeight: "100vh",
          padding: "40px",
          backgroundColor: "#f0f0f0"
        }}
      >
        <h2>📝 Section 1: Input 포커스</h2>

        <div style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>실무 예제: 검색창 자동 포커스</h3>

          <input 
            ref={inputRef}
            type="text"
            placeholder="여기에 입력하세요"
            style={{
              width: "100%",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "18px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              marginBottom: "15px"
            }}
          />

          <button
            onClick={focusInput}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            🎯 포커스 주기
          </button>

          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fff3cd",
            borderRadius: "5px"
          }}>
            <p><strong>💡 실무 활용</strong></p>
            <ul style={{textAlign: "left"}}>
              <li>검색 페이지 → 검색창 자동 포커스</li>
              <li>로그인 페이지 → ID 입력창 포커스</li>
              <li>모달 열릴 때 → 첫 input 포커스</li>
              <li>에러 발생 시 → 해당 input 포커스</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: 스크롤 제어 */}
      <div
        ref={section2Ref}
        style={{
          minHeight: "100vh",
          padding: "40px",
          backgroundColor: "#e8f5e9"
        }}
      >
        <h2>🎨 Section 2: 스크롤 제어</h2>

        <div style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>실무 예제: 부드러운 스크롤</h3>

          <p style={{fontSize: "18px", lineHeight: "1.8"}}>
            위 헤더의 버튼들을 클릭하면<br />
            부드럽게 해당 섹션으로 이동합니다!
          </p>
          <div style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "5px"
          }}>
            <p><strong>💡 실무 활용</strong></p>
            <ul style={{textAlign: "left"}}>
              <li>네비게이션 메뉴 → 섹션 이동</li>
              <li>FAQ 페이지 → 질문 클릭 시 해당 답변으로</li>
              <li>채팅 앱 → 새 메세지 도착 시 맨 아래로</li>
              <li>"맨 위로" 버튼</li>
            </ul>
          </div>

          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px"
          }}>
            <p><strong>핵심 코드</strong></p>
            <pre style={{margin: "10px 0", overflow: "auto"}}>
{`// ref 생성
const sectionRef = useRef<HTMLDivElement>(null);

// 스크롤 함수
const scrollToSection = () => {
  sectionRef.current?.scrollIntoView({ 
    behavior: 'smooth' 
  });
};

// JSX에 연결
<div ref={sectionRef}>내용</div>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Section 3: 실전 패턴 */}
      <div
        ref={section3Ref}
        style={{
          minHeight: "100vh",
          padding: "40px",
          backgroundColor: "#fff3e0"
        }}
      >
        <h2>🚀 Section 3: 실전 패턴</h2>

        <div style={{
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "20px"
        }}>
          <h3>자주 쓰는 DOM 조작 패턴</h3>

          {/* 패턴 1 */}
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#e8f5e9",
            borderRadius: "5px"
          }}>
            <h4>1️⃣ 조건부 포커스</h4>
            <pre style={{
              backgroundColor: "#263238",
              color: "#aed581",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto"
            }}>
{`// 에러 발생 시 해당 input에 포커스
if (error) {
inputRef.current?.focus();
}`}
            </pre>
          </div>

          {/* 패턴 2 */}
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "5px"
          }}>
            <h4>2️⃣ 요소 크기 가져오기</h4>
            <pre style={{
              backgroundColor: "#263238",
              color: "#81d4fa",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto"
            }}>
{`const width = divRef.current?.offsetWidth;
const height = divRef.current?.offsetHeight;
console.log(width, height);`}
            </pre>
          </div>

          {/* 패턴 3 */}
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#fff3e0",
            borderRadius: "5px"
          }}>
            <h4>3️⃣ 클래스 추가/제거</h4>
            <pre style={{
              backgroundColor: "#263238",
              color: "#ffb74d",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto"
            }}>
{`divRef.current?.classList.add('active');
divRef.current?.classList.remove('active');
divRef.current?.classList.toggle('active');`}
            </pre>
          </div>

          {/* 패턴 4 */}
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f3e5f5",
            borderRadius: "5px"
          }}>
            <h4>4️⃣ 스크롤 위치 확인</h4>
            <pre style={{
              backgroundColor: "#263238",
              color: "#ce93d8",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto"
            }}>
{`const scrollTop = divRef.current?.scrollTop;
const scrollLeft = divRef.current?.scrollLeft;`}
            </pre>
          </div>
        </div>
      </div>

      {/* 맨 위로 버튼 (고정) */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        ⬆️
      </button>
    </div>
  );
}

export default App;
