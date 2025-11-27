import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MultipleChoiceQuestion = ({ question, onAnswer, showResult, userAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || null);

  const handleSelect = (option) => {
    if (showResult) return; // 이미 답변한 경우 선택 불가
    
    setSelectedOption(option);
    const isCorrect = option === question.answer;
    onAnswer(option, isCorrect);
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return option === selectedOption ? styles.optionSelected : styles.option;
    }
    
    // 결과 표시 시
    if (option === question.answer) {
      return styles.optionCorrect;
    }
    if (option === selectedOption && option !== question.answer) {
      return styles.optionWrong;
    }
    return styles.option;
  };

  const getOptionTextStyle = (option) => {
    if (!showResult) {
      return option === selectedOption ? styles.optionTextSelected : styles.optionText;
    }
    
    if (option === question.answer) {
      return styles.optionTextCorrect;
    }
    if (option === selectedOption && option !== question.answer) {
      return styles.optionTextWrong;
    }
    return styles.optionText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}
            disabled={showResult}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionNumber}>
                <Text style={getOptionTextStyle(option)}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={getOptionTextStyle(option)}>{option}</Text>
            </View>
            
            {showResult && option === question.answer && (
              <Text style={styles.checkmark}>✓</Text>
            )}
            {showResult && option === selectedOption && option !== question.answer && (
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
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    flex: 1,
  },
  optionTextCorrect: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    flex: 1,
  },
  optionTextWrong: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  crossmark: {
    fontSize: 24,
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default MultipleChoiceQuestion;
