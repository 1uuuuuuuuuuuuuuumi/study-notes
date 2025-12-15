import { useState } from "react";

function App() {
  // useState: [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      fontFamily: "Arial"
    }}>
      <h1>🎯 카운터</h1>

      <p style={{fontSize: "48px", fontWeight: "bold"}}>
        {count}
      </p>

      <div>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            margin: "5px",
            cursor: "pointer"
          }}
        >
          ➕ 증가
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            margin: "5px",
            cursor: "pointer"
          }}
        >
          ➖ 감소
        </button>

        <button
          onClick={() => setCount(0)}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            margin: "5px",
            cursor: "pointer"
          }}
        >
          🔄 리셋
        </button>
      </div>
    </div>
  );
}

export default App;
