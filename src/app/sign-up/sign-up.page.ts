import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ConsentFormPage } from '../consent-form/consent-form.page';
import { TcFormPage } from '../tc-form/tc-form.page';
import { LanguageService } from '../language.service';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

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
  showCityResults: boolean = false;
  showMinLengthError = false;
  selectedCity: string;
  selectedLang: string;
  maxWidth: number;
  maxHeight: number;

  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 10);
    return maxDate.toISOString().split('T')[0];
  }
  profileForm: FormGroup;
  addressForm: FormGroup;
  regInfoForm: FormGroup;
  codeResponse: Array<{ id: string, text: string }> = [];

  step: any
  private stepper: Stepper;
  IsSearchListShow: boolean = false;
  allowToSave:boolean;
  countryResponseBackup: any;
  cityOptions: any;
  cityList: []

  imagePreview: string = './assets/img/avatar1.png';
  countryResponse: any;
  countryVal: string;
  countryIdVal: string;
  fileTransfer: FileTransferObject = this.transfer.create();
  splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
  isSubmitted: boolean;
  response: Object;
  stateResponseBackup: any;
  stateResponse: any;
  showcountyResults: boolean = false;
  showStateResults: boolean = false;
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
  passwordIcon: string = 'eye-off';

  constructor(public formbuilder: FormBuilder, public router: Router, 
    // private camera: Camera,
    public storageservice: StorageService, private transfer: FileTransfer, public modalController: ModalController,
    // private androidPermissions: AndroidPermissions,
    private translate: TranslateService, private loadingCtrl: LoadingController, public languageService: LanguageService) {


      this.profileForm = this.formbuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.splCharRegex), Validators.required])],
        lastName: ['', Validators.compose([Validators.pattern(this.splCharRegex), Validators.required])],
        dob: [''], 
        gender: ['', Validators.required],
        uploadImg: [''],
  });


  this.addressForm = this.formbuilder.group({

    address: [''],
    areaName: ['', Validators.required],
    country: ['', Validators.required],
    stateName: ['', Validators.required],
    pinCode: ['', Validators.required],
    registrationmode: [''],
  });


  this.regInfoForm = this.formbuilder.group({
    password: ['',[Validators.minLength(5)]],
    phoneNo: ['', Validators.compose([Validators.required])],
    referalCode: [''],
    email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
    agreeVal:[true, Validators.requiredTrue],
    cBoxIAgree: [''],
    cBoxIAgreeConsent: [''],
    logIn:["TalentChek"],
    countryCode:[""]


  });
  


  }

  next() {
    if(this.addressForm.valid){
      this.stepper.next();
  } else {
    this.storageservice.warningToast("Please fill required fields");
  } 
 }

  prev(){
    this.stepper.previous();
  }

  profileInfonext() {
    if(this.profileForm.valid){
      if(this.profileForm.value.uploadImg !=undefined && this.profileForm.value.uploadImg!=''
      &&this.profileForm.value.uploadImg!=null){
        this.stepper.next();
      } else {
        this.storageservice.warningToast("Please upload image");
      }
    } else {
      this.storageservice.warningToast("Please fill required fields");
    }
  }

  limitInputLength($event, maxLength = 25) {
    if ($event.target.value.length >= maxLength) {
      $event.preventDefault();
      return;
    }
  }


