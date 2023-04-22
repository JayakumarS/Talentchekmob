import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(public formbuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
  }
  Sign(){

    this.router.navigate(['/sign-in'])
  }
  email(id){
      let edit = {
        id
     }
     let navigationExtras: NavigationExtras = {
       queryParams: edit
     };
     this.router.navigate(['/forgotpassword'],navigationExtras)
  
}
  phone(id){
    
      let edit = {
        id
     }
     let navigationExtras: NavigationExtras = {
       queryParams: edit
     };
     this.router.navigate(['/forgotpassword'],navigationExtras)
  }
}
