import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
import { LanguageService } from '../language.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-rating-extra-popup',
  templateUrl: './rating-extra-popup.page.html',
  styleUrls: ['./rating-extra-popup.page.scss'],
})
export class RatingExtraPopupPage implements OnInit {

  ExtracurricularFrom: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number[]=[];

  extId: any;
  Extracurricular: any;
  currendUserId: string;
  selectedLang: any;

  constructor(public router:Router, public storageservice:StorageService,public toastController:ToastController,
    public fb: FormBuilder,private route: ActivatedRoute,  public modalController: ModalController,private elementRef: ElementRef,
    public alertController: AlertController, private ngZone: NgZone,public languageService:LanguageService,private renderer: Renderer2,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) { }

  ngOnInit() {

    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);

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


  countStar(star: number) {
      
    const index = this.selectedValue.indexOf(star);
    if (index !== -1) {
      this.selectedValue.splice(index, 1); // If star is already selected, remove it from the array
    } else {
      this.selectedValue.push(star); // If star is not selected, add it to the array
    }

    this.ExtracurricularFrom.patchValue({
      'rating': this.selectedValue.length,
      })
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
              const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
                this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
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
                  const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
                    this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
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
            const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
              this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
           profilePage.updateData();
          }, 800);
       
    }else{

      this.router.navigate(['/profile-view']); 
      setTimeout(() => {
        const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
          this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
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
    const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
      this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform)
    profilePage.updateData();
   }, 800);
  await toast.present();
}
move(){

  this.router.navigate(['/profile-view']); 
  setTimeout(() => {
    const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
      this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
   profilePage.updateData();
  }, 800);
}
}
