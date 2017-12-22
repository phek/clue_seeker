import {Component, OnInit} from '@angular/core';
import {SocketService} from "../_services/SocketService";

declare const $;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        let socket = this.socketService.getSocket();
        if (socket) {
            socket.on('alert', function (message) {
                $("#alert_box").html(message);
                $("#alert_box").fadeIn(function() {
                    setTimeout(function() {
                        $("#alert_box").fadeOut();
                    }, 3000);
                });
            });
        }
    }

    alertUsers(message) {
        this.socketService.alertUsers(message);
    }

}
