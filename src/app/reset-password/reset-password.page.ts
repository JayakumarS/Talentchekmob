import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  selectedLang: string;

  constructor(public formbuilder: FormBuilder, public router: Router,public languageService:LanguageService) { }

  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
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
