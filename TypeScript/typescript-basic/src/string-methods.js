"use strict";
// Day 6 Part 1: 문자열 메서드 마스터
// 실무에서 정말 많이 쓰는 문자열 처리
Object.defineProperty(exports, "__esModule", { value: true });
console.log("🚀 문자열 메서드 학습 시작!\n");
console.log("=".repeat(50));
// ===== 1. split() & join() - 나누기와 합치기 =====
console.log("\n📍 1. split() & join() - 문자열 ↔ 배열");
console.log("=".repeat(50));
// split: 문자열 → 배열
const sentence = "JavaScript는 정말 재미있어요";
const words = sentence.split(" ");
console.log("원본:", sentence);
console.log("단어 배열:", words);
// join: 배열 → 문자열
const joined = words.join("-");
console.log("다시 합치기:", joined);
// 실무 예제 1: CSV 파싱
const csvLine = "김자바,25,서울,개발자";
const data = csvLine.split(",");
console.log("\nCSV 데이터:", csvLine);
console.log("파싱 결과:", data);
console.log(`이름: ${data[0]}, 나이: ${data[1]}, 지역: ${data[2]}`);
// 실무 예제 2: 경로 처리
const filePath = "/users/documents/report.pdf";
const parts = filePath.split("/");
const fileName = parts[parts.length - 1];
console.log("\n파일 경로:", filePath);
console.log("파일명:", fileName);
// 실무 예제 3: 태그 처리
const tags = ["TypeScript", "React", "JavaScript"];
const tagString = tags.join(", ");
console.log("\n태그 배열:", tags);
console.log("태그 문자열:", tagString);
// ===== 2. trim(), trimStart(), trimEnd() - 공백 제거 =====
console.log("\n\n📍 2. trim() - 공백 제거");
console.log("=".repeat(50));
const messy = " JavaScript  ";
console.log("원본:", `"${messy}"`);
console.log("trim():", `"${messy.trim()}"`);
console.log("trimStart():", `"${messy.trimStart()}"`);
console.log("trimEnd():", `"${messy.trimEnd()}"`);
// 실무 예제: 사용자 입력 처리
const userInput = " user@example.com  ";
const cleanEmail = userInput.trim().toLowerCase();
console.log("\n사용자 입력:", `"${userInput}"`);
console.log("정리된 이메일:", cleanEmail);
// ===== 3. toUpperCase() & toLowerCase() - 대소문자 변환 =====
console.log("\n\n📍 3. 대소문자 변환");
console.log("=".repeat(50));
const text = "JavaScript";
console.log("원본:", text);
console.log("대문자:", text.toUpperCase());
console.log("소문자:", text.toLowerCase());
// 실무 예제: 대소문자 구분 없는 비교
function compareIgnoreCase(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}
console.log("\n'JavaScript' === 'Javascript':", compareIgnoreCase("JavaScript", "javascript"));
// ===== 4. includes(), startsWith(), endsWith() - 포함 검사 =====
console.log("\n\n📍 4. 문자열 포함 검사");
console.log("=".repeat(50));
const email = "user@example.com";
console.log("이메일:", email);
console.log("@가 포함되어 있나?", email.includes("@"));
console.log("user로 시작하나?", email.startsWith("user"));
console.log(".com으로 끝나나?", email.endsWith(".com"));
// 실무 예제: 파일 확장자 체크
function isImageFile(fileName) {
    const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    return imageExts.some(ext => fileName.toLowerCase().endsWith(ext));
}
console.log("\nprofile.jpg는 이미지?", isImageFile("profile.jpg"));
console.log("document.pdf는 이미지?", isImageFile("document.pdf"));
// ===== 5. slice(), substring() - 문자열 자르기 =====
console.log("\n\n📍 5. 문자열 자르기");
console.log("=".repeat(50));
const fullText = "JavaScript Programming";
console.log("원본:", fullText);
console.log("slice(0, 10):", fullText.slice(0, 10));
console.log("slice(11):", fullText.slice(11));
console.log("slice(-11):", fullText.slice(-11)); // 뒤에서부터
// 실무 예제: 미리보기 텍스트
function getPreview(text, maxLength = 50) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength) + "...";
}
const longText = "TypeScript는 JavaScript에 타입을 추가한 언어로, 대규모 애플리케이션 개발에 적합합니다.";
console.log("\n원문:", longText);
console.log("미리보기:", getPreview(longText, 30));
// ===== 6. replace(), replaceAll() - 문자열 치환 =====
console.log("\n\n📍 6. 문자열 치환");
console.log("=".repeat(50));
const original = "JavaScript is great. JavaScript is fun.";
console.log("원본:", original);
console.log("replace():", original.replace("JavaScript", "TypeScript"));
console.log("replaceAll():", original.replaceAll("JavaScript", "TypeScript"));
// 실무 예제: 템플릿 문자열
function fillTemplate(template, data) {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
        result = result.replaceAll(`{${key}}`, value);
    }
    return result;
}
const emailTemplate = "안녕하세요 {name}님, {product} 주문이 완료되었습니다.";
const filled = fillTemplate(emailTemplate, {
    name: "김자바",
    product: "노트북"
});
console.log("\n템플릿:", emailTemplate);
console.log("결과:", filled);
// ===== 7. indexOf(), lastIndexOf() - 위치 찾기 =====
console.log("\n\n📍 7. 문자열 위치 찾기");
console.log("=".repeat(50));
const path = "/home/user/documents/report.pdf";
console.log("경로:", path);
console.log("첫 번째 /의 위치:", path.indexOf("/"));
console.log("마지막 /의 위치:", path.lastIndexOf("/"));
console.log("마지막 .의 위치:", path.lastIndexOf("."));
// 실무 예제: 파일명과 확장자 분리
function getFileInfo(filePath) {
    const lastSlash = filePath.lastIndexOf("/");
    const lastDot = filePath.lastIndexOf(".");
    return {
        directory: filePath.slice(0, lastSlash),
        fileName: filePath.slice(lastSlash + 1, lastDot),
        extension: filePath.slice(lastDot)
    };
}
const fileInfo = getFileInfo(path);
console.log("\n파일 정보:", fileInfo);
// ===== 8. padStart(), padEnd() - 패딩 =====
console.log("\n\n📍 8. 문자열 패딩");
console.log("=".repeat(50));
const num = "42";
console.log("원본:", num);
console.log("padStart(5, '0'):", num.padStart(5, "0"));
console.log("padEnd(5, 0):", num.padEnd(5, "0"));
// 실무 예제: 시간 포맷팅
function formatTime(hours, minutes, seconds) {
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    return `${h}:${m}:${s}`;
}
console.log("\n시간 포맷:", formatTime(9, 5, 3));
console.log("시간 포맷:", formatTime(14, 30, 45));
// ===== 9. repeat() - 문자열 반복 =====
console.log("\n\n📍 9. 문자열 반복");
console.log("=".repeat(50));
console.log("=".repeat(30));
console.log("*".repeat(20));
console.log("- ".repeat(10));
// 실무 예제: 별점 표시
function showRating(rating, maxRating = 5) {
    const filled = "★".repeat(Math.floor(rating));
    const empty = "☆".repeat(maxRating - Math.floor(rating));
    return filled + empty;
}
console.log("\n평점 4.5:", showRating(4.5));
console.log("평점 3.0:", showRating(3));
// ===== 10. 실무 종합 예제 =====
console.log("\n\n📍 10. 실무 종합 예제 - URL 파서");
console.log("=".repeat(50));
function parseURL(url) {
    // 프로토콜 추출
    const protocolEnd = url.indexOf("://");
    const protocol = url.slice(0, protocolEnd);
    // 나머지 부분
    const rest = url.slice(protocolEnd + 3);
    // 도메인과 경로 분리
    const pathStart = rest.indexOf("/");
    const domain = rest.slice(0, pathStart);
    const path = rest.slice(pathStart);
    // 쿼리 파라미터
    const queryStart = path.indexOf("?");
    const pathname = queryStart === -1 ? path : path.slice(0, queryStart);
    const query = queryStart === -1 ? "" : path.slice(queryStart + 1);
    // 쿼리 파싱
    const params = {};
    if (query) {
        query.split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            if (key && value) {
                params[key] = value;
            }
        });
    }
    return { protocol, domain, pathname, params };
}
const testURL = "https://example.com/api/users?page=2&limit=10";
const parsed = parseURL(testURL);
console.log("\nURL:", testURL);
console.log("파싱 결과:", parsed);
console.log("\n\n✅ 문자열 메서드 학습 완료!");
console.log("=".repeat(50));
//# sourceMappingURL=string-methods.js.map