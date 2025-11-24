# 1단계: 2차원 리스트 맛보기
students = [
  ["호빵맨", 90],
  ["세균맨", 85],
  ["짤랑이", 100]
]

for s in students:
  print("이름:", s[0], "/ 점수:", s[1])

print("")


# 2단계: 중첩 for문
# 리스트 안 리스트를 전부 돌리기
scores = [
  [90, 80, 100],
  [88, 92, 76],
  [95, 100, 98]
]

for row in scores:    # 학생별 점수 리스트를 하나씩 꺼냄
  for s in row:       # 그 학생의 점수들을 하나씩 꺼냄
    print("점수:", s)
  print("---- 다음 학생 ----")

print("")


# 3단계: 응용 실습
# 각 학생의 평균 점수 계산하기
scores = [
  [90, 80, 100],
  [88, 92, 76],
  [95, 100, 98]
]

for row in scores:
  total = 0
  for s in row:
    total += s
  avg = total / len(row)
  print("평균 점수:", avg)