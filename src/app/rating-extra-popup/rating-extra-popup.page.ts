import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
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
  currendUserId: string;

  constructor(public router:Router, public storageservice:StorageService,public toastController:ToastController,
    public fb: FormBuilder,private route: ActivatedRoute,  public modalController: ModalController,private elementRef: ElementRef,
    public alertController: AlertController, private ngZone: NgZone) { }

  ngOnInit() {

    this.ExtracurricularFrom= this.fb.group({
    
      remarks: [""],
      rating: [""],
      extId: [""],
      currentUserId: [""]
   });
   this.currendUserId = localStorage.getItem("userId")  ; 
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
      if(this.ExtracurricularFrom.value.remarks && !this.ExtracurricularFrom.value.rating){
        this.ExtracurricularFrom.value.extId = this.extId;
        this.ExtracurricularFrom.value.currendUserId = this.currendUserId;
        this.Extracurricular = this.ExtracurricularFrom.value;
        var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingClub";
  
        this.storageservice.postrequest(updateRatingUrl,this.Extracurricular).subscribe(async result => {  
          if (result["success"] == true) {
            setTimeout(() => {
              const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
             profilePage.updateData();
            }, 800);
            this.presentToast() 
          }
          });
          }else if(!this.ExtracurricularFrom.value.remarks && this.ExtracurricularFrom.value.rating){
            this.ExtracurricularFrom.value.extId = this.extId;
            this.ExtracurricularFrom.value.currendUserId = this.currendUserId;
            this.Extracurricular = this.ExtracurricularFrom.value;
            var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingClub";
      
            this.storageservice.postrequest(updateRatingUrl,this.Extracurricular).subscribe(async result => {  
              if (result["success"] == true) {
                setTimeout(() => {
                  const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
                 profilePage.updateData();
                }, 800);
                this.presentToast() 
              }
            });

          }
        

      
 
      if(!this.ExtracurricularFrom.value.remarks && !this.ExtracurricularFrom.value.rating){
        this.router.navigate(['/profile-view']);
      }else if(this.ExtracurricularFrom.value.remarks && this.ExtracurricularFrom.value.rating){
      this.ExtracurricularFrom.value.extId = this.extId;
      this.ExtracurricularFrom.value.currendUserId = this.currendUserId;
      this.Extracurricular = this.ExtracurricularFrom.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingClub";

      this.storageservice.postrequest(updateRatingUrl,this.Extracurricular).subscribe(async result => {  
        if (result["success"] == true) {
          this.presentToast() 
          setTimeout(() => {
            const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
           profilePage.updateData();
          }, 800);
       
    }else{

      this.router.navigate(['/profile-view']); 
      setTimeout(() => {
        const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
       profilePage.updateData();
      }, 800);
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
    setTimeout(() => {
    
    this.router.navigate(['/profile-view']);
    const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
    profilePage.updateData();
   }, 800);
  await toast.present();
}
move(){

  this.router.navigate(['/profile-view']); 
  setTimeout(() => {
    const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
   profilePage.updateData();
  }, 800);
}
}
