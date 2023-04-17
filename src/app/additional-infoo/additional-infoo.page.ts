import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-additional-infoo',
  templateUrl: './additional-infoo.page.html',
  styleUrls: ['./additional-infoo.page.scss'],
})
export class AdditionalInfooPage implements OnInit {
  additionalform: FormGroup;

  languageList: any;
  instTypeList:[];
IsSearchListShow: boolean = false;
countryVal: string;
countryIdVal:string;
countryResponseBackup: any;
countryResponse: any;
countryList: any;
nationalityList:[];
isSubmitted: boolean;
stateResponseBackup: any;
stateResponse: any;
base64img1: string = '';
  cityOptions: any;
  cityList: any;
  userId: string;
  additional: any;
  searchCtrl = new FormControl('');
  searchCountryResults: string[] = [];
  // selecteCountry: any;
  selecteCountry: string;
  CtryId: string;
  countryId: any;
  constructor(public router: Router, public formbuilder: FormBuilder, public storageservice: StorageService,   private toastController: ToastController) {


  }

  ngOnInit() {
    this.additionalform = this.formbuilder.group({
      bloodgroup: ["", Validators.required],
      mothertongue: ["", Validators.required],
      taxno: [""],
      permcountry: [""],
      permstate: [""],
      permCity: [""],
      permPinCode: [""],
      currentUserId:[""],
      nationality: [""],
 
      
    });
// var listConstant =  this.initializeItems(); 
    this.userId = localStorage.getItem("userId");
   this.nationalList();
   this.getCountryList();
    this.List();
    // this.httpService.get<any>(this.ProfileService.hobbyListUrl).subscribe({
    //   next: (data) => {
    //     this.hobbyList = data.hobbyList
    //     this.hobbie = data.hobbyList;
    //   },
    //   error: (error) => {
    //     this.spinner.hide();
    //   }
    // });
  }

  profileView(){

    this.router.navigate(['/profile-view']) 
  }


  List () {
    var getlanguageListUrl = "api/auth/app/CommonUtility/languageList";
    this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.languageList = result["languageList"];
      }
    });
  }
  removeOrganisation(institutionName: string) {
    this.selecteCountry = undefined;
  }

  //  CountryList auto complete 
 onSearchCountry(value: string) {
  if (value.length > 0) {
    this.IsSearchListShow = true;
    // this.searchCountryResults = this.countryList.filter( Country =>  
    //    Country.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
        this.searchCountryResults = this.countryList.filter(Option => Option.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  
  } else {
    this.IsSearchListShow = false;
    this.searchCountryResults = [];
  }
}


selectCountry(institutionName: string,id:string) {
  // this.selecteCountry = institutionName;
  this.selecteCountry=institutionName;
  this.IsSearchListShow = false;
   this.CtryId = id;
  this.searchCountryResults = [];
   this.searchCtrl.setValue('');
   this.getstatelist(this.CtryId);
   this.countryId = this.CtryId;
}


getCountryList(){
  var countryURL = "api/auth/app/CommonUtility/countryList";
  this.storageservice.getrequest(countryURL).subscribe(result => {
   if (result["success"] == true) {
    this.countryList = result["countryList"]; 
    }
 });
}
    //CountryList
unCheckFocus() {
  // this.ionSearchListShow = false;
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
   // this.countryId=this.additionalform.value.permcountry;
    this.getcitylist(stateId,this.countryId);
  }
  // City List

  getcitylist(stateId,countryId){
    
    console.log(stateId)
    this.additionalform.patchValue({
      'permcountry': countryId
    })
    var industryURL = "api/auth/app/CommonUtility/cityList?countryId="+countryId +"&stateId="+stateId;
    this.storageservice.getrequest(industryURL).subscribe(result => {
     this.cityList = result['cityList'];
     this.cityOptions = result['cityList'];
    console.log(`cityList: ${JSON.stringify(this.cityOptions)}`);
     
  });
  }
  nationalList () {
    var getnationalityListUrl = "api/auth/app/CommonUtility/nationalityList";
    this.storageservice.getrequest(getnationalityListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.nationalityList = result["nationalityList"];
      }
    });
  }

  connections() {
    this.router.navigate(['/profile/addConnections']);
  }

  save(){
    this.storageservice.showLoading();
    this.additionalform.value.currentUserId=this.userId;
this.additional=this.additionalform.value;
console.log(` data: ${JSON.stringify(this.additional)}`);
var saveperonalinfo = "api/auth/app/mobile/saveadditionalinfo";

 this.storageservice.postrequest(saveperonalinfo, this.additional).subscribe(result => {  
   
   if (result["success"] == true) {
   // this.router.navigate(['/job']);
   this.storageservice.dismissLoading();
    this.presentToast()
    }
 });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}
}
