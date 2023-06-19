import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { NavigationEnd } from '@angular/router';
import { LanguageService } from '../language.service';
@Component({
  selector: 'app-organization-dashboard-list',
  templateUrl: './organization-dashboard-list.page.html',
  styleUrls: ['./organization-dashboard-list.page.scss'],
})
export class OrganizationDashboardListPage implements OnInit {
  selectedLang: string;

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  public title: string;
  userId: string;
  creditPoints: any;
  oniList: [];
  applicantsList: [];
  roleId: any;
  currentUserId: any;
  currentUserName: any;
  // mySlicedArray:[];
  mySlicedArray: string[] = [];
  mySlicedArray1: string[] = [];

  constructor(public router: Router, private route: ActivatedRoute, public modalController: ModalController,
    public storageservice: StorageService, public alertController: AlertController, private languageService: LanguageService) {


    this.userId = localStorage.getItem("userId");
    this.creditPoints = localStorage.getItem("creditPoints");
    this.roleId = localStorage.getItem("roleId");
    this.currentUserId = localStorage.getItem("userId");
    this.currentUserName = localStorage.getItem("userName");


    this.route.queryParams.subscribe(params => {
      if (params) {

        if (params != null) {

          console.log(params);
          this.title = params.title;

          if (params.btntype == "applicants") {
            console.log(params)
            this.getAllApplicantList();
          }
          // else if(params.btntype == "referrals")
          // {
          //   console.log(params)
          //   this.getReferralList();
          // }
          else {
            this.getAllList(params.btntype);
          }


        }
      }
    });
  }

  ngOnInit() {
    this.selectedLang = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.split('?')[0] === '/organization-dashboard-list') {
        this.setSelectedTab('apps');
      }
    });

  }

  selectedTab: string = 'apps';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  getAllList(btntype) {
    this.storageservice.showLoading();
    let offset = 0;
    if (btntype == "referrals") {
      var oniDashboardListURL = "api/auth/app/dashboard/referralsDashboardListMob?currentUserId=" + this.userId + "&offset=" + offset;
      this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

        if (result['success'] == true) {
          this.storageservice.dismissLoading();
          this.oniList = result['referralsDashboardList'];
          this.mySlicedArray = this.oniList;
          this.storageservice.dismissLoading();
          this.applicantsList = [];
          console.log(result);

        }

      });

    }
    else {
      var oniDashboardListURL = "api/auth/app/dashboard/oniDashboardListMob?currentUserId=" + this.userId + "&selectedType=" + btntype + "&offset=" + offset;
      this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

        if (result['success'] == true) {
          this.storageservice.dismissLoading();
          this.oniList = result['oniDashboardList'];
          this.mySlicedArray = this.oniList;
          this.storageservice.dismissLoading();
          this.applicantsList = [];
          console.log(result);

        }

      });
    }

  }

  // getReferralList()
  // {

  //   this.storageservice.showLoading();
  //   let offset = 0;
  //   var oniDashboardListURL = "api/auth/app/dashboard/referralsDashboardListMob?currentUserId="+this.userId+"&offset="+offset;
  //   this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

  //     if(result['success'] == true) {
  //       this.storageservice.dismissLoading();  
  //     this.oniList = result['oniDashboardList'];
  //     this.mySlicedArray = this.oniList;
  //     this.storageservice.dismissLoading();
  //     this.applicantsList=[];
  //     console.log(result); 

  // }

  //       });

  // }

  loadMore(event) {
    let length2 = 0;
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params.btntype == "applicants") {
          if (this.mySlicedArray1.length != 0) {
            let length = this.mySlicedArray1.length;
            length2 = length
            console.log(length2)
            var oniDashboardListURL = "api/auth/app/dashboard/jobsDashboardListMob?currentUserId=" + this.userId + "&offset=" + length2;
            this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

              this.applicantsList = result['jobsDashboardList'];
              if (this.applicantsList.length >= 1) {
                this.mySlicedArray1 = this.mySlicedArray1.concat(this.applicantsList);


                this.storageservice.dismissLoading();
              }
              else {

                this.storageservice.dismissLoading();
              }
            });

            event.target.complete();
          }
        }
        else {

          if (this.mySlicedArray.length != 0) {
            let length = this.mySlicedArray.length;
            length2 = length
            console.log(length2)
            var oniDashboardListURL = "api/auth/app/dashboard/oniDashboardListMob?currentUserId=" + this.userId + "&selectedType=" + params.btntype + "&offset=" + length2;

            this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {

              this.oniList = result['oniDashboardList'];
              if (this.oniList.length >= 1) {
                this.mySlicedArray = this.mySlicedArray.concat(this.oniList);


                this.storageservice.dismissLoading();
              }
              else {

                this.storageservice.dismissLoading();
              }
            });

            event.target.complete();
          }

        }
      }
    });


  }



  getAllApplicantList() {

    //api/auth/app/dashboard/jobsDashboardList
    this.storageservice.showLoading();
    let offset = 0;
    var oniDashboardListURL = "api/auth/app/dashboard/jobsDashboardListMob?currentUserId=" + this.userId + "&offset=" + offset;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {
      if (result['success'] == true) {
        this.storageservice.dismissLoading();
        this.applicantsList = result['jobsDashboardList'];
        this.mySlicedArray1 = this.applicantsList;
        this.oniList = [];
        this.storageservice.dismissLoading();

        console.log(result);
      }

    });
  }


  async applicantProfileView(talentId) {

    const modal = await this.modalController.create({
      component: ProfileViewPopupPage,
      cssClass: 'my-custom-class',
      componentProps: {
        "talentId": talentId,
      }
    });
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

  goto_orgHome() {

    this.router.navigate(['/organization-dashboard']);
  }

  // footer nav

  goto_profileSearch() {
    this.router.navigate(['/job-search']);
  }
  goto_jobs() {
    this.router.navigate(['/oni-job-post-list']);
  }
  goto_home() {
    this.router.navigate(['/organization-dashboard']);
  }
  goto_profile() {
    this.router.navigate(['/org-profile-view']);
  }
  goto_more() {
    this.router.navigate(['/settings']);
  }


}
