import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {

  //#region Declaration
  forgotform: FormGroup;
  //#endregion

  //#region Constructor
  constructor(public formbuilder: FormBuilder, public router: Router) {

    this.forgotform = formbuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],

    });
  }
  //#endregion

  //#region Button click
  pass_click() {
    this.router.navigate(['/login'])
  }
  //#endregion
  
}
