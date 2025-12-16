import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 패턴 1: 의존성 배열 없음 - 매번 실행
  useEffect(() => {
    console.log("🔴 매번 실행!");
  });

  // 패턴 2: 빈 배열 - 한 번만 실행
  useEffect(() => {
    console.log("🟢 처음 한 번만!");
  }, []);

  // 패턴 3: count만 감시
  useEffect(() => {
    console.log("🔵 count 변경:", count);
  }, [count]);

  // 패턴 4: name만 감시
  useEffect(() => {
    console.log("🟡 name 변경", name);
  }, [name]);

  return (
    <div style={{padding:"40px", maxWidth: "600px", margin: "0 auto"}}>
      <h1>🎯 useEffect 의존성 배열</h1>

      {/* 카운터 */}
      <div style={{marginBottom: "30px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px"}}>
        <h2>카운터: {count}</h2>
        <button
          onClick={() => setCount(count + 1)}
          style={{padding: "10px 20px", fontSize: "16px", cursor: "pointer"}}
        >
          ➕ count 증가
        </button>
      </div>

      {/* 이름 입력 */}
      <div style={{marginBottom: "30px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px"}}>
        <h2>이름: {name}</h2>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{padding: "10px", fontSize: "16px", width: "100%"}}
        />
      </div>

      {/* 설명 */}
      <div style={{padding: "15px", backgroundColor: "#fff3cd", borderRadius: "8px"}}>
        <h3>📝 F12로 콘솔 확인!</h3>
        <ul style={{textAlign: "left"}}>
          <li>🔴 매번 실행: 버튼/입력 모두 반응</li>
          <li>🟢 한 번만: 새로고침할 때만</li>
          <li>🔵 count만: 버튼 클릭할 때만</li>
          <li>🟡 name만: 입력할 때만</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
