public class CastingExample {
    public static void main(String[] args) {
         int intValue = 44032; // '가'의 유니코드 값
        char charValue = (char) intValue; // int를 char로 형변환
        System.out.println(charValue);

        long longValue = 500; // long 타입 변수 선언
        intValue = (int) longValue; // long을 int로 형변환
        System.out.println(intValue);

        double doubleValue = 3.14; // double 타입 변수 선언
        intValue = (int) doubleValue; // double을 int로 형변환
        System.out.println(intValue);
    }
}
