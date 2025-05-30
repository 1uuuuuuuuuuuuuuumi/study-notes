# 이중뽀문

for i in range(2, 10):
  for j in range(1, 10):
    print(i * j, end=" ")
  print("")

result = [x*y for x in range(2, 10) for y in range(1,10)]

print(result)