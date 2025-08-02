import random

print("✨👧🏻 숫자 맞추기 게임에 오신 걸 환영합니다! 👧🏻✨")
print("1부터 100 사이의 숫자 중 하나를 맞춰보세요!! 🎯")

# 랜덤 숫자 생성
secret_number = random.randint(1, 100)
guess = None
tries = 0

# 게임 루프 시작
while guess != secret_number:
    try:
        guess = int(input("숫자를 입력해 주세요 👉 "))
        tries += 1

        if guess < secret_number:
            print("📉 너무 작아요! 좀 더 큰 숫자를 시도해봐요~!")
        elif guess > secret_number:
            print("📈 너무 커요! 좀 더 작은 숫자로 도전해봐요~!")
        else:
            print(f"🎉 정답입니다! {tries}번 만에 맞췄어요!! 🏆✨")
    except ValueError:
        print("⚠️ 숫자만 입력해 주세요~! 👧🏻")

print("게임 끝~ 고생했어!! 💖 다음에 또 놀러와~ 👋")