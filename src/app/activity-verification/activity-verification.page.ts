import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-activity-verification',
  templateUrl: './activity-verification.page.html',
  styleUrls: ['./activity-verification.page.scss'],
})
export class ActivityVerificationPage implements OnInit {
  extId: any;
  clubId: any;
  ExtracurricularFrom:FormGroup;
  Extracurricular: any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, public router:Router,public toastController:ToastController,
    public storageservice:StorageService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.clubId=params.clubId;
      this.extId=params.extId;
      });

      this.ExtracurricularFrom = this.fb.group({
        extId: [""],
        currentUserId: [""]
     });
  }



  requestVerification(clubId,extId){
    this.storageservice.showLoading();
    this.ExtracurricularFrom.value.extId = extId;
    this.Extracurricular = this.ExtracurricularFrom.value;
      var saveExtracurricular = "api/auth/app/IndividualProfileDetails/verificationRequestExt";
      this.storageservice.postrequest(saveExtracurricular,this.Extracurricular).subscribe(async result => {  
        if (result["success"] == true) {
          this.storageservice.dismissLoading();
          this.presentToast()

        }
        if(!clubId.includes('TF')){
          let edit = {
            clubId,
            extId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/academic-verifier-details'],navigationExtras)
      
        }else if(clubId.includes('TF')){
          let edit = {
            clubId,
            extId
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/rating-extra-popup'],navigationExtras)
      
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

move(extId){
  let edit = {
    
    extId:extId
 }
 let navigationExtras: NavigationExtras = {
   queryParams: edit
 };
  this.router.navigate(['/rating-extra-popup'],navigationExtras)
}
}
