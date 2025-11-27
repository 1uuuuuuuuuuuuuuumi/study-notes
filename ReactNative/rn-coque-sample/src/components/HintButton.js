import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const HintButton = ({ hints, onUseHint, disabled }) => {
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleShowHint = () => {
    if (disabled || !hints || hints.length === 0) return;
    setShowHintModal(true);
    onUseHint();
  };

  const handleNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
      onUseHint();
    }
  };

  const handleClose = () => {
    setShowHintModal(false);
    setCurrentHintIndex(0);
  };

  if (!hints || hints.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.hintButton, disabled && styles.hintButtonDisabled]}
        onPress={handleShowHint}
        disabled={disabled}
      >
        <Text style={styles.hintButtonIcon}>💡</Text>
        <Text style={styles.hintButtonText}>힌트 보기</Text>
        <Text style={styles.hintCost}>(-3점)</Text>
      </TouchableOpacity>

      <Modal
        visible={showHintModal}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💡 힌트</Text>
              <Text style={styles.hintNumber}>
                {currentHintIndex + 1} / {hints.length}
              </Text>
            </View>

            <View style={styles.hintBox}>
              <Text style={styles.hintText}>{hints[currentHintIndex]}</Text>
            </View>

            <View style={styles.modalButtons}>
              {currentHintIndex < hints.length - 1 ? (
                <TouchableOpacity
                  style={styles.nextHintButton}
                  onPress={handleNextHint}
                >
                  <Text style={styles.nextHintButtonText}>
                    다음 힌트 보기 (-3점)
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.noMoreHints}>
                  <Text style={styles.noMoreHintsText}>
                    더 이상 힌트가 없습니다
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#FFB74D',
    gap: 8,
  },
  hintButtonDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    opacity: 0.5,
  },
  hintButtonIcon: {
    fontSize: 20,
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F57C00',
    flex: 1,
  },
  hintCost: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  hintNumber: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  hintBox: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD54F',
  },
  hintText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalButtons: {
    gap: 12,
  },
  nextHintButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  nextHintButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noMoreHints: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  noMoreHintsText: {
    color: '#999',
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HintButton;
