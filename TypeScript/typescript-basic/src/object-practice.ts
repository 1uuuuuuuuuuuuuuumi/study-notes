// 1. 기본 객체 타입
const user: { name: string; age: number} = {
  name: "호빵맨",
  age: 25
}

console.log("사용자:", user);
console.log(`이름: ${user.name}, 나이: ${user.age}`);

// 2. 선택적 속성 (?)
const product: {
  name: string;
  price: number;
  discount?: number;  // ? = 있어도 되고 없어도 됨
} = {
  name: "노트북",
  price: 1500000
  // discount는 없어도 OK!
};

console.log("상품:", product);

// 3. 읽기 전용 속성 (readonly)
const config: {
  readonly apiUrl: string;
  timeout: number;
} = {
  apiUrl: "https://api.example.com",
  timeout: 3000
};

console.log("설정:", config);
// config.apiUrl = "다른 주소"; // X 에러! 읽기 전용이라 변경 불가

// 4. 객체 배열 (실무에서 정말 많이 씀!)
const users: { name: string; age: number }[] = [
  { name: "김자바", age: 25},
  { name: "이코딩", age: 28},
  { name: "박장고", age: 30}
];

console.log("\n=== 사용자 목록 ===");
users.forEach(user => {
  console.log(`${user.name}님은 ${user.age}세입니다.`);
})

// 5. 실무 예시: 상품 목록 필터링
const products: { name: string; price:number; inStock: boolean }[] = [
  {name: "키보드", price: 50000, inStock: true},
  {name: "마우스", price: 30000, inStock: false},
  {name: "모니터", price: 300000, inStock: true}
];

// 재고가 있는 상품만 필터링
const availableProducts = products.filter(p => p.inStock);
console.log("\n=== 재고 있는 상품 ===");
availableProducts.forEach(p => {
  console.log(`${p.name} - ${p.price}`);
});