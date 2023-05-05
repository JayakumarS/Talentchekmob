import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Stepper from 'bs-stepper';
import { StorageService } from '../storage.service';
import { ModalController } from '@ionic/angular';
import { ConsentFormPage } from '../consent-form/consent-form.page';
import { TcFormPage } from '../tc-form/tc-form.page';
@Component({
  selector: 'app-sign-up-institution',
  templateUrl: './sign-up-institution.page.html',
  styleUrls: ['./sign-up-institution.page.scss'],
})
export class SignUpInstitutionPage implements OnInit {
step:any
talentinstform: FormGroup;
response: Object;
Four:string;
instTypeList:[];
IsSearchListShow: boolean = false;
countryVal: string;
countryIdVal:string;
countryResponseBackup: any;
countryResponse: any;
countryList: [];
isSubmitted: boolean;
splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
private stepper: Stepper;
stateResponseBackup: any;
stateResponse: any;
base64img1: string = '';
  cityOptions: any;
  cityList: any;
  showcountyResults : boolean = false;
  selectedCountry: any;
  showResults: boolean = false; 
  searchResults: string[] = [];
  countrysearchCtrl = new FormControl('');
  countryId: string;
  cBoxIAgreeVal: boolean = true;
  cBoxIAgreeConsentVal: boolean = true;
  statesearchCtrl = new FormControl('');
  passwordType: string = 'password';
  passwordIcon: string = 'eye'; 
  showStateResults : boolean = false;
  searchStateResults: string[] = [];
  searchCityResults: string[] = [];
  citySearchCtrl = new FormControl('');
  selectedState: string;
  selectedCity: string;
  showCityResults: boolean= false;
  constructor(public router: Router,private camera: Camera,public formbuilder: FormBuilder, public storageservice:StorageService, private transfer: FileTransfer,
    private translate: TranslateService, private loadingCtrl: LoadingController,public modalController: ModalController,) {

    this.talentinstform = formbuilder.group({
      instituteName: ['',Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.required])],
      regNo: ['',Validators.required],
      taxId: ['',Validators.required],
      regDate: ['',Validators.required],
      instType: ['',Validators.required],
      emailId: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      address: [''],
      country: ['',Validators.required],
      city:['',Validators.required],
      pwd:['',Validators.required],
      mobileNo:['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',Validators.required],
      referralCode: [''],
      uploadImg: ['',Validators.required],
      profileVisibility: [''],
      cBoxIAgree:[''],
      cBoxIAgreeConsent:['']

    });


   }

  next() {
    this.stepper.next();
  }

  // onSubmit() {
  //   return false;
  // }

  ngOnInit() {
    this.step = 1;
    this.stepper = new Stepper(document.querySelector('#stepper2'), {
      linear: false,
      animation: true
    })
    this.BindInsType();
    this.getCountryList(); 

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
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;
      this.talentinstform.patchValue({
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
      this.talentinstform.patchValue({
        'uploadImg': this.base64img1,
      })
      console.log(this.base64img1);
    }), error => {
      console.log(error);
    })
  }

  BindInsType() {
    var insTypeURL = "api/auth/app/CommonUtility/instTypeList";
    this.storageservice.getrequest(insTypeURL).subscribe(result => {
     this.instTypeList = result['instTypeList'];


    });
  }

  //CountryList
