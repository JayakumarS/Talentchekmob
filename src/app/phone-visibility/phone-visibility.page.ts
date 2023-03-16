import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

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
    public storageservice:StorageService,) { 

      this.phoneVisForm = this.fb.group({
        phoneVisibility: [""], 
        currentUserId: [""]
      });
    }

  ngOnInit() {
    this.currentUserId = 'TFIN10000452331';
      
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

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
 
  goto_visibility(){
    this.router.navigate(['/visibility']) 
  }

  updatePhoneVisibility(){
    this.currentUserId = 'TFIN10000452331';
   var data = {
     "profileVisibility": "",
     "currentUserId":this.currentUserId,
     "phoneVisibility":this.phoneVisForm.value.phoneVisibility,
     "emailVisibility":""

    } 
   //console.log(` data: ${JSON.stringify(data)}`);

   var updateprofileVisibilityUrl = "api/auth/app/setting/updateVisibilityMoblie";

   this.storageservice.postrequest(updateprofileVisibilityUrl, data).subscribe(result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      }
   });
  }

}
