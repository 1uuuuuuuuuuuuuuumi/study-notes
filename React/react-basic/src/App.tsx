import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // localStorage에서 불러오기 (초기값)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if(saved){
      return JSON.parse(saved);
    }
    return [];
  });
  
  const [inputText, setInputText] = useState("");

  // todos가 바뀔 때마다 localStorage에 저장!
  useEffect(() => {
    console.log("💾 localStorage에 저장!");
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if(inputText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {...todo, completed : !todo.completed}
        : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial"
    }}>
      <h1>✅ Todo List (저장 기능!)</h1>

      {/* 입력 영역 */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
      }}>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter" && !e.nativeEvent.isComposing){
              addTodo();
            }
          }}
          placeholder="할 일을 입력하세요"
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px"
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          추가
        </button>
      </div>

      {/* 통계 */}
      <div style={{
        padding: "15px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <p style={{margin: 0}}>
          전체:{todos.length}개 |
          완료: {todos.filter(t => t.completed).length}개 |
          남은 것: {todos.filter(t => !t.completed).length}개
        </p>
      </div>

      {/* Todo 목록 */}
      <div>
        {todos.length === 0 ? (
          <p style={{
            textAlign: "center",
            color: "#999",
            padding: "40px"
          }}>
            할 일이 없습니다! 추가해보세요 😊
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: todo.completed ? "#e8f5e9" : "white",
                border: "2px solid #ddd",
                borderRadius: "8px"
              }}
            >
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer"
                }}
              />

              <span
                style={{
                  flex: 1,
                  fontSize: "18px",
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#999" : "#000"
                }}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                🗑️ 삭제
              </button>
            </div>
          ))
        )}
      </div>

      {/* 설명 */}
      <div style={{
        marginTop: "30px",
        padding: "15px",
        backgroundColor: "#fff3cd",
        borderRadius: "8px"
      }}>
        <h3>💾 저장 기능!</h3>
        <ul style={{textAlign: "left"}}>
          <li>Todo 추가/완료/삭제하면 자동 저장!</li>
          <li>새로고침해도 유지됨!</li>
          <li>F12 → Console 탭에서 "💾 localStorage에 저장!" 확인!</li>
          <li>F12 → Application 탭 → Local Storage 에서 직접 확인 가능!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
