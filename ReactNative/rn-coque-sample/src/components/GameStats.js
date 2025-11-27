import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameStats = ({ score, lives, combo }) => {
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <Text key={i} style={styles.heart}>
          {i < lives ? '❤️' : '🤍'}
        </Text>
      );
    }
    return hearts;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {/* 점수 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>점수</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>

        {/* 생명 */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>생명</Text>
          <View style={styles.heartsContainer}>
            {renderHearts()}
          </View>
        </View>

        {/* 콤보 */}
        {combo > 1 && (
          <View style={[styles.statItem, styles.comboItem]}>
            <Text style={styles.comboText}>🔥 {combo}연속!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  heart: {
    fontSize: 20,
  },
  comboItem: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  comboText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default GameStats;
