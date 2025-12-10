// 상태 관리 시스템 만들기!
// 오늘 배운 Union, Type Alias, 함수 타입 사용!

// 1. 상태 타입 정의 (Union + Type Alias)
type LoadingState = "idle" | "loading" | "success" | "error";
type Priority = "low" | "medium" | "high";

// 2. 할 일 인터페이스
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

// 3. 앱 상태
interface AppState {
  todos: Todo[];
  status: LoadingState;
  error: string | null;
  filter: "all" | "active" | "completed";
}

// 4. 액션 타입들 (Union Type)
type Action =
  | {type: "ADD_TODO"; title: string; priority: Priority}
  | {type: "TOGGLE_TODO"; id: number}
  | {type: "DELETE_TODO"; id: number}
  | {type: "SET_STATUS"; status: LoadingState}
  | {type: "SET_ERROR"; error: string}
  | {type: "SET_FILTER"; filter: "all" | "active" | "completed"}
  | {type: "CLEAR_COMPLETED"};

// 5. 초기 상태
const initialState: AppState = {
  todos: [],
  status: "idle",
  error: null,
  filter: "all"
};

// 6. Reducer 함수 (상태 업데이트)
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        id: Date.now(),
        title: action.title,
        completed: false,
        priority: action.priority,
        createdAt: Date.now()
      };
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
      
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? {...todo, completed: !todo.completed}
            : todo
        )
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.status
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
        status: "error"
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

// 7. 셀렉터 함수들 (Type Alias 활용)
type Selector<T> = (state: AppState) => T;

const getTodos: Selector<Todo[]> = (state) => state.todos;

const getActiveTodos: Selector<Todo[]> = (state) =>
  state.todos.filter(todo => !todo.completed);

const getCompletedTodos: Selector<Todo[]> = (state) =>
  state.todos.filter(todo => todo.completed);

const getFilteredTodos: Selector<Todo[]> = (state) => {
  switch (state.filter) {
    case "active":
      return getActiveTodos(state);
    case "completed":
      return getCompletedTodos(state);
    default:
      return getTodos(state);
  }
};

const getTodoStats: Selector<{total: number; active: number; completed: number}> = (state) => ({
  total: state.todos.length,
  active: getActiveTodos(state).length,
  completed: getCompletedTodos(state).length
});

// 8. 출력 헬퍼 함수
function printState(state: AppState): void {
  console.log("\n" + '='.repeat(50));
  console.log("📊 현재 상태");
  console.log("=".repeat(50));
  console.log(`상태: ${state.status}`);
  console.log(`필터: ${state.filter}`);
  console.log(`에러: ${state.error || "없음"}`);

  const stats = getTodoStats(state);
  console.log(`\n통계: 전체 ${stats.total}개 | 진행중 ${stats.active}개 | 완료 ${stats.completed}개`);
}

function printTodos(todos: Todo[]): void {
  if(todos.length === 0){
    console.log("\n할 일이 없습니다.");
    return;
  }

  console.log("\n📝 할 일 목록:");
  todos.forEach(todo => {
    const status = todo.completed ? "✅" : "⬜";
    const priorityEmoji = {
      low: "🟢",
      medium: "🟡",
      high: "🔴"
    }[todo.priority];
    console.log(`${status} ${priorityEmoji} [${todo.id}] ${todo.title}`);
  });
}

// 9. 시뮬레이션 실행!
console.log("🚀 상태 관리 시스템 시작!\n");

// 초기 상태
let currentState = initialState;
console.log("1️⃣ 초기 상태");
printState(currentState);

// 할 일 추가
console.log("\n\n2️⃣ 할 일 3개 추가");
currentState = reducer(currentState, {
  type: "ADD_TODO",
  title: "TypeScript 공부하기",
  priority: "high"
});

currentState = reducer(currentState, {
  type: "ADD_TODO",
  title: "React 배우기",
  priority: "medium"
});

currentState = reducer(currentState, {
  type: "ADD_TODO",
  title: "운동하기",
  priority: "low"
});

printState(currentState);
printTodos(getTodos(currentState));

// 할 일 완료 처리
console.log("\n\n3️⃣ 첫 번째 할 일 완료!");
const firstTodoId = currentState.todos[0]?.id || 0;
// 첫번째 명확한 버전
// if(currentState.todos.length > 0){
//   const firstTodoId = currentState.todos[0]?.id;
//   currentState = reducer(currentState, {
//     type: "TOGGLE_TODO",
//     id: firstTodoId
//   });
// }
// 두번째 간단한 버전
// const firstTodoId = currentState.todos[0]!.id;
currentState = reducer(currentState, {
  type: "TOGGLE_TODO",
  id: firstTodoId
});

printState(currentState);
printTodos(getTodos(currentState));

// 필터링 - 진행 중인 것만
console.log("\n\n4️⃣ 진행 중인 할 일만 보기");
currentState = reducer(currentState, {
  type: "SET_FILTER",
  filter: "active"
});

printState(currentState);
printTodos(getFilteredTodos(currentState));

// 필터링 - 완료된 것만
console.log("\n\n5️⃣ 완료된 할 일만 보기");
currentState = reducer(currentState, {
  type: "SET_FILTER",
  filter: "completed"
});

printState(currentState);
printTodos(getFilteredTodos(currentState));

// 우선순위별 필터링 함수
function getTodosByPriority(state: AppState, priority: Priority): Todo[] {
  return state.todos.filter(todo => todo.priority === priority);
}

// 우선순위별 출력
console.log("\n\n6️⃣ 우선순위별 할 일");
currentState = reducer(currentState, {
  type: "SET_FILTER",
  filter: "all"
});

console.log("\n🔴 높은 우선순위:");
printTodos(getTodosByPriority(currentState, "high"));

console.log("\n🟡 보통 우선순위:");
printTodos(getTodosByPriority(currentState, "medium"));

console.log("\n🟢 낮은 우선순위:");
printTodos(getTodosByPriority(currentState, "low"));

// 완료된 할 일 삭제
console.log("\n\n7️⃣ 완료된 할 일 모두 삭제");
currentState = reducer(currentState, {
  type: "CLEAR_COMPLETED"
});

printState(currentState);
printTodos(getTodos(currentState));

// 에러 시뮬레이션
console.log("\n\n8️⃣ 에러 발생 시뮬레이션");
currentState = reducer(currentState, {
  type: "SET_STATUS",
  status: "loading"
});
console.log("로딩 중...");

currentState = reducer(currentState, {
  type: "SET_ERROR",
  error: "서버 연결 실패"
});

printState(currentState);

console.log("\n\n✅ 상태 관리 시스템 시뮬레이션 완료!");
console.log("=".repeat(50));