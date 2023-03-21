import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.page.html',
  styleUrls: ['./search-settings.page.scss'],
})
export class SearchSettingsPage implements OnInit {

  advsearchForm: FormGroup;

  skillList = [];
  workLocation =[];
  searchSkillResults: string[] = [];
  selectedSkills: string[] = [];
  showSkillResults: boolean = false; 
  IsSearchListShow: boolean = false;
  searchResults: string[] = [];
  selectedCities: string[] = [];
  showResults: boolean = false; 
  searchCtrl = new FormControl('');
  cityName:any;
  cityId:any;
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

  constructor(public router:Router,public storageservice: StorageService,private fb: FormBuilder) {

    this.advsearchForm = this.fb.group({
      industry: ["",Validators.required],
      designation: [""],
      country: ['', Validators.required],
      degree :[""],
      fieldofStudy:[""],
      organisationName:[""]
    });
   }

  async ngOnInit() {

    this.getSkillList();
    this.workLocationList();
    var listConstant =  this.DegreeListItems(); 
    var listConstant =  this.studyListItems();
    var listConstant = this.initializeOrgItems();
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
    this.showSkillResults = false;
    this.searchSkillResults = [];
    this.searchCtrl.setValue('');
  }

  removeSkill(skill: string) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
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
      this.showResults = false;
      this.searchResults = [];
      this.searchCtrl.setValue('');
    }
  
    removeCity(city: string) {
      this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
    }
    goToSearchSelectedItem(CtryName, CtryId) {
      console.log("InsName: " + CtryName)
      console.log("InsId: " + CtryId)
  
      this.countryVal = CtryName;
      this.countryIdVal = CtryId;
      this.IsSearchListShow = false;
    }

    async initializeItems(): Promise<any> {

      var countryURL = "api/auth/app/CommonUtility/countryList";
      const InsList = this.storageservice.getrequest(countryURL).subscribe(result => {
        this.countryResponseBackup = result["countryList"];
        this.countryResponse = result["countryList"];
        console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
  
      return InsList;
    }
  
    unCheckFocus() {
      // this.ionSearchListShow = false;
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

  unDegreeList() {
    // this.ionSearchListShow = false;
  }

  goToDegreeListItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
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

  unstudyList() {
    // this.ionSearchListShow = false;
  }
  goTostudyListItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
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

  searchresults(){
    this.router.navigate(['/search-results']) 
  }
}
