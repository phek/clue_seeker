package li.company.java.client.view;

import java.util.Scanner;
import li.company.java.client.model.Connection;
import li.company.java.client.model.SocketClient;

public class JavaClient implements Runnable, SocketClient {

    private static final String SERVER = "http://localhost:3000";
    private boolean running = false;
    private Connection connection = new Connection(this);
    private final Scanner console = new Scanner(System.in);

    public void start() {
        if (running) {
            return;
        }
        running = true;
        new Thread(this).start();
    }

    @Override
    public void run() {
        printMessage("Login by typing: /login your_username your_password");
        while (running) {
            String input = console.nextLine();
            String[] commands = input.split(" ");
            switch (commands[0]) {
                case "/exit":
                    connection.disconnect();
                    running = false;
                    System.exit(0);
                    break;
                case "/login":
                    if (commands.length >= 2) {
                        connection.connect(commands[1], commands[2], SERVER);
                    } else {
                        printError("Please enter username and password.");
                    }
                    break;
                default:
                    if (connection.isConnected()) {
                        connection.sendMessage(input);
                    } else {
                        printError("Command not found.");
                    }
                    break;
            }
        }
    }

    @Override
    public void printMessage(String message) {
        System.out.println(message);
    }

    @Override
    public void printError(String error) {
        System.err.println(error);
    }

}
