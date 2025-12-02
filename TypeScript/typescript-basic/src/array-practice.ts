// 1. 문자열 배열
const fruits: string[] = ["사과", "바나나", "포도"];
console.log("과일 목록:", fruits);

// 2. 숫자 배열
const scores: number[] = [90, 85, 95, 88];
console.log("점수 목록:", scores);

// 3. 불린 배열
const answers: boolean[] = [true, false, true, true];

// 4. 배열 메서드 사용
const numbers: number[] = [1, 2, 3, 4, 5];

// map - 각 요소에 2를 곱하기
const doubled: number[] = numbers.map(num => num * 2);
console.log("2배한 값:", doubled);

// filter - 3보다 큰 수만 필터링
const filtered: number[] = numbers.filter(num => num > 3);
console.log("3보다 큰 수:", filtered);

// 5. 실무 예시: 사용자 이름 목록
const userNames: string[] = ["김자바", "이코딩", "박장고"];

// 각 이름에 "님" 붙이기
const greetings: string[] = userNames.map(name => `${name}님 안녕하세요!`);
console.log(greetings);