import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-delete-my-account',
  templateUrl: './delete-my-account.page.html',
  styleUrls: ['./delete-my-account.page.scss'],
})
export class DeleteMyAccountPage implements OnInit {

  //#region Declaration
  userId: string;
  empId: string;
  //#endregion

  constructor(public storageservice: StorageService, public alertController: AlertController, private translate: TranslateService,
    public router: Router, public nativeStorage: NativeStorage) {

    this.userId = localStorage.getItem("userId");
    this.empId = localStorage.getItem("empId");

  }

  ngOnInit() {
  }

  async deleteMyAccount() {
    let alert = await this.alertController.create({
      header: this.translate.instant('PopupWin.deleteRequest'),
      message: this.translate.instant('PopupWin.RUSureDel'),
      cssClass: 'alertclass',
      buttons: [
        {
          text: this.translate.instant('PopupWin.cancel'),
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('PopupWin.yes'),
          //cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept. 
            try {
              var postData = {
                'empId': this.empId,
                'userId': this.userId                
              }

              console.log(`Delete my account posting data: ${JSON.stringify(postData)}`);

              var deleteServiceUrl = "/hrms/master/employeeAdminMaster/DeleteUserAccountMob";

              this.storageservice.postrequest(deleteServiceUrl, postData).subscribe(result => {
                var response = result;
                console.log(response);

                if (result["success"] == true) {
                  this.storageservice.successToastCustom(this.translate.instant('PopupWin.congrats'), this.translate.instant('PopupWin.delSucfly'));

                  localStorage.removeItem('token');
                  localStorage.removeItem('user_name');
                  localStorage.removeItem('user_mobile');
                  localStorage.removeItem('user_email');
                  localStorage.removeItem('user_address');

                  localStorage.removeItem('Id');
                  localStorage.removeItem('Pwd');
                  localStorage.removeItem('userRefFlag');

                  this.storageservice.publishSomeData({
                    status_get: false
                  });
                  localStorage.clear();

                  this.nativeStorage.clear();

                  this.router.navigate(['/login']);

                }
                else if (result["success"] == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Unable to delete your profile, Please contact support.";
                  }
                  this.storageservice.warningToast(msg);
                }
                else{
                  this.storageservice.warningToast("Unable to delete your profile, Please contact support.");
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast("Unable to delete your profile, Please contact support.");
            }

          }
        }
      ]
    });

    await alert.present();
  }

}
