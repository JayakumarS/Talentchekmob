import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-profile-view-popup',
  templateUrl: './profile-view-popup.page.html',
  styleUrls: ['./profile-view-popup.page.scss'],
})
export class ProfileViewPopupPage implements OnInit {

  talentId : string;
  basicProfileDetails = [];
  educationList = [];
  certificationsList =[];
  clubsList = [];
  experienceList =[];
  constructor( public modalController: ModalController,private navParams: NavParams,public storageservice: StorageService) { }

  ngOnInit() {

    this.talentId = this.navParams.data.talentId;
    console.log(this.talentId);

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
    this.modalController.dismiss();
  }

}
