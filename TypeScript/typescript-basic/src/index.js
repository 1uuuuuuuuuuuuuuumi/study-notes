"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 첫 TypeScript 코드!
function greet(name) {
    return `안녕하세요, ${name}님! TypeScript 세계에 오신 걸 환영합니다!`;
}
// 변수에 타입 지정
const userName = "호빵맨";
const age = 25;
const isLearning = true;
// 함수 실행
console.log(greet(userName));
console.log(`나이: ${age}`);
console.log(`학습 중: ${isLearning}`);
function addNumbers(a, b) {
    return a + b;
}
console.log(`5 + 3 = ${addNumbers(5, 3)}`);
//# sourceMappingURL=index.js.map