import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { TranslateService } from '@ngx-translate/core';
import Stepper from 'bs-stepper';
import { Alert } from 'selenium-webdriver';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-sign-up-organization',
  templateUrl: './sign-up-organization.page.html',
  styleUrls: ['./sign-up-organization.page.scss'],
})
export class SignUpOrganizationPage implements OnInit {
  response: Object;
  Four:string;
  isSubmitted: boolean;
  splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
talentorgform: FormGroup;
step:any
stateVal: string;
countryVal: string;
countryIdVal:string;
countryResponseBackup: any;
countryResponse: any;
countryList: [];
domainList: [];
cityList: [];
orgTypeList:[];
cityOptions:any;
IsSearchListShow: boolean = false;
SearchStateShow: boolean = false;
private stepper: Stepper;
base64img1: string = '';
  filteredOptions: any;
  addressForm: any;
  stateList: [];
  CtryId: any;
  stateOptions: any;
  stateResponse: any;
  stateResponseBackup: any;
  stateId: any;
  cityId: any;
  constructor(public router: Router,private camera: Camera,public formbuilder: FormBuilder,public storageservice:StorageService, private transfer: FileTransfer,
    private translate: TranslateService, ) { 


    this.talentorgform = formbuilder.group({
      organizationName: ['',Validators.required],
      regNo: ['',Validators.required],
      orgType: ['',Validators.required],
      regDate: ['',Validators.required],
      domainId: ['',Validators.required],
      emailId: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      address: ['', ''],
      country: ['',Validators.required],
      city:['',Validators.required],
      pwd:['',Validators.required],
      mobileNo:['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',Validators.required],
      referralCode: [''],
      profileVisibility: ['', ''],
     countryId:[""]

    });




  }

  next() {
    this.stepper.next();
  }

  // onSubmit() {
  //   return false;
  // }

  async ngOnInit() {
    this.step = 1;
    this.stepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    })

    var listConstant = await this.initializeItems(); 
    this.BindDomain();
   // var stateListConstant = await this.getstatelist(); 
  this.BindorgType();
   
 
  }


  
goToSearchSelectedItem( CtryName,CtryId) {
  console.log("InsName: " + CtryName)
  console.log("InsId: " + CtryId)

  this.countryVal = CtryName;
  this.talentorgform.value.countryId = CtryId;
  this.IsSearchListShow = false;
  this.getstatelist(CtryId);
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
// Domain List
BindDomain() {
  var industryURL = "api/auth/app/CommonUtility/industryList";
  this.storageservice.getrequest(industryURL).subscribe(result => {
   this.domainList = result['industryList'];
  });
}
//orgtypelist
BindorgType(){
var industryURL = "api/auth/app/CommonUtility/orgTypeList";
this.storageservice.getrequest(industryURL).subscribe(result => {
  this.orgTypeList = result['orgTypeList'];
 });
}

//CountryList
unCheckFocus() {
  // this.ionSearchListShow = false;
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

// State List
async getstatelist(CtryId): Promise<any> {

  console.log(CtryId)
  var industryURL = "api/auth/app/CommonUtility/stateList?countryId="+CtryId;
  this.storageservice.getrequest(industryURL).subscribe(result => {
    this.stateResponseBackup = result["stateList"];
    this.stateResponse = result["stateList"];
   
   // console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
  });

  return industryURL;
}
goTostateSelectedItem( stateId) {
  //var CtryId =this.talentorgform.value.countryId; 
  var CtryId=this.talentorgform.value.country.slice(0,2);
  this.getcitylist(stateId,CtryId);
}
// City List
onSelectedCity(cityId:any) {

  this.cityId = cityId ;


}
getcitylist(stateId,countryId){
  this.stateId=this.talentorgform.value.state
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
  if (!this.talentorgform.valid) {
    console.log('Please provide all the required values!');
    this.storageservice.warningToastCustom(this.translate.instant('PopupWin.opps'), this.translate.instant('PopupWin.plsProvReqVals'));
    return false;
  } else {
    
    console.log(this.talentorgform.value);
  try {
    var organizationName = this.talentorgform.controls['organizationName'].value;
    var regNo = this.talentorgform.controls['regNo'].value;
    var orgType = this.talentorgform.controls['orgType'].value;
    var regDate = this.talentorgform.controls['regDate'].value;
    var domainId = this.talentorgform.controls['domainId'].value;
    var emailId = this.talentorgform.controls['emailId'].value;
    var address = this.talentorgform.controls['address'].value;
    var country = this.talentorgform.controls['country'].value;
    var city = this.talentorgform.controls['city'].value;
    var pwd = this.talentorgform.controls['pwd'].value; 
    var mobileNo = this.talentorgform.controls['mobileNo'].value;
    var pincode = this.talentorgform.controls['pincode'].value; 
    var state = this.talentorgform.controls['state'].value;
    var referralCode = this.talentorgform.controls['referralCode'].value; 
    var profileVisibility = this.talentorgform.controls['profileVisibility'].value;
    console.log("regDate: " + regDate); 
    var regDate1 = this.transformDate(regDate);
    console.log("regDate: " + regDate1);
    var countryID=country.slice(0,2);

    //let myString = regDate1;
    // this.Four = myString.substring(0, myString.length - 6);
    // console.log(this.Four)
    
    // if (firstName != lastName) { //Validation.

      // var currentDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); //Currentdate - one year.
      // console.log("currentDate: " + currentDate);
      // console.log("dateOfBirthAlt: " + dateOfBirth);
      // var frm = new Date(new Date(dob).setHours(new Date(dob).getHours() + 0));
      // if (frm <= currentDate) {
   
    var postData = {

      'organizationName': organizationName,
      'regNo': regNo,
      'orgType': orgType,
      'regDate': regDate1,
      'domainId': domainId,
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

    var signUpServiceUrl = "api/auth/app/registration/OrganizationRegister"; 
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

function startWith(arg0: string): any {
  throw new Error('Function not implemented.');
}
