import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Router} from "@angular/router";

@Injectable()
export class SocketService {

    public socketReady: EventEmitter<any> = new EventEmitter();
    public socket: any;

    constructor(private router: Router) {
    }

    connectSocket(): void {
        let self = this;
        let token = this.getToken();
        if (token != null && this.socket == null) {
            self.socket = io('http://localhost:3000', {
                query: {
                    token: token
                }
            });
            self.socketReady.emit(self.socket);
            self.socket.on('connect', function () {
                console.log('CONNECTED');

                self.socket.on('token_expired', function () {
                    self.removeToken();
                    self.closeSocket();
                    self.router.navigate(['/login']);
                });

                self.socket.on('disconnect', function () {
                    console.log("DISCONNECTED");
                });
            });
            window.onbeforeunload = function () {
                self.closeSocket();
            };
        }
    }

    closeSocket(): void {
        if (this.socket != null) {
            this.socket.close();
            this.socket = null;
        }
    }

    isActive(): boolean {
        return this.socket != null;
    }

    alertUsers(message): void {
        this.socket.emit('alert', message);
    }

    getSocket() {
        return this.socket;
    }

    private removeToken() {
        localStorage.removeItem('currentUser');
    }

    private getToken() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser && currentUser.token;
    }
}
