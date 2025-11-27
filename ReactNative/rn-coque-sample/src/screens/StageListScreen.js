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

const StageListScreen = ({ route, navigation }) => {
  const { language, world } = route.params;
  
  // 현재 월드의 스테이지 목록
  const stages = javaData.stages[world.id] || [];

  const handleStageSelect = (stage) => {
    navigation.navigate('Learning', { language, world, stage });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={world.color} />
      
      {/* 헤더 */}
      <View style={[styles.header, { backgroundColor: world.color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {world.icon} {world.name}
        </Text>
        <Text style={styles.subtitle}>{world.description}</Text>
      </View>

      {/* 스테이지 목록 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>스테이지 선택</Text>
        
        {stages.map((stage, index) => (
          <TouchableOpacity
            key={stage.id}
            style={styles.stageCard}
            onPress={() => handleStageSelect(stage)}
            activeOpacity={0.8}
          >
            <View style={[styles.stageNumber, { backgroundColor: world.color }]}>
              <Text style={styles.stageNumberText}>{stage.stageNumber}</Text>
            </View>
            
            <View style={styles.stageContent}>
              <Text style={styles.stageName}>{stage.name}</Text>
              <Text style={styles.stageInfo}>
                {javaData.questions[stage.id]?.length || 0}개의 문제
              </Text>
            </View>
            
            <View style={styles.stageRight}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* 하단 여백 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 모든 스테이지를 완료하고 마스터가 되어보세요!
          </Text>
        </View>
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
    color: '#FFFFFF',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  stageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  stageNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stageNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stageContent: {
    flex: 1,
  },
  stageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  stageInfo: {
    fontSize: 14,
    color: '#999',
  },
  stageRight: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 28,
    color: '#BDBDBD',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default StageListScreen;
