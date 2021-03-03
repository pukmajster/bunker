import java.util.Scanner;

public class v8 {
    public static void main(String[] args) {

        int x, y, z;
        Scanner tipkovnica = new Scanner(System.in);

        System.out.print("Vnesi prvo št: ");
        x = tipkovnica.nextInt();

        System.out.print("\nVnesi drugo št: ");
        y = tipkovnica.nextInt();

        System.out.print("\nVnesi tretje št: ");
        z = tipkovnica.nextInt();

        tipkovnica.close();

        if((x > y) && (y > z))
            System.out.println("\nPravilo tranzitivnosti velja");
        else
            System.out.println("\nPravilo tranzitivnosti ne velja");
    }
}
