import {Component, OnInit} from '@angular/core';
import {ApiService} from "../_services/ApiService";
import {Socket} from "../_models/socket";

@Component({
    selector: 'app-sockets',
    templateUrl: './sockets.component.html',
    styleUrls: ['./sockets.component.css']
})
export class SocketsComponent implements OnInit {

    sockets: Socket[] = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.updateData();
    }

    updateData() {
        this.apiService.getSockets().subscribe(
            (sockets) => {
                this.sockets = sockets;
            }
        );
    }

}
