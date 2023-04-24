import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { ModalController, NavController } from "@ionic/angular";
import { JobSearchPage } from '../job-search/job-search.page';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.page.html',
  styleUrls: ['./search-settings.page.scss'],
})
export class SearchSettingsPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
    this.refreshData()
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  advsearchForm: FormGroup;

  skillList = [];
  workLocation =[];
  stateList =[];
  searchSkillResults: string[] = [];
  selectedSkills: string[] = [];
  showSkillResults: boolean = false; 
  IsSearchListShow: boolean = false;

  searchResults: string[] = [];
  selectedState: string[] = [];
  selectedCities: string[] = [];
  selectedCountry: string[] = [];
  showResults: boolean = false; 
  showcountyResults : boolean = false;
  showStateResults : boolean = false;
  countrysearchCtrl = new FormControl('');
  statesearchCtrl = new FormControl('');
  citysearchCtrl = new FormControl('');
  searchCtrl = new FormControl('');
  cityName:any;
  cityId:any;
  stateName:any;
  stateId : any;
  countryName:any;
  countryId : any;
countryResponse: any;
countryVal: string;
countryIdVal:string;
countryResponseBackup: any;
IsDegreeListShow: boolean = false;
degreeList: any;
degreeListVal: any;
studyList: any;
studyListVal: any;
IsstudyListShow: boolean = false;
organisationList: any;
IsorgListShow:boolean= false;
institutionVal: any;
organisationVal: any;
formValues: any = {};




  constructor(public router:Router,public storageservice: StorageService,private fb: FormBuilder,
    private navCtrl: NavController,public modalController: ModalController) {

    this.advsearchForm = this.fb.group({
      skillsearch:[""],
      designationsearch: [""],
      experiencesearch:[""],
      countrysearch: [""],
      statesearch:[""],
      citysearch: [""],
      qualificationsearch :[""],
      fieldofstudysearch:[""],
      onisearch:[""],
      btn:["advancebtn"]
    });
   }


   

  async ngOnInit() {

    this.getSkillList();
    this.workLocationList();
    this.getstateList();
    this.getCountryList();
    var listConstant =  this.DegreeListItems(); 
    var listConstant =  this.studyListItems();
    var listConstant = this.initializeOrgItems();
  

  }

  refreshData(){
    this.advsearchForm.patchValue({
      'skillsearch':'',
      'designationsearch': '',
      'experiencesearch':'',
      'countrysearch': '',
      'statesearch':'',
      'citysearch': '',
      'qualificationsearch' :'',
      'fieldofstudysearch':'',
      'onisearch':[""],
    })
    this.selectedSkills = [];
    this.selectedCountry = [];
    this.selectedState = [];
    this.selectedCities = [];

  }
 
// Pass the formvalues to another component
async searchresults() {

if(this.advsearchForm.value['qualificationsearch'] == undefined ){

  this.advsearchForm.value['qualificationsearch']= "";
}
if(this.advsearchForm.value['fieldofstudysearch'] == undefined){

  this.advsearchForm.value['fieldofstudysearch']= "";
}
if (this.advsearchForm.value['onisearch'] == undefined){
  this.advsearchForm.value['onisearch']= "";
}

  let navigationExtras: NavigationExtras = {
    queryParams: this.advsearchForm.value
  };

  
  this.formValues = this.advsearchForm.value;

  this.router.navigate(['/job-search'], navigationExtras);

  }


  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  getSkillList(){
    var getskillListUrl = "api/auth/app/CommonUtility/skillList"; 
    this.storageservice.getrequest(getskillListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.skillList = result["skillList"]; 
      }
   });
  }

  // skill auto complete 
  onSearchSkill(value: string) {
    if (value.length > 2) {
      this.showSkillResults = true;
      this.searchSkillResults = this.skillList.filter(Skill => Skill.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.showSkillResults = false;
      this.searchSkillResults = [];
    }
  }

  selectSkill(skill: string,id:string) {
    this.selectedSkills.push(skill);
    this.advsearchForm.value['skillsearch'] = skill ;
    this.showSkillResults = false;
    this.searchSkillResults = [];
    this.searchCtrl.setValue('');
  }

  removeSkill(skill: string) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
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
    this.selectedCountry.push(contry);
    this.countryName = contry;
    this.countryId = id;
    this.advsearchForm.value['countrysearch'] = id;
    this.showcountyResults = false;
    this.searchResults = [];
    this.countrysearchCtrl.setValue('');
  }

  
  removeCountry(country: string) {
    this.selectedCountry.splice(this.selectedCountry.indexOf(country), 1);
  }

  
  //States List
getstateList(){

  var getStateListUrl = "api/auth/app/CommonUtility/stateListMobile"; 
  this.storageservice.getrequest(getStateListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.stateList = result["stateList"]; 
    }
 });

}


