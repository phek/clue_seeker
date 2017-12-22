import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {SocketService} from "./SocketService";

@Injectable()
export class AuthenticationService {

    constructor(private socketService: SocketService, private http: Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', {username: username, password: password, platform: "web"})
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                    if (!this.socketService.isActive()) {
                        this.socketService.connectSocket();
                    }
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.removeToken();
        this.socketService.closeSocket();
    }

    removeToken(): void {
        localStorage.removeItem('currentUser');
    }
}
