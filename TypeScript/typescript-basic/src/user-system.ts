// 사용자 정보 시스템 만들기!

// 1. Interface 정의
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  skills: string[];
}

// 2. 사용자 데이터
const users: User[] = [
  {
    id: 1,
    name: "김자바",
    email: "java@new.world",
    age: 25,
    isActive: true,
    skills: ["TypeScript", "React", "Spring Boot"],
  },
  {
    id: 2,
    name: "이코딩",
    email: "lee@coding.com",
    age: 27,
    isActive: true,
    skills: ["JavaScript", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    name: "박장고",
    email: "D@jango.com",
    age: 30,
    isActive: false,
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 4,
    name: "마루코",
    email: "maruko@kyuusai.com",
    age: 9,
    isActive: true,
    skills: ["Java", "Spring", "MySQL"],
  },
];

// 3. 기능 함수들

// 전체 사용자 출력
function printAllUsers(users: User[]): void {
  console.log("=== 전체 사용자 목록 ===");
  users.forEach((user) => {
    const status = user.isActive ? "활성" : "비활성";
    console.log(`[${status}] ${user.name} (${user.age}세) - ${user.email}`);
  });
}

// 활성 사용자만 필터링
function getActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

// ID로 사용자 찾기
function findUserById(users: User[], id: number): User | undefined {
  return users.find((user) => user.id === id);
}

// 특정 스킬을 가진 사용자 찾기
function findUsersBySkill(users: User[], skill: string): User[] {
  return users.filter((user) =>
    user.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
  );
}

// 평균 나이 계산
function getAverageAge(users: User[]): number {
  const total = users.reduce((sum, user) => sum + user.age, 0);
  return total / users.length;
}

// 사용자 상세 정보 출력
function printUserDetail(user: User): void {
  console.log(`\n📋 ${user.name}님의 정보`);
  console.log(`   이메일: ${user.email}`);
  console.log(`   나이: ${user.age}`);
  console.log(`   상태: ${user.isActive ? "활성" : "비활성"}`);
  console.log(`   보유 스킬: ${user.skills.join(", ")}`);
}

// 4. 실행!
console.log("🚀 사용자 정보 시스템 시작!\n");

// 전체 사용자 출력
printAllUsers(users);

// 활성 사용자만
console.log("\n=== 활성 사용자 ===");
const activeUsers = getActiveUsers(users);
activeUsers.forEach((user) => console.log(`- ${user.name}`));

// ID로 찾기
console.log("\n=== ID로 사용자 찾기 ===");
const user = findUserById(users, 1);
if (user) {
  printUserDetail(user);
} else {
  console.log("사용자를 찾을 수 없습니다.");
}

// TypeScript 스킬 보유자 찾기
console.log("\n=== TypeScript 스킬 보유자 ===");
const tsUsers = findUsersBySkill(users, "TypeScript");
tsUsers.forEach((user) =>
  console.log(`- ${user.name}: ${user.skills.join(", ")}`)
);

// 평균 나이
console.log("\n=== 통계 ===");
console.log(`전체 사용자 수: ${users.length}명`);
console.log(`활성 사용자 수: ${activeUsers.length}명`);
console.log(`평균 나이: ${getAverageAge(users).toFixed(1)}세`);

console.log("\n✅ 시스템 종료!");
