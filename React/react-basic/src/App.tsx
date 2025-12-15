// Day 7: React 시작!
// 첫 번째 컴포넌트

function App() {
  // JavaScript 변수
  const name = "김자바";
  const age = 25;
  const skills = ["TypeScript", "JavaScript", "React"];

  return (
    <div style={{padding: "20px", fontFamily:"Arial"}}>
      <h1>🎉 {name}의 자기소개</h1>

      <p>나이: {age}세</p>

      <h2>보유 스킬:</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <p>오늘 배운 것: React 컴포넌트!</p>
    </div>
  );
}

export default App;
