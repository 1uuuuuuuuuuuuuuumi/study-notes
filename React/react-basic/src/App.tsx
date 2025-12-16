import { useRef, useState } from "react";

function App() {
  // useState: 변경 시 리렌더링 O
  const [count, setCount] = useState(0);

  // useRef: 변경해도 리렌더링 X
  const countRef = useRef(0);

  // 렌더링 횟수 카운트
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{padding: "40px", fontFamily: "Arial"}}>
      <h1>🎯 useState vs useRef</h1>

      <div style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <p style={{fontSize: "18px", margin: "10px 0"}}>
          🔄 렌더링 횟수: <strong>{renderCount.current}</strong>
        </p>
      </div>

      {/* useState */}
      <div style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>✨ useState (리렌더링 O)</h2>
        <p style={{fontSize: "24px", fontWeight: "bold"}}>
          Count: {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ➕ useState 증가 (리렌더링 됨!)
        </button>
      </div>

      {/* useRef */}
      <div style={{
        padding: "20px",
        border: "2px solid #2196F3",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>🎯 useRef (리렌더링 X)</h2>
        <p style={{fontSize: "24px", fontWeight: "bold"}}>
          CountRef: {countRef.current}
        </p>
        <button
          onClick={() => {
            countRef.current += 1;
            console.log("countRef:", countRef.current);
            alert(`countRef는 ${countRef.current}인데!! 화면은 안 바뀜!`);
          }}
          style={{
            padding: "10px 20px",
            fontSize: "16opx",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ➕ useRef 증가 (리렌더링 안 됨!)
        </button>
      </div>

      {/* 비교 */}
      <div style={{
        padding: "20px",
        backgroundColor: "#fff3cd",
        borderRadius: "8px"
      }}>
        <h3>📝 차이점</h3>
        <ul style={{textAlign: "left"}}>
          <li><strong>useState</strong>: 값 변경 → 리렌더링 → 화면 업데이트 ✅</li>
          <li><strong>useRef</strong>: 값 변경 → 리렌더링 X → 화면 그대로 ❌</li>
          <li><strong>useRef</strong>: 값은 변했지만 화면은 안 바뀜!</li>
          <li>렌더링 횟수는 useRef로 세는 게 정확!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
