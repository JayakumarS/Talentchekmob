import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ReactiveFormsModule } from '@angular/forms';

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
    public storageservice:StorageService,) {
      this.profileVisForm = this.fb.group({
        profileVisibility: [""], 
        currentUserId: [""]
      });
    }

  ngOnInit() {  
      this.currentUserId = 'TFIN10000452331';
      
      var geteditVisibilityUrl = "api/auth/app/setting/editAccountDetails?currentUserId=" + this.currentUserId;
       
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

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  } 
  goto_visibility(){
    this.router.navigate(['/visibility']) 
  }

  updateProfileVisibility(){
     this.currentUserId = 'TFIN10000452331';
    var data = {
      "profileVisibility": this.profileVisForm.value.profileVisibility,
      "currentUserId":this.currentUserId,
      "phoneVisibility":"",
      "emailVisibility":""

     } 
    //console.log(` data: ${JSON.stringify(data)}`);

    var updateprofileVisibilityUrl = "api/auth/app/setting/updateVisibilityMoblie";
 
    this.storageservice.postrequest(updateprofileVisibilityUrl, data).subscribe(result => {  
      this.response = result;
      console.log("Image upload response: " + result)
      if (result["success"] == true) {
       }
    });
   }
 
}
