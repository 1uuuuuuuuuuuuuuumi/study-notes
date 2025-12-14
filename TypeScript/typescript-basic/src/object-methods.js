"use strict";
// Day 6 Part 2: 객체 메서드
// Object.key, Object.values, Object.entries, 구조 분해
Object.defineProperty(exports, "__esModule", { value: true });
console.log("🚀 객체 메서드 학습 시작!\n");
console.log("=".repeat(50));
// ===== 1. Object.keys() - 키 배열 =====
console.log("\n📍 1. Object.keys() - 객체의 키들");
console.log("=".repeat(50));
const user = {
    id: 1,
    name: "김자바",
    email: "java@example.com",
    age: 25
};
const keys = Object.keys(user);
console.log("사용자 객체:", user);
console.log("키 배열:", keys);
// 실무 예제 1: 모든 속성 순회
console.log("\n모든 속성 출력:");
Object.keys(user).forEach(key => {
    console.log(` ${key}: ${user[key]}`);
});
// 실무 예제 2: 속성 개수 확인
console.log("\n속성 개수:", Object.keys(user).length);
// =====2. Object.values() - 값 배열 =====
console.log("\n\n📍 2. Object.values() - 객체의 값들");
console.log("=".repeat(50));
const values = Object.values(user);
console.log("사용자 객체:", user);
console.log("값 배열:", values);
// 실무 예제 1: 점수 합계
const scores = {
    korean: 90,
    english: 85,
    math: 95
};
const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
const average = total / Object.values(scores).length;
console.log("\n점수:", scores);
console.log("총점:", total);
console.log("평균:", average.toFixed(1));
// 실무 예제 2: 모든 값이 조건을 만족하는지
const allPassed = Object.values(scores).every(score => score >= 60);
console.log("모든 과목 통과?", allPassed);
// ===== 3. Object.entries() - [키, 값] 배열 =====
console.log("\n\n📍 3. Object.entries() - 키-값 쌍 배열");
console.log("=".repeat(50));
const entries = Object.entries(user);
console.log("사용자 객체:", user);
console.log("엔트리 배열:", entries);
// 실무 예제 1: 객체를 맵으로 순회
console.log("\n키-값 쌍 출력");
Object.entries(user).forEach(([keys, value]) => {
    console.log(` ${keys} → ${value}`);
});
// 실무 예제 2: 객체 필터링
const product = {
    name: "노트북",
    price: 1500000,
    stock: 10,
    description: "고성능 노트북",
    discount: 0
};
// 0이 아닌 값만 추출
const nonZeroEntries = Object.entries(product)
    .filter(([keys, value]) => value !== 0);
const filtered = Object.fromEntries(nonZeroEntries);
console.log("\n원본:", product);
console.log("0 제외:", filtered);
const users = [
    { id: 1, name: "김자바", email: "java@ex.com" },
    { id: 2, name: "이파이썬", email: "python@ex.com" }
];
// 배열 → 객체 (id를 키로)
const userMap = Object.fromEntries(users.map(user => [user.id, user]));
console.log("\n사용자 배열:", users);
console.log("사용자 맵:", userMap);
console.log("ID 1 사용자:", userMap[1]);
// ===== 4. Object.assign() - 객체 병합 =====
console.log("\n\n📍 4. Object.assign() - 객체 병합");
console.log("=".repeat(50));
const defaults = {
    theme: "light",
    language: "ko",
    notifications: true
};
const userSettings = {
    theme: "dark",
    fontSize: 14
};
// 병합 (나중 것이 우선)
const settings = Object.assign({}, defaults, userSettings);
console.log("기본 설정:", defaults);
console.log("사용자 설정:", userSettings);
console.log("최종 설정:", settings);
// ===== 5. 스프레드 연산자 - 실무 필수! =====
console.log("\n\n📍 5. 스프레드 연산자 (...) - 더 좋은 방법");
console.log("=".repeat(50));
// 객체 복사
const original = { a: 1, b: 2, c: 3 };
const copied = { ...original };
console.log("원본:", original);
console.log("복사:", copied);
// 객체 병합
const merged = { ...defaults, ...userSettings };
console.log("\n병합 (스프레드):", merged);
// 실무 예제 1: 속성 추가/수정
const baseProduct = {
    id: 1,
    name: "상품명",
    price: 10000
};
const updatedProduct = {
    ...baseProduct,
    price: 9000, // 가격 수정
    stock: 50 // 재고 추가
};
console.log("\n기본 상품:", baseProduct);
console.log("업데이트:", updatedProduct);
const todos = [
    { id: 1, text: "공부하기", completed: false },
    { id: 2, text: "운동하기", completed: false }
];
// ID 1의 todo를 완료 처리 (불변성 유지)
const updatedTodos = todos.map(todo => todo.id === 1
    ? { ...todo, completed: true } // 새 객체 생성
    : todo);
