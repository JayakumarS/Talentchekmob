import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ModalController } from '@ionic/angular';
import { LanguageService } from '../language.service';


@Component({
  selector: 'app-profile-view-popup',
  templateUrl: './profile-view-popup.page.html',
  styleUrls: ['./profile-view-popup.page.scss'],
})
export class ProfileViewPopupPage implements OnInit {
  selectedLang: string;
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  talentId: string;
  currendUserId: string;
  basicProfileDetails = [];
  educationList = [];
  certificationsList = [];
  clubsList = [];
  experienceList = [];
  imagePath:string;
  constructor(public modalController: ModalController, public languageService: LanguageService, private navParams: NavParams, public storageservice: StorageService) { }

  ngOnInit() {


    this.selectedLang = localStorage.getItem('selectedLang');
    this.imagePath = this.storageservice.mobileserverurl;
    this.languageService.setLanguage(this.selectedLang);
    this.talentId = this.navParams.data.talentId;
    console.log(this.talentId);
    this.currendUserId = localStorage.getItem("userId");
    this.lessCredit();
    var profileViewUrl = "api/auth/app/IndividualProfileDetails/viewmatchesprofile" + "?talentId=" + this.talentId;

    this.storageservice.getrequest(profileViewUrl).subscribe(result => {
      this.basicProfileDetails = result['profileViewList'];
      this.experienceList = result['profileViewList'][0]["experienceList"];
      this.educationList = result['profileViewList'][0]["educationList"];
      this.certificationsList = result['profileViewList'][0]["certificationsList"];
      this.clubsList = result['profileViewList'][0]["clubsList"];
      console.log(result["profileViewList"]);

    });
  }

  lessCredit() {

    var lessCreditURL = "api/auth/app/CommonUtility/creditPointdebit?talentId=" + this.currendUserId + "&id=" + this.talentId;
    this.storageservice.getrequest(lessCreditURL).subscribe(result => {
      if (result["success"] == true) {
        console.log(result);
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
