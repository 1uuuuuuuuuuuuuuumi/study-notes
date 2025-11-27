import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import javaData from '../data/javaQuestions';

const WorldListScreen = ({ route, navigation }) => {
  const { language } = route.params;
  
  // 현재는 Java만 지원
  const worlds = language.id === 'java' ? javaData.worlds : [];

  const handleWorldSelect = (world) => {
    navigation.navigate('StageList', { language, world });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* 헤더 */}
      <View style={[styles.header, { backgroundColor: language.color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {language.icon} {language.name} 학습
        </Text>
        <Text style={styles.subtitle}>학습할 주제를 선택하세요</Text>
      </View>

      {/* 월드 목록 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {worlds.map((world, index) => (
          <TouchableOpacity
            key={world.id}
            style={[styles.worldCard, { borderTopColor: world.color }]}
            onPress={() => handleWorldSelect(world)}
            activeOpacity={0.8}
          >
            <View style={styles.worldHeader}>
              <Text style={styles.worldIcon}>{world.icon}</Text>
              <View style={styles.worldBadge}>
                <Text style={styles.worldBadgeText}>월드 {index + 1}</Text>
              </View>
            </View>
            <Text style={styles.worldName}>{world.name}</Text>
            <Text style={styles.worldDescription}>{world.description}</Text>
            
            <View style={styles.worldFooter}>
              <Text style={styles.stageCount}>
                📚 5개의 스테이지
              </Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  worldCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderTopWidth: 5,
  },
  worldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  worldIcon: {
    fontSize: 40,
  },
  worldBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  worldBadgeText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  worldName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  worldDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  worldFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  stageCount: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 28,
    color: '#BDBDBD',
  },
});

export default WorldListScreen;
