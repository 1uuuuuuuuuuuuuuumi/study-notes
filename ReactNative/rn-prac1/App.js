import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  const [message, setMessage] = useState("");

  // 💡 Django 서버 IP 확인 후 수정!
  const SERVER_URL = "http://10.170.174.195:8000/api/hello/";

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setMessage(data.message);
      })
      .catch((err) => console.error("API 호출 실패:", err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native ↔ Django 연결 테스트</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16 },
});
