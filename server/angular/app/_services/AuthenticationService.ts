import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    public token: string;
    public socket: any;

    constructor(private http: Http) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', {username: username, password: password, platform: "web"})
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                    if (this.socket == null) {
                        this.connectSocket();
                    } else {
                        this.socket.emit('auth', this.token);
                    }
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
        this.closeSocket();
    }

    connectSocket(): void {
        let self = this;
        if (this.token != null && this.socket == null) {
            self.socket = io('http://localhost:3000');
            self.socket.on('connect', function() {
                if (self.token) {
                    self.socket.emit('auth', self.token);
                } else {
                    self.closeSocket();
                }
            });
        }
    }

    closeSocket(): void {
        if (this.socket != null) {
            this.socket.close();
            this.socket = null;
        }
    }
}
