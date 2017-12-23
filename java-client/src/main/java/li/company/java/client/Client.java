package li.company.java.client;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import java.net.URISyntaxException;
import org.json.JSONException;
import org.json.JSONObject;

public class Client {

    private static final String SERVER = "http://localhost:3000";

    public static void main(String... args) throws JSONException {
        try {
            final TokenHandler tokenHandler = new TokenHandler();
            IO.Options opts = new IO.Options();
            opts.query = "username=test&password=test&platform=java";
            final Socket socket = IO.socket(SERVER, opts);
            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    System.out.println("CONNECTED");
                }

            }).on("token", new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    String token = (String) args[1];
                    tokenHandler.setToken(token);
                }
                
            }).on("alert", new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    System.out.println(args[0]);
                }
                
            }).on("chat message", new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    System.out.println((String) args[0]);
                }

            }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    System.out.println("DISCONNECTED");
                }

            });
            socket.connect();

            socket.send("TEST");
        } catch (URISyntaxException ex) {
            ex.printStackTrace();
        }
    }
    
    private static class TokenHandler {

        private String token = null;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
        
    }
}
