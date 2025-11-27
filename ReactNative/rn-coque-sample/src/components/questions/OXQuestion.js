import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OXQuestion = ({ question, onAnswer, showResult, userAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswer || null);

  const handleSelect = (option) => {
    if (showResult) return;
    
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

  const getTextStyle = (option) => {
    if (!showResult) {
      return option === selectedOption ? styles.textSelected : styles.text;
    }
    if (option === question.answer) return styles.textCorrect;
    if (option === selectedOption) return styles.textWrong;
    return styles.text;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, getOptionStyle('O')]}
          onPress={() => handleSelect('O')}
          disabled={showResult}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionIcon, getTextStyle('O')]}>⭕</Text>
          <Text style={[styles.optionText, getTextStyle('O')]}>그렇다</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, getOptionStyle('X')]}
          onPress={() => handleSelect('X')}
          disabled={showResult}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionIcon, getTextStyle('X')]}>❌</Text>
          <Text style={[styles.optionText, getTextStyle('X')]}>아니다</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 40,
    lineHeight: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
  },
  option: {
    flex: 1,
    aspectRatio: 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    transform: [{ scale: 1.05 }],
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    opacity: 0.5,
  },
  optionIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  textSelected: {
    color: '#2196F3',
  },
  textCorrect: {
    color: '#4CAF50',
  },
  textWrong: {
    color: '#F44336',
  },
});

export default OXQuestion;
