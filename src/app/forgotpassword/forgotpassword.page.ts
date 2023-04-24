import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {

  //#region Declaration
  forgotform: FormGroup;
  //#endregion

  isProfile: boolean = false;
  isAbout: boolean = false;
  email: any;
  constructor(public formbuilder: FormBuilder, public router: Router, private loadingCtrl: LoadingController,
    private route: ActivatedRoute,public storageservice: StorageService,public toastController:ToastController) {

    this.forgotform = formbuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      phoneNo:[""]
    });
  }
  
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params) {

        if (params != null) {
          console.log(params);
        
          if (params.id == 1) {

            this.isProfile = true;
            
          } else if (params.id == 2) {
            this.isAbout = true;
            
          }
        }
      }
      });
  }
  //#region Button click
  pass_click() {
  this.forgotform.value.email;
    var EditprofileDetails = "api/auth/forgotpasswordemail";
    this.storageservice.postrequest(EditprofileDetails ,this.forgotform.value).subscribe(result => {
      if (result["success"] == true) {
    
        this.router.navigate(['/forget-password-reset-success'])

      }  else if (result["success"] == false) {
       
           
        this.presentToast()
    
     this.hideLoadingIndicator(); //Hide loading indicator
   }
      
  });
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Account does not exist for the given value. Please enter correct Information!',
    duration: 3000,
    cssClass: 'custom-toast'
  });
}
hideLoadingIndicator() {
  setTimeout(() => {
    this.loadingCtrl.dismiss();
  });
}
showLoadingIndicator() {
  this.loadingCtrl.create({
    message: 'Processing...',
    spinner: 'bubbles',
    cssClass: 'loadingIndicatorCustom'
  }).then((loading) => {
    loading.present();
  });
}
  //#endregion
  Sign(){

    this.router.navigate(['/reset-password'])
  }
  pass_click1() {
    this.forgotform.value;
      var EditprofileDetails = "api/auth/forgotpasswordphone";
      this.storageservice.postrequest(EditprofileDetails ,this.forgotform.value).subscribe(result => {
        if (result["success"] == true) {
      
          this.router.navigate(['/forget-password-reset-success'])
          
        }  else if (result["success"] == false) {
          var msg = result["msg"];
           if (msg == null) {
             "msg"
           }
       this.storageservice.warningToast(msg);
       this.hideLoadingIndicator(); //Hide loading indicator
     }
        
    });
  }
}
