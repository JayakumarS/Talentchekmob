import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-vcard',
  templateUrl: './profile-vcard.page.html',
  styleUrls: ['./profile-vcard.page.scss'],
})
export class ProfileVcardPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  talentId : string;
  currendUserId: string;
  basicProfileDetails = [];
  educationList = [];
  certificationsList =[];
  clubsList = [];
  experienceList =[];
  constructor( public storageservice: StorageService,public router: Router,private activatedRoute: ActivatedRoute) { 

    this.talentId = this.activatedRoute.snapshot.paramMap.get('param1');
  }

  ngOnInit() {

  //  this.talentId = localStorage.getItem("userId");
    console.log(this.talentId);
    this.currendUserId = localStorage.getItem("userId")  ; 

    var profileViewUrl = "api/auth/app/IndividualProfileDetails/viewmatchesprofile"+"?talentId=" +this.talentId;

    this.storageservice.getrequest(profileViewUrl).subscribe(result => {
    this.basicProfileDetails = result['profileViewList'];
    this.experienceList = result['profileViewList'][0]["experienceList"];
    this.educationList = result['profileViewList'][0]["educationList"];
    this.certificationsList = result['profileViewList'][0]["certificationsList"];
    this.clubsList = result['profileViewList'][0]["clubsList"];
      console.log(result["profileViewList"]); 
       
   });
  }



  dismiss() {
    this.router.navigate(['/home']);
  }

}
