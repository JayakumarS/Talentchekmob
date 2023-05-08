import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ConsentFormPage } from '../consent-form/consent-form.page';
import { TcFormPage } from '../tc-form/tc-form.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { InstiProfileViewPage } from '../insti-profile-view/insti-profile-view.page';


@Component({
  selector: 'app-insti-profile',
  templateUrl: './insti-profile.page.html',
  styleUrls: ['./insti-profile.page.scss'],
})
export class InstiProfilePage implements OnInit {
  editCity: any;
  editstate: any;

  doRefresh(event) {
    this.ngOnInit();
     setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  docForm: FormGroup;
  currentUserId: string;
  showcountyResults: boolean = false;
  selectedCountry: any;
  countryResponse: any;
  stateResponse: any;
  searchResults: string[] = [];
  countrysearchCtrl = new FormControl('');
  cityOptions: any;
  countryVal: string;
  countryIdVal: string;
  cityList: []
  IsSearchListShow: boolean = false;
  stateResponseBackup: any;
  //image
  base64img1: string = '';
  cBoxIAgreeVal: boolean = true;
  cBoxIAgreeConsentVal: boolean = true;
  InstitypeList: any;
  profileList: any;
  desiredItem: any;
  desiredcityItem: any;
  desiredstateItem: any;
  isProfile: boolean = false;
  isAbout: boolean = false;
  isLogo: boolean = false;
  constructor(private fb: FormBuilder, public storageservice: StorageService, public modalController: ModalController,
    private camera: Camera, public router: Router,private toastController: ToastController,private elementRef: ElementRef
    ,public alertController: AlertController,private route: ActivatedRoute, private ngZone: NgZone) { }

  ngOnInit() {

    this.currentUserId = localStorage.getItem("userId");

    this.docForm = this.fb.group({
      instName: ["", [Validators.required]],
      instType: [""],
      instEmail: ["", [Validators.required],],
      instMobile: ["", [Validators.required]],

      dob: ["", [Validators.required]],
      accreditation: ["", [Validators.required]],
      taxId: [""],
      instLogo: [""],
      details: ["", [Validators.required]],
      currentUserId: [""],
      permAddress: [""],
      permCity: [""],
      permState: [""],
      permCountry: [""],
      permPinCode: [""],

    });

    this.getCountryList();
    this.InsttypeList();



    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params != null) {
          console.log(params);

          if (params.id == 1) {

            this.isProfile = true;
            this.editinstiprofile();
          } else if (params.id == 2) {
            this.isAbout = true;
            this.editinstiprofile();
          }
          if (params.id == 3) {
            this.isLogo = true;
            this.editinstiprofile();
          }
        }
      }
    });

  }


  profileView() {
    this.router.navigate(['/insti-profile-view']);


  }

  //InstitypeList 
  InsttypeList() {
    var instTypeListUrl = "api/auth/app/CommonUtility/instTypeList";
    this.storageservice.getrequest(instTypeListUrl).subscribe(result => {

      if (result["success"] == true) {
        this.InstitypeList = result["instTypeList"];
        console.log(`instTypeList: ${JSON.stringify(this.InstitypeList)}`);
      }
    });
  }


  ///
  //country list

  getCountryList() {

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

  selectcountry(contry: string, id: string) {
    this.selectedCountry = contry;
    this.docForm.patchValue({
      'permCountry': id
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
    var industryURL = "api/auth/app/CommonUtility/stateList?countryId=" + CtryId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.stateResponseBackup = result["stateList"];
      this.stateResponse = result["stateList"];
      this.docForm.patchValue({
        'permState':this.editstate
      })
      console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });

    return industryURL;
  }
  ///citylist
  getcitylist(stateId, countryId) {

    console.log(stateId)
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId=" + countryId + "&stateId=" + stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
      this.cityList = result['cityList'];
      this.cityOptions = result['cityList'];
      this.docForm.patchValue({
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

  goTostateSelectedItem(stateId) {
    //var CtryId =this.talentorgform.value.countryId; 
    var CtryId = this.docForm.value.permCountry;
    this.getcitylist(stateId, CtryId);
  }




  //editprofileDetails 
  editinstiprofile() {
    // this.storageservice.showLoading();
    var EditinstiprofileDetails = "api/auth/app/InstitutionProfileDetails/insteditprofiledetails?currentUserId=" + this.currentUserId;
    this.storageservice.getrequest(EditinstiprofileDetails).subscribe(result => {

      if (result["success"] == true) {
       
        this.getCountryList();
        this.profileList = result["profileList"];
        this.searchForId(result["profileList"][0].permCountry); 
        // this.selectedCountry = this.desiredItem.text;
        this.editstate = result["profileList"][0].permState; 
        this.getstatelist(result["profileList"][0].permCountry);
        this.editCity = result["profileList"][0].permCity
        this.getcitylist(result["profileList"][0].permState,result["profileList"][0].permCountry)
        this.profileList = result["profileList"];

        this.docForm.patchValue({
          'instName': this.profileList[0].instName,
          'instType': this.profileList[0].instType,
          'instEmail': this.profileList[0].instEmail,
          'instMobile': this.profileList[0].instMobile,
          'cinReg': this.profileList[0].cinReg,
          'dob': this.profileList[0].dob,
          'accreditation': this.profileList[0].accreditation,
          'instLogo': this.profileList[0].instLogo,
          'taxId': this.profileList[0].taxId,
          'details': this.profileList[0].details,
          'permAddress': this.profileList[0].permAddress,
          // 'permCity': this.profileList[0].permCity,
          // 'permState': this.profileList[0].permState,
          'permCountry': this.profileList[0].permCountry,
          'permPinCode': this.profileList[0].permPinCode,
          'languagesknown': this.profileList[0].languagesknown,
        })
        this.base64img1 = this.profileList[0].instLogo;
        this.storageservice.dismissLoading();

      }else{
        this.storageservice.dismissLoading();
      }
      
    })
  }

  ///profileDetails  Update
  async Update() {
    this.profileList[0].instLogo= this.base64img1 ;
    const errors = this.checkFormValidity(this.docForm);

    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({

        message: 'Please provide all the required values!',
        duration: 3000,
      });

      await alert.present();
    } else {
      this.docForm.value.dob = formatDate(this.docForm.value.dob, 'yyyy', 'en-IN');
      this.docForm.value.currentUserId = this.currentUserId;
      this.Instidetails = this.docForm.value;
      console.log(` data: ${JSON.stringify(this.Instidetails)}`);
      var updateprofile = "api/auth/app/mobile/instiupdateProfile";

      this.storageservice.postrequest(updateprofile, this.Instidetails).subscribe(result => {
        // console.log("Image upload response: " + result)
        if (result["success"] == true) { 
          const Instprofileview = new InstiProfileViewPage(this.router, this.storageservice);
        Instprofileview.reload();
          this.presentToast()
        }
      });
    }

  }
  Instidetails(updateprofile: string, Instidetails: any) {
    throw new Error('Method not implemented.');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const insprofileview = new InstiProfileViewPage(this.router, this.storageservice);
    insprofileview.reload(); 
    this.router.navigate(['/insti-profile-view']);
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

  searchForId(id: string) {
    this.desiredItem = null;
    for (const item of this.countryResponse) {
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
    this.selectedCountry = this.desiredItem.text;
  }
  searchstateId(id: string) {
    this.desiredstateItem = null;
    for (const item of this.stateResponse) {
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
    for (const item of this.cityOptions) {
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
}
