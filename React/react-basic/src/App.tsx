
// Props 인터페이스 정의
interface GreetingProps {
  name: string;
  age: number;
}

// Greeting 컴포넌트
function Greeting(props: GreetingProps) {
  return (
    <div style={{
      padding: "20px",
      margin: "10px",
      border: "2px solid #4CAF50",
      borderRadius: "8px"
    }}>
      <h2>안녕하세요! {props.name}님!</h2>
      <p>나이: {props.age}세</p>
    </div>
  );
}


// App 컴포넌트
function App() {

  return (
    <div style={{padding: "20px"}}>
      <h1>🎉 Props 배우기</h1>

      <Greeting name="김자바" age={25} />
      <Greeting name="이파이썬" age={28} />
      <Greeting name="박리액트" age={30} />
    </div>
  );
}

export default App;
