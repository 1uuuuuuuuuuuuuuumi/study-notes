// 첫 TypeScript 코드!
function greet(name: string): string {
  return `안녕하세요, ${name}님! TypeScript 세계에 오신 걸 환영합니다!`;
}

// 변수에 타입 지정
const userName: string = "호빵맨";
const age: number = 25;
const isLearning: boolean = true;

// 함수 실행
console.log(greet(userName));
console.log(`나이: ${age}`);
console.log(`학습 중: ${isLearning}`);

function addNumbers(a: number, b:number): number {
  return a + b;
}

console.log(`5 + 3 = ${addNumbers(5, 3)}`);

// 에러 테스트 1: 타입이 안 맞음
// addNumbers(5, "3");

// 에러 테스트 2: 매개변수 개수가 안 맞음
// addNumbers(5);

// 에러 테스트 3: 반환 타입이 안 맞음
// function test(): number {
//   return "문자열";
// }