export class Socket {
    socket_id: String;
    username: String;
    token: String;
    platform: String;

    constructor(socket: any) {
        this.socket_id = socket.socket_id;
        this.username = socket.username;
        this.token = socket.token;
        this.platform = socket.platform;
    }
}
