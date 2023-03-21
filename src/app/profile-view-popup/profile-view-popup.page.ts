import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile-view-popup',
  templateUrl: './profile-view-popup.page.html',
  styleUrls: ['./profile-view-popup.page.scss'],
})
export class ProfileViewPopupPage implements OnInit {

  talentId : string;

  constructor( private navParams: NavParams,public storageservice: StorageService) { }

  ngOnInit() {

    this.talentId = this.navParams.data.talentId;
    console.log(this.talentId);

    var profileViewUrl = "api/auth/app/IndividualProfileDetails/viewmatchesprofile"+"?talentId=" +this.talentId;

    this.storageservice.getrequest(profileViewUrl).subscribe(result => {
    //  this.basicprofilesearchList = result['basicprofilesearchList'];
      console.log(result);

   });
  }

  

}
