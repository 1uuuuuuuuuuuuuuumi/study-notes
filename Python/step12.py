# 인사 봇
print("안녕! 나는 인사봇이야!!!")
name = input("너 이름이 뭐니? : ")
print("반가워! ", name, "! 냐하하핳")

# 나이 계산기
birth = int(input("태어난 년도는 ? : "))
age = 2025 - birth + 1
print("오호~! 넌", age, "살이구나!!!")

# 계산기
a = int(input("첫 번째 숫자 : "))
b = int(input("두 번째 숫자 : "))
print("더하기 =", a + b)
print("곱하기 =", a * b)

# 조건문 실습 (성인 판별기)
age = int(input("몇 살이야? : "))

if age >= 20:
  print("오~ 성인이네!!!")
else:
  print("앗! 아직 잼미니구나~!!")

# 반복문 실습 (인사 반복)
for i in range(3):
  print("호빵맨이 인사해요 ~!", i + 1, "번째!")