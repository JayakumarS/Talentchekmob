import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileViewPopupPage } from '../profile-view-popup/profile-view-popup.page';
import { BidsAndAplicationsRecivedPopupPage } from '../bids-and-aplications-recived-popup/bids-and-aplications-recived-popup.page';

@Component({
  selector: 'app-oni-view-job-profile-matches-list',
  templateUrl: './oni-view-job-profile-matches-list.page.html',
  styleUrls: ['./oni-view-job-profile-matches-list.page.scss'],
})
export class OniViewJobProfileMatchesListPage implements OnInit {
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  jobId:any;
  applicationsReceivedList:[];
  matchedList:[];
  orgBidList:[];

  applicationsReceivedCount:number;
  matchedCount:number;
  orgBidCount:number;
  heagerListFlag:Boolean = true;
  matchjobsFlag :Boolean = false;
  recivedAppFlag :Boolean = false;
  bidsRecvFlag :Boolean = false;
  roleId: any;
  currentUserId:any;
  currentUserName:any;
  creditPoints:any;


  constructor(public router:Router,private route: ActivatedRoute,public storageservice: StorageService,public modalController: ModalController,
  private loadingCtrl: LoadingController,public alertController: AlertController) { 

    this.creditPoints = localStorage.getItem("creditPoints") ;
    this.roleId = localStorage.getItem("roleId");
    this.currentUserId = localStorage.getItem("userId");
    this.currentUserName = localStorage.getItem("userName");

    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
          this.jobId = params.jobID;
        }
      }
    });
  }

  ngOnInit() {

    this.getMatchesData();
  }

  goto_matches_list(){

    this.router.navigate(['/oni-job-post-list']);
  }

  getMatchesData(){

    var JobPostListsURL = "api/auth/app/jobportal/viewMatchedProfileList?jobId="+this.jobId;


    const JobPostList = this.storageservice.getrequest(JobPostListsURL).subscribe(result => {

     // this.jobPostList = result['JobAdvertisementList'];

     if(result['success']== true){

      this.applicationsReceivedCount = result['applicationsReceivedList'].length ;
      this.matchedCount = result['matchedList'].length ;
      this.orgBidCount = result['orgBidList'].length ;

      this.applicationsReceivedList = result['applicationsReceivedList'];
      this.matchedList = result['matchedList'];
      this.orgBidList = result['orgBidList'];
     }
      console.log(result);
    });
  }

  matchedProfileList(){

    this.heagerListFlag = false;
    this.matchjobsFlag = true;
  }

  recivedApplicationList(){
   this.heagerListFlag = false;
   this.recivedAppFlag = true;

  }

  bidsreceivedList(){

    this.heagerListFlag = false;
    this.bidsRecvFlag = true;

  }

  async viewBidsRecvProfiles(talentId,bidId){

    if(this.creditPoints < 2){

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
                if (this.roleId.includes('2')) {
                  this.router.navigate(['/subscription-insorg']);
                } else if (this.roleId.includes( '3')) {
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
    
    else{

     const modal = await this.modalController.create({
       component: BidsAndAplicationsRecivedPopupPage,
       cssClass: 'my-custom-class',
       componentProps: {
         "talentId": talentId,
         "jspid":"empty",
         "bidId":bidId
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

  async viewRecivedAppProfiles(talentId,jspId){


    if(this.creditPoints < 2){

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
                if (this.roleId.includes('2')) {
                  this.router.navigate(['/subscription-insorg']);
                } else if (this.roleId.includes( '3')) {
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
    
    else{

     const modal = await this.modalController.create({
       component: BidsAndAplicationsRecivedPopupPage,
       cssClass: 'my-custom-class',
       componentProps: {
         "talentId": talentId,
         "jspid":jspId,
         "bidId":"empty"
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

  async profileView(talentId,accounttype,username) {


    if(this.creditPoints < 2){

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
                } else if (this.roleId.includes( '3')) {
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
    else if(accounttype == "private"){
     this.PrivateUserAccTypeAlert();
    }
    else if (accounttype == "on demand"){
    
    // this.OnDemandUserAccTypeAlert(talentId);
    this.checkOnDemandUserProp(talentId,username);
    }
    else{

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


  checkOnDemandUserProp(action1,username){

    let onDemandUrl =  "api/auth/app/profileLookUp/onDemandRequest?currentUserId="+this.currentUserId+"&approvedId="+action1;

    this.storageservice.getrequest(onDemandUrl).subscribe(async result => {
      
      console.log(result);


      if(result["success"] == true){

        if(result["onDemandStatus"] == "showrequestpopup"){

          this.OnDemandUserAccTypeAlert(action1,username);
        }
        else if(result["onDemandStatus"] == "requested"){

         let message = "Awaiting access permission from user.";
         this.OndemandAccTypeAlert(message);

        }

        else if(result["onDemandStatus"] == "true"){

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

        else if(result["onDemandStatus"] == "false"){

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


  async OnDemandUserAccTypeAlert(talentId,userName) {
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
              "talentid":talentId,
              "username":userName,
              "currentUserId":this.currentUserId,
              "currentUserName":this.currentUserName
            }


            let onDemandUrl =  "api/auth/app/profileLookUp/saveOnDemand";

             this.storageservice.postrequest(onDemandUrl,postData).subscribe(async result => {
      
             console.log(result);

             if (result['success']== true){

              this.storageservice.generalAlertToast("View Access Requested!");
             }
             else if (result['success']== false){

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
