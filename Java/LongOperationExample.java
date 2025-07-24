public class LongOperationExample {
    public static void main(String[] args) {
        byte value1 = 10;
        int value2 = 100;
        long value3 = 1000L;
        long result = value1 + value2 + value3; // byte와 int는 자동으로 long으로 변환됨
        System.out.println("결과: " + result);
    }
}
