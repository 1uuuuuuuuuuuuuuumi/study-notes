"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 이제 User 타입을 재사용할 수 있음!
const user1 = {
    name: "호빵맨",
    age: 10
};
const user2 = {
    name: "세균맨",
    age: 11
};
console.log("사용자1:", user1);
console.log("사용자2:", user2);
const product1 = {
    id: 1,
    name: "키보드",
    price: 50000,
    description: "기계식 키보드"
};
const product2 = {
    id: 2,
    name: "마우스",
    price: 30000
    // description 없어도 OK!
};
console.log("\n상품1:", product1);
console.log("상품2:", product2);
const config = {
    apiUrl: "http://api.example.com",
    apiKey: "secret-key-123",
    timeout: 3000
};
console.log("\n설정:", config);
const calc = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
console.log("\n5 + 3 =", calc.add(5, 3));
console.log("10 - 4 =", calc.subtract(10, 4));
const posts = [
    {
        id: 1,
        title: "TypeScript 배우는 중!",
        content: "오늘 Interface를 배웠따.",
        author: "ㄹㅁ대장",
        createdAt: "2025-12-06",
        likes: 10,
        isPublished: true
    },
    {
        id: 2,
        title: "React 공부 시작",
        content: "다음은 React를 배울것!",
        author: "앙빵망",
        createdAt: "2025-12-07",
        likes: 5,
        isPublished: false
    }
];
console.log("\n=== 게시글 목록 ===");
posts.forEach(post => {
    const status = post.isPublished ? "공개" : "비공개";
    console.log(`[${status}]${post.title} - 좋아요 ${post.likes}개`);
});
// 공개된 게시글만 필터링
const publishedPosts = posts.filter(post => post.isPublished);
console.log("\n공개된 게시글 수:", publishedPosts.length);
const myDog = {
    name: "뽀삐",
    age: 3,
    breed: "비숑",
    bark: () => console.log("멍멍!")
};
console.log("\n내 강아지:", myDog.name, myDog.breed);
myDog.bark();
//# sourceMappingURL=interface-practice.js.map