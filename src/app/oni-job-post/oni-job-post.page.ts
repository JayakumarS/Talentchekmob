import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import moment from 'moment';
import { formatDate } from '@angular/common';
import { OniJobPostListPage as listpage } from '../oni-job-post-list/oni-job-post-list.page';
@Component({
  selector: 'app-oni-job-post',
  templateUrl: './oni-job-post.page.html',
  styleUrls: ['./oni-job-post.page.scss'],
})
export class OniJobPostPage implements OnInit {

  getMaxDate() {
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate()+2);
    const maxDate = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());
    return {
      minDate: minDate.toISOString().split('T')[0],
      maxDate: maxDate.toISOString().split('T')[0]
    };
  }
  

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
  jobId: any;
  startdate: string;
  editJobTitle: any;
  start: Date;
  lastPosted: Date;
  skillsList: any;
  id: any;

  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    private toastController: ToastController,
    public storageservice:StorageService,private route: ActivatedRoute,public alertController: AlertController) { }

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
      // jobQualification: ["",Validators.required],
      jobSkills: [""],
      jobExperience: ["",Validators.required],
      jobExperienceFormat :["Year(s)"],
      jobExperienceMandatory:["false"],


      jobSalaryFrom:["",Validators.required],
      jobSalaryTo:["",Validators.required],
      jobSalaryCurrency: ["INR"],
      jobSalaryFrequency:["Per Year"],
      // additionalpay: ["",Validators.required], 

      //  jobShiftDM: false,
      // jobShiftDT: false,
      // jobShiftDW: false,
      // jobShiftDTH: false,
      // jobShiftDF: false,
      // jobShiftDS: false,
      // jobShiftDSU: false,
      // jobShiftNM: false,
      // jobShiftNT: false,
      // jobShiftNW: false,
      // jobShiftNTH: false,
      // jobShiftNF: false,
      // jobShiftNS: false,
      // jobShiftNSU: false,
      // jobExpWorkHrs: [""],
      // jobStartDateFrom:[""],
      

      appDeadlineObj:[""],
      appDeadline: [""],
      locationOffer: [""],
      // locationAdvertise: [""],
      // gender:["NP"],
      reqLanguages:[""],
      // phoneNo:[""],
      currentUserName:[""],
      currentUserId:[""],

      
      // relocatewill: ["false"],
    // travelwill: ["No"],

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
          console.log(params);
          this.jobId = params.id;
          this.fetchdetails(this.jobId);
        }
      }
    });
  }

  fetchdetails(Id){
    var BasicSearcUrl = "api/auth/app/jobportal/JobAdvertisementedit?jobId="+ Id ;

    this.storageservice.getrequest(BasicSearcUrl).subscribe(result => {
      if(result["success"] == true){ 
        console.log(result["jobAdvertisementList"]);
      if(result["jobAdvertisementList"].length !=0){ 
        this.jobProfileForm.reset(); 
        this.edit=true;
         console.log(result);

        const industry = [result["jobAdvertisementList"][0].industry.toString()]
        const indId = result["jobAdvertisementList"][0].industry;
        this.jobtitleList(indId)

        this.selectedCities =[];
        this.selectedSkills = [];
        this.selectedCitiesOffLocation = [];
        //skill
        let str = result["jobAdvertisementList"][0].jobSkills; 
        for(let i=0;i<str.length;i++){
          var skill = str[i]
          this.selectedSkills.push(skill);
        } 

        //cities
        if(result["jobAdvertisementList"][0].locationOffer != null && result["jobAdvertisementList"][0].locationOffer !=""){
          let str1 = result["jobAdvertisementList"][0].locationOffer; 
          for(let i=0;i<str1.length;i++){
            var city = str1[i]
            this.selectedCities.push(city);
          } 
        }
        


        //offLocation
        let str2 = result["jobAdvertisementList"][0].locationOffer; 
        for(let i=0;i<str2.length;i++){
          var offLocation = str2[i]
          this.selectedCitiesOffLocation.push(offLocation);
        } 

        if(result["jobAdvertisementList"][0].jobStartDateFrom != null && result["jobAdvertisementList"][0].jobStartDateFrom !=""){
          const startDateStr = result["jobAdvertisementList"][0].jobStartDateFrom;
          const [month, year] = startDateStr.split('/');
          const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
  
          this.startdate =formatDate(startDate, 'MM/yyyy','en-IN');
  
          const jobStartDateFrom = this.startdate;
          this.start = moment(jobStartDateFrom, 'MM/yyyy').toDate(); 
          this.jobProfileForm.patchValue({
            'jobStartDateFrom': this.start.toISOString(),
          })
        }
    
        if(result["jobAdvertisementList"][0].appDeadline != null && result["jobAdvertisementList"][0].appDeadline !=""){
          const appDeadline = result["jobAdvertisementList"][0].appDeadline;
          this.lastPosted = moment(appDeadline, 'DD/MM/YYYY').toDate();
          this.jobProfileForm.patchValue({
            'appDeadline': this.lastPosted.toISOString(),
          })
        }
        
        if(result["jobAdvertisementList"][0].jobShift != null && result["jobAdvertisementList"][0].jobShift !=""){
          const shits = result["jobAdvertisementList"][0].jobShift
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
        }
        

        console.log(this.jobShiftArray)
        this.editJobTitle = [result["jobAdvertisementList"][0].jobTitle1.toString()];

        this.jobProfileForm.patchValue({
          'industry': industry,
          'jobType': result["jobAdvertisementList"][0].jobType,
          'jobExperience':result["jobAdvertisementList"][0].jobExperience,
          'jobExperienceFormat': result["jobAdvertisementList"][0].jobExperienceFormat,
          'jobExpWorkHrs': result["jobAdvertisementList"][0].jobExpWorkHrs, 
          'reqLanguages': result["jobAdvertisementList"][0].reqLanguages,
          'auctioned': result["jobAdvertisementList"][0].isauctioned,
          // 'additionalpay': result["jobAdvertisementList"][0].additionalpay,
          'jobExperienceMandatory': result["jobAdvertisementList"][0].jobExperienceMandatory.toString(),
          'jobId': result["jobAdvertisementList"][0].jobId,
          // 'jobQualification': result["jobAdvertisementList"][0].jobQualification,
          'jobSkills': result["jobAdvertisementList"][0].jobSkills,
          
          'locationOffer': result["jobAdvertisementList"][0].locationOffer,
           'openings': result["jobAdvertisementList"][0].openings,
          // 'phoneNo': result["jobAdvertisementList"][0].phoneNo,
          'roles': result["jobAdvertisementList"][0].roles, 

          // 'relocatewill': result["jobAdvertisementList"][0].relocatewill.toString(),
          'jobSalaryFrom': result["jobAdvertisementList"][0].jobSalaryFrom,
          'jobSalaryTo': result["jobAdvertisementList"][0].jobSalaryTo,
          'jobSalaryCurrency': result["jobAdvertisementList"][0].jobSalaryCurrency,
          'jobSalaryFrequency': result["jobAdvertisementList"][0].jobSalaryFrequency,
          //'gender': result["jobAdvertisementList"][0].gender,

          // 'jobShiftDM':this.jobShiftArray[0],
          // 'jobShiftDT':this.jobShiftArray[1],
          // 'jobShiftDW':this.jobShiftArray[2],
          // 'jobShiftDTH':this.jobShiftArray[3],
          // 'jobShiftDF':this.jobShiftArray[4],
          // 'jobShiftDS':this.jobShiftArray[5],
          // 'jobShiftDSU':this.jobShiftArray[6],
          
          // 'jobShiftNM':this.jobShiftArray[7],
          // 'jobShiftNT':this.jobShiftArray[8],
          // 'jobShiftNW':this.jobShiftArray[9],
          // 'jobShiftNTH':this.jobShiftArray[10],
          // 'jobShiftNF':this.jobShiftArray[11],
          // 'jobShiftNS':this.jobShiftArray[12],
          // 'jobShiftNSU':this.jobShiftArray[13],

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
if(this.jobProfileForm.value.roles != ""&&this.selectedSkills.length != 0
 && this.jobProfileForm.value.jobExperience !="" &&this.jobProfileForm.value.jobExperience !=null
 && this.jobProfileForm.value.jobSalaryFrom !=""&& this.jobProfileForm.value.jobSalaryTo !=""
 && this.jobProfileForm.value.jobSalaryFrom !=null&& this.jobProfileForm.value.jobSalaryTo !=null){

  this.nextStep('step2', 'step3')
}
else{
  this.errorToast();
}   
  }

  // validateJobshedule(){
  //   this.nextStep('step4', 'step5')
  // }

  // validateSalary(){
    
  //   this.nextStep('step3', 'step4')
  // }

  validateInformation(){
    if(this.jobProfileForm.value.appDeadline != ""&&this.selectedCities.length != 0
 && this.jobProfileForm.value.reqLanguages !="" &&this.jobProfileForm.value.reqLanguages !=null){

  this.nextStep('step3', 'step4')
}
else{
  this.errorToast();
}   
  }
   

  // validateInformation(value){
  //   if(this.jobProfileForm.value.jobSalaryFrom !="" && this.jobProfileForm.value.jobSalaryFrom !=null
  //    && this.jobProfileForm.value.jobSalaryTo !=""  && this.jobProfileForm.value.jobSalaryTo !=null
  //   && this.selectedCities.length !=0 && this.jobProfileForm.value.reqLanguages != 0){
  //     if(value =='save'){
  //       this.savejobadvertisement();   
  //     }else{
  //       this.updatejobseek();
  //     }
  //   }else{
  //     this.errorToast();
  //    } 
  // }

  // async validateStartDate(event){
  //   var currentDate = new Date(new Date().setFullYear(new Date().getFullYear())); //Currentdate - one year.
  //   console.log("currentDate: " + currentDate);
  //   console.log("startDate: " + event);
  //   var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0)); 
  //   if (frm <= currentDate) {
  //     const alert = await this.toastController.create({
  //       header: '',
  //       message: 'Dead line date should be greater than current date.',
  //       duration: 3000,
  //     });
  //     this.jobProfileForm.patchValue({
  //       'appDeadline':""
  //     })
  //      await alert.present();
  //   }
  // }


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
      // this.jobProfileForm.patchValue({
      //   'jobStartDateTo':""
      // })
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
    this.Driver(this.jobTitleList);
    if(this.jobTitleList.length != 0 ){
      this.jobProfileForm.patchValue({
        'jobTitle1': this.editJobTitle,
        
      })
     
    }
    
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

  skills(){

    this.id= this.jobProfileForm["value"]["jobTitle1"].toString();
    this.showSkillResults = true;
     this.searchSkillResults = this.skillsList.filter(Skill => Skill.text.toLowerCase());
  
  }

  //Driver
  
  Driver(id){
   
    //this.id= this.jobProfileForm["value"]["jobTitle1"].toString();
   var jobtitleurl = "api/auth/app/CommonUtility/DriverListUrl?id=" +id;

   const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
     this.skillsList = result["text"]; 
    
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
  this.jobProfileForm.value.locationOffer = this.locationOffer; 
 const errors = this.checkFormValidity(this.jobProfileForm); 
if (errors.length > 0) {
  // Display errors in a popup
  const alert = await this.toastController.create({
    header: '',
    message: 'Please provide all the required values!',
    duration: 3000,
  });

  await alert.present();
} else {
   this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.locationOffer = this.locationOffer;
  // this.jobProfileForm.value.locationAdvertise = this.locationAdvertise;
  //this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'MM/yyyy','en-IN');
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
      // const jobStartDateFrom = this.jobProfileForm.value.jobStartDateFrom;
      //   const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();
      //   this.jobProfileForm.value.jobStartDateFrom = startdate.toISOString();

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
  this.jobProfileForm.value.locationOffer = this.selectedCities; 
 const errors = this.checkFormValidity(this.jobProfileForm); 
if (errors.length > 0) {
  // Display errors in a popup
  const alert = await this.toastController.create({
    header: '',
    message: 'Please provide all the required values!',
    duration: 3000,
  });

  await alert.present();
} else {

  this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.locationOffer = this.selectedCities;
  // this.jobProfileForm.value.locationAdvertise = this.locationAdvertise;
  //this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'MM/yyyy','en-IN');
  this.jobProfileForm.value.appDeadline =formatDate(this.jobProfileForm.value.appDeadline, 'dd/MM/yyyy','en-IN');


  const myNumber: number = parseInt(this.jobProfileForm.value.industry);
  this.jobProfileForm.value.industry = myNumber;


  const jobtitle: number = parseInt(this.jobProfileForm.value.jobTitle1);
  this.jobProfileForm.value.jobTitle1 = jobtitle;

  this.jobProfileForm.value.currentUserId = this.userId;
  this.jobProfileForm.value.currentUserName = this.currentUserName;
     
  this.jobpostMaster = this.jobProfileForm.value;
  console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
  var updateJobProfile = "api/auth/app/jobportal/updatejobadvertisement";

 this.storageservice.postrequest(updateJobProfile, this.jobpostMaster).subscribe(result => {  
    console.log("Image upload response: " + result)
   if (result["success"] == true) {
    // this.jobProfileForm.reset();
    // this.router.navigate(['/job']);
    this.updateToast()
    }else{
      const appDeadline = this.jobProfileForm.value.appDeadline;
      const enddate = moment(appDeadline, 'DD/MM/YYYY').toDate();
      this.jobProfileForm.value.appDeadline = enddate.toISOString();
 
    }
 });
}
} 
 


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/oni-job-post-list']);
    setTimeout(() => {
      const profilePage = new listpage(this.router, this.storageservice, this.alertController);
     profilePage.reload();
    }, 800);
   await toast.present();
}

async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/oni-job-post-list']);
  setTimeout(() => {
    const profilePage = new listpage(this.router, this.storageservice, this.alertController);
   profilePage.reload();
  }, 800);
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
  this.jobProfileForm.reset();
  this.selectedCities =[];
  this.selectedSkills = [];
  this.selectedCitiesOffLocation = [];
  this.router.navigate(['/oni-job-post-list']);
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
