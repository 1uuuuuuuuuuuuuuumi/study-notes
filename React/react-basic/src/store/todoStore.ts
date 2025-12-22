import { create } from "zustand";
import { persist } from "zustand/middleware";

// Todo 타입
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Store 타입
interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

// Todo Store 생성 + localStorage 자동 연동
const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      // 초기 상태
      todos: [],

      // 할 일 추가
      addTodo: (text: string) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text,
              completed: false
            }
          ]
        })),

        // 완료 토글
        toggleTodo: (id: number) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? {...todo, completed: !todo.completed}
                : todo
            )
          })),

          // 삭제
          deleteTodo: (id: number) =>
            set((state) => ({
              todos: state.todos.filter((todo) => todo.id !== id)
            }))
    }),
    {
      name: 'todo-storage'  // localStorage key
    }
  )
);

export default useTodoStore;