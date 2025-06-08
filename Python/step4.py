# 숫자 맞추기 게임

import random #난수를 생성하는 모듈

#1부터 100 사이의 랜덤 숫자를 하나 생성!
secret = random.randint(1, 100)

print("숫자 맞추기 게임 시작 ! 🎯 1부터 100까지 숫자를 맞춰보시오 ~~~~~ !")

# 기회는 무제한 ! 맞출 때까지 계속 !!!
while True:
  guess = int(input("숫자를 입력해보세용 👉🏿 "))

  if guess < secret:
    print("너무 작아요 ! 더 큰 숫자를 입력해보세요 !")
  elif guess > secret:
    print("너무 커요 ! 더 작은 숫자를 입력해보세요 !")
  else:
    print(f"정답입니다 ~~~~~ 🎉 정답은 {secret}이었습니다 >ㅇ< !!!")
    break