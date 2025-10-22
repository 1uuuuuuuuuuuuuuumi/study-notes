// 재사용 컴포넌트

// src/components/TodoItem.js

// React Native에서 필요한 것들을 불러옴!
import React from 'react';
import {
  View,             // 컨테이너 역할 (HTML의 div 같은 것)
  Text,             // 텍스트를 표시
  StyleSheet,       // 스타일을 만드는 도구
  TouchableOpacity, // 터치 가능한 버튼
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';

/**
 * TodoItem 컴포넌트
 * 할 일 목록의 각 항목을 표시하는 컴포넌트
 * 
 * @param {Object} props - 부모 컴포넌트에서 전달받는 데이터
 * @param {Object} props.item - 할 일 객체 { id, text, completed }
 * @param {Function} props.onToggle - 완료/미완료 토글할 때 실행할 함수
 * @param {Function} props.onDelete - 삭제 버튼 눌렀을 때 실행할 함수
 */
const TodoItem = ({ item, onToggle, onDelete }) => {
  return (
    // 전체 컨테이너
    <View style={StyleSheet.container}>
      {/* 왼쪽: 할 일 텍스트와 체크 버튼 */}
      <TouchableOpacity
        style={StyleSheet.leftSection}
        onPress={() => onToggle(item.id)} // 이 부분을 누르면 완료/미완료가 토글됨
        activeOpacity={0.7} // 눌렀을 때 투명도 (0.7 = 70%)
      >
        {/* 체크박스 역할을 하는 원 */}
        <View 
          style={[
            styles.checkbox, // 기본 스타일
            item.completed && styles.checkboxCompleted, // completed가 true면 추가 스타일 적용
          ]}
        >
          {/* completed가 true일 때만 체크마크 표시 */}
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>

        {/* 할 일 텍스트 */}
        <Text 
          style={[
            styles.text, // 기본 텍스트 스타일
            item.completed && styles.textCompleted, // completed면 줄 긋기 스타일 추가
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      {/* 오른쪽: 삭제 버튼 */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item)} // 삭제 함수 실행
        activeOpacity={0.7} // 눌렀을 때 투명도
      >
        <Text style={styles.deleteButtonText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의
// StyleSheet.create()를 사용하면 성능이 최적화된다.
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로로 배치 (왼쪽: 할일, 오른쪽: 삭제버튼)
    alignItems: 'center', // 세로 중앙 정렬 
    justifyContent: 'space-between', // 양 끝으로 배치
    backgroundColor: COLORS.white, // 배경색 흰색
    padding: SPACING.md, // 안쪽 여백 16px
    marginVertical: SPACING.xs, // 위아래 여백 4px
    marginHorizontal: SPACING.md, // 좌우 여백 16px
    borderRadius: 12, // 모서리 둥글게
    // 그림자 효과 (iOS)
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // 그림자 효과 (Android)
    elevation: 3,
  },
  leftSection: {
    flex: 1, // 남은 공간을 모두 차지
    flexDirection: 'row', // 체크박스와 텍스트를 가로로 배치
    alignItems: 'center', // 세로 중앙 정렬
  },
  checkbox: {
    width: 24, // 체크박스 너비
    height: 24, // 체크박스 높이
    borderRadius: 12, // 원형으로 만들기 (너비/높이의 절반)
    borderWidth: 2, // 테두리 두께
    borderColor: COLORS.gray, // 테두리 색상
    marginRight: SPACING.sm, // 오른쪽 여백 8px
    alignItems: 'center', // 체크마크 가로 중앙
    justifyContent: 'center', // 체크마크 세로 중앙
  },
  checkboxCompleted: {
    backgroundColor: COLORS.success, // 완료되면 초록색 배경
    borderColor: COLORS.success, // 테두리도 초록색
  },
  checkmark: {
    color: COLORS.white, // 체크마크 흰색
    fontSize: SIZES.medium, // 체크마크 크기 16
    fontWeight: 'bold', // 굵게
  },
  text: {
    flex: 1, // 남은 공간 차지
    fontSize: SIZES.medium, // 텍스트 크기 16
    color: COLORS.black, // 검은색
  },
  textCompleted: {
    textDecorationLine: 'line-through', // 줄 긋기
    color: COLORS.gray, // 회색으로 변경
  },
  deleteButton: {
    backgroundColor: COLORS.danger, // 빨간색 배경
    paddingHorizontal: SPACING.sm, // 좌우 여백 8px
    paddingVertical: SPACING.xs, // 위아래 여백 4px
    borderRadius: 6, // 모서리 둥글게
    marginLeft: SPACING.sm, // 왼쪽 여백 8px
  },
  deleteButtonText: {
    color: COLORS.white, // 흰색 텍스트
    fontSize: SIZES.small, // 작은 크기 12
    fontWeight: '600', // 중간 굵기
  },
});

// 다른 파일에서 import 할 수 있도록 내보냄
export default TodoItem;