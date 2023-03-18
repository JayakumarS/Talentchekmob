import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
talentform: FormGroup;
step:any
private stepper: Stepper;
IsSearchListShow: boolean = false;
countryResponseBackup: any;
cityOptions:any;
cityList:[]
base64img1: string = '';
countryResponse: any;
countryVal: string;
countryIdVal:string;
fileTransfer: FileTransferObject = this.transfer.create();
splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
  isSubmitted: boolean;
  response: Object;
  stateResponseBackup: any;
  stateResponse: any;
 


  constructor(public formbuilder: FormBuilder,public router: Router,private camera: Camera,
    public storageservice:StorageService, private transfer: FileTransfer,
     private translate: TranslateService, private loadingCtrl: LoadingController) {

      this.talentform = formbuilder.group({
        firstName: [''],
        lastName: [''],
         password: [''],
        gender: [''],
        phoneNo: [''],
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        dob: [''],    //Only for Android  
        address: [''],
        areaName: [''],
        country: [''],
        stateName: [''],
        pinCode: [''],
        referalCode: [''],
        profileVisibility: ['', ''],
  
      });

     }

  next() {
    this.stepper.next();
  }

  
  onSubmit() {
      this.isSubmitted = true;
      if (!this.talentform.valid) {
        console.log('Please provide all the required values!');
        //this.storageservice.warningToast('Please provide all the required values!');
        this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
        return false;
      }
      else {
        console.log(this.talentform.value);
  
  
        try {
          var firstName = this.talentform.controls['firstName'].value;
          var lastName = this.talentform.controls['lastName'].value;
          var pwd = this.talentform.controls['password'].value;
          var genderVal = this.talentform.controls['gender'].value;
          var phoneNo = this.talentform.controls['phoneNo'].value;
          var emailId = this.talentform.controls['email'].value;
          var dob = this.talentform.controls['dob'].value;
          var refCode = this.talentform.controls['referalCode'].value;
          var profileVisibility = this.talentform.controls['profileVisibility'].value; 
          var address = this.talentform.controls['address'].value;
          var areaName = this.talentform.controls['areaName'].value; 
           var country = this.countryIdVal; //Google search country feature. 
          var stateName = this.talentform.controls['stateName'].value;
          var pinCode = this.talentform.controls['pinCode'].value; 
          console.log("dob: " + dob); 
          var dateOfBirth = this.transformDate(dob);
          console.log("dateOfBirth: " + dateOfBirth);
  
          if (firstName != lastName) { //Validation.
  
            var currentDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); //Currentdate - one year.
            console.log("currentDate: " + currentDate);
            console.log("dateOfBirthAlt: " + dateOfBirth);
            var frm = new Date(new Date(dob).setHours(new Date(dob).getHours() + 0));
            if (frm <= currentDate) {
              var countryID=country.slice(0,2);
              //  if (this.base64img1 != null && this.base64img1 != '' && this.base64img1 != "assets/img/avatar1.png") {
  
                // if (cBoxIAgree == true) {
  
                  // if (cBoxIAgreeConsent == true) {
  
                    //#region Main concept 
                    //this.showLoadingIndicator(); // Show Loading indicator
  
                    var postData = {
  
                      'firstName': firstName,
                      'lastName': lastName,
                      'pwd': pwd,
                      'gender': genderVal,
                      'mobileNo': phoneNo,
                      'emailId': emailId,
                      'dob': dateOfBirth,
                      'referralCode': refCode,
                      'companyCode': '',
                      'isIndv': 'S',
                      'profileVisibility': profileVisibility,
                      'uploadImg': this.base64img1,
  
                      'address': address,
                      'city': areaName,
                      'country': countryID,
                      'state': stateName,
                      'pincode': pinCode,
                      'typeRegister': 'Mobile',
                      'creditPoints': 5,
                      'latitude':0,
                      'longitude':0
  
                    }
  
                    console.log(`Posting Data: ${JSON.stringify(postData)}`);
  
                    var signUpServiceUrl = "api/auth/app/registration/IndividualRegister"; 
                    this.storageservice.postrequest(signUpServiceUrl, postData).subscribe(result => { 
                      this.response = result;
                      console.log(this.response);
  
                      if (result["success"] == true) {
                         this.storageservice.successToastCustom(this.translate.instant('PopupWin.congrats'), this.translate.instant('PopupWin.userAddSucc'));
  
                        var empid = result["empUserId"];
                        var points = result["creditPoints"];
                        let navigationExtras: NavigationExtras = {
                          queryParams: {
                            empId: empid,
                            points: points
                          }
                        };
                        this.router.navigate(['/awesome'], navigationExtras);
                        //this.hideLoadingIndicator(); //Hide loading indicator
                      }
                      else if (result["success"] == false) {
                        var msg = result["message"];
                        if (msg == null) {
                          msg = "Web service does not give proper message";
                        }
                        this.storageservice.warningToast(msg);
                        this.hideLoadingIndicator(); //Hide loading indicator
                      }
                      else {
                       // this.storageservice.warningToast("Connection unavailable!");
                        this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
                        this.hideLoadingIndicator(); //Hide loading indicator
                      }
                    });
                    //#endregion
  
                  // }
                  // else {
                  //   //this.storageservice.warningToast('Please accept the "Consent form.');
                  //   this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsAccConForm'));
                  // }
                // }
                // else {
                //   //this.storageservice.warningToast('Please accept the "Terms and Conditions.');
                //   this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsAccTmNCon'));
                // }
              //  }
              //  else {
              //    //this.storageservice.warningToast('Please upload image.');
              //    this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsUpImg'));
              //  }
            }
            else {
              this.storageservice.warningToast('User must have minimum one year old to register. Future date is not applicable, Please change.');
              this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.userMinOldReg'));
            }
          }
          else {
            this.storageservice.warningToast("First name & last name should not be equal");
            this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.firNmLtNmEql'));
          }
  
        }
        catch (Exception) {
          //this.storageservice.warningToast('Connection unavailable!');
          this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
          this.hideLoadingIndicator(); //Hide loading indicator
        }
      }
    }

  async ngOnInit() {

    var listConstant = await this.initializeItems(); 

    this.step = 1;
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  transformDate(date) {
    return date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10); //YYY-MM-DD
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
  //state list
  async getstatelist(CtryId): Promise<any> {

    console.log(CtryId)
    var industryURL = "api/auth/app/CommonUtility/stateList?countryId="+CtryId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.stateResponseBackup = result["stateList"];
      this.stateResponse = result["stateList"];
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  
    return industryURL;
  }
  getcitylist(stateId,countryId){
   
    console.log(stateId)
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId="+countryId +"&stateId="+stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
     this.cityList = result['cityList'];
     this.cityOptions = result['cityList'];
    console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);
     
  });
  }

  goToSearchSelectedItem(CtryName, CtryId) {
    console.log("InsName: " + CtryName)
    console.log("InsId: " + CtryId)

    this.countryVal = CtryName;
    this.countryIdVal = CtryId;
    this.IsSearchListShow = false;
    this.getstatelist(CtryId);
  }

  goTostateSelectedItem( stateId) {
    //var CtryId =this.talentorgform.value.countryId; 
    var CtryId=this.talentform.value.country.slice(0,2);
    this.getcitylist(stateId,CtryId);
  }
  async initializeItems(): Promise<any> {

    var countryURL = "api/auth/app/CommonUtility/countryList";
    const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
      this.countryResponseBackup = result["countryList"];
      this.countryResponse = result["countryList"];
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });

    return InsList;
  }

  unCheckFocus() {
    // this.ionSearchListShow = false;
  }

  async filterList(evt) {
    if (evt.srcElement.value.length > 2) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsSearchListShow = true;
      this.countryResponse = this.countryResponseBackup;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }

      var countVal = 0;
      this.countryResponse = this.countryResponse.filter(currentCountry => {
        countVal++;
        if (currentCountry.text && searchTerm && countVal < 100) {
          return (currentCountry.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });

      if (this.countryResponse == 0) {
        this.IsSearchListShow = false;
      }
      else {
        this.IsSearchListShow = true;
      }
    }
  }
    else {
      this.IsSearchListShow = false;
    }
  }

  goto_welcome(){

      this.router.navigate(['/hello-dear']) 
  }

  goto_signin(){

    this.router.navigate(['/sign-in']) 
  }


  opengallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
  }

  opencamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;
    }), error => {
      console.log(error);
    })
  }

}
