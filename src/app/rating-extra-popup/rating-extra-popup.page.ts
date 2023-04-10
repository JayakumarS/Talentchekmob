import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rating-extra-popup',
  templateUrl: './rating-extra-popup.page.html',
  styleUrls: ['./rating-extra-popup.page.scss'],
})
export class RatingExtraPopupPage implements OnInit {

  ExtracurricularFrom: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  extId: any;
  Extracurricular: any;

  constructor(public router:Router, public storageservice:StorageService,public toastController:ToastController,
    public fb: FormBuilder,private route: ActivatedRoute,) { }

  ngOnInit() {

    this.ExtracurricularFrom= this.fb.group({
    
      remarks: [""],
      rating: [""],
      extId: [""],
      currentUserId: [""]
   });

   this.route.queryParams.subscribe(params => {
    this.extId=params.extId;
      });

  }






    ///rating  star
    countStar(star) {
      this.selectedValue = star;
      this.ExtracurricularFrom.patchValue({
        'rating': this.selectedValue,
        }),
      console.log('Value of star', this.selectedValue);
    }
    updateRatingExt(){

 
      if(!this.ExtracurricularFrom.value.remarks && !this.ExtracurricularFrom.value.rating){
        this.router.navigate(['/profile-view']);
      }else if(this.ExtracurricularFrom.value.remarks && this.ExtracurricularFrom.value.rating){
      this.ExtracurricularFrom.value.extId = this.extId;
      this.Extracurricular = this.ExtracurricularFrom.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingClub";

      this.storageservice.postrequest(updateRatingUrl,this.Extracurricular).subscribe(async result => {  
        if (result["success"] == true) {
          this.presentToast() 
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

    this.router.navigate(['/profile-view']);
  await toast.present();
}
move(){

  this.router.navigate(['/profile-view']); 
}
}
