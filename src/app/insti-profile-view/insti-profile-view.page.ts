import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  prof: boolean=false;
  accountHolderName: any;
  accountNumber: any;
  feeCurrency: any;
  feeAmount: any;
  ifscCode: any;
  connectionList: any;
  connectioncard:boolean = false;
  constructor(public router: Router,public storageservice: StorageService) { }

  ngOnInit() {


    this.userId = localStorage.getItem("userId")  ; 
    this.img = localStorage.getItem("profilePic")  ;

    if(this.logo!="null" && this.logo!=""){
      this.prof = true
      // this.profAvatar = false
    }else{

      // this.profAvatar = true
      this.prof = false
      
    }
    
    var profileInstView = "api/auth/app/IndividualProfileDetails/instviewprofiledetails?currentUserId="+this.userId;
    this.storageservice.getrequest(profileInstView).subscribe(result => {
     console.log(result); 

     if(result['profileViewList'][0].connectionList.length != 0 && result['profileViewList'] != null){
      this.connectioncard = true;
      }

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

     ///payment
     this.accountHolderName = result['profileViewList'][0]['accountHolderName'];
     this.accountNumber = result['profileViewList'][0]['accountNumber'];
     this.feeCurrency = result['profileViewList'][0]['feeCurrency'];
     this.feeAmount = result['profileViewList'][0]['feeAmount'];
     this.ifscCode = result['profileViewList'][0]['ifscCode'];
     this.connectionList = result['profileViewList'][0]['connectionList'] 

  })
}




profileinsti(){
  this.router.navigate(['/insti-profile']);

}

Connections()
{
  this.router.navigate(['/connection']) 
}

payment(userId)
{
  let edit = {
    userId
 }
 let navigationExtras: NavigationExtras = {
   queryParams: edit
 };
  this.router.navigate(['/payment'],navigationExtras) 
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
    this.router.navigate(['/oni-job-post']);
  }
  goto_home(){
    this.router.navigate(['/institution-dashboard']);
  }
  goto_profile(){
    this.router.navigate(['/insti-profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  } 
}
