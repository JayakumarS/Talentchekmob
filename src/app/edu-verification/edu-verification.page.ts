import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edu-verification',
  templateUrl: './edu-verification.page.html',
  styleUrls: ['./edu-verification.page.scss'],
})
export class EduVerificationPage implements OnInit {
  instiId: any;
  eduId: any;
  EducationForm:FormGroup;
  Education: any;

  constructor(private route: ActivatedRoute, public router:Router,public toastController:ToastController,
    private fb: FormBuilder, public storageservice:StorageService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.instiId=params.instiId;
      this.eduId=params.edu;
      });

      this.EducationForm= this.fb.group({
     
        eduId: [""],
        currentUserId: [""]
     });
  }

  requestVerification(instiId,eduId){

    this.EducationForm.value.eduId = eduId;
    this.Education = this.EducationForm.value;
      var saveEducation = "api/auth/app/IndividualProfileDetails/verificationRequestEdu";
      this.storageservice.postrequest(saveEducation,this.Education).subscribe(async result => {  
        if (result["success"] == true) {
          this.presentToast()

        }
        if(!instiId.includes('TF')){
          let edit = {
            instiId,
            eduId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/edu-verifier-details'],navigationExtras)
      
        }else if(instiId.includes('TF')){
          let edit = {
            instiId,
            eduId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/rating-insti-popup'],navigationExtras)
      
        }
    });
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    
   

  await toast.present();
}

move(eduId){
  let edit = {
    
    eduId:eduId
 }
 let navigationExtras: NavigationExtras = {
   queryParams: edit
 };
  this.router.navigate(['/rating-insti-popup'],navigationExtras)
}

}