async opengallery() {
  try {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    // The 'image.dataUrl' is a complete, valid URL.
    this.imagePreview = image.dataUrl;

    // This part does not change your backend URL. It just sends the data.
    var postData = { 'file': this.imagePreview, 'filetype': "image/jpeg" };
    var ImagePathServiceUrl = "api/auth/app/CommonUtility/uploadImagePath";
    this.storageservice.postrequest(ImagePathServiceUrl, postData).subscribe(result => {
      if (result['success'] == true) {
        this.profileForm.patchValue({ 'uploadImg': result['uploadPhotoPath'] });
      } else {
        this.storageservice.warningToast('Image upload failed.');
        this.imagePreview = './assets/img/avatar1.png';
      }
    });

  } catch (error) {
    // This code runs if the user cancels the photo selection.
    console.error("User cancelled photo selection", error);
    this.storageservice.warningToast('No image selected.');
  }
}

  async opencamera() {
  try {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    // The 'image.dataUrl' is a complete, valid URL.
    this.imagePreview = image.dataUrl;

    // This part does not change your backend URL. It just sends the data.
    var postData = { 'file': this.imagePreview, 'filetype': "image/jpeg" };
    var ImagePathServiceUrl = "api/auth/app/CommonUtility/uploadImagePath";
    this.storageservice.postrequest(ImagePathServiceUrl, postData).subscribe(result => {
      if (result['success'] == true) {
        this.profileForm.patchValue({ 'uploadImg': result['uploadPhotoPath'] });
      } else {
        this.storageservice.warningToast('Image upload failed.');
        this.imagePreview = './assets/img/avatar1.png';
      }
    });

  } catch (error) {
    // This code runs if the user cancels the camera.
    console.error("User cancelled camera", error);
    this.storageservice.warningToast('No photo taken.');
  }
}

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('country:', event.value);

    this.getstatelist(event.value.id);

    this.addressForm.patchValue({
      'stateName': "",
    });

    this.addressForm.patchValue({
      'areaName': "",
    });
  }


  stateChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    var CtryId = this.addressForm.value.country['id'];

    this.getcitylist(event.value.id,CtryId);

    this.addressForm.patchValue({
      'areaName': "",
    });
  }

  cityChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('city:', event.value);

  }

  showPasswordError() {
    if (this.regInfoForm.get('password')?.value.length < 4) {
      this.showMinLengthError = true;
    } else {
      this.showMinLengthError = false;
    }
  }


  onSubmit() {
    this.storageservice.showLoading();
    this.isSubmitted = true;
    if (!this.regInfoForm.valid) {
      this.storageservice.dismissLoading();
      console.log('Please provide all the required values!');
      //this.storageservice.warningToast('Please provide all the required values!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
      return false;
    }
    else {
      this.storageservice.showLoading();
      console.log(this.addressForm.value);
      try {
        var firstName = this.profileForm.controls['firstName'].value;
        var lastName = this.profileForm.controls['lastName'].value;
        var pwd = this.regInfoForm.controls['password'].value;
        var genderVal = this.profileForm.controls['gender'].value;
        var profilePath = this.profileForm.controls['uploadImg'].value;
        var phoneNo = this.regInfoForm.controls['phoneNo'].value;
        var emailId = this.regInfoForm.controls['email'].value;
        var dob = this.profileForm.controls['dob'].value;
        var refCode = this.regInfoForm.controls['referalCode'].value;
        // var profileVisibility = this.talentform.controls['profileVisibility'].value; 
        var address = this.addressForm.controls['address'].value;
        var areaName = this.addressForm.value.areaName['id'] ;
        var country =  this.addressForm.value.country['id'] ;
        var stateName = this.addressForm.value.stateName['id'];
        var pinCode = this.addressForm.controls['pinCode'].value;
        var logIn = this.regInfoForm.controls['logIn'].value;

        console.log("dob: " + dob);
        if(dob!=null && dob!=''){
          var dateOfBirth = this.transformDate(dob);
          console.log("dateOfBirth: " + dateOfBirth);
  
          let parts: string[] = dateOfBirth.split('-');
          console.log(parts);
          dateOfBirth = parts[2] + '/' + parts[1] + '/' + parts[0];
          }else{
            dateOfBirth="";
          }
          if (firstName != lastName) { //Validation.
  
            var currentDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); //Currentdate - one year.
            console.log("currentDate: " + currentDate);
            console.log("dateOfBirthAlt: " + dateOfBirth);
            var frm;
            if(dob!=null && dob!=''){
              frm = new Date(new Date(dob).setHours(new Date(dob).getHours() + 0));
            } else {
              frm=null;
            }
  
            if(frm!=null && frm!=undefined){
              if(frm<=currentDate){
                this.allowToSave=true;
              } else {
                this.allowToSave=false;
              }
            } else {
              this.allowToSave=true;
            }
           
            if (this.allowToSave ) {
          // Check the form control, which holds the final server path.
// This is more reliable than checking the temporary preview variable.
              if (this.profileForm.value.uploadImg) { 

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
                'uploadImg': profilePath,

                'address': address,
                'city': areaName,
                'country': country,
                'state': stateName,
                'pincode': pinCode,
                'registrationmode': 'Mobile',
                'creditPoints': 5,
                'latitude': 0,
                'longitude': 0,
                'logIn':logIn

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
    this.selectedLang = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);

    this.getCountryList();
    this.getCodeList();

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

  getCountryList() {

    var countryURL = "api/auth/app/CommonUtility/countryList";
    const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
      this.countryResponse = result["countryList"];
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  }

  getCodeList() {

    var countryURL = "api/auth/app/CommonUtility/countryCodeList";
    const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
      this.codeResponse = result["countryCodeList"];
      console.log(`codeResponse: ${JSON.stringify(this.codeResponse)}`);
    });
  }

  // getCodeList() {
  //   const countryURL = "api/auth/app/CommonUtility/countryCodeList";
  //   this.storageservice.getrequest(countryURL).subscribe(result => {
  //   //  if (result && result.countryCodeList) {
  //       this.codeResponse = result["countryCodeList"].map(code => ({
  //         id: code.countryCode,
  //         text: code.countryName + ' (' + code.countryCode + ')'
  //       }));
  //    // }
  //   }, error => {
  //     console.error('Error fetching country codes:', error);
  //   });
  // }


  //state list
  async getstatelist(CtryId): Promise<any> {

    console.log(CtryId)
    var industryURL = "api/auth/app/CommonUtility/stateList?countryId=" + CtryId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.stateResponseBackup = result["stateList"];
      this.stateResponse = result["stateList"];
      //console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });

    return industryURL;
  }


  getcitylist(stateId, countryId) {

    console.log(stateId)
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId=" + countryId + "&stateId=" + stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.cityList = result['cityList'];
      this.cityOptions = result['cityList'];
      //console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);/
    });
  }

  goto_welcome() {

    this.router.navigate(['/register-cat']);
  }

  goto_signin() {

    this.router.navigate(['/sign-in']);
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
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }


  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

 
}