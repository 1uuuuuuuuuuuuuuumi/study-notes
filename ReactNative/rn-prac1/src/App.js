// 상수 정의 파일

// src/constants/theme.js

// 앱 전체에서 사용할 색상, 크기 등을 한 곳에 모아둔다.
// 나중에 색상을 바꾸고 싶을 때 여기만 수정하면 전체 앱에 반영됨!
export const COLORS = {
  primary: '#007AFF',     // 메인 색상 (파란색)
  secondary: '#5856D6',   // 보조 색상 (보라색)
  success: '#34C759',     // 성공 색상 (초록색)
  danger: '#FF3B30',      // 위험/삭제 색상 (빨간색)
  background: '#F2F2F7',  // 배경 색상 (연한 회색)
  white: "#FFFFFF",       // 흰색
  black: "#000000",       // 검은색
  gray: "#8E8E93",         // 회색
  lightGray: "#E5E5EA",    // 연한 회색
};

// 텍스트 크기 정의
export const SIZES = {
  small: 12,    // 작은 텍스트
  medium: 16,   // 중간 텍스트
  large: 20,    // 큰 텍스트
  xlarge: 24,   // 매우 큰 텍스트
}

// 여백(간격) 정의
export const SPACING = {
  xs: 4,    // 매우 작은 여백
  sm: 8,    // 작은 여백
  md: 16,   // 중간 여백
  lg: 24,   // 큰 여백
  xl: 32,   // 매우 큰 여백
};