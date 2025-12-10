// 도서 관리 시스템
// Day 1-3 배운 내용 총정리

console.log("📚 도서 관리 시스템 시작!\n");
console.log("=".repeat(50));

// 1. 타입 정의
type Category = "소설" | "IT" | "자기계발" | "과학" | "기타";
type ReadStatus = "읽는 중" | "완독" | "읽을 예정";

interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  status: ReadStatus;
  rating?: number;  // 1-5점, 선택적
  addedDate: string;
}

interface BookState {
  books: Book[];
  filter: Category | "all";
}

// 2. 초기 상태
const initialState: BookState = {
  books: [],
  filter: "all"
};

// 3. 액션 타입
type BookAction =
  | {type: "ADD_BOOK"; book: Omit<Book, "id" | "addedDate">}
  | {type: "DELETE_BOOK"; id: number}
  | {type: "UPDATE_STATUS"; id: number; status: ReadStatus}
  | {type: "UPDATE_RATING"; id: number; rating: number}
  | {type: "SET_FILTER"; filter: Category | "all"};

// 4. Reducer 함수
function reducer(state: BookState, action: BookAction): BookState {
  switch (action.type) {
    case "ADD_BOOK":
      const newBook: Book = {
        ...action.book,
        id: Date.now(),
        addedDate: new Date().toISOString().split('T')[0]!
      };
      return {
        ...state,
        books: [...state.books, newBook]
      };

    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.id)
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.id
            ? {...book, status: action.status}
            : book
        )
      };

    case "UPDATE_RATING":
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.id
            ? {...book, rating: action.rating}
            : book
        )
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter
      };

    default:
      return state;
  }
}

// 5. Selector 함수들
function getFilteredBooks(state: BookState): Book[] {
  if(state.filter === "all"){
    return state.books;
  }
  return state.books.filter(book => book.category === state.filter);
}

function getBooksByStatus(books: Book[], status: ReadStatus): Book[] {
  return books.filter(book => book.status === status);
}

function getBooksByCategory(books: Book[], category: Category): Book[] {
  return books.filter(book => book.category === category);
}

function searchBooks(books: Book[], keyword: string): Book[] {
  const lower = keyword.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lower) ||
    book.author.toLowerCase().includes(lower)
  );
}

function getStatistics(books: Book[]) {
  return {
    total: books.length,
    reading: getBooksByStatus(books, "읽는 중").length,
    completed: getBooksByStatus(books, "완독").length,
    planned: getBooksByStatus(books, "읽을 예정").length,
    averageRating: books
      .filter(b => b.rating)
      .reduce((sum, b) => sum + (b.rating || 0), 0) /
      books.filter(b => b.rating).length || 0
  };
}

// 6. 출력 헬퍼 함수
function printBook(book: Book): void {
  const statusEmoji = {
    "읽는 중": "📖",
    "완독": "✅",
    "읽을 예정": "📚"
  }[book.status];

  const ratingStr = book.rating ? `⭐️ ${book.rating}점` : "평가 안 함";

  console.log(`${statusEmoji} [${book.category}] ${book.title}`);
  console.log(`   저자: ${book.author}`);
  console.log(`   상태: ${book.status} | ${ratingStr}`);
  console.log(`   추가일: ${book.addedDate}`);
}

function printBooks(books: Book[], title: string = "도서 목록"): void {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📚 ${title}`);
  console.log("=".repeat(50));

  if(books.length === 0){
    console.log("등록된 책이 없습니다.");
    return;
  }

  books.forEach((book, index) => {
    console.log(`\n${index + 1}. ID: ${book.id}`);
    printBook(book);
  });
}

function printStatistics(stats: ReturnType<typeof getStatistics>): void {
  console.log(`\n${"=".repeat(50)}`);
  console.log("📊 통계");
  console.log("=".repeat(50));
  console.log(`전체 도서: ${stats.total}권`);
  console.log(`읽는 중: ${stats.reading}권`);
  console.log(`완독: ${stats.completed}권`);
  console.log(`읽을 예정: ${stats.planned}권`);
  console.log(`평균 평점: ${stats.averageRating.toFixed(1)}점`);
}

// 7. 시뮬레이션 시작!
let currentState = initialState;

console.log("\n\n1️⃣ 초기 상태");
printBooks(currentState.books, "현재 도서 목록");

// 책 추가
console.log("\n\n2️⃣ 도서 5권 추가");
currentState = reducer(currentState, {
  type: "ADD_BOOK",
  book: {
    title: "클린 코드",
    author: "로버트 C. 마틴",
    category: "IT",
    status: "완독",
    rating: 5
  }
});

currentState = reducer(currentState,{
  type: "ADD_BOOK",
    book: {
        title: "해리 포터",
        author: "J.K. 롤링",
        category: "소설",
        status: "읽는 중",
        rating: 5
    }
});

currentState = reducer(currentState, {
    type: "ADD_BOOK",
    book: {
        title: "원씽",
        author: "게리 켈러",
        category: "자기계발",
        status: "완독",
        rating: 4
    }
});

currentState = reducer(currentState, {
    type: "ADD_BOOK",
    book: {
        title: "코스모스",
        author: "칼 세이건",
        category: "과학",
        status: "읽을 예정"
    }
});

currentState = reducer(currentState, {
    type: "ADD_BOOK",
    book: {
        title: "TypeScript 프로그래밍",
        author: "보리스 체니",
        category: "IT",
        status: "읽는 중"
    }
});

printBooks(currentState.books);

// 통계 보기
console.log("\n\n3️⃣ 도서 통계");
const stats = getStatistics(currentState.books);
printStatistics(stats);

// 카테고리별 필터링
console.log("\n\n4️⃣ IT 도서만 보기");
const itBooks = getBooksByCategory(currentState.books, "IT");
printBooks(itBooks, "IT 카테고리");

// 상태별 필터링
console.log("\n\n5️⃣ 완독한 책만 보기");
const completedBooks = getBooksByStatus(currentState.books, "완독");
printBooks(completedBooks, "완독한 도서");

// 검색
console.log("\n\n6️⃣ '코드' 키워드로 검색");
const searchResults = searchBooks(currentState.books, "코드");
printBooks(searchResults, "검색 결과");

// 평점 추가
console.log("\n\n7️⃣ TypeScript 책에 평점 추가");
const tsBook = currentState.books.find(b => b.title.includes("TypeScript"));
if(tsBook){
  currentState = reducer(currentState, {
    type: "UPDATE_RATING",
    id: tsBook.id,
    rating: 4
  });
}
printBooks(currentState.books);

// 최종 통계
console.log("\n\n8️⃣ 최종 통계");
const finalStats = getStatistics(currentState.books);
printStatistics(finalStats);

console.log("\n\n✅ 도서 관리 시스템 시뮬레이션 완료!");
console.log("=".repeat(50));