import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import moment from 'moment';
import { JobPage as JobPage} from '../job/job.page';

import { PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.page.html',
  styleUrls: ['./job-profile.page.scss'],
})
export class JobProfilePage implements OnInit {


  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
 locationId=[];
 location=[];
 selectedCitiesId=[];
  editJobTitle: any;
  jobTitleLists: string[] = [];
  jobTypeLists: string[] = [];
  id: any;
  skillsList: any;
  jobtype:any;
  language:any;

  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    return maxDate.toISOString().split('T')[0];
  }


  userId:string

  
  jobsForm: FormGroup;
  jobProfileForm: FormGroup;
  industryList =[];
  jobTitleList = [];
  jobTypeList =[];
  DrvierList= [];
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
  disable1: boolean = false;
  disable2: boolean = false;
  edit: boolean  = false;
  catagoaryType:any;
  jobShiftArray  = [];
  constructor(private fb: FormBuilder,
    public router:Router,
    private http: HttpClient,
    private toastController: ToastController,private popoverController: PopoverController,private languageService: LanguageService,
    public storageservice:StorageService,private route: ActivatedRoute) {  
      if (!this.languageService.selectedLang) {
        this.languageService.setInitialAppLanguage();
      }  
    }

  selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

    ngOnInit() {
      this.userId = localStorage.getItem("userId"); 
      this.catagoaryType= localStorage.getItem("categoryType");
       this.jobProfileForm = this.fb.group({
        industry: ["",Validators.required],
        jobTitle: ["",Validators.required],
        jobType: ["",Validators.required],
        jobSkills: [""],
        jobExperience:["",Validators.required],
        jobExperienceFormat: ["Year(s)"],

       })
        this.jobsForm = this.fb.group({
       location: [""],
      reqLanguages: ["",Validators.required],
      
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
          
          const industry = [result["jobSeekList"][0].industry.toString()]
          const indId = result["jobSeekList"][0].industry;
          this.jobtitleList(indId);
          this.getJobType();
          this.getlanguageList();

          this.selectedCities =[];
          this.selectedSkills = [];
          //skill
          let str = result["jobSeekList"][0].jobSkills; 
          for(let i=0;i<str.length;i++){
            var skill = str[i]
            this.selectedSkills.push(skill);
            this.jobProfileForm.patchValue({
              'jobSkills': this.selectedSkills,
            })
          }

          //city
          let loc = result["jobSeekList"][0].location;

          for(let i=0;i<loc.length;i++){
            var location = loc[i]
            this.selectedCities.push(location);
          }

          // const jobStartDateFrom = result["jobSeekList"][0].jobStartDateFrom;
          // const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();

          // const jobStartDateTo = result["jobSeekList"][0].jobStartDateTo;
          // const enddate = moment(jobStartDateTo, 'DD/MM/YYYY').toDate();

          // const shits = result["jobSeekList"][0].jobShift
          // const arr: string[] = shits.split(",");

          // for(let i=0;i<arr.length;i++){
          //  var job = false;
          //   var shift = arr[i]
          //   if(shift=="f"){
          //     job = false;
          //   }else{
          //     job = true;
          //   }
          //   this.jobShiftArray.push(job);
          // }

          console.log(this.jobShiftArray)
          this.editJobTitle = result["jobSeekList"][0].jobTitle;
          this.jobtype = result["jobSeekList"][0].jobType;
          this.language = result["jobSeekList"][0].reqLanguages;
          this.location= result["jobSeekList"][0].location;
          this.locationId= result["jobSeekList"][0].locationId;

          this.jobProfileForm.patchValue({
            'industry': industry,
            //'jobTitle': result["jobSeekList"][0].jobTitle,
            //'jobType': result["jobSeekList"][0].jobType,
            'jobExperience':result["jobSeekList"][0].jobExperience,
            'jobExperienceFormat': result["jobSeekList"][0].jobExperienceFormat,
            // 'jobExpWorkHrs': result["jobSeekList"][0].jobExpWorkHrs,
            // 'jobStartDateFrom': startdate.toISOString(),
            // 'jobStartDateTo': enddate.toISOString(),
           // 'reqLanguages': result["jobSeekList"][0].reqLanguages,
            // 'relocatewill': result["jobSeekList"][0].relocatewill.toString(),
            // 'travelwill': result["jobSeekList"][0].travelwill,
            'jobSalaryFrom': result["jobSeekList"][0].jobSalaryFrom,
            'jobSalaryTo': result["jobSeekList"][0].jobSalaryTo,
            'jobSalaryCurrency': result["jobSeekList"][0].jobSalaryCurrency,
            'jobSalaryFrequency': result["jobSeekList"][0].jobSalaryFrequency,

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
          this.jobsForm.patchValue({
            'jobSalaryFrom': result["jobSeekList"][0].jobSalaryFrom,
            'jobSalaryTo': result["jobSeekList"][0].jobSalaryTo,
            'jobSalaryCurrency': result["jobSeekList"][0].jobSalaryCurrency,
            'jobSalaryFrequency': result["jobSeekList"][0].jobSalaryFrequency,
            'reqLanguages':result["jobSeekList"][0].reqLanguages,
          })
          console.log(this.jobProfileForm.value) 
        }    
      }    
     });
    }

    // validatePreference(){
    //   if(this.jobProfileForm.value.industry !="" && this.jobProfileForm.value.industry !=null
    //    && this.jobProfileForm.value.jobTitle !="" &&  this.jobProfileForm.value.jobTitle !=null &&
    //    this.jobProfileForm.value.jobType !="" && this.jobProfileForm.value.jobType !=null
    //   && this.selectedSkills.length != 0 && this.jobProfileForm.value.jobExperience !="" &&
    //   this.jobProfileForm.value.jobExperience !=null){
    //     this.nextStep('step1', 'step2'); 
    //    }else{
    //     this.errorToast();
    //    }
    // }  

    // validateAvailability(){
    //   if(this.jobProfileForm.value.jobExpWorkHrs !="" && this.jobProfileForm.value.jobStartDateFrom !="" 
    //   && this.jobProfileForm.value.jobExpWorkHrs !=null && this.jobProfileForm.value.jobStartDateFrom !=null &&
    //   this.jobProfileForm.value.jobStartDateTo !="" && this.jobProfileForm.value.jobStartDateTo !=null){
    //     this.nextStep('step2', 'step3') 
    //    }else{
    //     this.errorToast();
    //    } 
    // }

    validateInformation(value){
      this.jobProfileForm = this.fb.group(
        Object.assign({},this.jobProfileForm.controls,this.jobsForm.controls)
      );
     
      if(this.jobProfileForm.value.jobSalaryFrom !="" && this.jobProfileForm.value.jobSalaryFrom !=null
       && this.jobProfileForm.value.jobSalaryTo !=""  && this.jobProfileForm.value.jobSalaryTo !=null
      && this.selectedCities.length !=0 && this.jobProfileForm.value.reqLanguages != 0){
        if(value =='save'){
          this.savejobseek();   
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
 

  async nextStep(currentStep: string, nextStep: string , jobProfileForm) {
 
  if( jobProfileForm.jobSkills.value != null && jobProfileForm.jobSkills.value.length !=0){
    const current = document.getElementById(currentStep);
    const next = document.getElementById(nextStep);
    current.style.display = 'none';
    next.style.display = 'block';
  
  }else{
  
    const toast = await this.toastController.create({
      message: 'Please select Skills',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();


}

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

      if(this.catagoaryType.includes('IC10')){
        this.jobProfileForm.patchValue({
          'industry': '25'

          });
          this.jobtitleList('25');

      }else{
        this.industryList = result["industryList"];
      }
     }
   });
  }

  getJobType(){
    var getJobTypeListUrl = "api/auth/app/jobportal/jobTypeList";
       
    this.storageservice.getrequest(getJobTypeListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.jobTypeList = result["jobTypeList"]; 
      this.cities = result["jobTypeList"];
      this.jobTypeLists.push(result["jobTypeList"][0].id);
        if(this.catagoaryType.includes('IC10')){
          this.jobProfileForm.patchValue({
            'jobType': (this.jobTypeLists) 
            }); 
        }else{
          this.jobTypeList = result["jobTypeList"]
        }
        if(this.edit == true){
          this.jobProfileForm.patchValue({
            'jobType': this.jobtype,
          })
        }
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
    this.locationId.push(id)
    this.cityName = city;
    this.cityId = id;
    this.showResults = false;
    this.searchResults = [];
    this.searchCtrl.setValue('');
  }

  // removeCity(city: string) {
  //   this.selectedCities.splice(this.selectedCities.indexOf(city), 1);
  // }
  removeCity(city: string,id:string) {
    const index = this.location.indexOf(city)
    // this.selectedCities.splice(this.selectedCities.indexOf(id), 1);
    if(index>=0)
    {
    this.location.splice(index, 1);
    this.selectedCities.splice(index, 1)
    this.locationId.splice(index, 1);
    }
  }
 
  jobtitleList(event){
    var value = event
    var jobtitleurl = "api/auth/app/CommonUtility/jobTitleList?industryid=" +value;

    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
      this.jobTitleList = result["jobTitleList"];
      if(this.jobTitleList.length != 0 ){
      if(this.catagoaryType.includes('IC10')){
        this.jobTitleLists.push(result["driverid"].toString()); 
        this.jobProfileForm.patchValue({
          'jobTitle': (this.jobTitleLists)

          });
          this.Driver(this.jobTitleLists);
      }else{
        this.jobTitleList=result["jobTitleList"];
      }
      if(this.edit==true){
        this.jobProfileForm.patchValue({
          'jobTitle': this.editJobTitle,
        })
      }
        
      }
      
      console.log(`jobTitleList: ${JSON.stringify(this.jobTitleList)}`);
    });
  }

skills(){

  //this.id= this.jobProfileForm["value"]["jobTitle"].toString();
  this.showSkillResults = true;
   this.searchSkillResults = this.skillsList.filter(Skill => Skill.text.toLowerCase());

}

  Driver(id){
   
    // this.id= this.jobProfileForm["value"]["jobTitle"].toString();
    var jobtitleurl = "api/auth/app/CommonUtility/DriverListUrl?id=" +id;

    const CustDtls = this.storageservice.getrequest(jobtitleurl).subscribe(result => {
      this.skillsList = result["text"]; 
     
    }); 
   }

 
    workLocationList(){
      var getJobTypeListUrl = "api/auth/app/CommonUtility/jobLocationList"; 
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
        if(this.edit == true){
          this.jobProfileForm.patchValue({
            'reqLanguages': this.language,
          })
        }
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
      if (value.length > 2 ) {
        this.showSkillResults = true;
        
        this.searchSkillResults = this.skillList.filter(Skill => Skill.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
      } else {
        this.showSkillResults = false;
        this.searchSkillResults = [];
      }
    }
  
    selectSkill(skill: string) {
      this.selectedSkills.push(skill);
      this.showSkillResults = false;
      this.searchSkillResults = [];
      this.searchCtrl.setValue('');
      this.jobProfileForm.patchValue({
        'jobSkills': this.selectedSkills,
      })
    }
  
    removeSkill(skill: string) {
      this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
      //this.jobProfileForm.value.jobSkills.splice(this.selectedSkills.indexOf(skill), 1) 
     
    }   
     

    //save
  async savejobseek(){
    this.jobProfileForm.value.jobSkills = this.selectedSkills
    this.jobProfileForm.value.location = this.locationId
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

    this.storageservice.showLoading();
     this.jobProfileForm.value.jobSkills = this.selectedSkills
     this.jobProfileForm.value.location = this.locationId;

    // this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'dd/MM/yyyy','en-IN');
    // this.jobProfileForm.value.jobStartDateTo =formatDate(this.jobProfileForm.value.jobStartDateTo, 'dd/MM/yyyy','en-IN');


    const myNumber: number = parseInt(this.jobProfileForm.value.industry);
    this.jobProfileForm.value.industry = myNumber;

     this.jobProfileForm.value.currentUserId = this.userId;
       
  this.jobpostMaster = this.jobProfileForm.value;
  console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
  var saveJobProfile = "api/auth/app/jobportal/saveJobSeek";

   this.storageservice.postrequest(saveJobProfile, this.jobpostMaster).subscribe(result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.storageservice.dismissLoading();
      this.jobProfileForm.reset();
       const jobpage = new JobPage(this.router, this.storageservice);
      jobpage.reload();
       this.router.navigate(['/job']);
      this.presentToast()
      }else{
        this.storageservice.dismissLoading();
        this.saveError()
        // const jobStartDateFrom = this.jobProfileForm.value.jobStartDateFrom;
        //   const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();
        //   this.jobProfileForm.value.jobStartDateFrom = startdate.toISOString();

        //   const jobStartDateTo = this.jobProfileForm.value.jobStartDateTo;
        //   const enddate = moment(jobStartDateTo, 'DD/MM/YYYY').toDate();
        //   this.jobProfileForm.value.jobStartDateTo = enddate.toISOString();
      }
   });
  }
  } 

  //Update
  async updatejobseek(){
    this.jobProfileForm.value.jobSkills = this.selectedSkills
    this.jobProfileForm.value.location = this.locationId;
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
    this.storageservice.showLoading();
     this.jobProfileForm.value.jobSkills = this.selectedSkills
     this.jobProfileForm.value.location = this.locationId;

    // this.jobProfileForm.value.jobStartDateFrom =formatDate(this.jobProfileForm.value.jobStartDateFrom, 'dd/MM/yyyy','en-IN');
    // this.jobProfileForm.value.jobStartDateTo =formatDate(this.jobProfileForm.value.jobStartDateTo, 'dd/MM/yyyy','en-IN');

    const myNumber: number = parseInt(this.jobProfileForm.value.industry);
    this.jobProfileForm.value.industry = myNumber;

     this.jobProfileForm.value.currentUserId = this.userId;
       
  this.jobpostMaster = this.jobProfileForm.value;
  console.log(` data: ${JSON.stringify(this.jobpostMaster)}`);
  var saveJobProfile = "api/auth/app/jobportal/updateJobSeek";

   this.storageservice.postrequest(saveJobProfile, this.jobpostMaster).subscribe(result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.storageservice.dismissLoading();
      const jobpage = new JobPage(this.router, this.storageservice);
      jobpage.reload();
      this.jobProfileForm.reset();
      this.router.navigate(['/job']); 
       this.updateToast()
      }else{
        this.storageservice.dismissLoading();
        this.saveError();
        // const jobStartDateFrom = this.jobProfileForm.value.jobStartDateFrom;
        //   const startdate = moment(jobStartDateFrom, 'DD/MM/YYYY').toDate();
        //   this.jobProfileForm.value.jobStartDateFrom = startdate.toISOString();

        //   const jobStartDateTo = this.jobProfileForm.value.jobStartDateTo;
        //   const enddate = moment(jobStartDateTo, 'DD/MM/YYYY').toDate();
        //   this.jobProfileForm.value.jobStartDateTo = enddate.toISOString();
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


  async saveError() {
    const toast = await this.toastController.create({
      message: 'Unable to save',
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


  valid(ee){


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
