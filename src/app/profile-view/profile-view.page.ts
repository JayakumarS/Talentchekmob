import { Component, OnInit,  ElementRef, HostListener, ViewChild  } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import {  NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  @ViewChild('popover') popover;
   showDropdownFlag: number;
  isOpen = false;
  userId:string;
  educationcard:boolean = false;
  clubscard:boolean = false;
  experiencecard:boolean = false;
  skillscard:boolean = false;
  connectioncard:boolean = false;
  certificationcard:boolean = false;
  username: any;
  category: any;
  hobbies: any;
  location: any;
  mobile: any;
  email: any;
  language: any;
  skillName: any;
  expertise: any;
  skillList: any;
  education: any;
  experience: any;
  club: any;
  img: any;
   certifications: any;
  prof:boolean=false;
  profAvatar: boolean=false;
  connectionList: any;
  constructor(public router: Router,public storageservice: StorageService,private elementRef: ElementRef,
    public modalController: ModalController,public alertController: AlertController,) { }
  @ViewChild('picker', { static: false })
  pickerInst: any;
 
  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/profile-view') {
        this.setSelectedTab('profile');
      }
    });

     
    this.userId = localStorage.getItem("userId")  ; 
    this.img = localStorage.getItem("profilePic")  ;

    if(this.img!="null" && this.img!=""){
      this.prof = true
      // this.profAvatar = false
    }else{

      // this.profAvatar = true
      this.prof = false
      
    }

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

                    //profileview 
     this.location = result['profileViewList'][0]['userlocation'];
     this.username = result['profileViewList'][0]['username'];
     this.category =result['profileViewList'][0]['category'];
     this.hobbies =result['profileViewList'][0]['hobbies'];
     this.mobile = result['profileViewList'][0]['phone'];
     this.email = result['profileViewList'][0]['email'];
     this.language = result['profileViewList'][0]['languages'];
     

     //skills
     this.skillList = result['profileViewList'][0].skillList;
    //educations
    this.education=result['profileViewList'][0].educationList;
    //experience
    this.experience=result['profileViewList'][0].experienceList;
    //Extracurricular
    this.club=result['profileViewList'][0].clubsList;
    //certifications
    this.certifications= result['profileViewList'][0].certificationsList;
    //connection
    this.connectionList= result['profileViewList'][0].connectionList

        });

     
  }

  updateData() {
     window.location.reload();
  }

  showDropdown(eduId: number) {
    this.showDropdownFlag = eduId;
  }

  closeDropdown() {
    this.showDropdownFlag = null;
  }
  profile()
  {
    this.router.navigate(['/profilee']) 
  }
  educations(id)
  {
    let edit = {
      id
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/educations'],navigationExtras) 
  }
  experiences(id)
  {
    let edit = {
      id
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
     this.router.navigate(['/work-experiences'],navigationExtras) 
  }
  Extracurricular(id)
  {
    let edit = {
      id
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/club'],navigationExtras) 
  }
  Skill(id)
  {
    let edit = {
       id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/skill-popup'], navigationExtras);
  
  }
  certification(id)
  {
    let edit = {
      id
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
   this.router.navigate(['/certification'], navigationExtras);
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
//education verifier
  eduIdverifierCall(eduId,instiId){

    let edit = {
      instiId:instiId,
      edu:eduId,
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/edu-verification'],navigationExtras)
  }
  //experience verifier
  expIdverifierCall(expId,orgId){
    let edit = {
      orgId:orgId,
      expId:expId,
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/exp-verification'],navigationExtras)
  }
  //Extracurricular verifier
  clubIdverifierCall(clubId,orgId){

    let edit = {
      clubId:clubId,
      extId:orgId,
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/activity-verification'],navigationExtras)


  }

  //delete

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //      component: SkillDeletePage,
  //      cssClass: 'my-custom-class1'
  //    });
  //    return await modal.present();
  //  }
  // BindExistingValues() {
  //   var editFamilyServiceUrl = "/hrms/master/employeeAdminMaster/edit?empId=" + this.empId;
  //   var postData = {
  //     'empid': this.empId
  //   }

   async deleteCertificateCard(certId: number) {
    let alert = await this.alertController.create({
      
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + certId);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'certId': certId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteCertification";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.certId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async deleteSkills(skillId: number) {
    let alert = await this.alertController.create({
     
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + skillId);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'skillId': skillId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteKeyskill";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.skillId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async deleteeducation(eduId: number) {
    let alert = await this.alertController.create({
     
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + eduId);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'eduId': eduId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteEducation";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.eduId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async deleteExperiences(expId: number) {
    let alert = await this.alertController.create({
      
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + expId);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'expId': expId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteExperience";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.expId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
  }

  
  async deleteExtracurricular(expId: number) {
    let alert = await this.alertController.create({
    
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + expId);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'expId': expId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteExtracurricular";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.expId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
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