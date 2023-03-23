import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
 

@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {

  certificationForm: FormGroup;
  userId: string;
  CertificationForm: any;

  constructor(public router:Router,public modalController: ModalController,
    public fb: FormBuilder, 
    public storageservice: StorageService,private toastController: ToastController,) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.certificationForm = this.fb.group({
      certificationName:['', Validators.required],
      issuedBy:['', Validators.required],
      issuedDateObj:['', Validators.required],
      issuedDate:[''],
      expiryDateObj:['', Validators.required],
      expiryDate:[""],
      certificationId:["0"],
       certId:[""],
      currentUserId:[""]
    })
  }
  clubs()
  {
    this.router.navigate(['/profile/addClubs']) 
  }

  experience()
  {
    this.router.navigate(['/profile/addExperience']) 
  }

  loadImageFromDevice(event){
    var file = event.target.files[0].name; 
    this.certificationForm.patchValue({
      'certificationName' : file
    })
    console.log(event);
  }
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: SkillsPopupComponent,
  //     event: ev,
  //     translucent: true,
  //     // styles: { height: '200px', width: '300px' },
  //     cssClass: 'my-popup'
  //   });
  //   return await popover.present();
  // }


  async presentModal() {
   const modal = await this.modalController.create({
      component: SkillPopupPage,
      cssClass: 'my-custom-class1'
    });
    return await modal.present();
  }


  //save
  async saveCertification(){
    const errors = this.checkFormValidity(this.certificationForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: 'Validation Error',
      message: errors.join('<br>'),
      buttons: ['OK']
    });

    await alert.present();
  } else {
     this.certificationForm.value.currentUserId = this.userId;
       
  this.CertificationForm = this.certificationForm.value;
  console.log(` data: ${JSON.stringify(this.CertificationForm)}`);
  var saveSkill = "api/auth/app/mobile/saveCretification";

   this.storageservice.postrequest(saveSkill, this.CertificationForm).subscribe(async result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.router.navigate(['/profile-view']);
      this.presentToast()
       }else{  

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
