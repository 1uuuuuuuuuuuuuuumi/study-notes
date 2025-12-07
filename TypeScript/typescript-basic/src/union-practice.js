"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. 기본 Union 타입
let id;
id = "user-123"; // OK
console.log("문자열 ID:", id);
id = 12345; // OK
console.log("숫자 ID:", id);
// id = true; // (X) 에러! boolean은 안 됨
// 2. 함수 매개변수에 Union 타입
function printId(id) {
    console.log("전달받은 ID:", id);
}
printId("abc-123"); // (O)
printId(999); // (O)
// printId(true);   // (X)
// 3. 타입 좁히기 (Type Narrowing)
function formatId(id) {
    // typeof로 타입 체크!
    if (typeof id === "string") {
        //여기서는 id가 string
        return id.toUpperCase();
    }
    else {
        // 여기서는 id가 number
        return `ID-${id}`;
    }
}
console.log(formatId("abc")); // "ABC"
console.log(formatId(123)); // "ID-123"
// 4. 배열과 Union
const mixedArray = [1, "hello", 2, "world"];
console.log("혼합 배열:", mixedArray);
function handleStatus(status) {
    if (status === "pending") {
        console.log("⏳ 처리 중...");
    }
    else if (status === "success") {
        console.log("✅ 성공!");
    }
    else {
        console.log("❌ 에러 발생!");
    }
}
handleStatus("pending");
handleStatus("success");
function processResponse(response) {
    if (response.status === "success") {
        console.log("데이터:", response.data);
    }
    else {
        console.log("에러:", response.error);
    }
}
processResponse({ status: "success", data: "사용자 정보" });
processResponse({ status: "error", error: "서버 오류" });
// 7. null과 undefined
function greet(name) {
    if (name) {
        console.log(`안녕하세요, ${name}님!`);
    }
    else {
        console.log("안녕하세요, 손님!");
    }
}
greet("김자바");
greet(null);
greet(undefined);
//# sourceMappingURL=union-practice.js.map