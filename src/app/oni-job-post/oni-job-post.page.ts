import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import moment from 'moment';
import { formatDate } from '@angular/common';
import { OniJobPostListPage as listpage } from '../oni-job-post-list/oni-job-post-list.page';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { LanguageService } from '../language.service';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-oni-job-post',
  templateUrl: './oni-job-post.page.html',
  styleUrls: ['./oni-job-post.page.scss'],
})
export class OniJobPostPage implements OnInit {  

  //refresh function
  doRefresh(event) {
    this.ngOnInit();
     setTimeout(() => {
     event.target.complete();
    }, 2000);
  }

  //date function
  getMaxDate() {
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate()+2);
    const maxDate = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());
    return {
      minDate: minDate.toISOString().split('T')[0],
      maxDate: maxDate.toISOString().split('T')[0]
    };
  }
   
  buttonEnable: boolean = false;
  userId:string 
  language:any;
  jobtype:any; 
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
  locationId=[];
  location=[];
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,private popoverController: PopoverController,private languageService: LanguageService,
    private toastController: ToastController,
    public storageservice:StorageService,private route: ActivatedRoute,public alertController: AlertController, private ngZone: NgZone) { 
      if (!this.languageService.selectedLang) {
        this.languageService.setInitialAppLanguage();
      }
    }

    //nav bar
    selectedTab: string = 'earth'; 
    setSelectedTab(tabName: string) {
      this.selectedTab = tabName;
    }


  ngOnInit() {
    this.buttonEnable = false;
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
    this.timeoutFunction(); 
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

  // timeout function for first button
 timeoutFunction(){
    setTimeout(() => {
      this.buttonEnable = true;
      }, 2000);
  }

  // refresh by click the back button
  refreshData(){
   this.jobProfileForm.patchValue({
      'industry': '',
      'jobTitle1': '',
      'jobType': '',
      'openings': '', 
      'roles': '',
      'jobSkills': '',
      'jobExperience': '',
      'jobSalaryFrom':'',
      'jobSalaryTo':'',
      'appDeadlineObj':'',
      'appDeadline': '',
      'locationOffer': '', 
      'reqLanguages':'', 
  }) 
  this.selectedCities =[];
  this.selectedSkills = [];
  this.selectedCitiesOffLocation = []; 
  this.jobProfileForm.reset();
  }

  // edit function
  fetchdetails(Id){ 
    var BasicSearcUrl = "api/auth/app/jobportal/JobAdvertisementedit?jobId="+ Id ; 
    this.storageservice.getrequest(BasicSearcUrl).subscribe(result => {
      if(result["success"] == true){ 
        console.log(result["jobAdvertisementList"]);
      if(result["jobAdvertisementList"].length !=0){ 
        this.refreshData();
        this.edit=true;
        this.getJobType();
        this.getlanguageList();
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
        this.language = result["jobAdvertisementList"][0].reqLanguages;
        this.jobtype = result["jobAdvertisementList"][0].jobType; 
        this.location= result["jobAdvertisementList"][0].locationOffer;
        this.locationId= result["jobAdvertisementList"][0].locationOfferId;

        this.jobProfileForm.patchValue({
          'jobTitle1': this.editJobTitle,
          'industry': industry,
          'roles': result["jobAdvertisementList"][0].roles,
          'jobExperience':result["jobAdvertisementList"][0].jobExperience,
          'jobExperienceFormat': result["jobAdvertisementList"][0].jobExperienceFormat,
          'jobExpWorkHrs': result["jobAdvertisementList"][0].jobExpWorkHrs, 
          'auctioned': result["jobAdvertisementList"][0].isauctioned,
          'jobExperienceMandatory': result["jobAdvertisementList"][0].jobExperienceMandatory.toString(),
          'jobId': result["jobAdvertisementList"][0].jobId,
          'jobSkills': result["jobAdvertisementList"][0].jobSkills,
          'locationOffer': result["jobAdvertisementList"][0].locationOffer,
          'openings': result["jobAdvertisementList"][0].openings,
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

  // step1 validation
  // validatePreference(){
  //   if(this.jobProfileForm.value.industry !="" && this.jobProfileForm.value.industry !=null
  //    && this.jobProfileForm.value.jobTitle1 !="" &&  this.jobProfileForm.value.jobTitle1 !=null &&
  //    this.jobProfileForm.value.jobType !="" && this.jobProfileForm.value.jobType !=null
  //   &&this.jobProfileForm.value.openings !=null){
  //     this.nextStep('step1', 'step2'); 
  //    }else{
  //     this.errorToast();
  //    }
  // }  
 
// step2 validation
  // validateJobDesc(){
  //   if(this.jobProfileForm.value.roles != ""&&this.selectedSkills.length != 0
  //   && this.jobProfileForm.value.jobExperience !="" &&this.jobProfileForm.value.jobExperience !=null
  //   && this.jobProfileForm.value.jobSalaryFrom !=""&& this.jobProfileForm.value.jobSalaryTo !=""
  //   && this.jobProfileForm.value.jobSalaryFrom !=null&& this.jobProfileForm.value.jobSalaryTo !=null){ 
  //     this.nextStep('step2', 'step3')
  //   }
  //   else{
  //     this.errorToast();
  //   }   
  // }
 
// step3 validation
  // validateInformation(){
  //   if(this.jobProfileForm.value.appDeadline != ""&&this.selectedCities.length != 0
  //   && this.jobProfileForm.value.reqLanguages !="" &&this.jobProfileForm.value.reqLanguages !=null){ 
  //  this.nextStep('step3', 'step4')
  //   }
  //   else{
  //     this.errorToast();
  //   }   
  // }
     
  //validation for deadline date
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
       await alert.present();
    }
  }

  // salary from validation
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
  
  // salary to validation
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
  
  // next step function
  nextStep(currentStep: string, nextStep: string) {
    const current = document.getElementById(currentStep);
    const next = document.getElementById(nextStep);
    current.style.display = 'none';
    next.style.display = 'block';
  }
  // next step function
  prevStep(currentStep: string, prevStep: string) {
    const current = document.getElementById(currentStep);
    const prev = document.getElementById(prevStep);
    current.style.display = 'none';
    prev.style.display = 'block';
  }
   
  // ethuku irukune therila
  onSelectionChange(event) {
    console.log('Selected values:', event.detail.value);
  }

  //industry list
  getIndustry(){
    var getIndustryListUrl = "api/auth/app/jobportal/industryList"; 
    this.storageservice.getrequest(getIndustryListUrl).subscribe(result => {
    if (result["success"] == true) {
      this.industryList = result["industryList"]; 
    }
  });
  }

  //job type list
  getJobType(){
    var getJobTypeListUrl = "api/auth/app/jobportal/jobTypeList"; 
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
    if (result["success"] == true) {
      this.jobTypeList = result["jobTypeList"]; 
      if(this.edit==true){
        this.jobProfileForm.patchValue({
          'jobType': this.jobtype,
        })
      }
    }
  });
  }

  // additional pay list
  getAdditionalPay(){ 
    var getAdditionalPayUrl = "api/auth/app/jobportal/additionalpayList"; 
    this.storageservice.getrequest(getAdditionalPayUrl).subscribe(result => { 
    console.log(result);
    if(result["success"] == true){
    this.additionalPaylist = result["additionalpayList"]; 
    }
    })
  }


  // location1 auto complete 
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
    this.locationId.push(id)
    this.cityName = city;
    this.locationOffer.push(id);
    this.showResults = false;
    this.searchResults = [];
    this.searchCtrl.setValue('');
  }

  // removeCity(city: string) {
  //   this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
  // }

  removeCity(city: string,id:string) {
    const index = this.selectedCities.indexOf(city)
    // this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
    if(index>=0)
    {
      this.location.splice(index, 1);
      this.selectedCities.splice(index, 1);
      this.locationId.splice(index, 1);
    }
  }
//ends

 // location2 auto complete 
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

//ends

  //job title list
  jobtitleList(event){
    var value = event
    var jobtitleurl = "api/auth/app/CommonUtility/jobTitleList?industryid=" +value; 
    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
      this.jobTitleList = result["jobTitleList"];
      this.skills();
      if(this.jobTitleList.length != 0 ){
        this.jobProfileForm.patchValue({
          'jobTitle1': this.editJobTitle,
        })
      }
    });
  }


  // location list for mobile
  workLocationList(){
    var getJobTypeListUrl = "api/auth/app/CommonUtility/jobLocationList"; 
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.workLocation = result["locationList"]; 
      }
   });
  }

  //language list
  getlanguageList(){
    var getlanguageListUrl = "api/auth/app/CommonUtility/languageList"; 
    this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.languageList = result["languageList"]; 
      if(this.edit==true){
        this.jobProfileForm.patchValue({
          'reqLanguages': this.language,
        })
      }
      }
   });
  }

  skills(){ 
    this.id= this.jobProfileForm["value"]["jobTitle1"].toString();
    this.showSkillResults = true;
     this.searchSkillResults = this.skillsList.filter(Skill => Skill.text.toLowerCase()); 
  }

  //Driver (Get the skill list based on job title)
  Driver(id){ 
    var jobtitleurl = "api/auth/app/CommonUtility/DriverListUrl?id=" +id; 
    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
     this.skillsList = result["text"];  
   }); 
  }

  // skill list 
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
   
  //ends

  //save
  async savejobadvertisement(){
  this.jobProfileForm.value.jobSkills = this.selectedSkills
  this.jobProfileForm.value.locationOffer =this.locationId; 
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
  this.jobProfileForm.value.locationOffer =this.locationId;
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
    this.presentToast()
    }else{  
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
    this.jobProfileForm.value.locationOffer = this.locationId; 
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
    this.jobProfileForm.value.locationOffer = this.locationId;
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
    
  // success toast popup
  async presentToast() {
      const toast = await this.toastController.create({
        message: 'Saved Successfully',
        duration: 3000,
        cssClass: 'custom-toast'
      });
      this.router.navigate(['/oni-job-post-list']);
         const profilePage = new listpage(this.router,this.ngZone,this.route ,this.storageservice, this.alertController);
         profilePage.reload();
     await toast.present();
  }

  //update toast popup
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/oni-job-post-list']);
      const profilePage = new listpage(this.router,this.ngZone,this.route, this.storageservice, this.alertController);
      profilePage.reload();
  await toast.present();
  }


  //required details toast
  async errorToast() {
  const toast = await this.toastController.create({
    message: 'Please provide all the required values!',
    duration: 3000,
    cssClass: 'custom-toast'
  }); 
  await toast.present();
  }

  //check validation for save
  checkFormValidity(form: FormGroup): string[] {
    const errors: string[] = []; 
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
    this.refreshData();
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
