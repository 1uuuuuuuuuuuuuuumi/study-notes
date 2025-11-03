# 리스트랑 반복문 합치기 (응용편)
# 기본형 복습
fruits = ["사과", "바나나", "딸기"]

for f in fruits:
  print(f + "먹고싶다 !")

# 인덱스(index)도 같이 쓰기
fruits = ["사과", "바나나", "딸기"]

for i in range(len(fruits)):
  print(i + 1, "번째 과일은", fruits[i], "야!")