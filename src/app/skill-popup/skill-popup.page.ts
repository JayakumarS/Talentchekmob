import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  }

  
 
  getSkillList(){
    var getskillListUrl = "api/auth/app/CommonUtility/skillList"; 
    this.storageservice.getrequest(getskillListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.skillList = result["skillList"]; 
      }
   });
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
     const errors = this.checkFormValidity(this.skillForm);
  
    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: 'Validation Error',
        message: errors.join('<br>'),
        buttons: ['OK']
      });
  
      await alert.present();
    } else {
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

    checkFormValidity(form: FormGroup): string[] {
      const errors: string[] = [];
      
      // Check each form control for errors
      Object.keys(form.controls).forEach(key => {
        const controlErrors: ValidationErrors = form.controls[key].errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            errors.push(`${key} ${keyError}`);
          });
        }
      });
    
      return errors;
    }

}
