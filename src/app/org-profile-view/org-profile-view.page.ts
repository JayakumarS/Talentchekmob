import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

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

  constructor(public router: Router,public storageservice: StorageService) { }

  ngOnInit() {

    this.userId = localStorage.getItem("userId")  ; 
    this.img = localStorage.getItem("profilePic")  ;


    
    var profileOrgView = "api/auth/app/IndividualProfileDetails/orgviewprofiledetails?currentUserId="+this.userId;
    this.storageservice.getrequest(profileOrgView).subscribe(result => {
     console.log(result); 


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
