import {Component} from '@angular/core';
import {SocketService} from "./_services/SocketService";

declare const $;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private socketService: SocketService) {
        this.socketService.socketReady.subscribe(
            (socket) => {
                socket.on('alert', function (message) {
                    let alert_box = $("<div/>", {
                        class: "alert_box",
                        text: message
                    });
                    alert_box.appendTo("#app");
                    let margin = alert_box.outerHeight() + 5;
                    $(".alert_box:not(:last-child)").css("margin-bottom", function (index, curValue) {
                        return parseInt(curValue, 10) + margin + 'px';
                    });
                    alert_box.hide().css('visibility','visible').fadeIn(function () {
                        setTimeout(function () {
                            alert_box.fadeOut(function () {
                                alert_box.remove();
                            });
                        }, 10000);
                    });
                });
            }
        );
    }
}
