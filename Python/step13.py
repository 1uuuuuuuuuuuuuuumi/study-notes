# 리스트 : 데이터 여러 개를 한꺼번에 담는 상자
fruits = ["사과", "바나나", "딸기"]
print(fruits)

# 리스트 안의 요소 꺼내기
# 리스트는 번호(인덱스)로 꺼낼 수 있다! (0부터 시작 명심!)
print(fruits[0]) # 사과
print(fruits[2]) # 딸기

# 리스트 추가하기
fruits = ["사과", "바나나"]
fruits.append("포도")
print(fruits)

# ------- ⭐️ 응용 ⭐️ -------
# 리스트 + 반복문
fruits = ["사과", "바나나", "딸기"]

for f in fruits:
  print(f, "맛있겠다 !!!")

# 조건문
fruits = ["사과", "바나나", "딸기", "포도"]
like = input("좋아하는 과일이 뭐야요?")

if like in fruits:
  print("오!", like, "그거 있어! 같이 먹자요!")
else:
  print("앗!", like, "는 없지만, 일단 알겠어!!")