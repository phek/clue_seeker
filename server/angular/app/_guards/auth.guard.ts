import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../_services/AuthenticationService";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthenticationService) {
    }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            if (this.auth.socket == null) {
                this.auth.connectSocket();
            }
            return true;
        } else {
            if (this.auth.socket != null) {
                this.auth.closeSocket();
            }
            this.router.navigate(['/login']);
            return false;
        }
    }
}
