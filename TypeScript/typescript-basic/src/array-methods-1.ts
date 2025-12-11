// Day 5: JavaScript 배열 메서드 마스터하기!
// map, filter, reduce 완전 정복

console.log("🚀 JavaScript 배열 메서드 학습 시작!\n");
console.log("=".repeat(50));

// ===== 1. map() - 배열 변환의 기본 =====
console.log("\n📍 1. map() - 배열의 모든 요소를 변환");
console.log("=".repeat(50));

// 기본 사용법
const numbers1 = [1, 2, 3, 4, 5];
const doubled = numbers1.map(num => num * 2);

console.log("원본:", numbers1);
console.log("2배:", doubled);

// 실무 예제 1: 가격에 부가세 추가
interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  {name: "키보드", price: 50000},
  {name: "마우스", price: 30000},
  {name: "모니터", price: 300000}
];

// 부가세 10% 추가
const withTax = products.map(product => ({
  name: product.name,
  price: Math.round(product.price * 1.1)
}));

console.log("\n부가세 추가 전:", products);
console.log("부가세 추가 후:", withTax);

// 실무 예제 2: 객체에서 특정 속성만 추출
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  {id: 1, name: "김자바", email: "java@ex.com", age: 25},
  {id: 2, name: "김개발", email: "kim@ex.com", age: 28},
  {id: 3, name: "이코딩", email: "lee@ex.com", age: 30}
];

// 이름만 추출
const names = users.map(user => user.name);
console.log("\n이름 목록:", names);

// id와 name만 추출
const simpleUsers = users.map(user => ({
  id: user.id,
  name: user.name
}));
console.log("간단한 사용자 정보:", simpleUsers);

// 실무 예제 3: 문자열 가공
const rawData = ["  apple ", "  BANANA  ", "  Orange  "];
const cleanData = rawData.map(item => item.trim().toLowerCase());

console.log("\n원본 데이터:", rawData);
console.log("정리된 데이터:", cleanData);

// ===== 2. filter() - 조건으로 필터링 =====
console.log("\n\n📍 2. filter() - 조건에 맞는 요소만 추출");
console.log("=".repeat(50));

// 기본 사용법
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
const oddNumbers = numbers2.filter(num => num % 2 !== 0);

console.log("원본:", numbers2);
console.log("짝수:", evenNumbers);
console.log("홀수:", oddNumbers);

// 실무 예제 1: 가격 범위로 필터링
const productsForFilter = [
  {name: "키보드", price: 50000},
  {name: "마우스", price: 30000},
  {name: "모니터", price: 300000},
  {name: "웹캠", price: 80000},
  {name: "헤드셋", price: 120000}
];

// 10만원 이하 상품
const affordable = productsForFilter.filter(p => p.price <= 100000);
console.log("\n10만원 이하 상품:", affordable);

// 실무 예제 2: 활성 사용자만 필터링
interface UserWithStatus {
  name: string;
  isActive: boolean;
  age: number;
}

const allUsers: UserWithStatus[] = [
  {name: "김자바", isActive: true, age: 25},
  {name: "김개발", isActive: false, age: 28},
  {name: "이코딩", isActive: true, age: 30},
  {name: "박장고", isActive: false, age: 26}
];

const activeUsers = allUsers.filter(user => user.isActive);
console.log("\n활성 사용자:", activeUsers);

// 복합 조건
const activeAdults = allUsers.filter(user => user.isActive && user.age >= 25);
console.log("활성 + 25세 이상:", activeAdults);

// 실무 예제 3: 검색 기능
const searchKeyword = "키";
const searchResults = productsForFilter.filter(p =>
  p.name.includes(searchKeyword)
);
console.log(`\n"${searchKeyword}" 검색 결과:`, searchResults);

// ===== 3. reduce() - 값을 하나로 합치기 =====
console.log("\n\n📍 3. reduce() - 배열을 하나의 값으로");
console.log("=".repeat(50));

// 기본 사용법: 합계
const numbers3 = [1, 2, 3, 4, 5];
const sum = numbers3.reduce((total, num) => total + num, 0);

