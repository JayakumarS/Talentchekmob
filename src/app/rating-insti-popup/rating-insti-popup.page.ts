import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
@Component({
  selector: 'app-rating-insti-popup',
  templateUrl: './rating-insti-popup.page.html',
  styleUrls: ['./rating-insti-popup.page.scss'],
})
export class RatingInstiPopupPage implements OnInit {


  EducationForm: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  eduId: any;
  Education: any;
  currendUserId: string;
  
  constructor(public fb: FormBuilder,private route: ActivatedRoute,   public modalController: ModalController,private elementRef: ElementRef
    ,public alertController: AlertController, private ngZone: NgZone,
    public toastController:ToastController,public router:Router,public storageservice:StorageService,) { }

  ngOnInit() {

    this.EducationForm= this.fb.group({
    
      remarks: [""],
      rating: [""],
      eduId: [""],
      currentUserId: [""]
   });
   this.currendUserId = localStorage.getItem("userId")  ; 
   this.route.queryParams.subscribe(params => {
    
    this.eduId=params.eduId;
     });
  }


    ///rating  star
    countStar(star) {
      this.selectedValue = star;
      this.EducationForm.patchValue({
        'rating': this.selectedValue,
        }),
      console.log('Value of star', this.selectedValue);
    }

    updateRatingOrg(){
      if(this.EducationForm.value.remarks && !this.EducationForm.value.rating){
        this.EducationForm.value.eduId = this.eduId;
        this.EducationForm.value.currendUserId = this.currendUserId;
        this.Education = this.EducationForm.value;
        var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingInst";

        this.storageservice.postrequest(updateRatingUrl,this.Education).subscribe(async result => {  
          if (result["success"] == true) {
           
            this.presentToast()
            setTimeout(() => {
              const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
             profilePage.updateData();
            }, 800); 
          }
        });
      }else if(!this.EducationForm.value.remarks && this.EducationForm.value.rating){

        this.EducationForm.value.eduId = this.eduId;
        this.EducationForm.value.currendUserId = this.currendUserId;
        this.Education = this.EducationForm.value;
        var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingInst";
  
        this.storageservice.postrequest(updateRatingUrl,this.Education).subscribe(async result => {  
          if (result["success"] == true) {
           
            this.presentToast()
            setTimeout(() => {
              const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
             profilePage.updateData();
            }, 800); 
          }
        });
      }
      if(!this.EducationForm.value.remarks && !this.EducationForm.value.rating){
        this.router.navigate(['/profile-view']);
      }else if(this.EducationForm.value.remarks && this.EducationForm.value.rating){
      this.EducationForm.value.eduId = this.eduId;
      this.EducationForm.value.currendUserId = this.currendUserId;
      this.Education = this.EducationForm.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingInst";

      this.storageservice.postrequest(updateRatingUrl,this.Education).subscribe(async result => {  
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

    this.router.navigate(['/profile-view']);
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
