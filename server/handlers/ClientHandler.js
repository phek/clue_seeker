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
    find: function (socket_id) {
        let index = ClientHandler.clients.findIndex((item => item.socket_id === socket_id));
        return ClientHandler.clients[index];
    }
};
