import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-phone-visibility',
  templateUrl: './phone-visibility.page.html',
  styleUrls: ['./phone-visibility.page.scss'],
})
export class PhoneVisibilityPage implements OnInit {
  currentUserId: string;
  phoneVisForm: FormGroup; 
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    public storageservice:StorageService,public toastController :ToastController) {  
      this.phoneVisForm = this.fb.group({
        phoneVisibility: [""], 
        currentUserId: [""]
      });
    }

  ngOnInit() {
    this.currentUserId = localStorage.getItem("userId"); 
      var geteditVisibilityUrl = "api/auth/app/setting/editAccountDetails?currentUserId=" + this.currentUserId;
      this.storageservice.getrequest(geteditVisibilityUrl).subscribe(result => {
        if (result["success"] == true) {
          this.phoneVisForm.patchValue({
            'phoneVisibility': result["settingBean"]["phoneVisibility"]
          }) 
          var value = this.phoneVisForm.value.phoneVisibility;
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

  //update function
  updatePhoneVisibility(){
    this.currentUserId = localStorage.getItem("userId");
      var data = {
     "profileVisibility": "",
     "currentUserId":this.currentUserId,
     "phoneVisibility":this.phoneVisForm.value.phoneVisibility,
     "emailVisibility":"" 
    }  
   var updateprofileVisibilityUrl = "api/auth/app/setting/updateVisibilityMoblie"; 
   this.storageservice.postrequest(updateprofileVisibilityUrl, data).subscribe(result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.presentToast()
      }
   });
  }

  // success toast popup
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
