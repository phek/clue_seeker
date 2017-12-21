package li.company.java.client;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import li.company.java.client.helpers.HttpRequest;
import li.company.java.client.models.Parameter;
import org.json.JSONException;
import org.json.JSONObject;

public class Client {

    private static final String SERVER = "http://localhost:3000";

    public static void main(String... args) {
        try {
            String urlParameters = HttpRequest.createParams(
                    new Parameter("username", "test"),
                    new Parameter("password", "test"),
                    new Parameter("platform", "java")
            );
            String response = HttpRequest.executePost(SERVER + "/api/authenticate", urlParameters);
            JSONObject json = new JSONObject(response);
            final String token = json.getString("token");
            final Socket socket = IO.socket(SERVER);
            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    System.out.println("CONNECTED");
                    socket.emit("auth", token);
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
        } catch (URISyntaxException | UnsupportedEncodingException | JSONException ex) {
            ex.printStackTrace();
        }
    }
}
