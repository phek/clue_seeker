import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {SocketsComponent} from "./sockets/sockets.component";

export const ROUTES = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sockets',
        component: SocketsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
