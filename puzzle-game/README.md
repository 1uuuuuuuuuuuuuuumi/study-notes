# 15 Puzzle Game 🎮

React와 Spring Boot로 만든 풀스택 퍼즐 게임 프로젝트

## 📋 프로젝트 소개

15 Puzzle Game은 4x4 격자에서 타일을 움직여 숫자를 순서대로 배열하는 클래식 퍼즐 게임입니다.
게임 기록을 데이터베이스에 저장하고, 랭킹 시스템을 통해 다른 플레이어들과 경쟁할 수 있습니다.

### 주요 기능

- ✅ 15 퍼즐 게임 (타일 섞기, 이동)
- ✅ 실시간 이동 횟수 측정
- ✅ 타이머 기능 (분:초)
- ✅ 게임 기록 저장 (데이터베이스)
- ✅ 랭킹 시스템 (이동 횟수/시간/전체 기록)
- ✅ 반응형 디자인

## 🛠️ 기술 스택

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Spring Boot 3.4.11
- Spring Data JPA
- MariaDB 12.0.2
- Maven

## 📦 설치 및 실행

### 사전 요구사항

- Node.js (v18 이상)
- Java 17
- MariaDB (v12 이상)
- Maven

### 1. 데이터베이스 설정
```sql
-- MariaDB 접속
mysql -u root -p

-- 데이터베이스 생성
CREATE DATABASE puzzle_game;

-- 사용자 생성 및 권한 부여
CREATE USER 'puzzle_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON puzzle_game.* TO 'puzzle_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend 설정
```bash
# springBoot 폴더로 이동
cd puzzle-game/springBoot

# application.properties 설정
# src/main/resources/application.properties 파일에서
# 데이터베이스 정보 수정

# Spring Boot 실행
mvn spring-boot:run
```

**application.properties 예시:**
```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/puzzle_game
spring.datasource.username=puzzle_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Frontend 설정
```bash
# react 폴더로 이동
cd puzzle-game/react

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. 접속

브라우저에서 http://localhost:5173 접속

## 🎯 사용 방법

### 게임 플레이

1. 게임이 시작되면 타일이 자동으로 섞입니다
2. 빈 칸에 인접한 타일을 클릭하여 이동
3. 1부터 15까지 순서대로 배열하면 승리!
4. 이름을 입력하고 기록 저장

### 랭킹 확인

1. 우측 상단 🏆 랭킹 버튼 클릭
2. 이동 횟수/시간/전체 기록 탭 전환
3. 상위 10명의 기록 확인

## 📂 프로젝트 구조
```
puzzle-game/
├── react/                    # Frontend
│   ├── src/
│   │   ├── components/       # React 컴포넌트
│   │   │   ├── Board.jsx
│   │   │   └── Ranking.jsx
│   │   ├── styles/           # CSS 파일
│   │   │   ├── Board.css
│   │   │   └── Ranking.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── springBoot/               # Backend
    ├── src/main/java/com/puzzle/springBoot/
    │   ├── controller/       # REST API 엔드포인트
    │   ├── service/          # 비즈니스 로직
    │   ├── repository/       # 데이터베이스 접근
    │   └── entity/           # JPA 엔터티
    └── pom.xml
```

## 🔌 API 엔드포인트

### 게임 기록

| 메소드 | URL | 설명 |
|--------|-----|------|
| POST | `/api/records` | 게임 기록 저장 |
| GET | `/api/records` | 전체 기록 조회 |
| GET | `/api/records/top/moves` | 이동 횟수 TOP 10 |
| GET | `/api/records/top/time` | 시간 TOP 10 |
| GET | `/api/records/player/{playerName}` | 플레이어별 기록 |

### 요청 예시

**게임 기록 저장:**
```json
POST /api/records
{
  "playerName": "루미대장",
  "moves": 50,
  "timeSeconds": 120
}
```

**응답:**
```json
{
  "id": 1,
  "playerName": "루미대장",
  "moves": 50,
  "timeSeconds": 120,
  "completedAt": "2025-11-21T01:46:57"
}
```

## 🎨 주요 화면

### 게임 화면
- 4x4 퍼즐 게임판
- 이동 횟수 및 시간 표시
- 승리 시 이름 입력 및 기록 저장

### 랭킹 화면
- 이동 횟수 TOP 10
- 시간 TOP 10
- 전체 기록
- 1~3위 메달 표시

## 🔧 개발 과정

### Day 1-2: 프로젝트 설정
- React, Spring Boot 프로젝트 생성
- MariaDB 설정
- 기본 구조 설계

### Day 3: 퍼즐 게임 구현
- 타일 섞기 알고리즘
- 타일 이동 로직
- 승리 조건 체크

### Day 4: Backend API 개발
- Entity, Repository, Service, Controller 구현
- REST API 엔드포인트 작성
- CORS 설정

### Day 5: Frontend-Backend 연동
- Axios를 통한 API 호출
- 이동 횟수 및 타이머 기능
- 게임 기록 저장

### Day 6: 랭킹 시스템
- 랭킹 화면 구현
- 탭 전환 기능
- 데이터 포맷팅

### Day 7: 마무리
- 성능 최적화 (React.memo, useCallback)
- 에러 처리 강화
- README 작성

## 🚀 배포

### Frontend 빌드
```bash
cd react
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### Backend 빌드
```bash
cd springBoot
mvn clean package
```

생성된 JAR 파일: `target/springBoot-0.0.1-SNAPSHOT.jar`

### 실행
```bash
java -jar target/springBoot-0.0.1-SNAPSHOT.jar
```

## 📝 배운 점

- React Hooks (useState, useEffect, useCallback)의 실전 활용
- Spring Boot를 활용한 REST API 개발
- JPA를 통한 데이터베이스 연동
- 풀스택 개발의 전체 흐름 이해
- 성능 최적화 및 에러 처리

## 🐛 알려진 이슈

현재 알려진 이슈는 없습니다.

## 📄 라이센스

이 프로젝트는 학습 목적으로 제작되었습니다.

## 👤 개발자

**루미대장**
- GitHub: [https://github.com/1uuuuuuuuuuuuuuumi/study-notes/tree/main/puzzle-game]
- Blog: [https://im1umi.tistory.com/category/%EC%8B%A4%EC%8A%B5/%ED%8D%BC%EC%A6%90%EA%B2%8C%EC%9E%84]

## 🙏 감사의 말

이 실습 프로젝트는 AI 학습을 목표로 8주 풀스택 개발 과정의 일환으로 제작되었습니다.