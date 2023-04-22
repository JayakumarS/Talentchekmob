import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';

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
  constructor(public formbuilder: FormBuilder, public router: Router, private route: ActivatedRoute,public storageservice: StorageService) {

    this.forgotform = formbuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
     
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
    this.forgotform.value;
      }
      
  });
}
  //#endregion
  Sign(){

    this.router.navigate(['/reset-password'])
  }
}
