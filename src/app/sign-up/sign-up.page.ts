import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ConsentFormPage } from '../consent-form/consent-form.page';
import { TcFormPage } from '../tc-form/tc-form.page';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  selectedState: any;
  showCityResults: boolean= false;
  selectedCity: string;

  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 10);
    return maxDate.toISOString().split('T')[0];
  }
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
  showcountyResults : boolean = false;
  showStateResults : boolean = false;
  selectedCountry: any;
  showResults: boolean = false; 
  searchResults: string[] = [];
  searchStateResults: string[] = [];
  searchCityResults: string[] = [];
  countrysearchCtrl = new FormControl('');
  statesearchCtrl = new FormControl('');
  citySearchCtrl = new FormControl('');
  countryId: string;
  cBoxIAgreeVal: boolean = true;
  cBoxIAgreeConsentVal: boolean = true;
  passwordType: string = 'password';
  passwordIcon: string = 'eye'; 

  constructor(public formbuilder: FormBuilder,public router: Router,private camera: Camera,
    public storageservice:StorageService, private transfer: FileTransfer,public modalController: ModalController,
     private translate: TranslateService, private loadingCtrl: LoadingController) {

      this.talentform = formbuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.splCharRegex), Validators.required])],
        lastName: ['', Validators.compose([Validators.pattern(this.splCharRegex), Validators.required])],
         password: ['', Validators.required],
        gender: ['', Validators.required],
        phoneNo: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        dob: ['', Validators.required],    //Only for Android  
        address: [''],
        areaName: ['' ,Validators.required],
        country: ['', Validators.required],
        stateName: ['', Validators.required],
        pinCode: ['', Validators.required],
        referalCode: [''],
        // profileVisibility: ['', Validators.required],
        uploadImg: ['', Validators.required],
        cBoxIAgree:[''],
        cBoxIAgreeConsent:['']
  
      });

     }

  next() {
    this.stepper.next();
  }

  limitInputLength($event, maxLength=25) {
    if($event.target.value.length>=maxLength) {
        $event.preventDefault();
        return;
    }
}

  
  opengallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;
      this.talentform.patchValue({
        'uploadImg': this.base64img1,
      })
      console.log(this.base64img1);
    }), error => {
      console.log(error);
    })

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
      this.talentform.patchValue({
        'uploadImg': this.base64img1,
      })
      console.log(this.base64img1);
    }), error => {
      console.log(error);
    })
  }

  
  onSubmit() {
    this.storageservice.showLoading();
      this.isSubmitted = true;
      if (!this.talentform.valid) {
        this.storageservice.dismissLoading();
        console.log('Please provide all the required values!');
        //this.storageservice.warningToast('Please provide all the required values!');
        this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
        return false;
      }
      else {
        this.storageservice.showLoading();
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
          // var profileVisibility = this.talentform.controls['profileVisibility'].value; 
          var address = this.talentform.controls['address'].value;
          var areaName = this.talentform.controls['areaName'].value; 
           var country = this.talentform.controls['country'].value;
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
                 if (this.base64img1 != null && this.base64img1 != '' && this.base64img1 != "assets/img/avatar1.png") {
  
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
                      // 'profileVisibility': profileVisibility,
                      'uploadImg': this.base64img1,
  
                      'address': address,
                      'city': areaName,
                      'country': country,
                      'state': stateName,
                      'pincode': pinCode,
                      'typeRegister': 'Mobile',
                      'creditPoints': 5,
                      'latitude':0,
                      'longitude':0
  
                    }
                    localStorage.setItem('emailId', postData.emailId);
                    console.log(`Posting Data: ${JSON.stringify(postData)}`);
  
                    var signUpServiceUrl = "api/auth/app/registration/IndividualRegister";
                    this.storageservice.postrequest(signUpServiceUrl, postData).subscribe(result => { 
                      this.response = result;
                      console.log(this.response);
  
                      if (result["success"] == true) {
                        this.storageservice.dismissLoading();
                         //this.storageservice.successToastCustom(this.translate.instant('PopupWin.congrats'), this.translate.instant('Registration Successful.  Please check your inbox to confirm your email address.'));
  
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
                           var msg = result["msg"];
                            if (msg == null) {
                              "msg"
                            }
                            this.storageservice.dismissLoading();
                        this.storageservice.warningToast(msg);
                        this.hideLoadingIndicator(); //Hide loading indicator
                      }
                      else {
                        this.storageservice.dismissLoading();
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
               }  //img if condition ends
               else {
                 this.storageservice.warningToast('Please upload image.');
                 this.storageservice.dismissLoading();
                 //this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsUpImg'));
               }
            }
            else {
              this.storageservice.dismissLoading();
              this.storageservice.warningToast('User must have minimum one year old to register. Future date is not applicable, Please change.');
              this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.userMinOldReg'));
            }
          }
          else {
            this.storageservice.dismissLoading();
            this.storageservice.warningToast("First name & last name should not be equal");
            this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.firNmLtNmEql'));
          }
  
        }
        catch (Exception) {
          this.storageservice.dismissLoading();
          //this.storageservice.warningToast('Connection unavailable!');
          this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
          this.hideLoadingIndicator(); //Hide loading indicator
        }
      }
      this.storageservice.dismissLoading();
    }
    

  async ngOnInit() {

   this.getCountryList(); 

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


//country list

getCountryList(){

  var countryURL = "api/auth/app/CommonUtility/countryList";
  const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
    this.countryResponse = result["countryList"];
    console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
  });
}


