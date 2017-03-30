import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class NotificationManager {
    private isToastDisplayed: boolean;
    private toast: any;

    private isAlertDisplayed: boolean;
    private alert: any;

    constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {}

    public showSuccessMessage(message: string, duration?: number) {
        let msgDur = duration ? duration : 1000;
        this.show(message, msgDur);
    }

    public showFailureMessage(message: string, duration?: number) {
        let msgDur = duration ? duration : 3500;
        this.show(message, msgDur);
    }

    public showFailureAlert(title, text) {
        if (!this.isAlertDisplayed) {
            this.alert = this.alertCtrl.create({
                title: title,
                subTitle: text,
                buttons: ['OK']
            });

            this.alert.onDidDismiss(_ => this.isAlertDisplayed = false);

            this.alert.present();
            this.isAlertDisplayed = true;
        }
    }

    private show(message: string, duration: number) {
        if (!this.isToastDisplayed) {
            this.toast = this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'bottom'
            });

            this.toast.onDidDismiss(_ => this.isToastDisplayed = false);

            this.toast.present();
            this.isToastDisplayed = true;
        }
    }

}