console.log("숫자 배열:", numbers3);
console.log("합계:",sum);

// 평균 구하기
const average = numbers3.reduce((sum, num) => sum + num, 0) / numbers3.length;
console.log("평균:", average);

// 실무 예제 1: 장바구니 총액
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const cart: CartItem[] = [
  {name: "사과", price: 1000, quantity: 3},
  {name: "바나나", price: 1500, quantity: 2},
  {name: "오렌지", price: 2000, quantity: 5}
];

const totalPrice = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);

console.log("\n장바구니:", cart);
console.log("총 금액:", totalPrice.toLocaleString() + "원");

// 실무 예제 2: 카테고리별 개수 세기
const fruits = ["사과", "바나나", "사과", "오렌지", "바나나", "사과"];

const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {} as Record<string, number>);

console.log("\n과일 목록:", fruits);
console.log("개수:", fruitCount);

// 실무 예제 3: 최대값, 최소값
const scores = [85, 92, 78, 95, 88, 76, 90];

const maxScore = scores.reduce((max, score) =>
  score > max ? score : max
, scores[0]!);

const minScore = scores.reduce((min, score) =>
  score < min ? score : min
, scores[0]!);

console.log("\n점수:", scores);
console.log("최고점:", maxScore);
console.log("최저점:", minScore);

// ===== 4. 메서드 체이닝 - 실무의 핵심! =====
console.log("\n\n📍 4. 메서드 체이닝 - 여러 메서드 조합");
console.log("=".repeat(50));

// 예제: 활성 사용자의 이름만 추출
const userNames = allUsers
  .filter(user => user.isActive)
  .map(user => user.name);

console.log("활성 사용자 이름:", userNames);

// 예제: 10만원 이하 상품의 총 가격
const affordableTotal = productsForFilter
  .filter(p => p.price <= 100000)
  .reduce((total, p) => total + p.price, 0);

console.log("\n10만원 이하 상품 총액:", affordableTotal.toLocaleString() + "원");

// 예제: 성인 사용자의 평균 나이
const adultAges = allUsers
  .filter(user => user.age >= 20)
  .map(user => user.age);

const avgAge = adultAges.reduce((sum, age) => sum + age, 0) / adultAges.length;

console.log("\n성인 나이:", adultAges);
console.log("평균 나이:", avgAge.toFixed(1) + "세");

// ===== 5. 실무 종합 예제 =====
console.log("\n\n📍 5. 실무 종합 예제 - 주문 데이터 분석");
console.log("=".repeat(50));

interface Order {
  id: number;
  customerName: string;
  items: CartItem[];
  status: "pending" | "completed" | "cancelled";
  orderDate: string;
}

const orders: Order[] = [
  {
    id: 1,
    customerName: "김자바",
    items: [
      {name: "노트북", price: 1500000, quantity: 1},
      {name: "마우스", price: 30000, quantity: 2}
    ],
    status: "completed",
    orderDate: "2025-12-01"
  },
  {
    id: 2,
        customerName: "김개발",
        items: [
            { name: "키보드", price: 80000, quantity: 1 }
        ],
        status: "pending",
        orderDate: "2025-12-05"
  },
  {
        id: 3,
        customerName: "이코딩",
        items: [
            { name: "모니터", price: 300000, quantity: 2 }
        ],
        status: "completed",
        orderDate: "2025-12-03"
    }
];

// 완료된 주문의 총 매출
const completedRevenue = orders
  .filter(order => order.status === "completed")
  .map(order =>
    order.items.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    )
  )
  .reduce((total, orderTotal) => total + orderTotal, 0);

console.log("완료된 주문 총 매출:", completedRevenue.toLocaleString() + "원");

// 고객별 주문 금액
const customerSpending = orders.map(order => ({
  customer: order.customerName,
  total: order.items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  )
}));

console.log("\n고객별 주문 금액:", customerSpending);

console.log("\n\n✅ Day 5 학습 완료!!!")
console.log("=".repeat(50));