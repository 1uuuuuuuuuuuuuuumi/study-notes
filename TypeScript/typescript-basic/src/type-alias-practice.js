"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let id1 = "user-123";
let id2 = 456;
console.log("ID 1:", id1);
console.log("ID 2:", id2);
const user1 = {
    id: 1,
    name: "김자바",
    email: "java@hello.com",
    age: 25
};
const user2 = {
    id: 2,
    name: "이코딩",
    email: "lee@coding.com"
    // age 없어도 OK!
};
console.log("\n사용자1:", user1);
console.log("사용자1:", user2);
// 둘 다 똑같이 작동!
const product1 = { id: 1, name: "키보드", price: 50000 };
const product2 = { id: 2, name: "마우스", price: 30000 };
function handleStatus(status) {
    console.log(`\n현재 상태: ${status}`);
}
handleStatus("loading");
handleStatus("success");
const circle = {
    id: 1,
    center: { x: 10, y: 20 },
    color: "red"
};
console.log("\n도형:", circle);
console.log("중심점:", `(${circle.center.x}, ${circle.center.y})`);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
console.log("\n5 + 3 =", add(5, 3));
console.log("10 - 4 =", subtract(10, 4));
console.log("6 x 7 =", multiply(6, 7));
function handleApiResponse(response) {
    console.log("\n=== API 응답 처리 ===");
    if (response.status === "success") {
        console.log("✅", response.message);
        console.log("데이터:", response.data);
    }
    else {
        console.log("❌ 에러:", response.error);
        console.log("에러 코드:", response.code);
    }
}
handleApiResponse({
    status: "success",
    data: { userId: 1, name: "김자바" },
    message: "사용자 정보 조회 성공"
});
handleApiResponse({
    status: "error",
    error: "서버 연결 실패",
    code: 500
});
const post = {
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
//# sourceMappingURL=type-alias-practice.js.map