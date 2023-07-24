import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  //#region Declaration
  talentform: FormGroup;
  response: any;
  isSubmitted = false;
  genderVal: string;
  accountTypeVal: string;

  fileTransfer: FileTransferObject = this.transfer.create();
  base64img1: string = '';

  maxDOBVal: string = "";
  splCharRegex: string = "^[^<>{}\"/|;:,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+]*$";
  //#endregion

  //#region Constructor
  constructor(public formbuilder: FormBuilder, public router: Router, public storageservice: StorageService,
    private http: HttpClient, private loadingCtrl: LoadingController, private camera: Camera,
    private transfer: FileTransfer, private file: File, private platform: Platform,
    private translate: TranslateService) {

    this.talentform = formbuilder.group({
      talentId: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-z0-9 ]*$'), Validators.required])],
      name: ['', Validators.pattern(this.splCharRegex)],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
    });

  }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Click events
  submit() {

    this.isSubmitted = true;
    if (!this.talentform.valid) {
      console.log('Please provide all the required values!');
      //this.storageservice.warningToast('Please provide all the required values!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
      return false;
    }
    else {

      console.log(this.talentform.value);


      try {
        var talentId = this.talentform.controls['talentId'].value;
        var name = this.talentform.controls['name'].value;
        var emailId = this.talentform.controls['email'].value;

        this.showLoadingIndicator(); // Show Loading indicator

        var postData = {
          'nationalId': talentId,
          'name': name,
          'email': emailId
        }

        console.log(`Posting Data: ${JSON.stringify(postData)}`);

        var forgetPassServiceUrl = "/master/forgotpwd/forgotpassword";

        this.storageservice.postrequest(forgetPassServiceUrl, postData).subscribe(result => {

          this.response = result;
          console.log(this.response);

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
          else if (result["success"] == false) {
            var msg = result["message"];
            if (msg == null) {
              msg = "Details mismatch. Please enter correct Talent Chek's User Id and Email Id.";
            }
            this.storageservice.warningToast(msg);
          }
          else {
            //this.storageservice.warningToast("Connection unavailable!");
            this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
          }
        });

        this.hideLoadingIndicator() //Hide loading indicator

      }
      catch (Exception) {
        //this.storageservice.warningToast('Connection unavailable!');
        this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
        this.hideLoadingIndicator() //Hide loading indicator
      }
    }
  }

  Cancel(){
    this.router.navigate(['/login']);
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
