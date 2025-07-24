public class ByteOperationExample {
    public static void main(String[] args) {
        byte result1 = 10 + 20; // byte 타입의 리터럴끼리 연산을 하면 int 타입으로 변환됨
        System.out.println(result1);

        byte x = 10;
        byte y = 20;
        int result2 = x + y; // byte 타입의 변수끼리 연산을 하면 int 타입으로 변환됨
        System.out.println(result2);
    }
}