console.log("\n원본 todos:", todos);
console.log("업데이트 todos:", updatedTodos);
console.log("원본 변경 안 됨:", todos[0]?.completed);
// ===== 6. 구조 분해 할당 - 실무 필수! =====
console.log("\n\n📍 6. 구조 분해 할당 - 간결한 코드");
console.log("=".repeat(50));
// 기본 구조 분해
const person = {
    name: "김자바",
    age: 25,
    city: "서울"
};
const { name, age, city } = person;
console.log("이름:", name);
console.log("나이:", age);
console.log("도시:", city);
// 변수명 변경
const { name: userName, age: userAge } = person;
console.log("\n변수명 변경:", userName, userAge);
// 기본값 설정
const { country = "한국" } = person;
console.log("국가:", country);
// 나머지 속성
const { name: n, ...rest } = person;
console.log("\n나머지:", rest);
// 실무 예제 1: 함수 매개변수
function printUser({ name, email }) {
    console.log(`${name} (${email})`);
}
console.log("\n함수에서 사용:");
printUser({ name: "김자바", email: "java@ex.com" });
const response = {
    status: 200,
    data: { id: 1, title: "게시글" },
    message: "성공"
};
const { status, data: { id, title }, message } = response;
console.log("\nAPI 응답 파싱:");
console.log(`상태: ${status}, ID: ${id}, 제목: ${title}`);
// ===== 7. 중첩 구조 분해 =====
console.log("\n\n📍 7. 중첩 구조 분해");
console.log("=".repeat(50));
const company = {
    name: "테크컴퍼니",
    address: {
        city: "서울",
        district: "강남구",
        detail: "테헤란로 123"
    },
    employees: 100
};
const { name: companyName, address: { city: companyCity, district } } = company;
console.log("회사:", companyName);
console.log("위치:", companyCity, district);
// ===== 8. 배열 구조 분해 =====
console.log("\n\n📍 8. 배열 구조 분해");
console.log("=".repeat(50));
const colors = ["red", "green", "blue", "yellow"];
const [first, second, ...others] = colors;
console.log("첫 번째:", first);
console.log("두 번째:", second);
console.log("나머지:", others);
// 실무 예제: 값 교환
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log("\n교환 후:", `a=${a}, b=${b}`);
// ===== 9. 실무 종합 예제 =====
console.log("\n\n📍 9. 실무 종합 예제 - 데이터 변환");
console.log("=".repeat(50));
const rawData = [
    {
        user_id: 1,
        user_name: "김자바",
        user_email: "java@ex.com",
        created_at: "2025-12-01"
    },
    {
        user_id: 2,
        user_name: "이파이썬",
        user_email: "python@ex.com",
        created_at: "2025-12-03"
    }
];
const formatted = rawData.map(data => ({
    id: data.user_id,
    name: data.user_name,
    email: data.user_email,
    joinDate: data.created_at
}));
console.log("원본 데이터:", rawData[0]);
console.log("변환된 데이터:", formatted[0]);
// ===== 10. 객체 유틸리티 함수 =====
console.log("\n\n📍 10. 실무 유틸리티 함수들");
console.log("=".repeat(50));
// 빈 객체 체크
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
console.log("빈 객체?", isEmpty({}));
console.log("빈 객체?", isEmpty({ a: 1 }));
// 객체 키 개수
function getPropertyCount(obj) {
    return Object.keys(obj).length;
}
console.log("\n속성 개수:", getPropertyCount(user));
// 특정 키만 추출
function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}
const fullUser = {
    id: 1,
    name: "김자바",
    email: "java@ex.com",
    password: "secret",
    age: 25
};
const publicInfo = pick(fullUser, ["id", "name", "email"]);
console.log("\n전체 정보:", fullUser);
console.log("공개 정보:", publicInfo);
// 특정 키 제외
function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
const safeUser = omit(fullUser, ["password"]);
console.log("\n안전한 정보:", safeUser);
console.log("\n\n✅ 객체 메서드 학습 완료!");
console.log("=".repeat(50));
//# sourceMappingURL=object-methods.js.map