import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-org-profile-view',
  templateUrl: './org-profile-view.page.html',
  styleUrls: ['./org-profile-view.page.scss'],
})
export class OrgProfileViewPage implements OnInit {
  relationship: any;

  doRefresh(event) {
    this.ngOnInit();
      event.target.complete();
  }
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
  orgLogo: string;


  constructor(public router: Router,public storageservice: StorageService,public alertController: AlertController) { 

    interface MyCustomEventInit extends CustomEventInit {
      target?: HTMLElement;
    }

    this.storageservice.refreshDataObservable.subscribe(() => {
      const contentElement = document.getElementById('my-content');
      const eventInit: MyCustomEventInit = {
        detail: {},
        bubbles: true,
        cancelable: true,
        target: contentElement
      };
       this.doRefresh(eventInit);
    });
  }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/org-profile-view') {
        this.setSelectedTab('profile');
      }
    });

    this.userId = localStorage.getItem("userId")  ; 
    this.orgLogo = localStorage.getItem("profilePic")  ;


  

    if(this.orgLogo!="null" && this.orgLogo!=""){
      this.prof = true
      // this.profAvatar = false
    }else{

      // this.profAvatar = true
      this.prof = false
      
    }


    
    var profileOrgView = "api/auth/app/IndividualProfileDetails/orgviewprofiledetails?currentUserId="+this.userId;
    this.storageservice.getrequest(profileOrgView).subscribe(result => {
     console.log(result); 
      if(result["success"] != false){
 
     if(result['profileViewList'] != null && result['profileViewList'].length != 0){
     
      
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
                 

                  if(result['profileViewList'][0].connectionList.length != 0){
                    this.connectioncard = true;
                    this.connectionList = result['profileViewList'][0]['connectionList'];
                  }

                }
              }
    })
  }

  reload(){
    this.storageservice.refreshData();
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

  profileorg1(one){
    let edit = {
    id:one
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/org-profile'],navigationExtras);

  }
  profileorg2(two){
    let edit = {
    id:two
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/org-profile'],navigationExtras);

  }
  profileimg(id){
    let edit = {
      id
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
  
    this.router.navigate(['/org-profile'],navigationExtras);
  
  
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

 go_to_list(p){
  let edit = {
    p
 }
 let navigationExtras: NavigationExtras = {
   queryParams: edit
 };
  this.router.navigate(['/connection-list'],navigationExtras);

 }

  // footer
  goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/oni-job-post-list']);
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
