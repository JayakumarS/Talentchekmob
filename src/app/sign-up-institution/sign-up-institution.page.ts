import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Stepper from 'bs-stepper';
import { StorageService } from '../storage.service';

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
  constructor(public router: Router,private camera: Camera,public formbuilder: FormBuilder, public storageservice:StorageService, private transfer: FileTransfer,
    private translate: TranslateService, private loadingCtrl: LoadingController) {

    this.talentinstform = formbuilder.group({
      instituteName: [''],
      regNo: [''],
      taxId: [''],
      regDate: [''],
      instType: [''],
      emailId: ['',],
      address: ['', ''],
      country: [''],
      city:[''],
      pwd:[''],
      mobileNo:[''],
      state: [''],
      pincode: [''],
      referralCode: [''],
      profileVisibility: ['', ''],
     

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
    var listConstant =  this.initializeItems(); 

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
  async initializeItems(): Promise<any> {

    var countryURL = "api/auth/app/CommonUtility/countryList";
    const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
      this.countryResponseBackup = result["countryList"];
      this.countryResponse = result["countryList"];
   //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  
    return InsList;
  }
  async filterList(evt) {
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
    else {
      this.IsSearchListShow = false;
    }
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
    var CtryId=this.talentinstform.value.country.slice(0,2);
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
    if (!this.talentinstform.valid) {
      console.log('Please provide all the required values!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
      return false;
    } else {
      
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
      var countryID=country.slice(0,2);
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
        'country': countryID,
        'city': city,
        'pwd': pwd,
        'mobileNo': mobileNo,
        'pincode': pincode,
        'state': state,
        'referralCode': referralCode,
        'profileVisibility': profileVisibility,

      }
      console.log(`Posting Data: ${JSON.stringify(postData)}`);
 
      var signUpServiceUrl = "api/auth/app/registration/InstitutionRegister"; 
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
                    //this.hideLoadingIndicator(); //Hide loading indicator
                  }
                  else {
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
      //this.storageservice.warningToast('Connection unavailable!');
      this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.conUnavail'));
      // this.hideLoadingIndicator(); //Hide loading indicator
    }
    }
  }
  transformDate(date) {
    return date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10); //YYY-MM-DD
  }
}
