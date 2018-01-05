import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SocketService} from '../_services/SocketService';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private socketService: SocketService) {
    }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            if (this.socketService.socket == null) {
                this.socketService.connectSocket();
            }
            return true;
        } else {
            if (this.socketService.socket != null) {
                this.socketService.closeSocket();
            }
            this.router.navigate(['/login']);
            return false;
        }
    }
}
