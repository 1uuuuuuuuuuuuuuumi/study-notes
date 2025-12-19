import useCountStore from "./store/countStore";

function App() {
  // zustand store에서 상태 가져오기
  const count = useCountStore(state => state.count);
  const increment = useCountStore(state => state.increment);
  const decrement = useCountStore(state => state.decrement);
  const reset = useCountStore(state => state.reset);
  
  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      textAlign: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <h1>🎯 zustand 카운터</h1>

      {/* 카운트 표시 */}
      <div style={{
        fontSize: "120px",
        fontWeight: "bold",
        margin: "60px 0",
        color: "#2196F3"
      }}>
        {count}
      </div>

      {/* 버튼들 */}
      <div style={{display: "flex", gap: "15px", justifyContent: "center"}}>
        <button
          onClick={increment}
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
          ➕ 증가
        </button>

        <button
          onClick={decrement}
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
          ➖ 감소
        </button>

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
        maxWidth: "800px",
        margin: "60px auto 0",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2>🎯 zustand의 마법!!!</h2>

        <div style={{
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <h3>🐰 useState와 비교</h3>
          <pre style={{
            backgroundColor: "#263238",
            color: "#aed581",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "14px"
          }}>
{`// useState (기존 방식)
const [count, setCount] = useState(0);
// → App 안에서만 사용 가능

// zustand (새 방식)
const count = useCountStore(state => state.count);
// → 어디서든 사용 가능!`}
          </pre>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px"
        }}>
          <h3>💡 핵심 포인트</h3>
          <ul>
            <li>Store 하나만 만들면 끝</li>
            <li>어떤 컴포넌트에서든 접근 가능</li>
            <li>Props 전달 불필요</li>
            <li>useState처럼 간단함</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
