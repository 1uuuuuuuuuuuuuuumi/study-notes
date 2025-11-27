import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import javaData from '../data/javaQuestions';
import GameStats from '../components/GameStats';
import HintButton from '../components/HintButton';
import MultipleChoiceQuestion from '../components/questions/MultipleChoiceQuestion';
import FillBlankQuestion from '../components/questions/FillBlankQuestion';
import OrderQuestion from '../components/questions/OrderQuestion';
import OXQuestion from '../components/questions/OXQuestion';

const LearningScreen = ({ route, navigation }) => {
  const { language, world, stage } = route.params;
  
  // 현재 스테이지의 문제 목록
  const questions = javaData.questions[stage.id] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // 게임 상태
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // 애니메이션
  const [feedbackAnim] = useState(new Animated.Value(0));

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer, correct) => {
    setUserAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // 정답
      const comboBonus = combo > 0 ? combo * 2 : 0;
      setScore(score + 10 + comboBonus);
      setCombo(combo + 1);
      
      // 정답 애니메이션
      Animated.sequence([
        Animated.timing(feedbackAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(feedbackAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 오답
      setCombo(0);
      setLives(Math.max(0, lives - 1));
      
      // 오답 애니메이션
      Animated.sequence([
        Animated.timing(feedbackAnim, {
          toValue: -1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(feedbackAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleUseHint = () => {
    setScore(Math.max(0, score - 3));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
      setUserAnswer(null);
      setIsCorrect(false);
    }
  };

  const handleRetry = () => {
    setShowResult(false);
    setUserAnswer(null);
    setIsCorrect(false);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      showResult,
      userAnswer,
    };

    switch (currentQuestion.type) {
      case 'multiple_choice':
        return <MultipleChoiceQuestion {...questionProps} />;
      case 'fill_blank':
        return <FillBlankQuestion {...questionProps} />;
      case 'order':
        return <OrderQuestion {...questionProps} />;
      case 'ox_quiz':
        return <OXQuestion {...questionProps} />;
      default:
        // 기본 유형 (type이 없는 경우 객관식으로 처리하거나 에러 방지)
        // 데이터가 없는 경우를 대비해 안전하게 처리
        if (currentQuestion.options) {
          return <MultipleChoiceQuestion {...questionProps} />;
        }
        return <Text style={{ padding: 20 }}>문제 유형을 불러올 수 없습니다.</Text>;
    }
  };

  const backgroundColor = feedbackAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#FFEBEE', '#F5F5F5', '#E8F5E9'],
  });

  // 생명이 0이 되면 게임 오버
  if (lives === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={world.color} />
        
        <View style={[styles.header, { backgroundColor: world.color }]}>
          <Text style={styles.title}>게임 오버</Text>
        </View>

        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverIcon}>😢</Text>
          <Text style={styles.gameOverTitle}>생명을 모두 잃었습니다</Text>
          <Text style={styles.gameOverScore}>최종 점수: {score}점</Text>
          
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: world.color }]}
            onPress={() => {
              setScore(0);
              setLives(3);
              setCombo(0);
              setCurrentQuestionIndex(0);
              setShowResult(false);
              setUserAnswer(null);
            }}
          >
            <Text style={styles.retryButtonText}>다시 도전하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>스테이지 목록으로</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={world.color} />
      
      {/* 헤더 */}
      <View style={[styles.header, { backgroundColor: world.color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBackButton}
        >
          <Text style={styles.headerBackButtonText}>‹ 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {world.icon} {stage.name}
        </Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            문제 {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  backgroundColor: world.color,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* 게임 상태 */}
      <GameStats score={score} lives={lives} combo={combo} />

      {/* 문제 영역 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.questionContainer, { backgroundColor }]}>
          {/* 난이도 배지 */}
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{currentQuestion?.difficulty}</Text>
          </View>

          {/* 문제 */}
          {renderQuestion()}

          {/* 힌트 버튼 */}
          {!showResult && currentQuestion?.hints && (
            <View style={styles.hintContainer}>
              <HintButton
                hints={currentQuestion.hints}
                onUseHint={handleUseHint}
                disabled={showResult}
              />
            </View>
          )}

          {/* 결과 표시 */}
          {showResult && (
            <View style={styles.resultContainer}>
              <View style={[styles.resultBanner, isCorrect ? styles.resultCorrect : styles.resultWrong]}>
                <Text style={styles.resultIcon}>{isCorrect ? '🎉' : '😅'}</Text>
                <Text style={styles.resultText}>
                  {isCorrect ? '정답입니다!' : '틀렸습니다!'}
                </Text>
                {isCorrect && combo > 1 && (
                  <Text style={styles.comboBonusText}>
                    +{combo * 2}점 콤보 보너스!
                  </Text>
                )}
              </View>

              {/* 설명 */}
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>💡 설명</Text>
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              </View>

              {/* 버튼 */}
              <View style={styles.actionButtons}>
                {!isCorrect && (
                  <TouchableOpacity
                    style={styles.retryQuestionButton}
                    onPress={handleRetry}
                  >
                    <Text style={styles.retryQuestionButtonText}>다시 풀기</Text>
                  </TouchableOpacity>
                )}

                {currentQuestionIndex < questions.length - 1 ? (
                  <TouchableOpacity
                    style={[styles.nextButton, { backgroundColor: world.color }]}
                    onPress={handleNextQuestion}
                  >
                    <Text style={styles.nextButtonText}>다음 문제 ›</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.completeButton, { backgroundColor: world.color }]}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.completeButtonText}>
                      스테이지 완료! (점수: {score})
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerBackButton: {
    marginBottom: 12,
  },
  headerBackButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    opacity: 0.9,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 1,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hintContainer: {
    padding: 20,
    paddingTop: 0,
  },
  resultContainer: {
    padding: 20,
    paddingTop: 0,
  },
  resultBanner: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCorrect: {
    backgroundColor: '#E8F5E9',
  },
  resultWrong: {
    backgroundColor: '#FFEBEE',
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  comboBonusText: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: 'bold',
    marginTop: 8,
  },
  explanationBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  explanationLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  actionButtons: {
    gap: 12,
  },
  retryQuestionButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  retryQuestionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  gameOverIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  gameOverScore: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  retryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LearningScreen;
