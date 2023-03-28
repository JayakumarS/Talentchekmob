import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import moment from 'moment';
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
  selectedSkills: string[] = [];
  skillList = [];
  searchCtrl = new FormControl('');
  showSkillResults: boolean = false; 
  userId: string;
  edit: boolean = false;
  skillform: any;
  constructor(public modalController: ModalController,
    private fb: FormBuilder,private toastController: ToastController,
    public storageservice:StorageService,
    public router :Router) { }
  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.skillForm = this.fb.group({
      keySkill:[""],
      expertise:[""],
      skillId:[""],
      currentUserId:[""]
    })
   this.getSkillList();
   this.fetchEditDeatils();
  } 

  getSkillList(){
    var getskillListUrl = "api/auth/app/CommonUtility/skillList"; 
    this.storageservice.getrequest(getskillListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.skillList = result["skillList"]; 
      }
   });
  }

  fetchEditDeatils(){
    var getEditValues= "api/auth/app/IndividualProfileDetails/editKeyskill";
         
    this.storageservice.getrequest(getEditValues + "?skillId=" + 81).subscribe(result => {
     if (result["success"] == true) {
       this.edit = true;
      const str: string = result["skillandCertificationsBean"].keySkill;
      const arr: string[] = str.split(",");

      for(let i=0;i<arr.length;i++){
        var skill = arr[i]
        this.selectedSkills.push(skill);
      }
       this.skillForm.patchValue({ 
       'expertise': result["skillandCertificationsBean"].expertise,
      'skillId': result["skillandCertificationsBean"].skillId, 
      })
     }
   });
  }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
 
 

    // skill auto complete 
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
    this.selectedSkills.push(skill);
    this.showSkillResults = false;
    this.searchSkillResults = [];
    this.searchCtrl.setValue('');
  }

  removeSkill(skill: string) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
  } 
   
  onSliderChange(value){
    this.skillForm.value.expertise = value;
  }

     //save
     async saveSkill(){
      this.skillForm.value.keySkill = this.selectedSkills
      if(this.skillForm.value.keySkill.length != 0){
           this.skillForm.value.keySkill = this.selectedSkills 
          this.skillForm.value.currentUserId = this.userId;
             
        this.skillForm = this.skillForm.value;
        console.log(` data: ${JSON.stringify(this.skillForm)}`);
        var saveSkill = "api/auth/app/mobile/saveSkill";
      
         this.storageservice.postrequest(saveSkill, this.skillForm).subscribe(async result => {  
            console.log("Image upload response: " + result)
           if (result["success"] == true) {
            this.router.navigate(['/profile-view']);
            this.presentToast()
            this.dismiss();
            }else{  
              this.dismiss();
            }
         }); 
       }else{
        this.presentToast1()
       } 
    } 


     //update
     async updateSkill(){
       if(this.selectedSkills.length != 0){
           this.skillForm.value.keySkill = this.selectedSkills 
          this.skillForm.value.currentUserId = this.userId;
             
        this.skillform = this.skillForm.value;
        console.log(` data: ${JSON.stringify(this.skillform)}`);
        var updateSkill = "api/auth/app/IndividualProfileDetails/updateKeyskill";
      
         this.storageservice.postrequest(updateSkill, this.skillform).subscribe(async result => {  
            console.log("Image upload response: " + result)
           if (result["success"] == true) {
            this.router.navigate(['/profile-view']);
            this.updateToast()
            this.dismiss();
            }else{  
              this.dismiss();
            }
         }); 
       }else{
        this.presentToast1()
       } 
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Saved Successfully',
        duration: 3000,
        cssClass: 'custom-toast'
      });

    await toast.present();
  }

  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Please add the required skills',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
} 
}
