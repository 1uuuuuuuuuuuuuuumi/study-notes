
interface UserCardProps {
  name: string;
  age: number;
  job: string;
  skills: string[];
}

// 구조 분해 할당 사용! (더 깔끔)
function UserCard({name, age, job, skills}: UserCardProps) {
  return (
    <div style={{
      padding: "20px",
      margin: "10px",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h2>👤 {name}</h2>
      <p>📅 {age}세</p>
      <p>💼 {job}</p>
      <h3>🛠️ 보유 스킬:</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}


// App 컴포넌트
function App() {

  return (
    <div style={{padding: "20px", maxWidth: "800px", margin:"0 auto"}}>
      <h1>🚀 팀원 소개</h1>

      <UserCard 
        name="김자바"
        age={25}
        job="백엔드 개발자"
        skills={["Java", "Spring Boot", "MySQL"]}
      />

      <UserCard 
        name="이리액트"
        age={27}
        job="프론트엔드 개발자"
        skills={["React", "TypeScript", "CSS"]}
      />

      <UserCard
        name="박풀스택"
        age={30}
        job="풀스택 개발자"
        skills={["React", "Node.js", "PostgreSQL", "Docker"]}
      />
    </div>
  );
}

export default App;
