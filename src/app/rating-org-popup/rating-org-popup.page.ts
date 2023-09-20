import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
import { LanguageService } from '../language.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-rating-org-popup',
  templateUrl: './rating-org-popup.page.html',
  styleUrls: ['./rating-org-popup.page.scss'],
})
export class RatingOrgPopupPage implements OnInit {

  ExperienceForm: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number[]=[];

  expid: any;
  Experience: any;
  expId: any;
  currendUserId: string;
  selectedLang: any;
  constructor(public router:Router, public storageservice:StorageService,public toastController:ToastController,
    public fb: FormBuilder,private route: ActivatedRoute,  public modalController: ModalController,private elementRef: ElementRef
    ,public alertController: AlertController, private ngZone: NgZone,public languageService:LanguageService,private renderer: Renderer2,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) { }

  ngOnInit() {

    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    
    this.ExperienceForm= this.fb.group({
    
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });
   this.currendUserId = localStorage.getItem("userId")  ; 
   this.route.queryParams.subscribe(params => {
    
     this.expId= params.expId;
      });
  }

    countStar(star: number) {
      
      const index = this.selectedValue.indexOf(star);
      if (index !== -1) {
        this.selectedValue.splice(index, 1); // If star is already selected, remove it from the array
      } else {
        this.selectedValue.push(star); // If star is not selected, add it to the array
      }

      this.ExperienceForm.patchValue({
        'rating': this.selectedValue.length,
        })
    }

    updateRatingOrg(){
      if(this.ExperienceForm.value.remarks && !this.ExperienceForm.value.rating){
        this.ExperienceForm.value.expId = this.expId;
        this.ExperienceForm.value.currendUserId = this.currendUserId;
        this.Experience = this.ExperienceForm.value;
        var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingOrg";
  
        this.storageservice.postrequest(updateRatingUrl,this.Experience).subscribe(async result => {  
          if (result["success"] == true) {
            setTimeout(() => {
              const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
                this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
             profilePage.updateData();
            }, 800);
            this.presentToast() 
          }
          });
        
      }else if(!this.ExperienceForm.value.remarks && this.ExperienceForm.value.rating){
      this.ExperienceForm.value.expId = this.expId;
      this.ExperienceForm.value.currendUserId = this.currendUserId;
      this.Experience = this.ExperienceForm.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingOrg";

      this.storageservice.postrequest(updateRatingUrl,this.Experience).subscribe(async result => {  
        if (result["success"] == true) {
          setTimeout(() => {
            const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
              this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
           profilePage.updateData();
          }, 800);
          this.presentToast() 
          
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
      if(!this.ExperienceForm.value.remarks && !this.ExperienceForm.value.rating){
        this.router.navigate(['/profile-view']);
      }else if(this.ExperienceForm.value.remarks && this.ExperienceForm.value.rating){
      this.ExperienceForm.value.expId = this.expId;
      this.ExperienceForm.value.currendUserId = this.currendUserId;
      this.Experience = this.ExperienceForm.value;
      var updateRatingUrl = "api/auth/app/IndividualProfileDetails/updateRatingOrg";

      this.storageservice.postrequest(updateRatingUrl,this.Experience).subscribe(async result => {  
        if (result["success"] == true) {
          setTimeout(() => {
            const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
              this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
           profilePage.updateData();
          }, 800);
          this.presentToast() 
    }else{

      this.router.navigate(['/profile-view']); 
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
    const profilePage = new ProfilePage(this.renderer,this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController,this.languageService,
      this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
   profilePage.updateData();
  }, 800);
}
}
