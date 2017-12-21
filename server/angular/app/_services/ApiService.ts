import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Socket} from '../_models/socket';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: Http) {
    }

    getSockets(): Observable<Socket[]> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        if (currentUser) {
            headers.append('x-access-token', currentUser.token);
        }
        return this.http.get('/api/sockets', {headers: headers})
            .map(response => {
                const sockets = response.json();
                return sockets.map((socket) => new Socket(socket));
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}
