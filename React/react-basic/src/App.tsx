import { useEffect, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log("useEffect 실행! isRunning:", isRunning);

    if(!isRunning){
      console.log("타이머 멈춤 상태");
      return; // 타이머 안 돌림
    }

    console.log("타이머 시작!");

    // setInterval: 1초마다 실행
    const timer = setInterval(() => {
      console.log("1초 경과!");
      setSeconds(prev => prev + 1);
    }, 1000);

    // cleanup 함수!
    return () => {
      console.log("타이머 정리!");
      clearInterval(timer);
    };
  }, [isRunning]);  // isRunning이 바뀔 때만!

  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      fontFamily: "Arial"
    }}>
      <h1>⏰ 타이머</h1>

      <div style={{
        fontSize: "72px",
        fontWeight: "bold",
        margin: "40px 0",
        color: isRunning ? "#4CAF50" : "#999"
      }}>
        {seconds}초
      </div>

      <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            backgroundColor: isRunning ? "#f44336" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {isRunning ? "⏸️ 정지" : "▶️ 시작"}
        </button>

        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(false);
          }}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          🔄 리셋
        </button>
      </div>

      <div style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#fff3cd",
        borderRadius: "8px"
      }}>
        <h3>📝 F12로 콘솔 확인!</h3>
        <p>시작/정지할 때마다 로그를 확인해보세요!</p>
      </div>
    </div>
  );
}

export default App;
