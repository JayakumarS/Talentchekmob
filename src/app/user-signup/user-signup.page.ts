import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.page.html',
  styleUrls: ['./user-signup.page.scss'],
})
export class UserSignupPage implements OnInit {

  //#region Constructor
  constructor(public router:Router) { }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Button click events
  goto_userin(){
      this.router.navigate(['/user-information'])
  }
  goto_orgin(){
    this.router.navigate(['/org-information'])
  }
  //#endregion
  
}
