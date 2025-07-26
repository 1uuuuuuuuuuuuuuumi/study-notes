public class FloatDoubleExample {
    public static void main(String[] args) {
        //실수값 저장
        //float var1 = 3.14; // 오류: double 리터럴로 간주됨
        float var2 = 3.14f;
        double var3 = 3.14;

        //정밀도 비교
        float var4 =  0.1234567890123456789f; // float는 7자리까지 정밀도
        double var5 = 0.1234567890123456789; // double은 15자리까지 정밀도

        System.out.println("var2: " + var2);
        System.out.println("var3: " + var3);
        System.out.println("var4: " + var4);
        System.out.println("var5: " + var5);    //double 타입인  var5가 float 타입인 var4보다 2배 이상 정밀한 값으로 출력

        //e 사용하기
        double var6 = 3e6; // 3 * 10^6
        float var7 = 3e6f; // 3 * 10^6
        double var8 = 2e-3; // 2 * 10^-3
        System.out.println("var6: " + var6); // 3000000.0
        System.out.println("var7: " + var7); // 3000000.0
        System.out.println("var8: " + var8); // 0.002
    }
}
