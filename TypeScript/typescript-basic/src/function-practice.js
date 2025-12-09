"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. 기본 함수 타입 (복습)
function add(a, b) {
    return a + b;
}
console.log("5 + 3 =", add(5, 3));
// 2. 선택적 매개변수 (?)
function greet(name, greeting) {
    if (greeting) {
        return `${greeting}, ${name}님!`;
    }
    return `안녕하세요, ${name}님!`;
}
console.log("\n" + greet("김자바"));
console.log(greet("김자바", "좋은 아침"));
// 3. 기본 매개변수
function createUser(name, age = 20) {
    return `${name} (${age}세)`;
}
console.log("\n" + createUser("김개발"));
console.log(createUser("이코딩", 25));
// 4. 나머지 매개변수 (...rest)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("\nsum(1, 2, 3) =", sum(1, 2, 3));
console.log("sum(10, 20, 30, 40 =)", sum(10, 20, 30, 40));
// reduce 흐름 확인용
function sumWithLog(...numbers) {
    console.log("\n=== reduce 흐름 보기 ===");
    console.log("입력된 숫자들:", numbers);
    return numbers.reduce((total, num, index) => {
        const result = total + num;
        console.log(`${index + 1}단계: ${total} + ${num} = ${result}`);
        return result;
    }, 0);
}
console.log("최종 결과:", sumWithLog(1, 2, 3, 4, 5));
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
console.log("\n6 x 7 =", multiply(6, 7));
console.log("20 ÷ 4 =", divide(20, 4));
// 6. void 타입 (반환값 없음)
function logMessage(message) {
    console.log(`[LOG] ${message}`);
    // return 없음!
}
logMessage("\n로그 메시지 출력 테스트");
// 7. never 타입 (절대 반환 안 함)
function throwError(message) {
    throw new Error(message);
}
// 무한 루프도 never
function infiniteLoop() {
    while (true) {
        // 무한 반복
    }
}
// 8. 콜백 함수 타입
function processArray(arr, callback) {
    return arr.map(callback);
}
const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (n) => n * 2);
const squared = processArray(numbers, (n) => n * n);
console.log("\n원본:", numbers);
console.log("2배:", doubled);
console.log("제곱:", squared);
function filter(arr, FilterFunc) {
    return arr.filter(FilterFunc);
}
const ages = [15, 20, 25, 30, 35];
const adults = filter(ages, (age) => age >= 20);
console.log("\n나이 목록:", ages);
console.log("성인만:", adults);
function fetchData(url, onSuccess, onError) {
    console.log(`\n${url}에서 데이터 가져오는 중...`);
    // 실제로는 fetch를 사용하지만 시뮬레이션
    const success = Math.random() > 0.3;
    if (success) {
        onSuccess({ userId: 1, name: "김자바" });
    }
    else {
        onError("서버 연결 실패");
    }
}
fetchData("https://api.example.com/user", (data) => console.log("✅ 성공:", data), (error) => console.log("❌ 에러:", error));
// 11. Promise와 async/await 타입
async function fetchUserData(userId) {
    // 실제로는 API 호출
    return `사용자 ${userId}의 데이터`;
}
async function main() {
    console.log("\n=== Promise 예제 ===");
    const data = await fetchUserData(1);
    console.log(data);
}
main();
// 12. 타입 가드 함수
function isString(value) {
    return typeof value === "string";
}
function processValue(value) {
    if (isString(value)) {
        console.log("문자열:", value.toUpperCase());
    }
    else {
        console.log("숫자:", value.toFixed(2));
    }
}
console.log("\n=== 타입 가드 ===");
processValue("hello");
processValue(3.14159);
function validateEmail(email) {
    return email.includes("@");
}
function validateAge(age) {
    return age >= 0 && age <= 150;
}
function validate(value, validator) {
    if (validator(value)) {
        return "✅ 유효함";
    }
    return "❌ 유효하지 않음";
}
console.log("\n=== 유효성 검사 ===");
console.log("이메일:", validate("1umi@example.com", validateEmail));
console.log("이메일:", validate("잘못된이메일", validateEmail));
console.log("나이:", validate(25, validateAge));
console.log("나이:", validate(200, validateAge));
//# sourceMappingURL=function-practice.js.map