# 파이썬 회원가입 실전 예제

# 빈 딕셔너리(회원정보 저장소)를 만든다
user_info = {}

# 사용자에게 입력을 받는다
name = input("이름을 입력하세요: ")
age = input("나이를 입력하세요: ")
email = input("이메일을 입력하세요: ")

# 입력받은 정보를 딕셔너리에 저장한다
user_info["name"] = name
user_info["age"] = age
user_info["email"] = email

# 결과출력
print("\n💖 회원가입이 완료되었습니다 💖")
print("============회원 정보============")
print("이름: ", user_info["name"])
print("나이: ", user_info["age"])
print("이메일: ", user_info["email"])
print("=================================")