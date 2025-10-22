print("안녕 호빵맨!")
print("안녕 세균맨!")

# name = "짤랑이" 데이터를 저장하는 그릇
name = input("너 이름이 뭐야?")
print("안녕," + name + "! 반가워!!!")

age = int(input("너 몇살이니???"))
print("난" + str(age) + "! 이야!!!") # 문자랑 숫자를 합칠 수가 없음! (자바랑 다름! 자바는 문자+숫자 더하면 전부 문자열로 자동변환해줌!!!)
if age > 60:
  print("우와... 정말 늙었구나")
elif age > 30:
  print("너도 꽤나 먹었구나???")
else:
  print("으")