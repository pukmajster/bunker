public class v22 {

    public static void E(int stVrstic, int stStolpcev) {
        for (int i=1; i<= stVrstic;i++){
            for (int j = 1; j <stStolpcev ; j++) {
                if (j==1|| i==1|| i == stVrstic || ( (i == (stVrstic+1)/2) &&(j<stStolpcev * 0.8)))
                    System.out.printf("%c ",'\u25A0');
                else
                    System.out.printf("%c ",' ');
            }

            System.out.println();
        }
    }

    public static void F(int stVrstic, int stStolpcev) {
        for (int i=1; i<= stVrstic;i++){
            for (int j = 1; j <stStolpcev ; j++) {
                if (j==1|| i==1||  ( (i == (stVrstic+1)/2) &&(j<stStolpcev * 0.8)))
                    System.out.printf("%c ",'\u25A0');
                else
                    System.out.printf("%c ",' ');
            }

            System.out.println();
        }
    }

    public static void H(int stVrstic, int stStolpcev) {
        for (int i=1; i<= stVrstic;i++){
            for (int j = 1; j <=stStolpcev ; j++) {
                if (i==6|| j==1 ||j==8||  ( (i == (stVrstic+1)/2) &&(j<stStolpcev * 0.8)))
                    System.out.printf("%c ",'\u25A0');
                else
                    System.out.printf("%c ",' ');
            }
            System.out.println();
        }
    }

    public static void L(int stVrstic, int stStolpcev) {
        for (int i=1; i<= stVrstic;i++){
            for (int j = 1; j <stStolpcev ; j++) {
                if (j==1|| i==11)
                    System.out.printf("%c ",'\u25A0');
                else
                    System.out.printf("%c ",' ');
            }

            System.out.println();
        }
    }


    public static void Z(int stVrstic, int stStolpcev) {
        for (int i = 1; i <= stVrstic; i++) {
            for (int j = 1; j <= stStolpcev; j++) {
                if (i == 1 || i+j == stVrstic+1 || i == stVrstic)
                    System.out.print("\u2588");
                else
                    System.out.print(" ");
            }
            System.out.println();
        }
    }

    public static void U(int stVrstic, int stStolpcev) {
        for (int i=1; i<= stVrstic;i++){
            for (int j = 1; j <=stStolpcev ; j++) {
                if (j==1|| i==11|| j == 8)
                    System.out.printf("%c ",'\u25A0');
                else
                    System.out.printf("%c ",' ');
            }

            System.out.println();
        }
    }

    public static void main(String[] args) {
        E(11, 8); System.out.println();
        H(11, 8); System.out.println();
        F(11, 8); System.out.println();
        L(11, 8); System.out.println();
        Z(11, 8); System.out.println();
        U(11, 8); System.out.println();
    }
}
