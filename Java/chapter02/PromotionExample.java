public class PromotionExample {
    public static void main(String[] args) {
        //자동 타입 변환
        byte byteValue = 10;
        int intValue = byteValue; // byte -> int 자동 변환
        System.out.println("intValue: " + intValue);

        char chaValue = '가';
         intValue = chaValue; // char -> int 자동 변환
        System.out.println("가의 유니코드: " + intValue);

        intValue = 50;
        long longValue = intValue; // int -> long 자동 변환
        System.out.println("longValue: " + longValue);

        longValue = 100;
        float floatValue = longValue; // long -> float 자동 변환
        System.out.println("floatValue: " + floatValue);

        floatValue = 100.5F;
        double doubleValue = floatValue; // float -> double 자동 변환
        System.out.println("doubleValue: " + doubleValue);
    }
}