unCheckFocus() {
  // this.ionSearchListShow = false;
}
goToSearchSelectedItem( CtryName,CtryId) {
  console.log("InsName: " + CtryName)
  console.log("InsId: " + CtryId)

  this.countryVal = CtryName;
  this.talentinstform.value.country = CtryId;
  this.IsSearchListShow = false;
  this.getstatelist(CtryId);
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
  this.talentinstform.patchValue({
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
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  
    return industryURL;
  }
  goTostateSelectedItem( stateId) {
    //var CtryId =this.talentorgform.value.countryId; 
    var CtryId=this.talentinstform.value.country;
    this.getcitylist(stateId,CtryId);
  }
  // City List

  getcitylist(stateId,countryId){
    
    console.log(stateId) 
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId="+countryId +"&stateId="+stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
     this.cityList = result['cityList'];
     this.cityOptions = result['cityList'];
    console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);
     
  });
  }
  //save
  onSubmit(){
    this.isSubmitted = true;
    this.storageservice.showLoading();
    if (!this.talentinstform.valid) {
      this.storageservice.dismissLoading();
      console.log('Please provide all the required values!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
      return false;
    } else {
      this.storageservice.showLoading();
    console.log(this.talentinstform.value);
    try {
      var instituteName = this.talentinstform.controls['instituteName'].value;
      var regNo = this.talentinstform.controls['regNo'].value;
      var taxId = this.talentinstform.controls['taxId'].value;
      var regDate = this.talentinstform.controls['regDate'].value;
      var instType = this.talentinstform.controls['instType'].value;
      var emailId = this.talentinstform.controls['emailId'].value;
      var address = this.talentinstform.controls['address'].value;
      var country = this.talentinstform.controls['country'].value;
      var city = this.talentinstform.controls['city'].value;
      var pwd = this.talentinstform.controls['pwd'].value; 
      var mobileNo = this.talentinstform.controls['mobileNo'].value;
      var pincode = this.talentinstform.controls['pincode'].value; 
      var state = this.talentinstform.controls['state'].value;
      var referralCode = this.talentinstform.controls['referralCode'].value; 
      var profileVisibility = this.talentinstform.controls['profileVisibility'].value;
      console.log("regDate: " + regDate); 
      var regDate1 = this.transformDate(regDate);
      console.log("regDate: " + regDate1);
      let myString = regDate1;
      this.Four = myString.substring(0, myString.length - 6);
      console.log(this.Four)
      //var countryID=country.slice(0,2);
      // if (firstName != lastName) { //Validation.
  
        // var currentDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); //Currentdate - one year.
        // console.log("currentDate: " + currentDate);
        // console.log("dateOfBirthAlt: " + dateOfBirth);
        // var frm = new Date(new Date(dob).setHours(new Date(dob).getHours() + 0));
        // if (frm <= currentDate) {
     
      var postData = {

        'instituteName': instituteName,
        'regNo': regNo,
        'taxId': taxId,
        'regDate': this.Four,
        'instType': instType,
        'address': address,
        'emailId': emailId,
        'country': country,
        'city': city,
        'pwd': pwd,
        'mobileNo': mobileNo,
        'pincode': pincode,
        'state': state,
        'referralCode': referralCode,
        'profileVisibility': profileVisibility,
        'uploadImg': this.base64img1,

      }
      console.log(`Posting Data: ${JSON.stringify(postData)}`);
 
      var signUpServiceUrl = "api/auth/app/registration/InstitutionRegister"; 
      this.storageservice.postrequest(signUpServiceUrl, postData).subscribe(result => { 
        this.response = result;
        console.log(this.response);
          if (result["success"] == true) {
            this.storageservice.dismissLoading();
                   //  this.storageservice.successToastCustom(this.translate.instant('PopupWin.congrats'), this.translate.instant('Registration Successful.  Please check your inbox to confirm your email address.'));

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
                    // this.showNotification('snackbar-danger',result['msg'],'top','Right');
                    this.storageservice.warningToast(msg);
                    //this.hideLoadingIndicator(); //Hide loading indicator
                  }
                  else {
                    this.storageservice.dismissLoading();
                   // this.storageservice.warningToast("Connection unavailable!");
                    this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
                    //this.hideLoadingIndicator(); //Hide loading indicator
                  }
                });
              
        // }
        // else {
        //   this.storageservice.warningToast('User must have minimum one year old to register. Future date is not applicable, Please change.');
        //   this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.userMinOldReg'));
        // }
      // }
      // else {
      //   this.storageservice.warningToast("First name & last name should not be equal");
      //   this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.firNmLtNmEql'));
      // }

    }
    catch (Exception) {
      this.storageservice.dismissLoading();
      //this.storageservice.warningToast('Connection unavailable!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
      // this.hideLoadingIndicator(); //Hide loading indicator
    }
    }
    this.storageservice.dismissLoading();
  }
  transformDate(date) {
    return date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10); //YYY-MM-DD
  }

  limitInputLength($event, maxLength=25) {
    if($event.target.value.length>=maxLength) {
        $event.preventDefault();
        return;
    }
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
    this.talentinstform.patchValue({
      'state' : id
    })
     this.showStateResults = false;
    this.searchStateResults = []; 
    var CtryId=this.talentinstform.value.country;
    this.getcitylist(id,CtryId);
    this.statesearchCtrl.setValue('');
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
    this.talentinstform.patchValue({
      'city' : id
    })
     this.showCityResults = false;
    this.searchCityResults = [];  
    this.citySearchCtrl.setValue('');
  }
  removeState() {
    this.selectedState = undefined;
  }
  removeCity() {
    this.selectedCity = undefined;
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
}