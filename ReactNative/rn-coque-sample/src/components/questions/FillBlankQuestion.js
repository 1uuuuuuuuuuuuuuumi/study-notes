import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FillBlankQuestion = ({ question, onAnswer, showResult, userAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer || null);

  const handleSelectBlock = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    const isCorrect = option === question.answer;
    onAnswer(option, isCorrect);
  };

  const getBlockStyle = (option) => {
    if (!showResult) {
      return option === selectedAnswer ? styles.blockSelected : styles.block;
    }
    
    // 결과 표시 시
    if (option === question.answer) {
      return styles.blockCorrect;
    }
    if (option === selectedAnswer && option !== question.answer) {
      return styles.blockWrong;
    }
    return styles.block;
  };

  const getBlockTextStyle = (option) => {
    if (!showResult) {
      return option === selectedAnswer ? styles.blockTextSelected : styles.blockText;
    }
    
    if (option === question.answer) {
      return styles.blockTextCorrect;
    }
    if (option === selectedAnswer && option !== question.answer) {
      return styles.blockTextWrong;
    }
    return styles.blockText;
  };

  // 질문에서 빈칸 부분을 찾아서 표시
  const renderQuestion = () => {
    const parts = question.question.split('_____');
    
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {parts[0]}
          <View style={styles.blankContainer}>
            {selectedAnswer ? (
              <Text style={[
                styles.blankText,
                showResult && selectedAnswer === question.answer && styles.blankTextCorrect,
                showResult && selectedAnswer !== question.answer && styles.blankTextWrong,
              ]}>
                {selectedAnswer}
              </Text>
            ) : (
              <Text style={styles.blankPlaceholder}>_____</Text>
            )}
          </View>
          {parts[1]}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      
      <Text style={styles.instruction}>
        💡 아래 블록 중 하나를 선택하세요
      </Text>

      <View style={styles.blocksContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getBlockStyle(option)}
            onPress={() => handleSelectBlock(option)}
            disabled={showResult}
            activeOpacity={0.7}
          >
            <Text style={getBlockTextStyle(option)}>{option}</Text>
            
            {showResult && option === question.answer && (
              <Text style={styles.checkmark}>✓</Text>
            )}
            {showResult && option === selectedAnswer && option !== question.answer && (
              <Text style={styles.crossmark}>✗</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    lineHeight: 28,
  },
  blankContainer: {
    display: 'inline-flex',
    minWidth: 80,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFF9C4',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFD54F',
    borderStyle: 'dashed',
  },
  blankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
  },
  blankTextCorrect: {
    color: '#4CAF50',
  },
  blankTextWrong: {
    color: '#F44336',
  },
  blankPlaceholder: {
    fontSize: 18,
    color: '#FFB74D',
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  blocksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  block: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minWidth: 100,
    alignItems: 'center',
  },
  blockSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  blockCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  blockWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 2,
  },
  blockText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  blockTextSelected: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  blockTextCorrect: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  blockTextWrong: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  crossmark: {
    fontSize: 20,
    color: '#F44336',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default FillBlankQuestion;
