import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email-visibility',
  templateUrl: './email-visibility.page.html',
  styleUrls: ['./email-visibility.page.scss'],
})
export class EmailVisibilityPage implements OnInit {
  currentUserId: string;
  emailVisForm: FormGroup;
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    public storageservice:StorageService,
    public toastController :ToastController) { 
      this.emailVisForm = this.fb.group({
        emailVisibility: [""], 
        currentUserId: [""]
      });
  }

  ngOnInit() {
    this.currentUserId = localStorage.getItem("userId");
      var geteditVisibilityUrl = "api/auth/app/setting/editAccountDetails?currentUserId=" + this.currentUserId;
       
       this.storageservice.getrequest(geteditVisibilityUrl).subscribe(result => {
        if (result["success"] == true) {
          this.emailVisForm.patchValue({
            'emailVisibility': result["settingBean"]["emailVisibility"]
          }) 
          var value = this.emailVisForm.value.emailVisibility;
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

  // update function
  updateEmailVisibility(){
    this.currentUserId = localStorage.getItem("userId");
   var data = {
     "profileVisibility": "",
     "currentUserId":this.currentUserId,
     "phoneVisibility":"",
     "emailVisibility":this.emailVisForm.value.emailVisibility,
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
