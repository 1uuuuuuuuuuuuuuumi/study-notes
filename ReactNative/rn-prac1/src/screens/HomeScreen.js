// 메인 화면

// src/screens/HomeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput, // 텍스트 입력 필드
  TouchableOpacity, // 터치 가능한 버튼
  FlatList, // 리스트를 효율적으로 렌더링
  KeyboardAvoidingView, // 키보드가 올라올 때 화면 조정
  Platform, // iOS인지 Android인지 확인
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 안전 영역 컴포넌트 (아이폰 노치 등을 피해서 안전한 영역에 표시)
import TodoItem from '../components/TodoItem'; // 할 일 항목 컴포넌트
import { COLORS, SPACING, SIZES } from '../constants/theme'; // 테마 상수 불러오기

/**
 * HomeScreen 컴포넌트
 * 앱의 메인 화면 !
 * 할 일을 추가하고, 목록을 보여주고, 완료 표시하고, 삭제할 수 있음
 */
const HomeScreen = () => {
  // =========== 상태(State) 정의 ===========
  // 상태는 컴포넌트가 기억해야 할 데이터.
  // 상태가 변경되면 화면이 자동으로 다시 그려짐! (리렌더링)

  // 할 일 목록을 저장하는 상태
  // 배열 형태로 여러 개의 할 일을 저장
  const [todos, setTodos] = useState([
    // 초기 데이터 (예시)
    { id: '1', text: 'React Native 배우기', completed: false },
    { id: '2', text: '프로젝트 구조 이해하기', completed: true },
  ]);

  // 현재 입력 중인 텍스트를 저장하는 상태
  const [inputText, setInputText] = useState('');

  // =========== 함수 정의 ===========

  /**
   * 새로운 할 일을 추가하는 함수
   */
  const addTodo = () => {
    // 입력된 텍스트가 없으면 (공백만 있어도) 아무것도 하지 않음
    if(inputText.trim() === ''){
      return;
    }

    // 새로운 할 일 객체 생성
    const newTodo = {
      id: Date.now().toString(), // 현재 시간을 ID로 사용 (고유한 값)
      text: inputText, // 입력한 텍스트
      completed: false, // 처음엔 완료되지 않은 상태
    };

    // 기존 todos 배열에 새로운 할 일을 추가
    // [...todos, newTodo]는 기존 배열을 복사하고 새 항목을 끝에 추가하는 방법
    setTodos([...todos, newTodo]);

    // 입력 필드를 비운다.
    setInputText('');
  };

  /**
   * 할 일의 완료 상태를 토글하는 함수
   * @param {string} id - 토글할 할 일의 ID
   */
  const toggleTodo = (id) => {
    // map 함수로 배열의 모든 항목을 순회한다.
    // ID가 일치하는 항목만 completed 값을 반대로 바꾼다.
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // ID가 일치하면 completed 반전
          : todo // ID가 다르면 그대로 유지
      )
    );
  };

  /**
   * 할 일을 삭제하는 함수
   * @param {string} id - 삭제할 할 일의 ID
   */
  const deleteTodo = (id) => {
    // filter 함수로 ID가 일치하지 않는 항목만 남긴다.
    // 즉, ID가 일치하는 항목은 제거된다.
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * 각 할 일 항목을 렌더링하는 함수
   * FlatList의 renderItem에서 사용됨.
   * @param {Object} param - FlatList가 자동으로 전달하는 객체
   * @param {Object} param.item - 현재 렌더링할 할 일 객체
   */
  const renderTodoItem = ({ item }) => (
    <TodoItem 
      item={item} // 할 일 데이터 전달
      onToggle={toggleTodo} // 완료 토글 함수 전달
      onDelete={deleteTodo} // 삭제 함수 전달
    />
  );

  // =========== 화면 렌더링 ===========
  return (
    // SafeAreaView: 아이폰 노치나 상태바를 피해서 안전한 영역에 표시
    <SafeAreaView 
      style={styles.safeArea}>
        {/* KeyboardAvoidingView: 키보드가 올라올 때 화면을 위로 밀어올림 */}
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS와 Android 동작 방식이 다름
        >
          {/* 헤더 부분 */}
          <View style={styles.header}>
            <Text style={styles.title}>나의 할 일</Text>
            <Text style={styles.subtitle}>
              완료: {todos.filter(t => t.completed).length} / 전체: {todos.length}
            </Text>
          </View>

          {/* 할 일 목록 */}
          <FlatList
            data={todos} // 렌더링할 데이터 배열
            renderItem={renderTodoItem} // 각 항목을 어떻게 그릴지 정의
            keyExtractor={item => item.id} // 각 항목의 고유 키 (성능 최적화)
            style={styles.list}
            // 목록이 비어있을 때 표시할 내용
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>할 일이 없습니다</Text>
                <Text style={styles.emptySubtext}>아래에 새로운 할 일을 추가해보세요!</Text>
              </View>
            }
          />

          {/* 입력 부분 (하단 고정) */}
          <View style={styles.inputContainer}>
            {/* 텍스트 입력 필드 */}
            <TextInput 
              style={styles.input}
              value={inputText} // 현재 입력된 값
              onChangeText={setInputText} // 텍스트가 변경될 때마다 상태 업데이트
              placeholder="새로운 할 일을 입력하세요" // 빈 칸일 때 표시되는 힌트
              placeholderTextColor={COLORS.gray} // 힌트 텍스트 색상
              returnKeyType="done" // 키보드의 엔터 키 모양
              onSubmitEditing={addTodo} // 엔터 키를 누르면 추가 함수 실행
            />

            {/* 추가 버튼 */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addTodo} // 버튼을 누르면 추가 함수 실행
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

// =========== 스타일 정의 ===========
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // 화면 전체를 차지
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1, // 화면 전체를 차지
  },
  container: {
    flex: 1, // 화면 전체를 차지
  },
  header: {
    padding: SPACING.lg, // 안쪽 여백 24px
    backgroundColor: COLORS.white, // 흰색 배경
    borderBottomWidth: 1, // 아래 테두리
    borderBottomColor: COLORS.lightGray, // 테두리 색상
  },
  title: {
    fontSize: SIZES.xlarge, // 24px
    fontWeight: 'bold', // 굵게
    color: COLORS.black,
    marginBottom: SPACING.xs, // 아래 여백 4px
  },
  subtitle: {
    fontSize: SIZES.small, // 12px
    color: COLORS.gray,
  },
  list: {
    flex: 1, // 남은 공간을 모두 차지
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center', // 가로 중앙 정렬
    justifyContent: 'center', // 세로 중앙 정렬
    padding: SPACING.xl, // 안쪽 여백 32px
    marginTop: 100, // 위쪽에서 100px 떨어진 곳에 표시
  },
  emptyText: {
    fontSize: SIZES.large, // 20px
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: SIZES.small, // 12px
    color: COLORS.gray,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row', // 입력 필드와 버튼을 가로로 배치
    padding: SPACING.md, // 안쪽 여백 16px
    backgroundColor: COLORS.white, // 흰색 배경
    borderTopColor: COLORS.lightGray,
  },
  input: {
    flex: 1, // 남은 공간을 모두 차지 (버튼 제외)
    backgroundColor: COLORS.background,
    borderRadius: 8, // 모서리 둥글게
    paddingHorizontal: SPACING.md, // 좌우 여백 16px
    paddingVertical: SPACING.sm, // 위아래 여백 8px
    fontSize: SIZES.medium, // 16px
    marginRight: SPACING.sm, // 오른쪽 여백 8px (버튼과의 간격)
  },
  addButton: {
    backgroundColor: COLORS.primary, // 파란색 배경
    borderRadius: 8, // 모서리 둥글게
    paddingHorizontal: SPACING.lg, // 좌우 여백 24px
    paddingVertical: SPACING.sm, // 위아래 여백 8px
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
  },
  addButtonText: {
    color: COLORS.white, // 흰색 텍스트
    fontSize: SIZES.medium, // 16px
    fontWeight: '600', // 중간 굵기
  },
});

export default HomeScreen;