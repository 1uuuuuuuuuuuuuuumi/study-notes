package hcnc;

import java.util.Scanner;

public class Test01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);


        while (true){

            System.out.print("점수를 입력해주세요 : ");
            int score = sc.nextInt();

           if (score > 100 ||  score < 0) {
               System.out.println("값을 잘못 입력했습니다.");
           }
               else if (score >= 95){
                    System.out.println("A+");
                } else if (score>=90) {
                    System.out.println("A-");
                } else if (score>=85) {
                    System.out.println("B+");
                } else if (score>=80) {
                    System.out.println("B-");
                } else if (score>=75) {
                    System.out.println("C+");
                } else if (score>=70) {
                    System.out.println("C-");
                } else if (score>=65) {
                    System.out.println("D+");
                } else if (score>=60) {
                    System.out.println("D-");
                } else {
                    System.out.println("F");
                }

        }


    }
}
