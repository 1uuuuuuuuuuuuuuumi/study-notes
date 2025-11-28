import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('개인');

  // Todo 목록 가져오기
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Todo 목록 조회 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 Todo 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // Todo 추가
  const addTodo = async () => {
    if(!inputValue.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/todos', {
        content: inputValue,
        completed: false,
        important: false,
        category: category
      });

      setInputValue('');
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error('Todo 추가 실패:', error);
      alert('할 일 추가에 실패했어요 😢');
    }
  };

  // Enter 키로 추가
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      addTodo();
    }
  };

  // 완료 토글
  const toggleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/todos/${id}/complete`);
      fetchTodos();
    } catch (error) {
      console.error('완료 토글 실패:', error);
    }
  };

  // Todo 삭제
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Todo 삭제 실패:', error);
    }
  };

  // 중요 표시 토글
  const toggleImportant = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/todos/${id}/important`);
      fetchTodos();
    } catch (error) {
      console.error('중요 표시 토글 실패:', error);
    }
  };

  return (
    <div>
      {/* 입력 폼 */}
      <div className="todo-input-container">
        <input 
          type="text"
          className="todo-input"
          placeholder="오늘 할 일을 입력하세요 ✨"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={"개인"}>개인</option>
          <option value={"업무"}>업무</option>
          <option value={"학습"}>학습</option>
        </select>
        <button className="add-button" onClick={addTodo}>
          ✨ 추가
        </button>
      </div>

      {/* Todo 리스트 */}
      {todos.length === 0 ? (
        <div className="empty-state">
          할 일이 없어요! 🌸<br />
          새로운 할 일을 추가해보세요 !
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? 'todo-item completed' : 'todo-item'}
            >
              <input 
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className="todo-content">
                {todo.completed ? '🎀' : '🌸'} {todo.content}
              </span>
              {todo.important && (
                <span className="important-badge" title="중요">⭐</span>
              )}
              {todo.category && (
                <span className="todo-category">{todo.category}</span>
              )}
              <button
                className="important-button"
                onClick={() => toggleImportant(todo.id)}
                title={todo.important ? '중요 해제' : '중요 표시'}
              >
                {todo.important ? '⭐' : '☆'}
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                🧺 삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;