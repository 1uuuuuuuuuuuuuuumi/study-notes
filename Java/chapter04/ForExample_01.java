package chapter04;

public class ForExample_01 {

    public static void main(String[] args) {
        // 1부터 5까지 출력
        for (int i = 1; i <= 5; i++){
            System.out.println("i의 값 : " + i);
        }

        System.out.println();

        // 구구단 2단
        for (int i = 1; i <= 9; i++){
            System.out.println("2 x " + i + " = " + (2*i));

        }
    }

}
