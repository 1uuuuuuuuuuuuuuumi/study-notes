import { useState } from "react";
import useTodoStore from "./store/todoStore";

function App() {
  const [inputText, setInputText] = useState("");

  // zustand store에서 가져오기
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);

  const handleAddTodo = () => {
    if(inputText.trim() === "") return;
    addTodo(inputText);
    setInputText("");
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial"
    }}>
      <h1>✅ Todo List (zustand + localStorage)</h1>

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
              handleAddTodo();
            }
          }}
          placeholder="할 일을 입력하세요"
          style={{
            flex: "1",
            padding: "12px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px"
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
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
          전체: {todos.length}개 |
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
        padding: "20px",
        backgroundColor: "#fff3cd",
        borderRadius: "8px"
      }}>
        <h3>🚀 zustand의 강력함!</h3>
        <ul style={{lineHeight: "1.8", textAlign: "left"}}>
          <li><strong>전역 상태</strong> - 어디서든 접근 가능</li>
          <li><strong>자동 저장</strong> - localStorage 자동 연동</li>
          <li><strong>새로고침해도 유지</strong> - persist 마법!</li>
          <li><strong>코드 간결</strong> - useEffect 불필요</li>
        </ul>

        <div style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "white",
          borderRadius: "5px"
        }}>
          <p style={{margin: "0 0 10px 0"}}>
            <strong>💡 Day 9와 비교</strong>
          </p>
          <pre style={{
            backgroundColor: "#263238",
            color: "#aed581",
            padding: "10px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "12px",
            margin: 0
          }}>
{`// Day 9 (복잡)
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

// Day 11 (간단!)
persist(..., { name: 'todo-storage' })
// 끝! 자동으로 저장/불러오기!`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
