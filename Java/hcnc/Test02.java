package hcnc;

import java.util.Scanner;

public class Test02 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();



            if (score >= 60){
                System.out.println("합격");

                    if (score >= 90){
                        System.out.println("----------------------------");
                        System.out.println("지원 가능한 부서가 있습니다.");
                        System.out.println("지원을 원하는 부서가 있을 경우 부서를 작성해주세요.");
                        System.out.println("----------------------------");
                        System.out.println("인사과 | 총무과 | 아니오");
                        System.out.println("----------------------------");
                        System.out.print("작성 : ");
                        String select = sc.next();

                        switch (select){
                            case "인사과":
                                System.out.println(select + "지원되었습니다. 합격을 축하합니다.");
                                break;
                            case "총무과":
                                System.out.println(select + "지원되었습니다. 합격을 축하합니다.");
                                break;
                            case "아니오":
                                System.out.println("합격을 축하합니다.");
                                break;
                            default:
                                System.out.println("잘못된 부서명입니다. 합격을 축하합니다.");

                        }
                    } else {
                        System.out.println("축하합니다.");
                    }
            } else if (score<=60) {
                System.out.println("불합격");
            }

    }
}
