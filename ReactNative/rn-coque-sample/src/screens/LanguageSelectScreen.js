import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import languages from '../data/languagesData';

const LanguageSelectScreen = ({ navigation }) => {
  const handleLanguageSelect = (language) => {
    navigation.navigate('WorldList', { language });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>🎓 프로그래밍 학습</Text>
        <Text style={styles.subtitle}>배우고 싶은 언어를 선택하세요</Text>
      </View>

      {/* 언어 카드 목록 */}
      <View style={styles.content}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[styles.languageCard, { borderLeftColor: language.color }]}
            onPress={() => handleLanguageSelect(language)}
            activeOpacity={0.8}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.languageIcon}>{language.icon}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageDescription}>
                {language.description}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 각 언어마다 다양한 학습 주제가 준비되어 있습니다
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 6,
  },
  cardLeft: {
    marginRight: 16,
  },
  languageIcon: {
    fontSize: 48,
  },
  cardRight: {
    flex: 1,
  },
  languageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  languageDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 32,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LanguageSelectScreen;
