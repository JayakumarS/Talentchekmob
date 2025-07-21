import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seriveslist',
  templateUrl: './seriveslist.page.html',
  styleUrls: ['./seriveslist.page.scss'],
})
export class SeriveslistPage implements OnInit {

  //#region Constructor
  constructor(public router: Router, public alertController: AlertController) { }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Functions 
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Profile request!',
      message: 'Credit-5 will be deduct for thiss access Do you want to Continue ?',
      cssClass: 'alertclass',
      buttons: [
       /*  {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, */ {
          text: 'Agree',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/service-profile'])
          }
        }
      ]
    });

    await alert.present();
  }
  //#endregion

}
