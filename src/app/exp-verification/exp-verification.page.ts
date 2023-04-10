import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-exp-verification',
  templateUrl: './exp-verification.page.html',
  styleUrls: ['./exp-verification.page.scss'],
})
export class ExpVerificationPage implements OnInit {
  org: any;

  ExperienceForm:FormGroup;
  Experience: any;
  expId: any;
  constructor(public router:Router,private route: ActivatedRoute,public toastController:ToastController,
    private fb: FormBuilder, public storageservice:StorageService) { }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
    this.org=params.orgId;
    this.expId=params.expId;
    });
   
    this.ExperienceForm= this.fb.group({
     
      oniCode:[""],
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });
  }

  requestVerification(org,expId){

    this.ExperienceForm.value.expId = this.expId;
    this.Experience = this.ExperienceForm.value;
      var saveExperience = "api/auth/app/IndividualProfileDetails/verificationRequestExp";
      this.storageservice.postrequest(saveExperience,this.Experience).subscribe(async result => {  
        if (result["success"] == true) {
          this.presentToast()

        }
        if(!org.includes('TF')){
          let edit = {
            org,
            expId:this.expId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/exp-verifier-details'],navigationExtras)
      
        }else if(org.includes('TF')){
          let edit = {
            org,
            expId:this.expId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/rating-org-popup'],navigationExtras)
      
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
  move(org,expId){
    let edit = {
      
      expId:expId
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/rating-org-popup'],navigationExtras)
  }
}
