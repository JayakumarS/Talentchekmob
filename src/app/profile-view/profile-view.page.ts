import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  @ViewChild('popover') popover;

  isOpen = false;
  userId:string;
  educationcard:boolean = false;
  clubscard:boolean = false;
  experiencecard:boolean = false;
  skillscard:boolean = false;
  connectioncard:boolean = false;
  certificationcard:boolean = false;
  constructor(public router: Router,public storageservice: StorageService) { }

  ngOnInit() {
    this.setSelectedTab('profile');
    this.userId = localStorage.getItem("userId")  ; 

    var indiProfileViewURL = "api/auth/app/IndividualProfileDetails/viewmatchesprofile?talentId="+this.userId;
    this.storageservice.getrequest(indiProfileViewURL).subscribe(result => {
     console.log(result);   
     if(result['profileViewList'][0].educationList.length != 0 && result['profileViewList'] != null){
      this.educationcard = true;
      }
      if(result['profileViewList'][0].clubsList.length != 0 && result['profileViewList'] != null){
        this.clubscard = true;
        }
        if(result['profileViewList'][0].experienceList.length != 0 && result['profileViewList'] != null){
          this.experiencecard = true;
          }
          if(result['profileViewList'][0].skillList.length != 0 && result['profileViewList'] != null){
            this.skillscard = true;
            }
            if(result['profileViewList'][0].connectionList.length != 0 && result['profileViewList'] != null){
              this.connectioncard = true;
              }
              if(result['profileViewList'][0].certificationsList.length != 0 && result['profileViewList'] != null){
                this.certificationcard = true;
                }
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
    this.router.navigate(['/club']) 
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

  presentPopover() {
   alert(12)
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