import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AuthenticationService} from './_services/AuthenticationService';
import {AuthGuard} from './_guards/auth.guard'

import {AppComponent} from './app.component';
import {ROUTES} from './app.routes';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { SocketsComponent } from './sockets/sockets.component';
import {ApiService} from "./_services/ApiService";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SocketsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
