export class Socket {
    socket_id: String;
    username: String;
    platform: String;
    admin: boolean;

    constructor(socket: any) {
        this.socket_id = socket.socket_id;
        this.username = socket.username;
        this.platform = socket.platform;
        this.admin = socket.admin;
    }
}
