# 문제1 (복습): "배열에서 특정 숫자보다 큰 수의 개수"
# 정수 배열 num_list와 정수 n이 주어질 때, n보다 큰 수가 몇 개인지 return 하세요.
# 핵심 개념: 배열 순회 + 조건문
# 생각해볼 점: 어떻게 하나씩 확인하면서 개수를 셀까요?

def solution(num_list, n):
  count = 0
  for i in num_list:
    if i > n:
      count += 1

  return count