import { create } from "zustand";

// Store 타입 정의
interface CountStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Store 생성!
const useCountStore = create<CountStore>((set) => ({
  // 초기 상태
  count: 0,

  // 액션들
  increment: () => set((state) => ({count: state.count + 1})),
  decrement: () => set((state) => ({count: state.count - 1})),
  reset: () => set({count: 0})
}));

export default useCountStore;