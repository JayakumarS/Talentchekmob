import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../auth/login-Info';
import { StorageService } from '../storage.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginform: FormGroup;
  fcmToken: any;
  private loginInfo: AuthLoginInfo;
  error = "";

  passwordType: string = 'password';
  passwordIcon: string = 'eye'; 
 
  constructor(public formbuilder: FormBuilder,public router: Router,private fcm: FCM,
    public storageservice: StorageService,private nativeStorage: NativeStorage) { 

    this.loginform = formbuilder.group({
      userName: ['', Validators.required],
       password: ['', Validators.required],
       otpValue: [""],
      userNameEmailId: [""],
      recaptchaResponse: [""],


    });
  }

  ngOnInit() {}


  get f() {
    return this.loginform.controls;
  }

  passwordToggle() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye';
    }
  }

  goto_signup(){

    this.error = "";
    this.storageservice.showLoading();
    if (this.loginform.invalid) {
      this.error = "Invalid credentials";
      this.storageservice.dismissLoading();
      return;
    }
    else{

      this.loginInfo = new AuthLoginInfo(
        this.f.userName.value, this.f.password.value, this.f.otpValue.value, this.f.userNameEmailId.value, this.f.recaptchaResponse.value);


        this.storageservice.attemptAuth(this.loginInfo).subscribe(
          data => {
  
            if (data) {
              
              if (data.success) {
                this.storageservice.dismissLoading();
                console.log(data);
                localStorage.setItem('userId', data["username"]);
                localStorage.setItem('userName', data["firstNameLastName"]);
                localStorage.setItem('creditPoints', data["creditpoint"]);
                localStorage.setItem('email', data["empId"]);
                localStorage.setItem('profilePic', data["imgurl"]);
                localStorage.setItem('access', data["accessToken"]);
                localStorage.setItem("tokenType: ", data["tokenType"]);
                localStorage.setItem('categoryType', data["categoryType"]);
                localStorage.setItem('isloggedIn', "true");
        
                localStorage.setItem('isloggedIn', "true");
        
                localStorage.setItem('roleId', data["defaultRoleId"]);
                localStorage.setItem('countryCode', data["countryCode"]);
        
                console.log("profilePic: " + data["imgurl"])
                console.log("access: " + data["accessToken"])
                console.log("userName: " + data["username"])
                console.log("tokenType: " + data["tokenType"])



                this.fcm.getToken().then(token => {
                  console.log("FCM token123", token);
                  this.nativeStorage.setItem('FCMToken', token)
                  localStorage.setItem('FCMToken', token);
    
                  this.SaveFCMTokenAndUUID(data["username"]);
                  console.log("SaveFCMTokenAndUUID 2");
                });

  
                if (data.roles[0].roleId.includes('1')) {
                  this.router.navigate(['/home']);
                } else if (data.roles[0].roleId.includes('2')) {
                  this.router.navigate(['/organization-dashboard']);
                } else if (data.roles[0].roleId.includes( '3')) {
                  this.router.navigate(['/institution-dashboard']);
                }
                else if (data.roles[0].roleId.includes('5')) {
                  this.router.navigate(['/job-search']);
                }


              }
              else {
                this.storageservice.dismissLoading();
                this.error = data.message;
              }
  
            } else {
              this.storageservice.dismissLoading();
              this.error = "Invalid Login";
            }
  
  
          },
          error => {
            this.storageservice.dismissLoading();
            this.error = "Server Down!!!";
            console.log(error);
  
          },
       //  grecaptcha.reset()
        );
  
      }

 
     

  //  this.router.navigate(['/job-search']) 
  }
  register(){

    this.router.navigate(['/register-cat'])
  }
  reset(){

    this.router.navigate(['/reset-password'])
  }
  Forgotpass(){
    this.router.navigate(['/job-search']) 
  }


  SaveFCMTokenAndUUID(userIdStr: string) {
    console.log("Before1");
    // var uuidStr = "";
    // this.uniqueDeviceID.get().then((uuid: any) => {
    //   console.log("UUID: " + uuid);
    var uuidStr = "";//uuid;

    console.log("Inside 2" + uuidStr);

    var updateGcmtokenURL = "/api/auth/app/mobile/updateGcmtoken";
    this.fcmToken = localStorage.getItem("FCMToken");
    console.log("login page123", this.fcmToken);
    var postDataGCM = {
      "gcmToken": this.fcmToken,
      "uuid": uuidStr,
      "currentUserId": userIdStr
    }
    console.log(`postDataGCM2: ${JSON.stringify(postDataGCM)}`);
    console.log("URL2: " + updateGcmtokenURL);
    this.storageservice.postrequest(updateGcmtokenURL, postDataGCM).subscribe(result => {
      console.log(result);
      console.log("updateGcmtoken result2: " + result["success"]);
    });

    // })
    //   .catch((error: any) => console.log(error));

    console.log("Before2");
  } 

}
