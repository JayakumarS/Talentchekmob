import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.page.html',
  styleUrls: ['./job-profile.page.scss'],
})
export class JobProfilePage implements OnInit {


  userId:string

  

  jobProfileForm: FormGroup;
  industryList =[];
  jobTitleList = [];
  jobTypeList =[];

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
  showResults: boolean = false; 


  searchSkillResults: string[] = [];
  selectedSkills: string[] = [];
  showSkillResults: boolean = false; 
  jobpostMaster: any;
  searchCtrl = new FormControl('');
  disable :boolean = false;
  disable1: boolean;
  disable2: boolean;
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    private toastController: ToastController,
    public storageservice:StorageService,private route: ActivatedRoute) {  


      this.route.queryParams.subscribe(params => {
        if (params) {
    
          if (params != null) {

            if(params['call'] == "edit-call"){

              this.userId = localStorage.getItem("userId")  ; 
              var BasicSearcUrl = "api/auth/app/jobportal/editJobSeekDetails?currentUserId="+ this.userId ;

              this.storageservice.getrequest(BasicSearcUrl).subscribe(result => {

if(result["success"] == true){

  this.jobProfileForm = result["jobSeekList"][0] ;
            
  console.log(result);
}        
             });


            }
        
           console.log(params);
  
          }
        }
      });
      
    }

  selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

    ngOnInit() {

      this.jobProfileForm = this.fb.group({
        industry: ["",Validators.required],
        jobTitle: ["",Validators.required],
        jobType: ["",Validators.required],
        jobSkills: [""],
        jobExperience:["",Validators.required],
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
      jobExpWorkHrs: ["",Validators.required],
      jobStartDateFrom:["",Validators.required],
       jobStartDateTo:["",Validators.required],
       location: [""],
      reqLanguages: ["",Validators.required],
      relocatewill: ["false"],
      travelwill: ["No"],
      jobSalaryFrom: ["",Validators.required],
      jobSalaryTo: ["",Validators.required],
      jobSalaryCurrency: ["INR"],
      jobSalaryFrequency: ["Per Year"],
      currentUserId:[""]
      }),


      this.getIndustry();
      this.getJobType();
      this.workLocationList();
      this.getlanguageList();
      this.getSkillList();
      this.validatePreference();
      this.validateAvailability();
      this.validateInformation();
    }

    validatePreference(){
      if(this.jobProfileForm.value.industry !="" && this.jobProfileForm.value.jobTitle !="" && this.jobProfileForm.value.jobType !=""
      && this.selectedSkills.length != 0 && this.jobProfileForm.value.jobExperience !=""){
        this.disable = false;
       }else{
        this.disable = true;
       }
    }  

    validateAvailability(){
      if(this.jobProfileForm.value.jobExpWorkHrs !="" && this.jobProfileForm.value.jobStartDateFrom !="" 
      && this.jobProfileForm.value.jobStartDateTo !=""){
        this.disable1 = false;
       }else{
        this.disable1 = true;
       } 
    }

    validateInformation(){
      if(this.jobProfileForm.value.jobSalaryFrom !="" && this.jobProfileForm.value.jobSalaryTo !="" 
      && this.selectedCities.length !=0 && this.jobProfileForm.value.reqLanguages != 0){
        this.disable2 = false;
       }else{
        this.disable2 = true;
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
          header: 'Validation Error',
          message: 'Start date should be greater than current date.',
          buttons: ['OK']
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
          header: 'Validation Error',
          message: 'End date should be greater than Start date.',
          buttons: ['OK']
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
            header: 'Validation Error',
            message: 'Salary From should be lesser than Salary To.',
            buttons: ['OK']
          });
          this.jobProfileForm.patchValue({
            'jobSalaryFrom':""
          })
           await alert.present(); 
        } 
      }
      
    }

    async validateSalaryTo(salaryTo){
      let salFrom = parseInt(this.jobProfileForm.value.jobSalaryFrom);
      let salto = parseInt(salaryTo);
      if(salFrom>salto){
        const alert = await this.toastController.create({
          header: 'Validation Error',
          message: 'Salary To should be greater than Salary From.',
          buttons: ['OK']
        });
        this.jobProfileForm.patchValue({
          'jobSalaryTo':""
        })
         await alert.present();
      }else if( salto<salFrom){
        const alert = await this.toastController.create({
          header: 'Validation Error',
          message: 'Salary From should be lesser than Salary To.',
          buttons: ['OK']
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
 
  jobtitleList(event){
    var value = event.detail.value
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
  async savejobseek(){
    this.jobProfileForm.value.jobSkills = this.selectedSkills
    this.jobProfileForm.value.location = this.selectedCities;
  const errors = this.checkFormValidity(this.jobProfileForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: 'Validation Error',
      message: errors.join('<br>'),
      buttons: ['OK']
    });

    await alert.present();
  } else {
     this.jobProfileForm.value.jobSkills = this.selectedSkills
    this.jobProfileForm.value.location = this.selectedCities;
    var fromdate = this.transformDate(this.jobProfileForm.value.jobStartDateFrom);
    this.jobProfileForm.value.jobStartDateFrom = fromdate;
    var todate = this.transformDate(this.jobProfileForm.value.jobStartDateTo);
    this.jobProfileForm.value.jobStartDateTo = todate;
    this.jobProfileForm.value.currentUserId = 'TFIN10555362814';
       
  this.jobpostMaster = this.jobProfileForm.value;
  console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
  var saveJobProfile = "api/auth/app/jobportal/saveJobSeek";

   this.storageservice.postrequest(saveJobProfile, this.jobpostMaster).subscribe(result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.router.navigate(['/job']);
      this.presentToast()
      }
   });
  }
  } 

  transformDate(date) {
    return date.substring(0, 4) + "-" + date.substring(5, 7) + "-" + date.substring(8, 10); //YYY-MM-DD
  }

 
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Saved Successfully',
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
    this.router.navigate(['/job']);
  }
  goto_home(){
    this.router.navigate(['/home']);
  }
  goto_profile(){
    this.router.navigate(['/profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  }

  
  
}
