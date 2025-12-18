import { useRef, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // useRef로 타이머 ID 저장
  const timerRef = useRef<number | null>(null);

  // 시작
  const start = () => {
    if(isRunning) return; // 이미 실행 중이면 무시

    setIsRunning(true);

    // timerRef.current에 타이머 ID 저장
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    console.log("타이머 시작! ID:", timerRef.current);
  };

  // 정지
  const stop = () => {
    if(!isRunning) return;

    setIsRunning(false);

    // timerRef.current의 타이머 멈추기
    if(timerRef.current){
      clearInterval(timerRef.current);
      console.log("타이머 정지 ID:", timerRef.current);
      timerRef.current = null;
    }
  };

  // 리셋
  const reset = () => {
    stop();
    setSeconds(0);
  };
  
  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      textAlign: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <h1>⏱️ 스톱워치 (useRef)</h1>

      {/* 시간 표시 */}
      <div style={{
        fontSize: "120px",
        fontWeight: "bold",
        margin: "60px 0",
        color: isRunning ? "#4CAF50" : "#999",
        fontFamily: "monospace"
      }}>
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:
        {String(seconds % 60).padStart(2, '0')}
      </div>

      {/* 버튼들 */}
      <div style={{display: "flex", gap: "15px", justifyContent: "center"}}>
        {!isRunning ? (
          <button
            onClick={start}
            style={{
              padding: "20px 40px",
              fontSize: "24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ▶️ 시작
          </button>
        ) : (
          <button
            onClick={stop}
            style={{
              padding: "20px 40px",
              fontSize: "24px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ⏸️ 정지
          </button>
        )}

        <button
          onClick={reset}
          style={{
            padding: "20px 40px",
            fontSize: "24px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🔄 리셋
        </button>
      </div>

      {/* 설명 */}
      <div style={{
        marginTop: "60px",
        maxWidth: "800px",
        margin: "60px auto 0",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>🎯 핵심 포인트!</h2>

        <div style={{
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h3>1️⃣ useRef로 타이머 ID 저장</h3>
          <pre style={{
            backgroundColor: "#263238",
            color: "#aed581",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "14px"
          }}>
{`const timerRef = useRef<number | null<(null);

// 시작
timerRef.current = setInterval(() => {
  setSeconds(prev => prev + 1);
}, 1000);`}
          </pre>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "#ffebee",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h3>2️⃣ 직접 타이머 정지</h3>
          <pre style={{
            backgroundColor: "#263238",
            color: "#ef5350",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "14px"
          }}>
{`// 정지
if (timerRef.current) {
  clearInterval(timerRef.current);
  timerRef.current = null;
}`}
          </pre>
        </div>
        
        <div style={{
          padding: "20px",
          backgroundColor: "#fff3e0",
          borderRadius: "8px"
        }}>
          <h3>💡 왜 useRef를 쓰는가!?</h3>
          <ul>
            <li><strong>useState 쓰면?</strong> → 타이머 ID 바뀔 때마다 리렌더링 (불필요!)</li>
            <li><strong>useRef 쓰면?</strong> → 리렌더링 없이 값만 저장! (효율적!)</li>
            <li><strong>결론:</strong>화면에 안 보이는 값은 useRef!</li>
          </ul>
        </div>
      </div>

      {/* F12 콘솔 확인 */}
      <div style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#e3f2fd",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "30px auto 0"
      }}>
        <p style={{margin: 0, fontSize: "18px"}}>
          📝 <strong>F12</strong> 눌러서 Console 탭 확인!<br />
          타이머 ID가 출력돼요!
        </p>
      </div>
    </div>
  );
}

export default App;
