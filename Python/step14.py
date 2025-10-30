# while : 조건이 참(True)인 동안 계속 반복하는 문법 (= 이 조건이 맞는 동안에는 계속 돌아라!)
i = 0
while i < 3:
  print("호빵맨이 인사해요", i + 1, "번째!")
  i += 1 # i = i + 1

# break : 반복문을 강제로 탈출(끝내기)하는 것
i = 1
while True: # True니까 무한반복!
  print(i, "번째 반복 중")
  if i == 5:
    print("멈춰!!")
    break
  i += 1
