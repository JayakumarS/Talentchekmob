import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.page.html',
  styleUrls: ['./profile-search.page.scss'],
})
export class ProfileSearchPage implements OnInit {

  //#region Declaration
  userId: string;
  userName: string;
  creditPoints: any;
  empId: string;

  talentform: FormGroup;
  response: any = ['TFIN10000000219', 'TFIN10000000027'];

  modelList = ['Job No', 'Booking No', 'HBL No','MBL No','HAWB No',];
  isSubmitted = false;
  genderVal: string;
  accountTypeVal: string;

  searchby: string;
  searchdata:string;

  fileTransfer: FileTransferObject = this.transfer.create();
  base64img1: string = '';

  maxDOBVal: string = "";

  email: string;
  mobile: any;
  skill: string;
  listResponse: any;
  searchListResponse: any;
  tcId: string;

  baseURL: string = "";
  searchListCount: number = 0;
  //#endregion

  //#region Constructor
  constructor(public formbuilder: FormBuilder, public router: Router, public storageservice: StorageService,
    private http: HttpClient, private loadingCtrl: LoadingController, private transfer: FileTransfer, private file: File, private platform: Platform,
    public alertController: AlertController, private translate: TranslateService) {

    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.creditPoints = localStorage.getItem("creditPoints");
    this.empId = localStorage.getItem("empId");

    this.baseURL = this.storageservice.baseURL;

    // this.BindSearchList();

  }
  //#endregion

  //#region OnInit
  ngOnInit() {
  }
  //#endregion

  //#region Button events
  goto_Dashboard() {
    var userRefFlag = localStorage.getItem("userRefFlag");
    console.log("userRefFlag: " + userRefFlag)
    if (userRefFlag == "IU") {
      this.router.navigate(['/dashboard-individual'])
    }
    else if (userRefFlag == "OU") {
      this.router.navigate(['/dashboard-corporate'])
    }
    else if (userRefFlag == "GU") {
      this.router.navigate(['/dashboard-institution'])
    }
  }

  resetClick() {
    this.email = "";
    this.mobile = "";
    this.tcId = "";

    this.searchListResponse = null;
    this.searchListCount = 0;
  }

  goto_AdvancedSearch() {
    this.router.navigate(['/profile-search-advanced']);
  }

  DismissClick() {

  }
  searchClick() {
    this.BindSearchList();
  }

  openDetailsWithService(userId, emp, userAcctType) {
    console.log("Hitted: " + userId + " EmpId: " + emp);

    if (userAcctType != null) {
      if (userAcctType.toUpperCase() == "PRIVATE" || userAcctType.toUpperCase() == "P") {
        this.PrivateUserAccTypeAlert();
      }
      else if (userAcctType.toUpperCase() == "ONDEMAND" || userAcctType.toUpperCase() == "O") {
        this.OnDemandUserAccTypeAlert(emp);
      }
      else if (userAcctType.toUpperCase() == "PUBLIC" || userAcctType.toUpperCase() == "A") {

        this.DebitTwoPoints_ToViewVerifiedUserDetails(this.userId, userId, emp, "ProfileSearch");

      }
      else {
        this.OkAlert("Invalid user account type! '" + userAcctType + "'");
      }
    }
    else {
      this.storageservice.warningToast('User account type is empty here!');
    }
  }

  BindList() {
    var listURL = "/hrms/master/employeeAdminMaster/listMob";
    var postData = {

      "status1": "0",
      "userRefFlag": "IU",
      "moderator": "Y",
      "empId": this.empId,
      "userId": ""

    }

    this.storageservice.postrequest(listURL, postData).subscribe(result => {
      this.listResponse = result;
      console.log("List: " + this.listResponse);
    });
  }

