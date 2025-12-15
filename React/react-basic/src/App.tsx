import { useState } from "react";

function App() {
  // useState: [현재값, 변경함수] = useState(초기값)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamil: "Arial"
    }}>
      <h1>📝 입력 폼</h1>

      {/* 이름 입력 */}
      <div style={{marginBottom: "20px"}}>
        <label style={{display: "block", marginBottom: "5px", fontWeight: "bold"}}>
          이름:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px"
          }}
        />
      </div>

      {/* 나이 입력 */}
      <div style={{marginBottom: "20px"}}>
        <label style={{display: "block", marginBottom: "5px", fontWeight: "bold"}}>
          나이:
        </label>
        <input
          type="num"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="나이를 입력하세요"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px"
          }}
        />

        {/* 결과 표시 */}
        <div style={{
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          marginTop: "20px"
        }}>
          <h2>👤 입력한 정보:</h2>
          <p style={{fontSize: "18px"}}>
            이름: <strong>{name || "(입력 안 함)"}</strong>
          </p>
          <p style={{fontSize: "18px"}}>
            나이: <strong>{age || "(입력 안 함)"}</strong>세
          </p>

          {name && age && (
            <p style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "5px"
            }}>
              ✅ {name}님, {age}세 입력 완료!
            </p>
          )}
        </div>

        {/* 리셋 버튼 */}
        <button
          onClick={() => {
            setName("");
            setAge("");
          }}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          🔄 초기화
        </button>
      </div>
    </div>
  );
}

export default App;
