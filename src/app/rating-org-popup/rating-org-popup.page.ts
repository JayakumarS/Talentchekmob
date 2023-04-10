import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rating-org-popup',
  templateUrl: './rating-org-popup.page.html',
  styleUrls: ['./rating-org-popup.page.scss'],
})
export class RatingOrgPopupPage implements OnInit {

  ExperienceForm: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  expid: any;
  Experience: any;
  constructor(public router:Router, public storageservice:StorageService,public toastController:ToastController,
    public fb: FormBuilder,private route: ActivatedRoute,) { }

  ngOnInit() {

    
    this.ExperienceForm= this.fb.group({
    
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });

   this.route.queryParams.subscribe(params => {
    
     this.expid= params.exp;
      });
  }

    ///rating  star
    countStar(star) {
      this.selectedValue = star;
      this.ExperienceForm.patchValue({
        'rating': this.selectedValue,
        }),
      console.log('Value of star', this.selectedValue);
    }

    updateRatingOrg(){

      if(!this.ExperienceForm.value.remarks && !this.ExperienceForm.value.rating){
        this.router.navigate(['/profile-view']);
      }else if(this.ExperienceForm.value.remarks && this.ExperienceForm.value.rating){
      this.ExperienceForm.value.expId = this.expid;
      this.Experience = this.ExperienceForm.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingOrg";

      this.storageservice.postrequest(updateRatingUrl,this.Experience).subscribe(async result => {  
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