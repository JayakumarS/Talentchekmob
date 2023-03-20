import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

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
    public storageservice:StorageService,) { 

      this.emailVisForm = this.fb.group({
        emailVisibility: [""], 
        currentUserId: [""]
      });
    }

  ngOnInit() {

    this.currentUserId = 'TFIN10000452331';
      
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

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  goto_visibility(){
    this.router.navigate(['/visibility']) 
  }

  updateEmailVisibility(){
    this.currentUserId = 'TFIN10000452331';
   var data = {
     "profileVisibility": "",
     "currentUserId":this.currentUserId,
     "phoneVisibility":"",
     "emailVisibility":this.emailVisForm.value.emailVisibility,

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