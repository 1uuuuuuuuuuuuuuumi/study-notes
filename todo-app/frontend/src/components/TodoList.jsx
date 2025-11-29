import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('개인');
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Todo 목록 가져오기
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Todo 목록 조회 실패:', error);
    } finally {
      setLoading(false)
    }
  };

  // 컴포넌트 마운트 시 Todo 목록 가져오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // Todo 추가
  const addTodo = async () => {
    console.log('addTodo 호출됨!')

    if(!inputValue.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }

    // 이미 로딩 중이면 리턴 (중복 실행 방지)
    if(loading){
      console.log('이미 로딩 중 !')
      return;
    }

    setLoading(true)
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
      setLoading(false)
    }
  };

  // Enter 키로 추가
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
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

  // 필터링된 Todo 목록
  const getFilteredTodos = () => {
    let filtered = [...todos];

    // 완료 상태 필터
    if(filter === 'completed'){
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // 카테고리 필터
    if(categoryFilter !== 'all'){
      filtered = filtered.filter(todo => todo.category === categoryFilter);
    }

    // 정렬
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'important':
        filtered.sort((a, b) => {
          if(a.important === b.important) return 0;
          return a.important ? -1 : 1;
        });
        break;
      default:
        break;
    }

    return filtered;
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

      {/* 필터 탭 */}
      <div className="filter-container">
        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'filter-tab active' : 'filter-tab'}
            onClick={() => setFilter('all')}
          >
            전체 🌸
          </button>
          <button
            className={filter === 'active' ? 'filter-tab active' : 'filter-tab'}
            onClick={() => setFilter('active')}
          >
            미완료 ✨
          </button>
          <button
            className={filter === 'completed' ? 'filter-tab active' : 'filter-tab'}
            onClick={() => setFilter('completed')}
          >
            완료 🎀
          </button>
        </div>
      
        <div className="filter-controls">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">전체 카테고리</option>
            <option value="개인">개인</option>
            <option value="업무">업무</option>
            <option value="학습">학습</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="important">중요순</option>
          </select>
        </div>
      </div>

      {/* Todo 리스트 */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>로딩 중 ... 🌸</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="empty-state">
          할 일이 없어요! 🌸<br />
          새로운 할 일을 추가해보세요 !
        </div>
      ) : (
        <ul className="todo-list">
          {getFilteredTodos().map((todo) => (
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