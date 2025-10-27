// 앱 진입점

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
  Card,
  TextInput,
  List,
  Avatar,
  Badge,
  ProgressBar,
  RadioButton,
  Snackbar,
  FAB,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";

// 커스텀 테마 설정
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee", // 주요 색상
    accent: "#03dac6", // 강조 색상
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    error: "#B00020",
  },
  roundness: 12, // 모서리 둥글기
};

export default function App() {
  // State 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [selectedCert, setSelectedCert] = useState("java");
  const [progress, setProgress] = useState(0.65);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  // 버튼 클릭 핸들러
  const handleLogin = () => {
    setSnackbarVisible(true);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {/* 1. Button 컴포넌트 */}
          <Text style={styles.sectionTitle}>1. Button 컴포넌트</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
              >
                Contained Button
              </Button>

              <Button mode="outlined" onPress={() => {}} style={styles.button}>
                Outlined Button
              </Button>

              <Button mode="text" onPress={() => {}} style={styles.button}>
                Text Button
              </Button>

              <Button
                mode="contained"
                icon="login"
                onPress={handleLogin}
                style={styles.button}
              >
                아이콘 포함 버튼
              </Button>

              <Button
                mode="contained"
                loading={true}
                disabled
                style={styles.button}
              >
                로딩중...
              </Button>
            </Card.Content>
          </Card>

          {/* 2. TextInput 컴포넌트 */}
          <Text style={styles.sectionTitle}>2. TextInput 컴포넌트</Text>
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="사용자 이름"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
              />

              <TextInput
                label="비밀번호"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={secureText}
                right={
                  <TextInput.Icon
                    icon={secureText ? "eye" : "eye-off"}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
                style={styles.input}
              />

              <TextInput
                label="이메일"
                mode="flat"
                keyboardType="email-address"
                style={styles.input}
              />
            </Card.Content>
          </Card>

          {/* 3. Card 컴포넌트 */}
          <Text style={styles.sectionTitle}>3. Card 컴포넌트</Text>
          <Card style={styles.card}>
            <Card.Title
              title="정보처리기사"
              subtitle="2024년 1회 시험"
              left={(props) => <Avatar.Icon {...props} icon="certificate" />}
              right={(props) => <Badge {...props}>NEW</Badge>}
            />
            <Card.Content>
              <Text>총 120문제 • 소프트웨어 개발</Text>
              <ProgressBar
                progress={progress}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <Text>학습 진도: {Math.round(progress * 100)}%</Text>
            </Card.Content>
            <Card.Cover
              source={{ uri: "https://picsum.photos/700" }}
              style={styles.cardCover}
            />
            <Card.Actions>
              <Button onPress={() => {}}>취소</Button>
              <Button onPress={() => setDialogVisible(true)}>학습 시작</Button>
            </Card.Actions>
          </Card>

          {/* 4. List 컴포넌트 */}
          <Text style={styles.sectionTitle}>4. List 컴포넌트</Text>
          <Card style={styles.card}>
            <List.Section>
              <List.Subheader>학습 과목</List.Subheader>

              <List.Item
                title="소프트웨어 설계"
                description="객체지향, UML, 디자인 패턴"
                left={(props) => <List.Icon {...props} icon="book" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
              />

              <List.Item
                title="데이터베이스"
                description="SQL, 정규화, 트랜잭션"
                left={(props) => <List.Icon {...props} icon="database" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {}}
              />

              <List.Accordion
                title="프로그래밍 언어"
                left={(props) => <List.Icon {...props} icon="code-tags" />}
              >
                <List.Item title="Java" onPress={() => {}} />
                <List.Item title="Python" onPress={() => {}} />
                <List.Item title="C 언어" onPress={() => {}} />
              </List.Accordion>
            </List.Section>
          </Card>

          {/* 5. RadioButton 컴포넌트 */}
          <Text style={styles.sectionTitle}>5. RadioButton 컴포넌트</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Text>학습할 자격증을 선택하세요:</Text>
              <RadioButton.Group
                onValueChange={(value) => setSelectedCert(value)}
                value={selectedCert}
              >
                <RadioButton.Item label="정보처리기사" value="processing" />
                <RadioButton.Item label="SQLD" value="sqld" />
                <RadioButton.Item label="JAVA" value="java" />
                <RadioButton.Item label="정보보안기사" value="security" />
              </RadioButton.Group>
            </Card.Content>
          </Card>

          {/* 6. Avatar & Badge */}
          <Text style={styles.sectionTitle}>6. Avatar & Badge</Text>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarItem}>
                  <Avatar.Icon size={64} icon="account" />
                  <Text>Icon</Text>
                </View>
                <View style={styles.avatarItem}>
                  <Avatar.Text size={64} label="홍" />
                  <Text>Text</Text>
                </View>
                <View style={styles.avatarItem}>
                  <Avatar.Image
                    size={64}
                    source={{ uri: "https://picsum.photos/200" }}
                  />
                  <Text>Image</Text>
                </View>
              </View>

              <View style={styles.badgeContainer}>
                <Badge size={24}>3</Badge>
                <Badge size={24} style={styles.badge}>
                  NEW
                </Badge>
                <Badge
                  size={24}
                  style={[styles.badge, { backgroundColor: "#f44336" }]}
                >
                  HOT
                </Badge>
              </View>
            </Card.Content>
          </Card>

          {/* 여백 */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* 7. FAB (Floating Action Button) */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setSnackbarVisible(true)}
          label="새 문제"
        />

        {/* 8. Snackbar */}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: "확인",
            onPress: () => {},
          }}
        >
          로그인 버튼을 클릭했습니다!
        </Snackbar>

        {/* 9. Dialog */}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>학습 시작</Dialog.Title>
            <Dialog.Content>
              <Text>정보처리기사 학습을 시작하시겠습니까?</Text>
              <Text style={styles.dialogSubtext}>
                총 120문제 중 78문제가 남았습니다.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>취소</Button>
              <Button onPress={() => setDialogVisible(false)}>시작</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 4,
  },
  input: {
    marginBottom: 12,
  },
  progressBar: {
    marginVertical: 12,
    height: 8,
    borderRadius: 4,
  },
  cardCover: {
    marginVertical: 12,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  avatarItem: {
    alignItems: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  badge: {
    backgroundColor: "#6200ee",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
  dialogSubtext: {
    marginTop: 8,
    color: "#666",
  },
});
