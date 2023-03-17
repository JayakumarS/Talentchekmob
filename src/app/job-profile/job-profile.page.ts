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
  selectedCities = [];

  cities = [];
  filteredCities = [];

  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    public storageservice:StorageService,) { 

      this.jobProfileForm = this.fb.group({
        phoneVisibility: [""], 
        currentUserId: [""]
      });
    }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

    ngOnInit() {
      this.getIndustry();
      this.getJobType();
    }

    filterCities() {
      this.filteredCities = this.cities.filter(city =>
        city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    removeCity(city: string) {
      const index = this.selectedCities.indexOf(city);
      if (index > -1) {
        this.selectedCities.splice(index, 1);
      }
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

  submit() {
    // Handle form submission here
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


  jobtitleList(event){
    var value = event.detail.value
    var jobtitleurl = "api/auth/app/CommonUtility/jobTitleList?industryid=" +value;

    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
      this.jobTitleList = result["jobTitleList"];
      
      console.log(`jobTitleList: ${JSON.stringify(this.jobTitleList)}`);
    });
  }
  
}
