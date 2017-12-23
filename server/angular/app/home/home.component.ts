import {Component} from '@angular/core';
import {SocketService} from "../_services/SocketService";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private socketService: SocketService) {
    }

    alertUsers(message) {
        this.socketService.alertUsers(message);
    }

}
