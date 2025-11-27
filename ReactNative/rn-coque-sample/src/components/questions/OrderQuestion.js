import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderQuestion = ({ question, onAnswer, showResult, userAnswer }) => {
  const [items, setItems] = useState(userAnswer || [...question.items].sort(() => Math.random() - 0.5));
  const [submitted, setSubmitted] = useState(false);

  const moveItem = (index, direction) => {
    if (showResult) return;
    
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  };

  const handleSubmit = () => {
    if (showResult) return;
    
    setSubmitted(true);
    const isCorrect = JSON.stringify(items) === JSON.stringify(question.answer);
    onAnswer(items, isCorrect);
  };

  const getItemStyle = (index) => {
    if (!showResult) {
      return styles.item;
    }
    
    const isCorrect = items[index] === question.answer[index];
    return isCorrect ? styles.itemCorrect : styles.itemWrong;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      
      <Text style={styles.instruction}>
        ↑↓ 버튼을 눌러 올바른 순서로 배열하세요
      </Text>

      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemNumberContainer}>
              <Text style={styles.itemNumber}>{index + 1}</Text>
            </View>
            
            <View style={getItemStyle(index)}>
              <Text style={styles.itemText}>{item}</Text>
            </View>

            {!showResult && (
              <View style={styles.controls}>
                <TouchableOpacity
                  style={[styles.controlButton, index === 0 && styles.controlButtonDisabled]}
                  onPress={() => moveItem(index, -1)}
                  disabled={index === 0}
                >
                  <Text style={styles.controlButtonText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlButton, index === items.length - 1 && styles.controlButtonDisabled]}
                  onPress={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                >
                  <Text style={styles.controlButtonText}>↓</Text>
                </TouchableOpacity>
              </View>
            )}

            {showResult && (
              <View style={styles.resultIcon}>
                {items[index] === question.answer[index] ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={styles.crossmark}>✗</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </View>

      {!showResult && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>순서 확인하기</Text>
        </TouchableOpacity>
      )}

      {showResult && JSON.stringify(items) !== JSON.stringify(question.answer) && (
        <View style={styles.correctAnswerBox}>
          <Text style={styles.correctAnswerLabel}>정답 순서:</Text>
          <Text style={styles.correctAnswerText}>{question.answer.join(' ')}</Text>
        </View>
      )}
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
    marginBottom: 12,
    lineHeight: 26,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  itemsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  item: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  itemCorrect: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  itemWrong: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    borderColor: '#F44336',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  controls: {
    gap: 4,
  },
  controlButton: {
    width: 36,
    height: 36,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultIcon: {
    width: 36,
    alignItems: 'center',
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
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  correctAnswerBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: '#F57C00',
    fontWeight: '600',
    marginBottom: 8,
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#E65100',
    fontWeight: '600',
  },
});

export default OrderQuestion;
