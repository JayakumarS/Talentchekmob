import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-additional-infoo',
  templateUrl: './additional-infoo.page.html',
  styleUrls: ['./additional-infoo.page.scss'],
})
export class AdditionalInfooPage implements OnInit {
  additionalform: FormGroup;

  hobby = new FormControl();
  hobbyList = [];
  hobbie= [];
  languageList: any;
  instTypeList:[];
IsSearchListShow: boolean = false;
countryVal: string;
countryIdVal:string;
countryResponseBackup: any;
countryResponse: any;
countryList: [];
nationalityList:[];
isSubmitted: boolean;
stateResponseBackup: any;
stateResponse: any;
base64img1: string = '';
  cityOptions: any;
  cityList: any;
  constructor(public router: Router, public formbuilder: FormBuilder, public storageservice: StorageService,) {


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
      hobbies: [""],
      nationality: [""],
      languagesknown: ["", Validators.required],
      permAddress: [""]
    });

    var listConstant =  this.initializeItems(); 

   this.nationalList();
    this.hobbeList();
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
    //CountryList
unCheckFocus() {
  // this.ionSearchListShow = false;
}
goToSearchSelectedItem( CtryName,CtryId) {
  console.log("InsName: " + CtryName)
  console.log("InsId: " + CtryId)

  this.countryVal = CtryName;
  this.additionalform.value.permcountry = CtryId;
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
    var CtryId=this.additionalform.value.permcountry.slice(0,2);
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
  nationalList () {
    var getnationalityListUrl = "api/auth/app/CommonUtility/nationalityList";
    this.storageservice.getrequest(getnationalityListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.nationalityList = result["nationalityList"];
      }
    });
  }

  connections() {
    this.router.navigate(['/profile/addConnections'])
  }

}
