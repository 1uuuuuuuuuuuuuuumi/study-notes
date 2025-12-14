"use strict";
// Day 6 Part 3: Promise & async/await
// 비동기 처리 완전 정복
Object.defineProperty(exports, "__esModule", { value: true });
console.log("🚀 비동기 처리 학습 시작!\n");
console.log("=".repeat(50));
// ===== 1. 동기 vs 비동기 이해 =====
console.log("\n📍 1. 동기 vs 비동기");
console.log("=".repeat(50));
// 동기 (Synchronous): 순서대로 실행
console.log("1. 첫 번째");
console.log("2. 두 번째");
console.log("3. 세 번째");
// 비동기 (Asynchronous): 순서 보장 안 됨
console.log("\n비동기 예시:");
console.log("A. 시작");
setTimeout(() => {
    console.log("B. 2초 후 실행");
}, 2000);
console.log("C. 끝");
// 출력: A → C → (2초 후) B
// ===== 2. Promise 기초 =====
console.log("\n\n📍 2. Promise - 미래의 값");
console.log("=".repeat(50));
// Promise 만들기
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
console.log("Promise 시작");
delay(1000).then(() => {
    console.log("1초 후 실행!");
});
// ===== 3. async/await - 더 쉬운 방법! =====
console.log("\n\n📍 3. async/await - 동기처럼 보이는 비동기");
console.log("=".repeat(50));
async function example1() {
    console.log("예제 시작");
    await delay(1000);
    console.log("1초 대기 완료");
    await delay(1000);
    console.log("2초 대기 완료");
}
// example1();
// ===== 4. 실무 예제: 데이터 가져오기 =====
console.log("\n\n📍 4. 실무 예제 - 데이터 가져오기");
console.log("=".repeat(50));
// 가짜 API 함수
function fetchUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: `사용자${userId}`
            });
        }, 1000);
    });
}
async function getUserInfo() {
    console.log("사용자 정보 가져오는 중...");
    const user = await fetchUser(1);
    console.log("사용자 정보:", user);
}
// getUesrInfo();
// ===== 5. 에러 처리 =====
console.log("\n\n📍 5. 에러 처리 - try/catch");
console.log("=".repeat(50));
function fetchUserWithError(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId < 0) {
                reject(new Error("잘못된 사용자 ID"));
            }
            else {
                resolve({
                    id: userId,
                    name: `사용자${userId}`
                });
            }
        }, 1000);
    });
}
async function getUserSafely(userId) {
    try {
        console.log(`\n사용자 ${userId} 정보 가져오기...`);
    }
    catch (error) {
        console.log("에러:", error.message);
    }
}
// getUserSafely(1);   // 성공
// getUserSafely(-1);  // 에러
// ===== 6. 여러 개 동시에 - Promise.all =====
console.log("\n\n📍 6. Promise.all - 동시 실행");
console.log("=".repeat(50));
async function fetchMultipleUsers() {
    console.log("\n여러 사용자 정보 가져오기...");
    const users = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    console.log("모든 사용자:", users);
}
// fetchMultipleUsers();
// ===== 7. 순차 실행 vs 병렬 실행 =====
console.log("\n\n📍 7. 순차 vs 병렬");
console.log("=".repeat(50));
async function sequential() {
    console.log("\n순차 실행 시작");
    const start = Date.now();
    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    const user3 = await fetchUser(3);
    const end = Date.now();
    console.log(`순차 완료: ${end - start}ms`);
    console.log([user1, user2, user3]);
}
async function parallel() {
    console.log("\n병렬 실행 시작");
    const start = Date.now();
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    const end = Date.now();
    console.log(`병렬 완료: ${end - start}ms`);
    console.log([user1, user2, user3]);
}
// sequential();  // 약 3초
// parallel();    // 약 1초
// ===== 8. 실전 패턴 =====
console.log("\n\n📍 8. 실전 패턴");
console.log("=".repeat(50));
// 패턴 1: 로딩 상태 관리
async function loadDataWithStatus() {
    let isLoading = true;
    let error = null;
    let data = null;
    try {
        console.log("\n로딩 중...");
        data = await fetchUser(1);
        console.log("데이터:", data);
    }
    catch (err) {
        error = err.message;
        console.log("에러:", error);
    }
    finally {
        isLoading = false;
        console.log("로딩 완료");
    }
    return { isLoading, error, data };
}
// loadDataWithStatus();
// 패턴 2: 재시도 로직
async function fetchWithRetry(userId, maxRetries = 3) {
    let lastError = null;
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`시도 ${i + 1}/${maxRetries}`);
            return await fetchUserWithError(userId);
        }
        catch (error) {
            lastError = error;
            console.log(`실패: ${lastError.message}`);
            if (i < maxRetries - 1) {
                console.log("재시도 중...");
                await delay(1000);
            }
        }
    }
    throw lastError;
}
// fetchWithRetry(-1, 3);
// 패턴 3: 타임아웃
function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("시간 초과")), timeoutMs))
    ]);
}
async function fetchWithTimeout() {
    try {
        const user = await withTimeout(fetchUser(1), 500 // 0.5초 제한
        );
        console.log("성공:", user);
    }
    catch (error) {
        console.log("에러:", error.message);
    }
}
// fetchWithTimeout();
// ===== 9. 실무 종합 예제 =====
console.log("\n\n📍 9. 실무 종합 예제");
console.log("=".repeat(50));
// 가짜 API
function fetchPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "첫 게시글", userId: 1 },
                { id: 2, title: "두 번째 글", userId: 2 }
            ]);
        }, 1000);
    });
}
function fetchComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, postId, text: "댓글 1" },
                { id: 2, postId, text: "댓글 2" }
            ]);
        }, 500);
    });
}
async function loadBlogPage() {
    try {
        console.log("\n블로그 페이지 로딩...");
        // 1. 게시글 목록 가져오기
        const posts = await fetchPosts();
        console.log("게시글:", posts.length + "개");
        // 2. 각 게시글의 댓글 가져오기 (병렬)
        const commentsArrays = await Promise.all(posts.map(post => fetchComments(post.id)));
        // 3. 결과 조합
        const postsWithComments = posts.map((post, index) => ({
            ...post,
            comments: commentsArrays[index]
        }));
        console.log("\n완성된 데이터:");
        postsWithComments.forEach(post => {
            console.log(`${post.title} (댓글 ${post.comments?.length}개)`);
        });
        return postsWithComments;
    }
    catch (error) {
        console.log("로딩 실패:", error);
        throw error;
    }
}
// loadBlogPage();
// =====10. 메인 실행 =====
console.log("\n\n📍 10. 전체 데모 실행");
console.log("=".repeat(50));
async function main() {
    console.log("\n=== 데모 시작 ===\n");
    // 1. 기본 Promise
    console.log("1️⃣ Promise 기본");
    await delay(500);
    console.log("✅ 0.5초 대기 완료\n");
    // 2. 데이터 가져오기
    console.log("2️⃣ 데이터 가져오기");
    const user = await fetchUser(1);
    console.log("✅ 사용자:", user.name, "\n");
    // 3. 에러 처리
    console.log("3️⃣ 에러 처리");
    await getUserSafely(1);
    await getUserSafely(-1);
    // 4. 병렬 실행
    console.log("\n4️⃣ 병렬 실행");
    const users = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
    ]);
    console.log("✅ 사용자 3명:", users.map(u => u.name).join(", "), "\n");
    // 5. 실전 예제
    console.log("5️⃣ 블로그 페이지 로딩");
    await loadBlogPage();
    console.log("\n=== 데모 완료 ===");
}
// 실행!
main();
console.log("\n✅ async/await 학습 완료!");
console.log("=".repeat(50));
//# sourceMappingURL=async-methods.js.map