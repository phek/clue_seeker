import {Component} from '@angular/core';
import {SocketService} from '../_services/SocketService';

declare const $;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    messages: String[] = [];

    constructor(private socketService: SocketService) {
        const self = this;
        this.socketService.socketReady.subscribe(
            (socket) => {
                socket.on('chat message', function (message) {
                    self.addMessage(message);
                });

                socket.on('client connected', function (user) {
                    self.addMessage(user + ' has connected.');
                });

                socket.on('client disconnected', function (user) {
                    self.addMessage(user + ' has disconnected.');
                });
            }
        );
    }

    alertUsers(message) {
        this.socketService.alertUsers(message);
    }

    sendMessage(event) {
        this.socketService.sendMessage(event.target.value);
        event.target.value = '';
    }

    private addMessage(message) {
        const message_box = $('<div/>', {
            class: 'message',
            text: message
        });
        message_box.appendTo('#chat');
        $('#chat').scrollTop($('#chat').height());
    }
}
