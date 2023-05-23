import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import moment from 'moment';
import { formatDate } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TcFormPage } from '../tc-form/tc-form.page';
import { ConsentFormPage } from '../consent-form/consent-form.page';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';



@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.page.html',
  styleUrls: ['./profilee.page.scss'],
})
export class ProfileePage implements OnInit {
  country: any;
  states: any;
  city: any;
  editstate: any;
  editCity: any;

  doRefresh(event) {
    this.ngOnInit();
    //setTimeout(() => {
     event.target.complete();
    //}, 2000);
 }
  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    return maxDate.toISOString().split('T')[0];
  }

  industryList =[];
  profileForm:FormGroup;
  categoryList: any;
  hobby = new FormControl();
  hobbyList = [];
  hobbie= [];
  languageList: any;
  profiledetails: any;
  userId: any;
  currentUserId: string;
  profileList: any;
  showcountyResults : boolean = false;
  selectedCountry: any;
  countryResponse: any;
  stateResponse: any;
  searchResults: string[] = [];
  countrysearchCtrl = new FormControl('');
  cityOptions:any;
  countryVal: string;
countryIdVal:string;
  cityList:[]
  IsSearchListShow: boolean = false;
  stateResponseBackup: any;
  //image
  base64img1: string = '';
  cBoxIAgreeVal: boolean = true;
  cBoxIAgreeConsentVal: boolean = true;
  desiredItem: any;
  desiredstateItem: any;
  desiredcityItem: any;
  isProfile: boolean = false;
  isLogo:boolean = false;
  splCharRegex: string = "^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder,public modalController: ModalController,
    private camera: Camera,private toastController: ToastController,private elementRef: ElementRef
    ,public alertController: AlertController,private route: ActivatedRoute, private ngZone: NgZone) { }

  ngOnInit() {

    this.currentUserId = localStorage.getItem("userId");
    this.getCountryList()

  this.hobbeList();
    this.List();
    this.editprofile();
    this.getIndustry();
    this.route.queryParams.subscribe(params => {
      if (params) {

        if (params != null) {
          console.log(params);
        
          if (params.id == 1) {

            this.isProfile = true;
            this.editprofile();
          } else if (params.id == 2) {
            this.isLogo = true;
            this.editprofile();

          }
        
        }
      }
    });
    this.profileForm = this.fb.group({
      firstname: ["", Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.splCharRegex), Validators.required])],
      lastname: ["",Validators.compose([Validators.maxLength(20), Validators.minLength(1), Validators.pattern(this.splCharRegex), Validators.required])],
      gender: ["", [Validators.required]],
      dob:["",[Validators.required]],
      dobObj:[""],
      mobile: ["", [Validators.required]],
      email: ["", [ Validators.email, Validators.minLength(5)],],
      nationalid: [""],
      category: ["",[Validators.required]],
      emergencyContact:["",[Validators.required]],
      bloodgroup: ["",[Validators.required]],
      linkurl:[""],
      details:[""],
      permCity:["",[Validators.required]], 
      permState:["",[Validators.required]],
      permCountry:["",[Validators.required]],
      permPinCode:["",[Validators.required]],
      uploadImg:["",[Validators.required]],
      permAddress:["",[Validators.required]],
      hobbies:[""],
      languagesknown:["",[Validators.required]],
    
      currentUserId:[""],
    });
 

  }
  
  hobbeList () {
    var gethobbyListUrl = "api/auth/app/CommonUtility/hobbyList";
    this.storageservice.getrequest(gethobbyListUrl).subscribe(result => {

      if (result["success"] == true) {
        this.hobbyList = result["hobbyList"];
        console.log(`hobbyList: ${JSON.stringify(this.hobbyList)}`);
      }
    });
  }

  List () {
    var getlanguageListUrl = "api/auth/app/CommonUtility/languageList";
    this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.languageList = result["languageList"];
      }
    });
  }
  education()
  {
    this.router.navigate(['/profile/addEducation']) 
  }
  profileView()
  {
    this.router.navigate(['/profile-view']) 
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
  this.profileForm.patchValue({
    'permCountry' : id
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
      this.profileForm.patchValue({
        'permState':this.editstate
      })
   
    console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
  });

  return industryURL;
}
///citylist
getcitylist(stateId,countryId){
 
  console.log(stateId)
  var industryURL = "api/auth/app/CommonUtility/cityList?countryId="+countryId +"&stateId="+stateId;
  this.storageservice.getrequest(industryURL).subscribe(result => {
   this.cityList = result['cityList'];
   this.cityOptions = result['cityList'];
   this.profileForm.patchValue({
    'permCity':this.editCity
  })
  console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);
   
});
}

goToSearchSelectedItem(CtryName, CtryId) {  
  this.countryVal = CtryName;
  this.countryIdVal = CtryId;
  this.IsSearchListShow = false;
  this.getstatelist(CtryId);
}

