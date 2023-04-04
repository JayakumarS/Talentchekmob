import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import moment from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-oni-job-post',
  templateUrl: './oni-job-post.page.html',
  styleUrls: ['./oni-job-post.page.scss'],
})
export class OniJobPostPage implements OnInit {

  userId:string

  

  jobProfileForm: FormGroup;
  industryList =[];
  jobTitleList = [];
  jobTypeList =[];
  additionalPaylist =[];

  searchTerm = '';
 
  cities = [];
  skillList = [];
  filteredCities = [];
  workLocation =[];
  languageList = [];
  JobPreferences: any;
  cityName:any;
  cityId:any;
  skillSearchInput = '';
  locationSearchInput = '';
  searchResults: string[] = [];
  selectedCities: string[] = [];

  locationOffer: string[] = [];
  locationAdvertise: string[] = [];
  
  searchResultsOffLocation: string[] = [];
  selectedCitiesOffLocation: string[] = [];
  showResults: boolean = false; 
 
  searchSkillResults: string[] = [];
  selectedSkills: string[] = [];
  showSkillResults: boolean = false; 
  jobpostMaster: any;
  searchCtrl = new FormControl('');
  disable :boolean = false;
  disable1: boolean = false;
  disable2: boolean = false;
  edit: boolean  = false;
  jobShiftArray  = [];
  showResultsForLocation: boolean;
  currentUserName: any;
  cityIdLocation: string;
  roleId: any;
  RoleID: any;

  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    private toastController: ToastController,
    public storageservice:StorageService,private route: ActivatedRoute) { }

    selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  ngOnInit() {
    this.currentUserName = localStorage.getItem("userName");
    this.userId = localStorage.getItem("userId")  ; 
    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);

    this.jobProfileForm = this.fb.group({

      industry: ["",Validators.required],
      jobTitle1: ["",Validators.required],
      jobType: ["",Validators.required],
      openings: ["",Validators.required],

      roles: ["",Validators.required],
      jobQualification: ["",Validators.required],
      jobSkills: [""],
      jobExperience: ["",Validators.required],
      jobExperienceFormat :["Years"],
      jobExperienceMandatory:["false"],


      jobSalaryFrom:["",Validators.required],
      jobSalaryTo:["",Validators.required],
      jobSalaryCurrency: ["INR"],
      jobSalaryFrequency:["Per Year"],
      additionalpay: ["",Validators.required], 

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
      jobExpWorkHrs: ["",Validators.required],
      jobStartDateFrom:[""],
      

      appDeadlineObj:[""],
      appDeadline: [""],
      locationOffer: [""],
      locationAdvertise: [""],
      gender:["NP"],
      reqLanguages:[""],
      phoneNo:[""],
      currentUserName:[""],
      currentUserId:[""],

      
     location: [""],
     relocatewill: ["false"],
    travelwill: ["No"],

    auctioned:["true"],
      jobId:[""],
      
     }),


    this.getIndustry();
    this.getJobType();
    this.workLocationList();
    this.getlanguageList();
    this.getSkillList();
    this.getAdditionalPay();
    
   
    this.route.queryParams.subscribe(params => {
      if (params) { 
        if (params != null) { 
          if(params['call'] == "edit-call"){ 
            this.userId = localStorage.getItem("userId"); 
            this.fetchdetails(this.userId); 
          }
         console.log(params);
        }
      }
    });
  }

  fetchdetails(userid){
    var BasicSearcUrl = "api/auth/app/jobportal/editJobSeekDetails?currentUserId="+ userid ;

    this.storageservice.getrequest(BasicSearcUrl).subscribe(result => {
      if(result["success"] == true){ 
      if(result["jobSeekList"].length !=0){ 
        this.jobProfileForm.reset(); 
        this.edit=true;
         console.log(result);

        const industry = [result["jobSeekList"][0].industry.toString()]
        const indId = result["jobSeekList"][0].industry;
        this.jobtitleList(indId)

        this.selectedCities =[];
        this.selectedSkills = [];
        //skill
        let str = result["jobSeekList"][0].jobSkills; 
        for(let i=0;i<str.length;i++){
          var skill = str[i]
          this.selectedSkills.push(skill);
        }

        //city
        let loc = result["jobSeekList"][0].location;

        for(let i=0;i<loc.length;i++){
          var location = loc[i]
          this.selectedCities.push(location);
        }

        const jobStartDateFrom = result["jobSeekList"][0].jobStartDateFrom;
        const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();

        const jobStartDateTo = result["jobSeekList"][0].jobStartDateTo;
        const enddate = moment(jobStartDateTo, 'DD/MM/YYYY').toDate();

        const shits = result["jobSeekList"][0].jobShift
        const arr: string[] = shits.split(",");

        for(let i=0;i<arr.length;i++){
         var job = false;
          var shift = arr[i]
          if(shift=="f"){
            job = false;
          }else{
            job = true;
          }
          this.jobShiftArray.push(job);
        }

        console.log(this.jobShiftArray)

        this.jobProfileForm.patchValue({
          'industry': industry,
          'jobTitle': result["jobSeekList"][0].jobTitle,
          'jobType': result["jobSeekList"][0].jobType,
          'jobExperience':result["jobSeekList"][0].jobExperience,
          'jobExperienceFormat': result["jobSeekList"][0].jobExperienceFormat,
          'jobExpWorkHrs': result["jobSeekList"][0].jobExpWorkHrs,
          'jobStartDateFrom': startdate.toISOString(),
          'jobStartDateTo': enddate.toISOString(),
          'reqLanguages': result["jobSeekList"][0].reqLanguages,
          'relocatewill': result["jobSeekList"][0].relocatewill.toString(),
          'travelwill': result["jobSeekList"][0].travelwill,
          'jobSalaryFrom': result["jobSeekList"][0].jobSalaryFrom,
          'jobSalaryTo': result["jobSeekList"][0].jobSalaryTo,
          'jobSalaryCurrency': result["jobSeekList"][0].jobSalaryCurrency,
          'jobSalaryFrequency': result["jobSeekList"][0].jobSalaryFrequency,

          'jobShiftDM':this.jobShiftArray[0],
          'jobShiftDT':this.jobShiftArray[1],
          'jobShiftDW':this.jobShiftArray[2],
          'jobShiftDTH':this.jobShiftArray[3],
          'jobShiftDF':this.jobShiftArray[4],
          'jobShiftDS':this.jobShiftArray[5],
          'jobShiftDSU':this.jobShiftArray[6],
          
          'jobShiftNM':this.jobShiftArray[7],
          'jobShiftNT':this.jobShiftArray[8],
          'jobShiftNW':this.jobShiftArray[9],
          'jobShiftNTH':this.jobShiftArray[10],
          'jobShiftNF':this.jobShiftArray[11],
          'jobShiftNS':this.jobShiftArray[12],
          'jobShiftNSU':this.jobShiftArray[13],

        })
        console.log(this.jobProfileForm.value) 
      }    
    }    
   });
  }

  validatePreference(){
    if(this.jobProfileForm.value.industry !="" && this.jobProfileForm.value.industry !=null
     && this.jobProfileForm.value.jobTitle1 !="" &&  this.jobProfileForm.value.jobTitle1 !=null &&
     this.jobProfileForm.value.jobType !="" && this.jobProfileForm.value.jobType !=null
    &&this.jobProfileForm.value.openings !=null){
      this.nextStep('step1', 'step2'); 
     }else{
      this.errorToast();
     }
  }  

  // validateAvailability(){
  //   if(this.jobProfileForm.value.jobExpWorkHrs !="" && this.jobProfileForm.value.jobStartDateFrom !="" 
  //   && this.jobProfileForm.value.jobExpWorkHrs !=null && this.jobProfileForm.value.jobStartDateFrom !=null &&
  //   this.jobProfileForm.value.jobStartDateTo !="" && this.jobProfileForm.value.jobStartDateTo !=null){
  //     this.nextStep('step2', 'step3') 
  //    }else{
  //     this.errorToast();
  //    } 
  // }

  validateJobDesc(){
if(this.jobProfileForm.value.roles != "" && this.jobProfileForm.value.jobQualification != ""
 &&this.selectedSkills.length != 0 && this.jobProfileForm.value.jobExperience !="" &&
 this.jobProfileForm.value.jobExperience !=null ){

  this.nextStep('step2', 'step3')
}
else{
  this.errorToast();
}   
  }

  validateJobshedule(){
    this.nextStep('step4', 'step5')
  }

  validateSalary(){
    
    this.nextStep('step3', 'step4')
  }

  validateAdditional(){
    this.nextStep('step5', 'step6')
  }

  validateInformation(value){
    if(this.jobProfileForm.value.jobSalaryFrom !="" && this.jobProfileForm.value.jobSalaryFrom !=null
     && this.jobProfileForm.value.jobSalaryTo !=""  && this.jobProfileForm.value.jobSalaryTo !=null
    && this.selectedCities.length !=0 && this.jobProfileForm.value.reqLanguages != 0){
      if(value =='save'){
        this.savejobadvertisement();   
      }else{
        this.updatejobseek();
      }
    }else{
      this.errorToast();
     } 
  }

  async validateStartDate(event){
    var currentDate = new Date(new Date().setFullYear(new Date().getFullYear())); //Currentdate - one year.
    console.log("currentDate: " + currentDate);
    console.log("startDate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.jobProfileForm.patchValue({
      'jobStartDateTo':""
    })
    if (frm <= currentDate) {
      const alert = await this.toastController.create({
        header: '',
        message: 'Start date should be greater than current date.',
        duration: 3000,
      });
      this.jobProfileForm.patchValue({
        'jobStartDateFrom':""
      })
       await alert.present();
    }
  }


  async validateEndDate(event){
    var startdate = new Date(new Date(this.jobProfileForm.value.jobStartDateFrom).setFullYear(new Date(this.jobProfileForm.value.jobStartDateFrom).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    if (frm <= startdate) {
      const alert = await this.toastController.create({
        header: '',
        message: 'End date should be greater than Start date.',
        duration: 3000,
      });
      this.jobProfileForm.patchValue({
        'jobStartDateTo':""
      })
       await alert.present();
    }
  }

  async validateSalaryFrom(salaryFrom){
    if(this.jobProfileForm.value.jobSalaryTo !=""){
      let salFrom = parseInt(salaryFrom);
      let salto = parseInt(this.jobProfileForm.value.jobSalaryTo);
      if(salFrom>salto){
        const alert = await this.toastController.create({
          header: '',
          message: 'Salary From should be lesser than Salary To.',
          duration: 3000,
        });
        this.jobProfileForm.patchValue({
          'jobSalaryFrom':""
        })
         await alert.present(); 
      } 
    }
    
  }


  async validateOpenings(openings){
    if(this.jobProfileForm.value.openings !=""){

        const alert = await this.toastController.create({
          header: '',
          message: 'No Of Opening is required',
          duration: 3000,
        });
        this.jobProfileForm.patchValue({
          'jobSalaryFrom':""
        })
         await alert.present(); 
      } 

    
  }

  async validateSalaryTo(salaryTo){
    let salFrom = parseInt(this.jobProfileForm.value.jobSalaryFrom);
    let salto = parseInt(salaryTo);
    if(salFrom>salto){
      const alert = await this.toastController.create({
        header: '',
        message: 'Salary To should be greater than Salary From.',
        duration: 3000,
      });
      this.jobProfileForm.patchValue({
        'jobSalaryTo':""
      })
       await alert.present();
    }else if( salto<salFrom){
      const alert = await this.toastController.create({
        header: '',
        message: 'Salary From should be lesser than Salary To.',
        duration: 3000,
      });
      this.jobProfileForm.patchValue({
        'jobSalaryFrom':""
      })
       await alert.present();
    }
  }

  onEnter(){
    alert(12)
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

getAdditionalPay(){

  var getAdditionalPayUrl = "api/auth/app/jobportal/additionalpayList";

  this.storageservice.getrequest(getAdditionalPayUrl).subscribe(result => {

    console.log(result);
    if(result["success"] == true){
 this.additionalPaylist = result["additionalpayList"];

    }
  })
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
  this.locationOffer.push(id);
  this.showResults = false;
  this.searchResults = [];
  this.searchCtrl.setValue('');
}

removeCity(city: string) {
  this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
}


// location auto complete 
onSearchOfferLocation(value: string) {
  if (value.length > 2) {
    this.showResultsForLocation = true;
    this.searchResultsOffLocation = this.workLocation.filter(city => city.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  } else {
    this.showResultsForLocation = false;
    this.searchResultsOffLocation = [];
  }
}

selectCityForLocation(city: string,id:string) {
  this.selectedCitiesOffLocation.push(city);
  this.cityName = city;
  this.locationAdvertise.push(id);
  this.showResultsForLocation = false;
  this.searchResultsOffLocation = [];
  this.searchCtrl.setValue('');
}

removeCityForLocation(city: string) {
  this.selectedCitiesOffLocation.splice(this.selectedCitiesOffLocation.indexOf(city), 1);
}

jobtitleList(event){
  var value = event
  var jobtitleurl = "api/auth/app/CommonUtility/jobTitleList?industryid=" +value;

  const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
    this.jobTitleList = result["jobTitleList"];
    
    console.log(`jobTitleList: ${JSON.stringify(this.jobTitleList)}`);
  });
}


  workLocationList(){
    var getJobTypeListUrl = "api/auth/app/CommonUtility/locationListMobile"; 
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.workLocation = result["locationList"]; 
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
    this.cityName = skill;
    this.cityId = id;
    this.showSkillResults = false;
    this.searchSkillResults = [];
    this.searchCtrl.setValue('');
  }

  removeSkill(skill: string) {
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
  }   
   

  //save
async savejobadvertisement(){
  this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.location = this.selectedCities;
const errors = this.checkFormValidity(this.jobProfileForm);

if (errors.length > 0) {
  // Display errors in a popup
  const alert = await this.toastController.create({
    header: '',
    message: errors.join('<br>'),
    duration: 3000,
  });

  await alert.present();
} else {
   this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.locationOffer = this.locationOffer;
  this.jobProfileForm.value.locationAdvertise = this.locationAdvertise;
  this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'dd/MM/yyyy','en-IN');
  this.jobProfileForm.value.appDeadline =formatDate(this.jobProfileForm.value.appDeadline, 'dd/MM/yyyy','en-IN');


  const myNumber: number = parseInt(this.jobProfileForm.value.industry);
  this.jobProfileForm.value.industry = myNumber;

  this.jobProfileForm.value.currentUserId = this.userId;
  this.jobProfileForm.value.currentUserName = this.currentUserName;
     
this.jobpostMaster = this.jobProfileForm.value;
console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
var saveJobProfile = "api/auth/app/jobportal/savejobadvertisement";

 this.storageservice.postrequest(saveJobProfile, this.jobpostMaster).subscribe(result => {  
    console.log("Image upload response: " + result)
   if (result["success"] == true) {
    //this.jobProfileForm.reset();
    //this.router.navigate(['/job']);
    this.presentToast()
    }else{
      const jobStartDateFrom = this.jobProfileForm.value.jobStartDateFrom;
        const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();
        this.jobProfileForm.value.jobStartDateFrom = startdate.toISOString();

        const appDeadline = this.jobProfileForm.value.appDeadline;
        const enddate = moment(appDeadline, 'DD/MM/YYYY').toDate();
        this.jobProfileForm.value.appDeadline = enddate.toISOString();
    }
 });
}
} 

//Update
async updatejobseek(){
  this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.location = this.selectedCities;
const errors = this.checkFormValidity(this.jobProfileForm);

if (errors.length > 0) {
  // Display errors in a popup
  const alert = await this.toastController.create({
    header: '',
    message: errors.join('<br>'),
    duration: 3000,
  });

  await alert.present();
} else {

   this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.location = this.selectedCities;

  this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'dd/MM/yyyy','en-IN');
  this.jobProfileForm.value.jobStartDateTo =formatDate(this.jobProfileForm.value.jobStartDateTo, 'dd/MM/yyyy','en-IN');

  const myNumber: number = parseInt(this.jobProfileForm.value.industry);
  this.jobProfileForm.value.industry = myNumber;

   this.jobProfileForm.value.currentUserId = this.userId;
   this.jobProfileForm.value.currentUserName = this.currentUserName;
     
this.jobpostMaster = this.jobProfileForm.value;
console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
var saveJobProfile = "api/auth/app/jobportal/updateJobSeek";

 this.storageservice.postrequest(saveJobProfile, this.jobpostMaster).subscribe(result => {  
    console.log("Image upload response: " + result)
   if (result["success"] == true) {
    this.jobProfileForm.reset();
    this.router.navigate(['/job']);
    this.updateToast()
    }else{
      const jobStartDateFrom = this.jobProfileForm.value.jobStartDateFrom;
        const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();
        this.jobProfileForm.value.jobStartDateFrom = startdate.toISOString();

        const jobStartDateTo = this.jobProfileForm.value.jobStartDateTo;
        const enddate = moment(jobStartDateTo, 'DD/MM/YYYY').toDate();
        this.jobProfileForm.value.jobStartDateTo = enddate.toISOString();
    }
 });
}
} 




transformDate(date) {
  return date.substring(0, 4) + "/" + date.substring(5, 7) + "/" + date.substring(8, 10); //YYY-MM-DD
}


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}

async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });

await toast.present();
}


async errorToast() {
const toast = await this.toastController.create({
  message: 'Please provide all the required values!',
  duration: 3000,
  cssClass: 'custom-toast'
});

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


 // footer nav

 goto_profileSearch(){
  this.router.navigate(['/job-search']);
}
goto_jobs(){
  this.router.navigate(['/oni-job-post']);
}
goto_instihome(){
  this.router.navigate(['/institution-dashboard']);

}
goto_orghome(){

  this.router.navigate(['/organization-dashboard']);
}
goto_home(){
  this.router.navigate(['/home']);
}
goto_orgprofile(){
  this.router.navigate(['/org-profile-view']);

}
goto_instiprofile(){

  this.router.navigate(['/insti-profile-view']);
}
goto_profile(){
  this.router.navigate(['/profile-view']);
}
goto_more(){
  this.router.navigate(['/settings']);
}


}
