import useCountStore from "./store/countStore";

function App() {
  // 컴포넌트 1: 카운터 표시만
  function CounterDisplay(){
    const count = useCountStore(state => state.count);

    return (
      <div style={{
        padding: "30px",
        backgroundColor: "#e3f2fd",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h2>📊 CounterDisplay 컴포넌트</h2>
        <p style={{fontSize: "48px", fontWeight: "bold", color: "#2196F3"}}>
          {count}
        </p>
      </div>
    );
  }

  // 컴포넌트 2: 버튼들만
  function CounterButtons(){
    const increment = useCountStore(state => state.increment);
    const decrement = useCountStore(state => state.decrement);
    const reset = useCountStore(state => state.reset);

    return(
      <div style={{
        padding: "30px",
        backgroundColor: "#e8f5e9",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h2>🎮 CounterButtons 컴포넌트</h2>
        <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
          <button
            onClick={increment}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ➕ 증가
          </button>

          <button
            onClick={decrement}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ➖ 감소
          </button>

          <button
            onClick={reset}
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🔄 리셋
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div></div>
  );
}

export default App;
