import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import moment from 'moment';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
import { LanguageService } from '../language.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-skill-popup',
  templateUrl: './skill-popup.page.html',
  styleUrls: ['./skill-popup.page.scss'],
})
export class SkillPopupPage implements OnInit {
  skillsList: any;
  skillForm : FormGroup;
  IsSkillsListShow: boolean = false;
  degreeListVal: any;
  skillsListVal: any;
  searchSkillResults: string[] = [];
  selectedSkills: any;
  skillList = [];
  searchCtrl = new FormControl('');
  showSkillResults: boolean = false; 
  userId: string;
  edit: boolean = false;
  skillform: any;
  selectedLang: string;
  constructor(public modalController: ModalController,public alertController: AlertController,
    private fb: FormBuilder,private toastController: ToastController,
    public storageservice:StorageService,private elementRef: ElementRef,
    public router :Router,private route: ActivatedRoute, private ngZone: NgZone,public languageService:LanguageService,private renderer: Renderer2,private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) { } 

  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    this.userId = localStorage.getItem("userId");
    this.skillForm = this.fb.group({
      keySkill:[""],
      expertise:[""],
      skillId:[""],
      currentUserId:[""]
    })
   this.getSkillList(); 
   this.route.queryParams.subscribe(params => {
   if (params) { 
      if (params != null || params != undefined ) {  
          this.fetchEditDeatils(params.id); 
        console.log(params);
      }
    }
  });
  } 
  //skill dropDown list
  getSkillList(){
    var getskillListUrl = "api/auth/app/CommonUtility/skillList"; 
    this.storageservice.getrequest(getskillListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.skillList = result["skillList"]; 
      }
   });
  }

  //edit function
  fetchEditDeatils(skillId){
    var getEditValues= "api/auth/app/IndividualProfileDetails/editKeyskill";
    this.skillForm.reset();
    this.selectedSkills= [];
    this.storageservice.getrequest(getEditValues + "?skillId=" + skillId).subscribe(result => {
     if (result["success"] == true) {
      this.edit = true;
      this.selectedSkills = result["skillandCertificationsBean"].keySkill; 
      this.skillForm.patchValue({ 
      'expertise': result["skillandCertificationsBean"].expertise,
      'skillId': result["skillandCertificationsBean"].skillId, 
      })
     }
   });
  }

  // nav bar
  selectedTab: string = 'profile';
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
 
  // skill auto complete starts
  onSearchSkill(value: string) {
    if (value.length > 2) {
      this.showSkillResults = true;
      this.searchSkillResults = this.skillList.filter(Skill => Skill.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.showSkillResults = false;
      this.searchSkillResults = [];
    }
  }

  selectSkill(skill: string,id:string) {
    this.selectedSkills = skill;
    this.showSkillResults = false;
    this.skillForm.patchValue({
      'keySkill':this.selectedSkills
    })
     this.searchSkillResults = [];
    this.searchCtrl.setValue('');
  }

  removeSkill(skill: string) {
    this.selectedSkills = undefined;
  } 
   
  onSliderChange(value){
    this.skillForm.value.expertise = value;
  }
  // skill auto complete starts

   //save
  async saveSkill(){
      if(this.skillForm.value.keySkill  != "" && this.skillForm.value.keySkill  != null && this.skillForm.value.expertise != "" && this.skillForm.value.expertise  != null){
        this.skillForm.value.currentUserId = this.userId;
             
        this.skillform = this.skillForm.value;
        console.log(` data: ${JSON.stringify(this.skillform)}`);
        var saveSkill = "api/auth/app/mobile/saveSkill";
        this.storageservice.postrequest(saveSkill, this.skillform).subscribe(async result => {  
          console.log("Image upload response: " + result)
          if (result["success"] == true) {
            setTimeout(() => {
              const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
              this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
             profilePage.updateData();
            }, 800);
            this.presentToast()
             }else{  
              this.presentToast2(result);

             }
          }); 
       }else{
        this.presentToast1()
       } 
  } 

     //update
  async updateSkill(){
      this.skillForm.value.keySkill = this.selectedSkills
       if(this.skillForm.value.keySkill != "" && this.skillForm.value.keySkill  != null && this.skillForm.value.expertise != "" && this.skillForm.value.expertise  != null){
          this.skillForm.value.keySkill = this.selectedSkills 
          this.skillForm.value.currentUserId = this.userId;
          this.skillform = this.skillForm.value;
          console.log(` data: ${JSON.stringify(this.skillform)}`);
          var updateSkill = "api/auth/app/mobile/updateKeyskillmobile";
          this.storageservice.postrequest(updateSkill, this.skillform).subscribe(async result => {  
          console.log("Image upload response: " + result)
          if (result["success"] == true) {
            setTimeout(() => {
              const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
                this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
             profilePage.updateData();
            }, 800);
          this.updateToast()
          }
         }); 
       }else{
        this.presentToast1()
       } 
  }

  // success toast popup
  async presentToast() {
      const toast = await this.toastController.create({
        message: 'Saved Successfully',
        duration: 3000,
        cssClass: 'custom-toast'
      }); 
  this.router.navigate(['/profile-view']);
  await toast.present();
  }

  async presentToast2(result) {
    const toast = await this.toastController.create({
      message: result["msg"],
      duration: 3000,
      cssClass: 'custom-toast'
    });
  
  await toast.present();
  } 

  //update toast popup
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
  this.router.navigate(['/profile-view']);
  await toast.present();
}
  //required details toast
  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Please fill all details',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
} 

//back button
goto_profileView(){
  this.skillForm.reset();
  this.router.navigate(['/profile-view']);
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
