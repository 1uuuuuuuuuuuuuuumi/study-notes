current_time = 0

while current_time <= 24:
  if current_time == 7:
    print("기상")
  elif current_time == 12:
    print("밥묵자")
  elif current_time == 21:
    print("자자")
  else:
    print(f"현재시간은 {current_time}時です〜")

  current_time = current_time + 1