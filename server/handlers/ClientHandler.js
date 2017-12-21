let ClientHandler = module.exports = {
    clients: [],
    add: function (client) {
        ClientHandler.clients.push(client);
    },
    remove: function (socket_id) {
        ClientHandler.clients = ClientHandler.clients.filter(function (item) {
            return item.socket_id !== socket_id;
        });
    },
    auth: function (socket_id, token, username, platform) {
        let index = ClientHandler.clients.findIndex((item => item.socket_id === socket_id));
        ClientHandler.clients[index].token = token;
        ClientHandler.clients[index].username = username;
        ClientHandler.clients[index].platform = platform;
    }
};
