import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {

  userId:string;

  constructor(public router: Router,public storageservice: StorageService) { }

  ngOnInit() {
    this.setSelectedTab('profile');
    this.userId = localStorage.getItem("userId")  ; 

    var indiProfileViewURL = "api/auth/app/IndividualProfileDetails/viewmatchesprofile?talentId="+this.userId;
    this.storageservice.getrequest(indiProfileViewURL).subscribe(result => {
     console.log(result);  
        });
  }
  profile()
  {
    this.router.navigate(['/profilee']) 
  }
  educations()
  {
    this.router.navigate(['/educations']) 
  }
  experiences()
  {
    this.router.navigate(['/work-experiences']) 
  }
  Extracurricular()
  {
    this.router.navigate(['/Extracurricular']) 
  }
  Skill()
  {
    this.router.navigate(['/certification']) 
  }
  Connections()
  {
    this.router.navigate(['/connection']) 
  }
  Additional(){
    this.router.navigate(['/additional-infoo']) 

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