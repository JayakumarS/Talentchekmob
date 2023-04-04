import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-org-profile-view',
  templateUrl: './org-profile-view.page.html',
  styleUrls: ['./org-profile-view.page.scss'],
})
export class OrgProfileViewPage implements OnInit {
  userId: string;
  img: string;
  orglocation: any;
  orgname: any;
  email: any;
  mobile: any;
  industrydomain: any;
  entitytype: any;
  logo: any;
  companysize: any;
  foundedin: any;
  registrationno: any;
  aboutdesc: any;
  prof: boolean=false;
  accountHolderName: any;
  accountNumber: any;
  feeCurrency: any;
  feeAmount: any;
  ifscCode: any;
  connectioncard:boolean = false;
  showDropdownFlag: any;
  connectionList: any;


  constructor(public router: Router,public storageservice: StorageService,public alertController: AlertController) { }

  ngOnInit() {

    this.userId = localStorage.getItem("userId")  ; 
    this.logo = localStorage.getItem("profilePic")  ;


  

    if(this.logo!="null" && this.logo!=""){
      this.prof = true
      // this.profAvatar = false
    }else{

      // this.profAvatar = true
      this.prof = false
      
    }


    
    var profileOrgView = "api/auth/app/IndividualProfileDetails/orgviewprofiledetails?currentUserId="+this.userId;
    this.storageservice.getrequest(profileOrgView).subscribe(result => {
     console.log(result); 

     if(result['profileViewList'][0].connectionList.length != 0 && result['profileViewList'] != null){
      this.connectioncard = true;
      }
                   //profileview ORG
                   this.orglocation = result['profileViewList'][0]['orglocation'];
                   this.orgname = result['profileViewList'][0]['orgname'];
                   this.mobile = result['profileViewList'][0]['phone'];
                   this.email = result['profileViewList'][0]['email'];
                   this.mobile = result['profileViewList'][0]['phone'];
                   this.industrydomain = result['profileViewList'][0]['industrydomain'];
                   this.entitytype = result['profileViewList'][0]['entitytype'];
                   this.logo = result['profileViewList'][0]['logo'];
                   this.companysize = result['profileViewList'][0]['companysize'];
                   this.foundedin = result['profileViewList'][0]['foundedin'];
                   this.registrationno = result['profileViewList'][0]['registrationno'];
                   this.aboutdesc = result['profileViewList'][0]['aboutdesc'];

                   this.accountHolderName = result['profileViewList'][0]['accountHolderName'];
                   this.accountNumber = result['profileViewList'][0]['accountNumber'];
                   this.feeCurrency = result['profileViewList'][0]['feeCurrency'];
                   this.feeAmount = result['profileViewList'][0]['feeAmount'];
                   this.ifscCode = result['profileViewList'][0]['ifscCode'];
                  this.connectionList = result['profileViewList'][0]['connectionList'];


    })
  }



  showDropdown(userId :string) {
    this.showDropdownFlag = userId;
  }

  closeDropdown() {
    this.showDropdownFlag = null;
  }
  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  profileorg(){
    this.router.navigate(['/org-profile']);

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

 

  // footer
  goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/job']);
  }
  goto_home(){
    this.router.navigate(['/organization-dashboard']);
  }
  goto_profile(){
    this.router.navigate(['/org-profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  } 
}
