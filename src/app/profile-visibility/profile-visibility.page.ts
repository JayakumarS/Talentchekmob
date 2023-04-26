import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile-visibility',
  templateUrl: './profile-visibility.page.html',
  styleUrls: ['./profile-visibility.page.scss'],
  providers: [FormGroupDirective]
})
export class ProfileVisibilityPage implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  profileVisForm: FormGroup; 
  selectedRadioGroup:any;
  response:any;
  type: string;
  currentUserId:any;
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    public storageservice:StorageService,
    public toastController :ToastController) {
    this.profileVisForm = this.fb.group({
        profileVisibility: [""], 
        currentUserId: [""]
      });
    }

  ngOnInit() {  
      this.currentUserId = localStorage.getItem("userId"); 
       var geteditVisibilityUrl = "api/auth/app/setting/editAccountDetails?currentUserId="
        + this.currentUserId; 
       this.storageservice.getrequest(geteditVisibilityUrl).subscribe(result => {
        if (result["success"] == true) {
          this.profileVisForm.patchValue({
            'profileVisibility': result["settingBean"]["profileVisibility"]
          }) 
          var value = this.profileVisForm.value.profileVisibility;
          console.log(value); 
        }
      }); 
   }

   //nav bar
  selectedTab: string = 'menu'; 
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  } 

  //back button
  goto_visibility(){
    this.router.navigate(['/visibility']) 
  }

  //update Function
  updateProfileVisibility(){
    this.currentUserId = localStorage.getItem("userId"); 
    var data = {
      "profileVisibility": this.profileVisForm.value.profileVisibility,
      "currentUserId":this.currentUserId,
      "phoneVisibility":"",
      "emailVisibility":"" 
     }  
    var updateprofileVisibilityUrl = "api/auth/app/setting/updateVisibilityMoblie"; 
    this.storageservice.postrequest(updateprofileVisibilityUrl, data).subscribe(async result => {  
      this.response = result;
      console.log("Image upload response: " + result)
      if (result["success"] == true) {
        this.presentToast()  
        }
    });
   }

   //update toast popup
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'blue-toast'
    }); 
    this.router.navigate(['/visibility']); 
    await toast.present(); 
  }

   // footer
  goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/job']);
  }
  goto_home(){
    this.router.navigate(['/home']);
  }
  goto_profile(){
    this.router.navigate(['/profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  }
}
