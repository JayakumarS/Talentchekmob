import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-insti-profile-view',
  templateUrl: './insti-profile-view.page.html',
  styleUrls: ['./insti-profile-view.page.scss'],
})
export class InstiProfileViewPage implements OnInit {
  userId: string;
  img: string;
  email: any;
  entitytype: any;
  foundedin: any;
  instlocation: any;
  instname: any;
  mobile: any;
  industrydomain: any;
  logo: any;
  aboutdesc: any;
  registrationno: any;
  companysize: any;

  constructor(public router: Router,public storageservice: StorageService) { }

  ngOnInit() {


    this.userId = localStorage.getItem("userId")  ; 
    this.img = localStorage.getItem("profilePic")  ;


    
    var profileInstView = "api/auth/app/IndividualProfileDetails/instviewprofiledetails?currentUserId="+this.userId;
    this.storageservice.getrequest(profileInstView).subscribe(result => {
     console.log(result); 

     //profileview INSTI
     this.instlocation = result['profileViewList'][0]['instlocation'];
     this.instname = result['profileViewList'][0]['instname'];
     this.mobile = result['profileViewList'][0]['phone'];
     this.email = result['profileViewList'][0]['email'];
     this.industrydomain = result['profileViewList'][0]['industrydomain'];
     this.entitytype = result['profileViewList'][0]['entitytype'];
     this.logo = result['profileViewList'][0]['logo'];
     this.companysize = result['profileViewList'][0]['companysize'];
     this.foundedin = result['profileViewList'][0]['foundedin'];
     this.registrationno = result['profileViewList'][0]['registrationno'];
     this.aboutdesc = result['profileViewList'][0]['aboutdesc'];

  })
}








  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  // footer
  goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/job']);
  }
  goto_home(){
    this.router.navigate(['/home']);
  }
  goto_profile(){
    this.router.navigate(['/profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  } 
}