onstateSearch(value: string) {
  if (value.length > 2) {
    this.showStateResults = true;
    this.searchResults = this.stateList.filter(state => state.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.showStateResults = false;
    this.searchResults = [];
  }
}

selectState(state: string,id:string) {
  this.selectedState.push(state);
  this.stateName = state;
  this.stateId = id;
  this.advsearchForm.value['statesearch'] = id ;
  this.showStateResults = false;
  this.searchResults = [];
  this.statesearchCtrl.setValue('');
}

removeState(state: string) {
  this.selectedState.splice(this.selectedState.indexOf(state), 1);
}



  // city list

  workLocationList(){
    var getJobTypeListUrl = "api/auth/app/CommonUtility/locationListMobile"; 
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.workLocation = result["locationList"]; 
      }
   });
  }

    // location auto complete 
    onSearch(value: string) {
      if (value.length > 2) {
        this.showResults = true;
        this.searchResults = this.workLocation.filter(city => city.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
      } else {
        this.showResults = false;
        this.searchResults = [];
      }
    }
  
    selectCity(city: string,id:string) {
      this.selectedCities.push(city);
      this.cityName = city;
      this.cityId = id;
      this.advsearchForm.value['citysearch'] = id;
      this.showResults = false;
      this.searchResults = [];
      this.citysearchCtrl.setValue('');
    }
  
    removeCity(city: string) {
      this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
    }


   
   

  //degreelist
  async filterdegreeList(evt) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsDegreeListShow = true;
      this.degreeList = this.degreeList;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }
  
      var countVal = 0;
      this.degreeList = this.degreeList.filter(currentdegreeList => {
        countVal++;
        if (currentdegreeList.text && searchTerm && countVal < 100) {
          return (currentdegreeList.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
  
      if (this.degreeList == 0) {
        this.IsDegreeListShow = false;
      }
      else {
        this.IsDegreeListShow = true;
      }
    }
    else {
      this.IsDegreeListShow = false;
    }
  }

  goto_profileSearch() {
    this.router.navigate(['/job-search']);
  }

  goToDegreeListItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)

    this.advsearchForm.value['qualificationsearch']= instName;
    
    this.degreeListVal = instName;
    this.advsearchForm.value.degree = instId;
    this.IsDegreeListShow = false;

  }
  async DegreeListItems(): Promise<any> {
  
    var degreeListUrl = "api/auth/app/IndividualProfileDetails/degreeList";
    const InsList = this.storageservice.getrequest(degreeListUrl).subscribe(result => {
      this.degreeList = result["degreeList"];
      this.degreeList = result["degreeList"];
   //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
    });
  
    return InsList;
  }

  // field of studyList
  async studyListItems(): Promise<any> {
    
    var getstudyListUrl = "api/auth/app/IndividualProfileDetails/studyList";
    const InsList = this.storageservice.getrequest(getstudyListUrl).subscribe(result => {
   
      if (result["success"] == true) {
       this.studyList = result["studyList"]; 
      }
    });
  
    return InsList;
  }

  
  goTostudyListItem( instName,instId) {
    console.log("InsName: " + instName);
    console.log("InsId: " + instId);
    this.advsearchForm.value['fieldofstudysearch'] = instName;
    this. studyListVal = instName;
    this.advsearchForm.value.fieldofStudy = instId;
    this.IsstudyListShow = false;
    //this.getstatelist(CtryId);
  }

  async filterstudyList(evt) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsstudyListShow = true;
      this.studyList = this.studyList;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }
  
      var countVal = 0;
      this.studyList = this.studyList.filter(currentstudyList => {
        countVal++;
        if (currentstudyList.text && searchTerm && countVal < 100) {
          return (currentstudyList.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
  
      if (this.studyList == 0) {
        this.IsstudyListShow = false;
      }
      else {
        this.IsstudyListShow = true;
      }
    }
    else {
      this.IsstudyListShow = false;
    }
  }

  //OniList


  //organisationList

  goToOniSearchSelectedItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)

    this.advsearchForm.value['onisearch'] = instId;
    
    this.organisationVal = instName;
    this.advsearchForm.value.organisationName = instId;
    this.IsorgListShow = false;
    //this.getstatelist(CtryId);
  }
    async initializeOrgItems(): Promise<any> {
  
      var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
      const InsList = this.storageservice.getrequest(organisationListUrl).subscribe(result => {
        this.organisationList = result["organisationList"];
        this.organisationList = result["organisationList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterOrgList(evt) {
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsorgListShow = true;
        this.organisationList = this.organisationList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.organisationList = this.organisationList.filter(currentinstitution => {
          countVal++;
          if (currentinstitution.text && searchTerm && countVal < 100) {
            return (currentinstitution.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.organisationList == 0) {
          this.IsorgListShow = false;
        }
        else {
          this.IsorgListShow = true;
        }
      }
      else {
        this.IsorgListShow = false;
      }
    }


 
}
