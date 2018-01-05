package li.company.java.client.model;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import java.net.URISyntaxException;

public class Connection {

    private Socket socket = null;
    private Token local_token = new Token();
    private boolean connected = false;
    private SocketClient client;
    private String curServer = "";

    public Connection(SocketClient client) {
        this.client = client;
    }

    public void connect(String username, String password, String server) {
        if (socket != null) {
            socket.disconnect();
        }

        try {
            IO.Options opts = new IO.Options();
            opts.query = "username=" + username + "&password=" + password + "&platform=java";
            socket = IO.socket(server, opts);
            curServer = server;
            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    connected = true;
                    client.printMessage("Successfully connected to " + curServer);
                }

            }).on("token", new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    String token = (String) args[1];
                    local_token.storeToken(token);
                }

            }).on("alert", new Emitter.Listener() {

                @Override
                public void call(Object... message) {
                    client.printMessage("SERVER: " + (String) message[0]);
                }

            }).on("chat message", new Emitter.Listener() {

                @Override
                public void call(Object... message) {
                    client.printMessage((String) message[0]);
                }

            }).on("client connected", new Emitter.Listener() {

                @Override
                public void call(Object... user) {
                    client.printMessage((String) user[0] + " connected.");
                }

            }).on("client disconnected", new Emitter.Listener() {

                @Override
                public void call(Object... user) {
                    client.printMessage((String) user[0] + " disconnected.");
                }

            }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    connected = false;
                    client.printError("Disconnected");
                }

            });
            socket.connect();
        } catch (URISyntaxException ex) {
            client.printError("Failed to connect to socket");
        }
    }

    public boolean isConnected() {
        return connected;
    }

    public void disconnect() {
        socket.disconnect();
    }

    public void sendMessage(String input) {
        socket.emit("chat message", input);
    }
}
