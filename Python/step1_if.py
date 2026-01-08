import random
rd1 = random.randint(1, 13)

if(rd1 > 2):
  print("ddddd")
elif(rd1 > 5):
  print("ttt")
elif(rd1 == 9):
  print("qqq")
else:
  print("1234dkdkdkdkdkdk")

print(rd1)

name = "호빵맨"
age = 11

print("안녕, 나는", name, "이고 나이는", age, "살이야!")

# 2026.1.8 21:13 복습
age = int(input("나이 입력: "))

if age >= 20:
  print("성인입니다")
else:
  print("미성년자입니다")