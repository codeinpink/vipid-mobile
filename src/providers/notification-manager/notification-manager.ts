import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class NotificationManager {
    private isToastDisplayed: boolean;
    private toast: any;

    constructor(private toastCtrl: ToastController) {}

    public showSuccessMessage(message: string) {
        if (!this.isToastDisplayed) {
            this.toast = this.toastCtrl.create({
                message: message,
                duration: 1000,
                position: 'bottom'
            });

            this.toast.onDidDismiss(_ => this.isToastDisplayed = false);

            this.toast.present();
            this.isToastDisplayed = true;
        }
    }

}
