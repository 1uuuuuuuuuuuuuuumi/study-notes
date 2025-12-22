import useCountStore from "./store/countStore";

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

// 컴포넌트 3: 통계만
function CounterStats(){
  const count = useCountStore(state => state.count);

  return (
    <div style={{
      padding: "30px",
      backgroundColor: "#fff3e0",
      borderRadius: "10px",
      marginBottom: "20px"
    }}>
      <h2>📈 CounterStats 컴포넌트</h2>
      <div style={{display: "flex",gap: "20px", justifyContent: "center"}}>
        <div>
          <p style={{margin: "5px 0", color: "#666"}}>현재 값</p>
          <p style={{fontSize: "32px", fontWeight: "bold", margin: "0"}}>
            {count}
          </p>
        </div>
        <div>
          <p style={{margin: "5px 0", color: "#666"}}>부호</p>
          <p style={{fontSize: "32px", fontWeight: "bold", margin: 0}}>
            {count > 0 ? '➕' : count < 0 ? '➖' : '⚪'}
          </p>
        </div>
        <div>
          <p style={{margin: "5px 0", color: "#666"}}>절대값</p>
          <p style={{fontSize: "32px", fontWeight: "bold", margin: 0}}>
            {Math.abs(count)}
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <h1 style={{textAlign: "center"}}>🚀 zustand - 전역 상태 공유</h1>

      <div style={{
        maxWidth: "800px",
        margin: "40px auto"
      }}>
        {/* 3개의 독립된 컴포넌트! */}
        <CounterDisplay />
        <CounterButtons />
        <CounterStats />

        {/* 설명 */}
        <div style={{
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2>✨ 정 리 ✨</h2>
          
          <div style={{
            padding: "20px",
            backgroundColor: "#f3e5f5",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h3>🎯 핵심 포인트</h3>
            <ul style={{lineHeight: "1.8"}}>
              <li><strong>3개의 독립된 컴포넌트</strong></li>
              <li><strong>Props 전달 없음!</strong></li>
              <li><strong>모두 같은 count 공유</strong></li>
              <li><strong>버튼 클릭 → 모든 곳에서 업데이트!</strong></li>
            </ul>
          </div>

          <div style={{
            padding: "20px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px"
          }}>
            <h3>💡 useState였다면?</h3>
            <pre style={{
              backgroundColor: "#263238",
              color: "#aed581",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              fontSize: "14px"
            }}>
{`// (X) Props 지옥!
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <CounterDisplay count={count} />
      <CounterButtons
        count={count}
        setCount={setCount}
      />
      <CounterStats count={count} />
    </>
  );
}`}
            </pre>

            <p style={{marginTop: "15px", color: "#2e7d32", fontWeight: "bold"}}>
              ✅ zustand는 Props 불필요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
