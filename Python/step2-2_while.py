# 커피자판기

coffee =10

while True:
  try:
    money = int(input("돈을 땡그랑~ 넣어주쎄용: "))

    if money == 300:
      print("커피 드릴게 ~~~")
      coffee = coffee - 1
      print(f"ㅈㅐ고 : {coffee}잔이라능 ~ ?")
    elif money > 300:
      print("커피 주기!~~ ")
      print(f"잔돈 {money - 300}원 です〜〜〜")
      coffee = coffee - 1
      print(f"ㅈㅐ고 : {coffee}잔이라능 ~ ?")
    else:
      print("300원이상 넣어줴요~~~")
      print(f"돈이 반환됩니다. {money}원 です〜〜〜")

    if coffee == 0:
      print("★★★★★ 커★피 솔★닷 ! 판★매 끄★읏 ~ ! ★★★★★")
      break
  
  except:
    print("입력값을 제대로 입력해주세요. 정수값만 가능합니다.")