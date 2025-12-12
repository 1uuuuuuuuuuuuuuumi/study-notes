"use strict";
// Day 5 Part 2: 찾기, 검사, 정렬 메서드
// find, some, every, includes, sort 완전 정복
Object.defineProperty(exports, "__esModule", { value: true });
console.log("🚀 JavaScript 배열 메서드 Part 2 시작!\n");
console.log("=".repeat(50));
// ===== 1. find() & findIndex() - 특정 요소 찾기 =====
console.log("\n📍 1. find() & findIndex() - 요소 찾기");
console.log("=".repeat(50));
// 기본 사용법
const numbers = [10, 20, 30, 40, 50];
// 첫 번째로 30보다 큰 수 찾기
const found = numbers.find(num => num > 30);
const foundIndex = numbers.findIndex(num => num > 30);
console.log("배열:", numbers);
console.log("30보다 큰 첫 번째 수:", found);
console.log("그 수의 인덱스:", foundIndex);
const users = [
    { id: 1, name: "김자바", email: "java@ex.com", age: 25 },
    { id: 2, name: "김개발", email: "kim@ex.com", age: 28 },
    { id: 3, name: "이코딩", email: "lee@ex.com", age: 30 }
];
const user = users.find(u => u.id === 2);
console.log("\nID가 2인 사용자:", user);
// 실무 예제 2: 이름으로 검색
const searchName = "김개발";
const foundUser = users.find(u => u.name === searchName);
console.log(`"${searchName}" 검색:`, foundUser);
// 없으면 undefined
const notFound = users.find(u => u.id === 999);
console.log("\nID 999 검색:", notFound); //undefined
// 실무 예제 3: 이메일 중복 체크
function isEmailTaken(email, users) {
    return users.find(u => u.email === email) !== undefined;
}
console.log("\njava@ex.com 중복 ?", isEmailTaken("java@ex.com", users));
console.log("new@ex.com 중복 ?", isEmailTaken("new@ex.com", users));
// ===== 2. some() & every() - 조건 검사 =====
console.log("\n\n📍 2. some() & every() - 조건 검사");
console.log("=".repeat(50));
// some(): 하나라도 조건을 만족하면 true
const numbers2 = [1, 2, 3, 4, 5];
const hasEven = numbers2.some(num => num % 2 === 0);
const hasNegative = numbers2.some(num => num < 0);
console.log("배열:", numbers2);
console.log("짝수가 하나라도 있나?", hasEven); // true
console.log("음수가 하나라도 있나?", hasNegative); // false
// every(): 모두 조건을 만족해야 true
const allPositive = numbers2.every(num => num > 0);
const allEven = numbers2.every(num => num % 2 === 0);
console.log("\n모두 양수인가?", allPositive); // true
console.log("모두 짝수인가?", allEven); // false
const permissions = [
    { userId: 1, canRead: true, canWrite: true, canDelete: false },
    { userId: 2, canRead: true, canWrite: false, canDelete: false },
    { userId: 3, canRead: true, canWrite: true, canDelete: true }
];
// 최소 한명이라도 삭제 권한이 있나?
const hasDeletePermission = permissions.some(p => p.canDelete);
console.log("\n삭제 권한 있는 사람이 있나?", hasDeletePermission);
// 모두 읽기 권한이 있나?
const allCanRead = permissions.every(e => e.canRead);
console.log("모두 읽기 권한이 있나?", allCanRead);
const formFields = [
    { name: "이름", value: "김자바", isValid: true },
    { name: "이메일", value: "java@ex.com", isValid: true },
    { name: "비밀번호", value: "123", isValid: false }
];
const isFormValid = formFields.every(field => field.isValid);
console.log("\n폼이 유효한가?", isFormValid);
const invalidFields = formFields.filter(field => !field.isValid);
console.log("유효하지 않은 필드:", invalidFields.map(f => f.name));
// ===== 3. includes() - 포함 여부 확인 =====
console.log("\n\n📍 3. includes() - 배열에 값이 있는지");
console.log("=".repeat(50));
const fruits = ["사과", "바나나", "오렌지", "포도"];
console.log("과일:", fruits);
console.log("사과가 있나?", fruits.includes("사과"));
console.log("딸기가 있나?", fruits.includes("딸기"));
const userRoles = ["editor", "viewer"];
function hasRole(role, roles) {
    return roles.includes(role);
}
console.log("\nadmin 역할이 있나?", hasRole("admin", userRoles));
console.log("editor 역할이 있나?", hasRole("editor", userRoles));
// 실무 예제 2: 허용된 확장자 체크
const allowedExtensions = [".jpg", ".png", ".gif", ".webp"];
const fileName = "profile.jpg";
const fileExt = fileName.substring(fileName.lastIndexOf("."));
console.log("\n파일 확장자:", fileExt);
console.log("허용된 확장자인가?", allowedExtensions.includes(fileExt));
// ===== 4. sort() - 정렬하기 =====
console.log("\n\n📍 4. sort() - 배열 정렬");
console.log("=".repeat(50));
// 주의: sort()는 원본 배열을 변경함!
// 숫자 정렬 (오름차순)
const nums1 = [5, 2, 8, 1, 9, 3];
const sortedAsc = [...nums1].sort((a, b) => a - b);
console.log("원본:", nums1);
console.log("오름차순:", sortedAsc);
// 숫자 정렬 (내림차순)
const sortedDesc = [...nums1].sort((a, b) => b - a);
console.log("내림차순:", sortedDesc);
// 문자열 정렬
const names = ["이코딩", "김자바", "박장고", "김개발"];
const sortedNames = [...names].sort();
console.log("\n이름 원본:", names);
console.log("가나다순:", sortedNames);
const products = [
    { name: "키보드", price: 50000, stock: 10 },
    { name: "마우스", price: 30000, stock: 20 },
    { name: "모니터", price: 300000, stock: 5 },
    { name: "웹캠", price: 80000, stock: 15 }
];
// 가격 낮은 순
const byPriceAsc = [...products].sort((a, b) => a.price - b.price);
console.log("\n가격 낮은 순:");
byPriceAsc.forEach(p => console.log(` ${p.name}: ${p.price.toLocaleString()}원`));
// 가격 높은 순
const byPriceDesc = [...products].sort((a, b) => b.price - a.price);
console.log("\n가격 높은 순:");
byPriceDesc.forEach(p => console.log(`  ${p.name}: ${p.price.toLocaleString()}원`));
// 재고 많은 순
const byStock = [...products].sort((a, b) => b.stock - a.stock);
console.log("\n재고 많은 순");
byStock.forEach(p => console.log(`  ${p.name}: ${p.stock}개`));
const posts = [
    { id: 1, title: "첫 게시글", date: "2025-12-10" },
    { id: 2, title: "두 번째 글", date: "2025-12-08" },
    { id: 3, title: "세 번째 글", date: "2025-12-12" }
];
// 최신순 (날짜 내림차순)
const byDateDesc = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
console.log("\n최신순:");
byDateDesc.forEach(p => console.log(` ${p.date} - ${p.title}`));
// 오래된 순
const byDateAsc = [...posts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
console.log("\n오래된 순:");
byDateAsc.forEach(p => console.log(`  ${p.date} - ${p.title}`));
// ===== 5. 실무 종합 예제 =====
console.log("\n\n📍 5. 실무 종합 예제 - 상품 관리 시스템");
console.log("=".repeat(50));
const shopProducts = [
    { id: 1, name: "무선 키보드", category: "IT", price: 50000, stock: 10, rating: 4.5 },
    { id: 2, name: "게이밍 마우스", category: "IT", price: 80000, stock: 0, rating: 4.8 },
    { id: 3, name: "USB 허브", category: "IT", price: 25000, stock: 30, rating: 4.2 },
    { id: 4, name: "모니터 암", category: "액세서리", price: 45000, stock: 5, rating: 4.6 },
    { id: 5, name: "노트북 거치대", category: "액세서리", price: 35000, stock: 15, rating: 4.3 }
];
// 1. 특정 ID 상품 찾기
const product = shopProducts.find(p => p.id === 3);
console.log("\nID 3 상품:", product?.name);
// 2. 재고 있는 상품만
const inStock = shopProducts.filter(p => p.stock > 0);
console.log("\n재고 있는 상품 수:", inStock.length);
// 3. 모든 상품이 평점 4.0 이상인가?
const allHighRated = shopProducts.every(p => p.rating >= 4.0);
console.log("모두 평점 4.0 이상?", allHighRated);
// 4. 품절 상품이 있나?
const hasSoldOut = shopProducts.some(p => p.stock === 0);
console.log("품절 상품 있나?", hasSoldOut);
// 5. IT 카테고리에 특정 상품이 있나?
const itProducts = shopProducts
    .filter(p => p.category === "IT")
    .map(p => p.name);
console.log("\nIT 상품들", itProducts);
console.log("게이밍 마우스가 IT에 있나?", itProducts.includes("게이밍 마우스"));
// 6. 평점 높은 순으로 정렬
const topRated = [...shopProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3); // 상위 3개만
console.log("\n평점 Top 3:");
topRated.forEach((p, i) => {
    console.log(` ${i + 1}. ${p.name} (⭐ ${p.rating})`);
});
// 7. 카테고리별 평균 가격
const categories = [...new Set(shopProducts.map(p => p.category))];
console.log("\n카테고리별 평균 가격:");
categories.forEach(category => {
    const categoryProducts = shopProducts.filter(p => p.category === category);
    const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
    console.log(` ${category}: ${Math.round(avgPrice).toLocaleString()}원`);
});
// 8. 가격대별 상품 찾기
function findProductsByPriceRange(min, max) {
    return shopProducts.filter(p => p.price >= min && p.price <= max);
}
const midRange = findProductsByPriceRange(30000, 60000);
console.log("\n3만원~6만원 상품:");
midRange.forEach(p => console.log(` ${p.name}: ${p.price.toLocaleString()}원`));
console.log("\n\n✅ Day 5 Part 2 학습 완료!");
console.log("=".repeat(50));
//# sourceMappingURL=array-methods-2.js.map