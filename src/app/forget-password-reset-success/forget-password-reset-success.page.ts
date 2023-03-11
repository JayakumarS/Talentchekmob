import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-forget-password-reset-success',
  templateUrl: './forget-password-reset-success.page.html',
  styleUrls: ['./forget-password-reset-success.page.scss'],
})
export class ForgetPasswordResetSuccessPage implements OnInit {

  //#region Declaration
  data: any;
  //#endregion

  //#region Constructor
  constructor(public router: Router, private route: ActivatedRoute, private loadingCtrl: LoadingController,
    public storageservice: StorageService) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.data = params;
      }
    });
  }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Button click events
  goto_Login() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        empId: this.data.talentId
      }
    };
    this.router.navigate(['/login'], navigationExtras);
    //this.router.navigate(['/login'])
  }

  goto_ResendEmail(){
    try {
      var talentId = this.data.talentId;
      var name = this.data.name;
      var emailId = this.data.emailId;

      this.showLoadingIndicator(); // Show Loading indicator

      var postData = {
        'nationalId': talentId,
        'name': name,
        'email': emailId
      }

      console.log(`Posting Data: ${JSON.stringify(postData)}`);

      var forgetPassServiceUrl = "/master/forgotpwd/forgotpassword";

      this.storageservice.postrequest(forgetPassServiceUrl, postData).subscribe(result => {

        var response = result;
        console.log("Response: " + response);

        this.hideLoadingIndicator() //Hide loading indicator

        if (result["success"] == true) {
          this.storageservice.successToast("Your password reset link has been sent to your mail id. Thank You!");

          let navigationExtras: NavigationExtras = {
            queryParams: {
              talentId: talentId,
              name: name,
              emailId: emailId
            }
          };
          this.router.navigate(['/forget-password-reset-success'], navigationExtras);

        }
        
      });

      this.hideLoadingIndicator() //Hide loading indicator

    }
    catch (Exception) {
      this.storageservice.warningToast('Connection unavailable!');
      this.hideLoadingIndicator() //Hide loading indicator
    }
  }
  //#endregion

  //#region Functions
  showLoadingIndicator() {
    this.loadingCtrl.create({
      message: 'Processing...',
      spinner: 'bubbles',
      cssClass: 'loadingIndicatorCustom'
    }).then((loading) => {
      loading.present();
    });
  }
  hideLoadingIndicator() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    });
  }
  //#endregion

}
