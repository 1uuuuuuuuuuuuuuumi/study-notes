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

# continue : "이번 차례만 스킵하고 다음으로 넘어가!" 하는 명령어
i = 0
while i < 5:
  i += 1
  if i == 3:
    print("3은 건너뛸게여~")
    continue
  print("숫자 : ", i)