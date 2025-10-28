# urls에서 컨트롤러처럼 받고 url받은거를 어떻게 작동할건지 현파일이 처리하는 곳. (VIEW 역할)

from django.http import JsonResponse # django.http에서 JsonResponse를 가져오겠다.

# def 메서드
def hello_api(request):
  print("통신성공")
  return JsonResponse({"message": "hello 호빵맨!"})