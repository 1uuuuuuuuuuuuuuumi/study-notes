// 1. 기본 Type Alias
type UserId = string | number;

let id1: UserId = "user-123";
let id2: UserId = 456;

console.log("ID 1:", id1);
console.log("ID 2:", id2);

// 2. 객체 Type Alias
type User = {
  id: number;
  name: string;
  email: string;
  age?: number; // 선택적
};

const user1: User = {
  id: 1,
  name: "김자바",
  email: "java@hello.com",
  age: 25
};

const user2: User = {
  id: 2,
  name: "이코딩",
  email: "lee@coding.com"
  // age 없어도 OK!
};

console.log("\n사용자1:", user1);
console.log("사용자1:", user2);

// 3. Type Alias vs Interface 비교

// Type Alias
type Product1 = {
  id: number;
  name: string;
  price: number;
};

// Interface
interface Product2 {
  id: number;
  name: string
  price: number;
}

// 둘 다 똑같이 작동!
const product1: Product1 = {id: 1, name: "키보드", price: 50000};
const product2: Product2 = {id: 2, name: "마우스", price: 30000};

// 4. Union과 Type Alias 조합 (실무 꿀팁!)
type Status = "idle" | "loading" | "success" | "error";
type Response = "yes" | "no" | "maybe";

function handleStatus(status: Status): void {
  console.log(`\n현재 상태: ${status}`);
}

handleStatus("loading");
handleStatus("success");
// handleStatus("pending");  // (X) 에러!

// 5. 복잡한 타입 재사용
type Point = {
  x: number;
  y: number;
};

type Shape = {
  id: number;
  center: Point;
  color: string;
};

const circle: Shape = {
  id: 1,
  center: {x: 10, y: 20},
  color: "red"
};

console.log("\n도형:", circle);
console.log("중심점:", `(${circle.center.x}, ${circle.center.y})`);

// 6. 함수 타입 Alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

console.log("\n5 + 3 =", add(5, 3));
console.log("10 - 4 =", subtract(10, 4));
console.log("6 x 7 =", multiply(6, 7));

// 7. 실무 예시: API 응답 타입
type SuccessResponse = {
  status: "success";
  data: any;
  message: string;
};

type ErrorResponse = {
  status: "error";
  error: string;
  code: number;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleApiResponse(response: ApiResponse): void {
  console.log("\n=== API 응답 처리 ===");
  if(response.status === "success"){
    console.log("✅", response.message);
    console.log("데이터:", response.data);
  } else {
    console.log("❌ 에러:", response.error);
    console.log("에러 코드:", response.code);
  }
}

handleApiResponse({
  status: "success",
  data: {userId:1, name: "김자바"},
  message: "사용자 정보 조회 성공"
});

handleApiResponse({
  status: "error",
  error: "서버 연결 실패",
  code: 500
});

// 8. Type Alias 조합
type ID = string | number;
type Timestamp = number;

type Post = {
  id: ID;
  title: string;
  content: string;
  authorId: ID;
  createdAt: Timestamp;
  likes: number;
};

const post: Post = {
  id: "post-123",
  title: "TypeScript 배우기",
  content: "Type Alias는 정말 유용햇!",
  authorId: 1,
  createdAt: Date.now(),
  likes: 10
};

console.log("\n게시글:", post.title);
console.log("작성자 ID:", post.authorId);
console.log("좋아요:", post.likes);