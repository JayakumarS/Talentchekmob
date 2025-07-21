import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.page.html',
  styleUrls: ['./connection-list.page.scss'],
})
export class ConnectionListPage implements OnInit {
  roleId: any;
  RoleID: any;
  userId: string;
  connectionList: any;
  mySlicedArray = [];
  imagePath:string;

  @ViewChild('popover') popover;

  isOpen: boolean = false;
  creditPoints: any;
  currentUserId: any;
  currentUserName: any;
  relationship: any;
  selectedLang: string;
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  constructor(public router: Router, public alertController: AlertController, public languageService: LanguageService,
    public modalController: ModalController, public storageservice: StorageService, private route: ActivatedRoute) { 

      this.imagePath = this.storageservice.mobileserverurl;
    }

  ngOnInit() {

    this.selectedLang = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    this.creditPoints = localStorage.getItem("creditPoints");
    this.currentUserId = localStorage.getItem("userId");
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params != null || params != undefined) {
          const relationship = params.p.slice(0, -3)
          this.getconnection(this.currentUserId, relationship);


        }
      }
    });
    this.currentUserName = localStorage.getItem("userName");
    ///this.userId = localStorage.getItem("userId")  ; 
    this.roleId = localStorage.getItem("roleId");
    this.RoleID = this.roleId.split(",", 3);
    // this.getconnection();
  }
  goto_profileView() {
    this.router.navigate(['/profile-view']);
  }
  newOrgprofileView() {
    this.router.navigate(['/org-profile-view']);
  }
  newInstiprofileView() {
    this.router.navigate(['/insti-profile-view']);
  }

  getconnection(userid, relationship) {
    this.storageservice.showLoading();

    let offset = 0;

    var connectionListsURL = "api/auth/app/mobile/ConnectionList";
    console.log(relationship)

    this.storageservice.getrequest(connectionListsURL + "?currentUserId=" + userid + "&relationship=" + relationship + "&offset=" + offset).subscribe(result => {

      // this.jobPostList = result['JobAdvertisementList'];

      if (result['success'] == true) {


        this.storageservice.dismissLoading();
        this.connectionList = result['connectionlist'];
        console.log(this.connectionList);
        this.mySlicedArray = this.connectionList;
        console.log(this.mySlicedArray);

        this.storageservice.dismissLoading();


        // this.matchedCount = result['matchedList'].length ;
        // this.orgBidCount = result['orgBidList'].length ;

        // this.applicationsReceivedList = result['applicationsReceivedList'];
        // this.matchedList = result['matchedList'];
        // this.orgBidList = result['orgBidList'];
      }
      console.log(this.connectionList);
    });
  }
  loadMore(event) {
    let length2 = 0;
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params != null || params != undefined) {
          const relationship = params.p.slice(0, -3)
          console.log(relationship);
          this.relationship = relationship;

        }
      }
    });

    console.log(this.relationship)
    if (this.mySlicedArray.length != 0) {
      let length = this.mySlicedArray.length;
      length2 = length
      console.log(length2)
      var connectionListsURL = "api/auth/app/mobile/ConnectionList";

      this.storageservice.getrequest(connectionListsURL + "?currentUserId=" + this.currentUserId + "&relationship=" + this.relationship + "&offset=" + length2).subscribe(result => {

        this.connectionList = result['connectionlist'];
        if (this.connectionList.length >= 1) {
          this.mySlicedArray = this.mySlicedArray.concat(this.connectionList);


          this.storageservice.dismissLoading();
        }
        else {

          this.storageservice.dismissLoading();
        }
      });

      event.target.complete();
    }
  }

  async profileView(talentId, accounttype, username) {


    if (this.creditPoints < 2) {

      {
        let alert = await this.alertController.create({
          header: 'Credit Points Alert!',
          message: "You're low on credits. Go to Pricing & Credits to recharge.",
          cssClass: 'alertclass',
          buttons: [
            {
              text: '',
              role: 'cancel',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Recharge Now',
              role: 'btn',
              handler: () => {

                if (this.roleId.includes('1')) {
                  this.router.navigate(['/subscription-individual']);
                } else if (this.roleId.includes('2')) {
                  this.router.navigate(['/subscription-insorg']);
                } else if (this.roleId.includes('3')) {
                  this.router.navigate(['/subscription-insorg']);
                }
                //   console.log('Confirm Cancel');
              }
            }
          ]
        });
        await alert.present();
      }
    }
    else if (accounttype == "private") {
      this.PrivateUserAccTypeAlert();
    }
    else if (accounttype == "on demand") {

      // this.OnDemandUserAccTypeAlert(talentId);
      this.checkOnDemandUserProp(talentId, username);
    }
    else {

      const modal = await this.modalController.create({
        component: ProfileViewPopupPage,
        cssClass: 'my-custom-class',
        componentProps: {
          "talentId": talentId,
        }
      });

      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {

          //#region Getting values from popup
          console.table("One: " + dataReturned);
          //#endregion

        }
      });

      return await modal.present();
    }
  }
  checkOnDemandUserProp(action1, username) {

    let onDemandUrl = "api/auth/app/profileLookUp/onDemandRequest?currentUserId=" + this.currentUserId + "&approvedId=" + action1;

    this.storageservice.getrequest(onDemandUrl).subscribe(async result => {

      console.log(result);


      if (result["success"] == true) {

        if (result["onDemandStatus"] == "showrequestpopup") {

          this.OnDemandUserAccTypeAlert(action1, username);
        }
        else if (result["onDemandStatus"] == "requested") {

          let message = "Awaiting access permission from user.";
          this.OndemandAccTypeAlert(message);

        }

        else if (result["onDemandStatus"] == "true") {

          const modal = await this.modalController.create({
            component: ProfileViewPopupPage,
            cssClass: 'my-custom-class',
            componentProps: {
              "talentId": action1,
            }
          });

          modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {

              //#region Getting values from popup
              console.table("One: " + dataReturned);
              //#endregion

            }
          });

          return await modal.present();
        }

        else if (result["onDemandStatus"] == "false") {

          let message = "Access to view profile denied by user."

          this.OndemandAccTypeAlert(message);

        }
      }

    });

  }
  async OndemandAccTypeAlert(Message) {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: Message,
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();

  }
  async OnDemandUserAccTypeAlert(talentId, userName) {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Please send a request to view full profile.',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Send request',
          //cssClass: 'btncss',
          handler: () => {
            console.log('Send request now, Confirm Okay');

            //Main concept.
            console.log("Id: " + talentId);

            var postData = {
              "talentid": talentId,
              "username": userName,
              "currentUserId": this.currentUserId,
              "currentUserName": this.currentUserName
            }


            let onDemandUrl = "api/auth/app/profileLookUp/saveOnDemand";

            this.storageservice.postrequest(onDemandUrl, postData).subscribe(async result => {

              console.log(result);

              if (result['success'] == true) {

                this.storageservice.generalAlertToast("View Access Requested!");
              }
              else if (result['success'] == false) {

                this.storageservice.generalAlertToast("Access Request Failed!");
              }
            });

          }
        }
      ]
    });

    await alert.present();
  }

  async PrivateUserAccTypeAlert() {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: 'This is a private profile, No access to view full details.',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }
}
