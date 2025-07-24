public class KeyCodeExample {
    public static void main(String[] args) throws Exception{
        int keyCode;

        keyCode = System.in.read(); // 키보드로부터 입력을 받음
        System.out.println("keyCode: " + keyCode);

        keyCode = System.in.read(); // 다음 키보드 입력을 받음
        System.out.println("keyCode: " + keyCode);

        keyCode = System.in.read(); // 또 다른 키보드 입력을 받음
        System.out.println("keyCode: " + keyCode);
    }
}
