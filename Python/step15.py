# 리스트랑 반복문 합치기 (응용편)
# 기본형 복습
fruits = ["사과", "바나나", "딸기"]

for f in fruits:
  print(f + "먹고싶다 !")

# 인덱스(index)도 같이 쓰기
fruits = ["사과", "바나나", "딸기"]

for i in range(len(fruits)):
  print(i + 1, "번째 과일은", fruits[i], "야!")

# 리스트에 새 값 넣기 (append)
cart = []

for i in range(3):
  item = input("장바구니에 넣을 과일을 적어! : ")
  cart.append(item)

print("키미노 장바구니와 : ", cart)

# 두 글자인 것만 출력하기
fruits = ['사과', '바나나', '딸기', '망고', '수박', '블루베리']

for f in fruits:
  if len(f) == 2:
    print(f, "두 글자 과일 !!!")