import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async presentAlert(header: string, subHeader: string, message: string, button) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: button
    });

    await alert.present();
  }

  async presentToast(message: string,duration:number, position: "top" | "bottom" | "middle", color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
    });
    toast.present();
  }

}
