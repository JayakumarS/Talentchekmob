import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.page.html',
  styleUrls: ['./profilee.page.scss'],
})
export class ProfileePage implements OnInit {
  industryList =[];
  profileForm:FormGroup;
  categoryList: any;
  hobby = new FormControl();
  hobbyList = [];
  hobbie= [];
  languageList: any;
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder) { }

  ngOnInit() {

    this.getIndustry();
    this.profileForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["",[Validators.required]],
      gender: ["", [Validators.required]],
      dob:["",[Validators.required]],
      dobObj:[""],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)],],
      nationalid: ["",[Validators.required]],
      category: ["",[Validators.required]],
      linkurl:[""],
      details:[""],
      permAddress:[""],
      hobbies:[""],
      languagesknown:[""],
      currentUserId:[""],
    });

    this.hobbeList();
    this.List();
  }


  
  hobbeList () {
    var gethobbyListUrl = "api/auth/app/CommonUtility/hobbyList";
    this.storageservice.getrequest(gethobbyListUrl).subscribe(result => {

      if (result["success"] == true) {
        this.hobbyList = result["hobbyList"];
        console.log(`hobbyList: ${JSON.stringify(this.hobbyList)}`);
      }
    });
  }

  List () {
    var getlanguageListUrl = "api/auth/app/CommonUtility/languageList";
    this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.languageList = result["languageList"];
      }
    });
  }
  education()
  {
    this.router.navigate(['/profile/addEducation']) 
  }
  profileView()
  {
    this.router.navigate(['/profile-view']) 
  }

  getIndustry(){
    var getcategoryListUrl= "api/auth/app/CommonUtility/categoryList";
       
    this.storageservice.getrequest(getcategoryListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.categoryList = result["categoryList"]; 
     }
   });
  }

  

}
