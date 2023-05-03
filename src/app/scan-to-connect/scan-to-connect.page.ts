import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-scan-to-connect',
  templateUrl: './scan-to-connect.page.html',
  styleUrls: ['./scan-to-connect.page.scss'],
})
export class ScanToConnectPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
  scannedData: any;
  profileImageURL: any;
  empId: string;
  userId: string;
  userName: string;
  scanned_UserId: string;
  scanned_UserName: string;
  scanned_EmailId: string;
  scanned_MobNo: string;

  IsShowProfile: boolean = false;
  talentform: FormGroup;
  relationShipResponse: any;
  isSubmitted: boolean = false;
  isformLoc: boolean = false;

  fromLocationVal: string;
  relationShipVal: string;
  favouriteVal: string;

  iconsArray: any = [1, 2, 3, 4, 5];
  rateOrgVal: number;

  constructor(public router:Router,private barcodeScanner: BarcodeScanner,public storageservice: StorageService,
     public formbuilder: FormBuilder) {

    this.profileImageURL = "assets/img/avatar1.png";
    this.userId = localStorage.getItem("userId")  ; 
    this.favouriteVal = 'No';
    this.rateOrgVal = 0;

    this.talentform = formbuilder.group({
      relationShip: ['', ''],
      fromLocation: ['', ''],
      favourite: ['', ''],
    });
   }

  ngOnInit() {

    this.Bind_Relationship_DD();
    this.BindProfileImage("test");
  }


  scanBarcode() {
    console.log('scanBarcode portion');
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log(`Barcode data: ${JSON.stringify(barcodeData)}`);
      this.scannedData = barcodeData;
      this.IsShowProfile = true;

      var scan_tfId = this.Extract_TFId_FromQRCode(barcodeData.text);

      console.log(scan_tfId);
      this.BindProfileImage(scan_tfId);

    }).catch(err => {
      console.log('Error', err);
    });
  }

  BindProfileImage(scan_tfId: any) {
    console.log('scan_tfId', scan_tfId);
    var url = 'api/auth/app/mobile/editprofiledetails?currentUserId='+scan_tfId;

    this.storageservice.getrequest(url).subscribe(result => {
      console.log(`result data: ${JSON.stringify(result)}`);
      //this.storageservice.hideLoadingIndicator();
      if (result["success"] == true) {
        //Employee details
        var data = result["profileList"][0];

        //To show the values
        if (data["uploadImg"] == null) {
          this.profileImageURL = "assets/img/avatar1.png";
        }

        if (data != null && data["uploadImg"] != null) {
          var dtTicks = new Date();
          var strTicks = dtTicks.getTime().toString().replace('.', '') + dtTicks.getHours() + dtTicks.getMinutes() + dtTicks.getSeconds() + dtTicks.getMilliseconds();
          console.log(`dtTicks Response : ${JSON.stringify(strTicks)}`);

          var photoPath = data["uploadImg"];
          this.profileImageURL = data["uploadImg"];
          console.log("ProfileImageURL: " + this.profileImageURL);
        }

        this.scanned_UserId = scan_tfId;
        this.scanned_UserName = data['firstname'].trim() +' '+ data['lastname'].trim();
        this.scanned_EmailId = data['email'];
        this.scanned_MobNo = data['mobile'];

        //End

      }

    }, error => {
      //this.storageservice.hideLoadingIndicator();
    });

  }

  goto_settings(){
    this.router.navigate(['/settings']);
  }

  Bind_Relationship_DD() {
    var URL = "api/auth/app/IndividualProfileDetails/relationshipList";

    this.storageservice.getrequest(URL).subscribe(result => {
      this.relationShipResponse = result['relationshipList'];
      console.log("relationShipResponse: " + this.relationShipResponse);

    });
  }


  Extract_TFId_FromQRCode(url: any) {
    var tfId = '';
    console.log('url', url);
    var firstArr = url.split('\r\n');
    console.log('firstArr', firstArr);
    if (firstArr.length > 0) {

      //#region To get TFId
      var secondArr = firstArr[0].split(':');
      console.log('secondArr', secondArr);
      if (secondArr.length > 0) {
        var scan_TalentId = secondArr[1].trim();
        console.log('scan_TalentId', scan_TalentId);
        tfId = scan_TalentId;
      }
      //#endregion

      //#region To get Relationship Id
      var relationShipArr = firstArr[1].split(':');
      console.log('relationShipArr', relationShipArr);
      if (relationShipArr.length > 0) {
        var scan_RelationShip = relationShipArr[1].trim();
        console.log('scan_RelationShip', scan_RelationShip);
        this.relationShipVal = scan_RelationShip;
      }
      //#endregion

      //#region To get From location
      var fromLocArr = firstArr[2].split(':');
      console.log('fromLocArr', fromLocArr);
      if (fromLocArr.length > 0) {
        var scan_FromLoc = fromLocArr[1].trim();
        console.log('scan_FromLoc', scan_FromLoc);
        if(scan_FromLoc == null || scan_FromLoc == 'undefined' || scan_FromLoc == '' ){
          this.isformLoc = true;
        }
        this.fromLocationVal = scan_FromLoc;
      }
      //#endregion


    }
    return tfId;
  }

  changeRating(value) {
    console.log(`Event data: ${JSON.stringify(value)}`);
    this.rateOrgVal = value;
  }

  close() {
    this.router.navigate(['/settings']);
  }


  SaveAndInvite() {
    this.isSubmitted = true;
    if (!this.talentform.valid) {
    //  this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
    }
    else {

      var relationShip = this.talentform.controls['relationShip'].value;
      var fromLocation = this.talentform.controls['fromLocation'].value;
      var favourite = this.talentform.controls['favourite'].value;
      console.log("relationShip: " + relationShip);
      console.log("fromLocation: " + fromLocation);
      console.log("favourite: " + favourite);

      var IsFavourite: Boolean = false;
      if (favourite == 'Yes') {
        IsFavourite = true;
      }
      console.log("IsFavourite: " + IsFavourite);

        if (relationShip != "") {
          var postData = {
            "acquaintancePeriodFrom": "",
            "acquaintancePeriodTo": "",
            "favourite": IsFavourite,
            "receiverName": this.scanned_UserName,
            "userId": this.scanned_UserId, 
            "receiverRegistered": true,
            "relationshipAt": fromLocation,
            "relationshipId": relationShip,
            "ratingByInitiator": this.rateOrgVal,
            "currentUserName": this.userName,
            "currentUserId":this.userId,
            "receiverEmailId":this.scanned_EmailId,
            "receiverTalentId":this.scanned_UserId,
            "relationship":relationShip,
            "receiverMobileNo":this.scanned_MobNo,
          }

          console.log(`Save posting data: ${JSON.stringify(postData)}`);

          var saveUrl = "api/auth/app/IndividualProfileDetails/saveConnections";

          this.storageservice.postrequest(saveUrl, postData).subscribe(result => {
            var response = result;
            console.log("Save response: " + response);

            if (result["isSuccess"] == true ) {
              this.storageservice.successToastCustom('Congratulations', 'Your feedback has been saved successfully.');

              let navigationExtras: NavigationExtras = {
                queryParams: {
                  refreshPage: 'yes'
                }
              };
              this.router.navigate(['/home'], navigationExtras);

            }
            else if (result["isSuccess"] == false || result["isSuccess"] == null) {
              var msg = result["message"];
              if (msg == null) {
                msg = "Web service does not give proper message";
              }
              this.storageservice.warningToast(msg);
              this.router.navigate(['/settings']);
            }
          });
        }
        else {
       //   this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('Connections.reqRelationShip'));
        }
    }
  }

}