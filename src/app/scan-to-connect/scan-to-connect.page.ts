import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-scan-to-connect',
  templateUrl: './scan-to-connect.page.html',
  styleUrls: ['./scan-to-connect.page.scss'],
})
export class ScanToConnectPage implements OnInit {
  scannedData: any;
  profileImageURL: any;
  empId: string;
  userId: string;
  userName: string;
  scanned_UserId: string;
  scanned_UserName: string;
  scanned_EmailId: string;

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

  constructor(private barcodeScanner: BarcodeScanner,public storageservice: StorageService,
     public formbuilder: FormBuilder) {

    this.profileImageURL = "assets/img/avatar1.png";

    this.favouriteVal = 'No';
    this.rateOrgVal = 0;

    this.talentform = formbuilder.group({
      relationShip: ['', ''],
      fromLocation: ['', ''],
      favourite: ['', ''],
    });
   }

  ngOnInit() {

    this.Bind_Relationship_DD
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
      this.BindProfileImage(scan_tfId);

    }).catch(err => {
      console.log('Error', err);
    });
  }

  BindProfileImage(scan_tfId: any) {
    console.log('scan_tfId', scan_tfId);
    var url = 'api/company/getuserById?userId=' + scan_tfId;

    this.storageservice.getrequest(url).subscribe(result => {
      console.log(`result data: ${JSON.stringify(result)}`);
      //this.storageservice.hideLoadingIndicator();
      if (result["success"] == true) {
        //Employee details
        var data = result["editList"][0];

        //To show the values
        if (data["uploadPhoto"] == null) {
          this.profileImageURL = "assets/img/avatar1.png";
        }

        if (data != null && data["uploadPhoto"] != null) {
          var dtTicks = new Date();
          var strTicks = dtTicks.getTime().toString().replace('.', '') + dtTicks.getHours() + dtTicks.getMinutes() + dtTicks.getSeconds() + dtTicks.getMilliseconds();
          console.log(`dtTicks Response : ${JSON.stringify(strTicks)}`);

          var photoPath = data["uploadPhoto"];
          this.profileImageURL = this.storageservice.getProperImageUrl(photoPath) + "?" + strTicks;
          console.log("ProfileImageURL: " + this.profileImageURL);
        }

        this.scanned_UserId = data['userId'];
        this.scanned_UserName = data['firstName'].trim() + ' ' + data['lastName'].trim();
        this.scanned_EmailId = data['emailId'];

        //End

      }

    }, error => {
      //this.storageservice.hideLoadingIndicator();
    });

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

}
