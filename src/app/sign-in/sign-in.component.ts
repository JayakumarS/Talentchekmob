import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginInfo } from '../auth/login-Info';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginform: FormGroup;
  private loginInfo: AuthLoginInfo;
  error = "";

  passwordType: string = 'password';
  passwordIcon: string = 'eye'; 
 
  constructor(public formbuilder: FormBuilder,public router: Router,public storageservice: StorageService) { 

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

}
