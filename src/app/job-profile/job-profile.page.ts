import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.page.html',
  styleUrls: ['./job-profile.page.scss'],
})
export class JobProfilePage implements OnInit {
  jobProfileForm: FormGroup;
  industryList =[];
  jobTitleList = [];
  jobTypeList =[];

  searchTerm = '';
 
  cities = [];
  filteredCities = [];
  workLocation =[];
  languageList = [];
  JobPreferences: any;
  cityName:any;
  cityId:any;

  // cities: string[] = ['New York', 'cos Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  searchResults: string[] = [];
  selectedCities: string[] = [];
  showResults: boolean = false; 

  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    public storageservice:StorageService,) {  
    }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

    ngOnInit() {

      this.jobProfileForm = this.fb.group({
        industry: [""],
        jobTitle: [""],
        jobType: [""],
        jobSkills: [""],
        jobExperience:[""],
        jobExperienceFormat: ["Years"],
        jobShiftDM: false,
      jobShiftDT: false,
      jobShiftDW: false,
      jobShiftDTH: false,
      jobShiftDF: false,
      jobShiftDS: false,
      jobShiftDSU: false,
      jobShiftNM: false,
      jobShiftNT: false,
      jobShiftNW: false,
      jobShiftNTH: false,
      jobShiftNF: false,
      jobShiftNS: false,
      jobShiftNSU: false,
      jobExpWorkHrs: [""],
      jobStartDateFromObj:[""],
      jobStartDateFrom: [""],
      jobStartDateToObj:[""],
      jobStartDateTo: [""],
      location: [""],
      reqLanguages: [""],
      relocatewill: ["false"],
      travelwill: [""],
      jobSalaryFrom: [""],
      jobSalaryTo: [""],
      jobSalaryCurrency: ["INR"],
      jobSalaryFrequency: ["Per Year"],
      currentUserId:[""]
      }),


      this.getIndustry();
      this.getJobType();
      this.workLocationList();
      this.getlanguageList();
    }

    

nextStep(currentStep: string, nextStep: string) {
    const current = document.getElementById(currentStep);
    const next = document.getElementById(nextStep);
    current.style.display = 'none';
    next.style.display = 'block';
  }

  prevStep(currentStep: string, prevStep: string) {
    const current = document.getElementById(currentStep);
    const prev = document.getElementById(prevStep);
    current.style.display = 'none';
    prev.style.display = 'block';
  }

  onSubmit() {
    console.log(this.jobProfileForm.value)
  }

  onSelectionChange(event) {
    console.log('Selected values:', event.detail.value);
  }
 
  getIndustry(){
    var getIndustryListUrl = "api/auth/app/jobportal/industryList";
       
    this.storageservice.getrequest(getIndustryListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.industryList = result["industryList"]; 
     }
   });
  }

  getJobType(){
    var getJobTypeListUrl = "api/auth/app/jobportal/jobTypeList";
       
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.jobTypeList = result["jobTypeList"]; 
      this.cities = result["jobTypeList"];
     }
   });
  }


  
  onSearch(value: string) {
    if (value.length > 0) {
      this.showResults = true;
      this.searchResults = this.cities.filter(city => city.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
  }

  removeCity(city: string) {
    this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
  }



  jobtitleList(event){
    var value = event.detail.value
    var jobtitleurl = "api/auth/app/CommonUtility/jobTitleList?industryid=" +value;

    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
      this.jobTitleList = result["jobTitleList"];
      
      console.log(`jobTitleList: ${JSON.stringify(this.jobTitleList)}`);
    });
  }

 
    workLocationList(){
      var getJobTypeListUrl = "api/auth/app/CommonUtility/locationList"; 
      this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
       if (result["success"] == true) {
        this.workLocation = result["jobTypeList"]; 
        }
     });
    }

    getlanguageList(){
      var getlanguageListUrl = "api/auth/app/CommonUtility/languageList"; 
      this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
       if (result["success"] == true) {
        this.languageList = result["languageList"]; 
        }
     });
    }
  
}