  BindSearchList() {
    var searchListURL = "/hrms/master/employeeAdminMaster/searchListMob";
    var postData = {

      "emailId": this.email,
      "mobileNo": this.mobile,
      "panNo": "",
      "tf": this.tcId,
      "firstName": "",
      "skillParam": "",
      "compInstParam": "",
      "country": ""

    }
    this.showLoadingIndicator();
    this.storageservice.postrequest(searchListURL, postData).subscribe(result => {
      this.searchListResponse = result["searchList"];
      console.log("Search list: " + this.searchListResponse);
      console.log("Search list count: " + this.searchListResponse.length);
      this.searchListCount = this.searchListResponse.length;

      this.hideLoadingIndicator()
    });

    this.hideLoadingIndicator()
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

  async OnDemandUserAccTypeAlert(empExpId: number) {
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
            console.log("Id: " + empExpId);
            //this.showLoadingIndicator(); // Show Loading indicator

            // try {
            //   var postData = {
            //     'empExpId': empExpId
            //   }

            //   console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

            //   var deleteExperienceServiceUrl = "/hrms/master/employeeAdminMaster/deleteExperiance";

            //   this.storageservice.postrequest(deleteExperienceServiceUrl, postData).subscribe(result => {
            //     console.log(result);

            //     if (result["success"] == true) {
            //       this.storageservice.successToast('Deleted successfully');

            //       //this.BindExistingValues();

            //       this.hideLoadingIndicator(); //Hide loading indicator
            //     }
            //     else if (result["success"] == false) {
            //       var msg = result["message"];
            //       if (msg == null) {
            //         msg = "Web service does not give proper message";
            //       }
            //       this.storageservice.warningToast(msg);
            //       this.hideLoadingIndicator(); //Hide loading indicator
            //     }
            //     else {
            //       this.storageservice.warningToast("Connection unavailable!");
            //       this.hideLoadingIndicator(); //Hide loading indicator
            //     }
            //   });
            // }
            // catch (Exception) {
            //   this.storageservice.warningToast('Connection unavailable!');
            //   this.hideLoadingIndicator(); //Hide loading indicator
            // }

          }
        }
      ]
    });

    await alert.present();
  }

  async OkAlert(alertMsg: string) {
    let alert = await this.alertController.create({
      header: 'Alert!',
      message: alertMsg,
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
  //#endregion

  //#region Functions
  DebitTwoPoints_ToViewVerifiedUserDetails(currentUserId: string, viewUserId: string, viewEmpId: string, fromPage: string) {
    var strURL = "/hrms/master/employeeAdminMaster/debitPointsMob?currentUserId=" + currentUserId + "&viewUserId=" + viewUserId;

    console.log("URL: " + strURL);
    this.storageservice.getrequest(strURL).subscribe(result => {

      if (result != null) {
        var suc = result["success"];
        var cp = result["creditPoint"];
        var eduVerifiedCount = result["eduVerifiedCount"];
        var expVerifiedCount = result["expVerifiedCount"];
        var userViewedCount = result["userViewedCount"];
        var sameOrgUserCount = result["sameOrgUserCount"];
        
        console.log("creditPoint: " + cp);
        console.log("Success 1: " + suc);
        console.log("eduVerifiedCount: " + eduVerifiedCount);
        console.log("expVerifiedCount: " + expVerifiedCount);
        console.log("userViewedCount: " + userViewedCount);
        console.log("sameOrgUserCount: " + sameOrgUserCount);
        
        if (suc) {
          console.log("Success: " + result["success"]);

          if (userViewedCount == 0 && sameOrgUserCount == 0 && (eduVerifiedCount > 0 || expVerifiedCount > 0)) {
            this.storageservice.generalAlertToast("Two points are debitted from your account. Current credit points is " + cp + ".");
          }
          else {
            this.storageservice.generalAlertToast("Current credit points is " + cp + ".");
          }

          let navigationExtras: NavigationExtras = {
            queryParams: {
              psTalentChekId: viewUserId,
              psEmpId: viewEmpId,
              FromPage: fromPage
            }
          };

          this.router.navigate(['/profile-individual-view'], navigationExtras)
        }
        else {
          var msg = result["message"];
          console.log("Error message: " + msg);
          this.storageservice.generalAlertToast(msg);
        }
      }

    });

  }

  showLoadingIndicator() {
    this.loadingCtrl.create({
      message: 'Processing...',
      spinner: 'bubbles',
      cssClass: 'loadingIndicatorCustom'
    }).then((loading) => {
      loading.present();
    });
  }
  hideLoadingIndicator() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    });
  }
  //#endregion

}