onCountrySearch(value: string) {
  if (value.length > 2) {
    this.showcountyResults = true;
    this.searchResults = this.countryResponse.filter(country => country.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.showcountyResults = false;
    this.searchResults = [];
  }
}

selectcountry(contry: string,id:string) {
  this.selectedCountry = contry; 
  this.talentform.patchValue({
    'country' : id
  })
   this.showcountyResults = false;
  this.searchResults = []; 
  this.getstatelist(id);
  this.countrysearchCtrl.setValue('');
}


removeCountry() {
  this.selectedCountry = undefined;
}



  //state list
  async getstatelist(CtryId): Promise<any> {

    console.log(CtryId)
    var industryURL = "api/auth/app/CommonUtility/stateList?countryId="+CtryId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.stateResponseBackup = result["stateList"];
      this.stateResponse = result["stateList"];
      //console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  
    return industryURL;
  }


  onStateSearch(value: string) {
    if (value.length > 1) {
      this.showStateResults = true;
      this.searchStateResults = this.stateResponse.filter(state => state.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.showStateResults = false;
      this.searchStateResults = [];
    }
  }
  
  selectState(state: string,id:string) {
    this.selectedState = state; 
    this.talentform.patchValue({
      'stateName' : id
    })
     this.showStateResults = false;
    this.searchStateResults = []; 
    var CtryId=this.talentform.value.country;
    this.getcitylist(id,CtryId);
    this.statesearchCtrl.setValue('');
  }
  
  
  removeState() {
    this.selectedState = undefined;
  }




  getcitylist(stateId,countryId){
   
    console.log(stateId)
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId="+countryId +"&stateId="+stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
     this.cityList = result['cityList'];
     this.cityOptions = result['cityList'];
    //console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);/
  });
  }


  onCitySearch(value: string) {
    if (value.length > 1) {
      this.showCityResults = true;
      this.searchCityResults = this.cityOptions.filter(City => City.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.showCityResults = false;
      this.searchCityResults = [];
    }
  }
  
  selectCity(state: string,id:string) {
    this.selectedCity = state; 
    this.talentform.patchValue({
      'areaName' : id
    })
     this.showCityResults = false;
    this.searchCityResults = [];  
    this.citySearchCtrl.setValue('');
  }
  
  
  removeCity() {
    this.selectedCity = undefined;
  }

  goToSearchSelectedItem(CtryName, CtryId) {  
    this.countryVal = CtryName;
    this.countryIdVal = CtryId;
    this.IsSearchListShow = false;
    this.getstatelist(CtryId);
  }

  goTostateSelectedItem( stateId) {
    //var CtryId =this.talentorgform.value.countryId; 
    var CtryId=this.talentform.value.country;
    this.getcitylist(stateId,CtryId);
  }
  
  unCheckFocus() {
    // this.ionSearchListShow = false;
  } 
  goto_welcome(){

      this.router.navigate(['/hello-dear']) 
  }

  goto_signin(){

    this.router.navigate(['/sign-in']) 
  }

  openTCForm() {
    this.goto_TCFormModal();
  }
  async goto_TCFormModal() {

    const modal = await this.modalController.create({
      component: TcFormPage,
      cssClass: 'my-custom-class'
    });


    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

        //#region Getting values from popup
        console.table("One: " + dataReturned);
        var IsAgree = dataReturned.data["IsAgree"];
        console.log("IsAgree: " + IsAgree);
        //#endregion

        if (IsAgree == "Yes") {
          this.cBoxIAgreeVal = true;
        }
        else if (IsAgree == "No") {
          this.cBoxIAgreeVal = false;
        }
      }
    });

    return await modal.present();
  }

  openConsentForm() {
    this.goto_ConsentFormModal();
  }

  async goto_ConsentFormModal() {

    const modal = await this.modalController.create({
      component: ConsentFormPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {

        //#region Getting values from popup
        console.table("One: " + dataReturned);
        var IsAgree = dataReturned.data["IsAgree"];
        console.log("IsAgree: " + IsAgree);
        //this.storageservice.warningToast('Modal Sent Data :' + dataReturned);
        //#endregion

        if (IsAgree == "Yes") {
          this.cBoxIAgreeConsentVal = true;
        }
        else if (IsAgree == "No") {
          this.cBoxIAgreeConsentVal = false;
        }
      }
    });

    return await modal.present();
  }
  passwordToggle() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye';
    }
  }


  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/ .test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}