goTostateSelectedItem( stateId) {
  //var CtryId =this.talentorgform.value.countryId; 
  var CtryId=this.profileForm.value.permCountry;
  this.getcitylist(stateId,CtryId);
}


  //categorylist
  getIndustry(){
    var getcategoryListUrl= "api/auth/app/CommonUtility/categoryList";
       
    this.storageservice.getrequest(getcategoryListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.categoryList = result["categoryList"]; 
     }
   });
  }

  async Update(){
    this.profileForm.value.uploadImg = this.base64img1;
    if(this.profileForm.value.hobbies != "" && this.profileForm.value.hobbies != null ){
     // this.profileForm.value.hobbies = this.profileForm.value.hobbies.toString();

    }else{
      this.profileForm.patchValue({hobbies:null});
 
    }
    const errors = this.checkFormValidity(this.profileForm);

    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: '',
        message: 'Please provide all the required values!',
        duration: 3000,
      });
  
      await alert.present();
    } else{
      this.profileForm.value.dob =formatDate(this.profileForm.value.dob, 'dd/MM/yyyy','en-IN');
      this.profileForm.value.currentUserId=this.currentUserId;
     
      this.profiledetails = this.profileForm.value;
      console.log(` data: ${JSON.stringify(this.profiledetails)}`);
      var updateprofile = "api/auth/app/mobile/updateprofile";
    
       this.storageservice.postrequest(updateprofile, this.profiledetails).subscribe(result => {  
          console.log("Image upload response: " + result)
         if (result["success"] == true) {
          setTimeout(() => {
            const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
           profilePage.updateData();
          }, 800);
          this.presentToast()
          }
       });
  }
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/profile-view']);
    
  await toast.present();
}

checkFormValidity(form: FormGroup): string[] {
  const errors: string[] = [];
  
  // Check each form control for errors
  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors = form.controls[key].errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push(`${key} ${keyError}`);
      });
    }
  });

  return errors;
}



  //editprofileDetails
  editprofile(){
    this.storageservice.showLoading();
    var industryURL = "api/auth/app/mobile/editprofiledetails?currentUserId="+this.currentUserId ;
    this.storageservice.getrequest(industryURL).subscribe(result => {
    
      

      if (result["success"] == true) {
        this.storageservice.dismissLoading();
        this.getCountryList();
         this.profileList = result["profileList"]; 
        this.searchForId(result["profileList"][0].permCountry); 
      this.selectedCountry = this.desiredItem.text;
      this.editstate = result["profileList"][0].permState; 
      this.getstatelist(result["profileList"][0].permCountry);
      this.editCity = result["profileList"][0].permCity
      this.getcitylist(result["profileList"][0].permState,result["profileList"][0].permCountry)
     
      this.profileList = result["profileList"]; 
      
        const dob =  this.profileList[0].dob;
        const startdate = moment(dob, 'DD/MM/YYYY').toDate();

      this.profileForm.patchValue({
       'dob': startdate.toISOString(),
       'firstname': this.profileList[0].firstname,
       'lastname': this.profileList[0].lastname,
       'gender':this.profileList[0].gender,
       'mobile':this.profileList[0].mobile,
       //'dob':this.profileList[0].dob,
       'dobObj':result,
       'permAddress': this.profileList[0].permAddress,
       //'permCity': this.profileList[0].permCity,
       //'permState':this.profileList[0].permState,
       'permCountry':this.profileList[0].permCountry,
       'permPinCode':this.profileList[0].permPinCode,
       'email':this.profileList[0].email,
       'nationalid':this.profileList[0].nationalid,
       'category': this.profileList[0].category,
       'uploadImg':this.profileList[0].uploadImg,
       'linkurl': this.profileList[0].linkurl,
       'details': this.profileList[0].details,
       'hobbies':this.profileList[0].hobbies,
       'languagesknown':this.profileList[0].languagesknown,
       'emergencyContact': this.profileList[0].emergencyContact,
       'bloodgroup': this.profileList[0].bloodgroup,
      })
      this.base64img1 = this.profileList[0].uploadImg;
      if(this.profileList[0].emergencyContact=='null')
      {
        this.profileForm.patchValue({
          'emergencyContact': '',
        })
      }
      if(this.profileList[0].details=='null')
      {
        this.profileForm.patchValue({
          'details': '',
        })
      }
      
    }
    this.storageservice.dismissLoading();
  })   
   }




searchForId(id: string) {
  this.desiredItem = null;
  for (const item of  this.countryResponse ) {
    if (item.id === id) {
      this.desiredItem = item; 
      break;
    }
  }
  if (this.desiredItem === null) {
    console.log('Item not found');
  } else {
    console.log(this.desiredItem.text); 
  }
}
searchstateId(id: string) {
  this.desiredstateItem = null;
  for (const item of this.stateResponse  ) {
    if (item.id === id) {
      this.desiredstateItem = item; 
      break;
    }
  }
  if (this.desiredstateItem === null) {
    console.log('Item not found');
  } else {
    console.log(this.desiredstateItem.text); 
  }
}
searchcityId(id: string) {
  this.desiredcityItem = null;
  for (const item of  this.cityOptions ) {
    if (item.id === id) {
      this.desiredcityItem = item; 
      break;
    }
  }
  if (this.desiredcityItem === null) {
    console.log('Item not found');
  } else {
    console.log(this.desiredcityItem.text); 
  }
}


////image
opengallery() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }
  this.camera.getPicture(options).then((ImageData => {
    this.base64img1 = "data:image/jpeg;base64," + ImageData;
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
  }), error => {
    console.log(error);
  })
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

limitInputLength($event, maxLength=25) {
  if($event.target.value.length>=maxLength) {
      $event.preventDefault();
      return;
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