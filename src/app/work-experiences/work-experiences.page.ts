import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-work-experiences',
  //template: '<ckeditor [(ngModel)]="content" [config]="editorConfig"></ckeditor>',
  templateUrl: './work-experiences.page.html',
  styleUrls: ['./work-experiences.page.scss'],

 
})
export class WorkExperiencesPage implements OnInit {  

  ExperienceForm:  FormGroup;
  organisationList: any;
  OrganisationList:any;
  IsorgListShow:boolean= false;
  institutionVal: any;
  organisationVal: any;
  jobTypeList: any;
  isunregOrg:boolean;
  unregisteredOrg: string;
  Experience: any;
  userId: string;
  empId:any;
  edit: boolean = false;
  desiredItem: any;
  dateValidation: boolean;
  constructor(public router:Router,private fb: FormBuilder,private route: ActivatedRoute,
    public storageservice:StorageService,public toastController:ToastController) { }
  Exp = {
    orgName: '',
  }
  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.isunregOrg = false;
    this.ExperienceForm= this.fb.group({
      designation: ["", Validators.required],
      organisationName: ["", Validators.required],
      department: ["", Validators.required],
      registrationNumber: ["", Validators.required],
       expStart: ["", Validators.required],
       expEnd: ["", Validators.required],
      currentlyWork: [""],
      jobType: ["", Validators.required],
      orgLocation: ["", Validators.required],
      expDescription: [""],
      unregisteredOrg:[""],
      ckeditor:[""],
      currentUserId:[""],
      expId:[""]
   });
   this.getJobtype();
   var listConstant =  this.initializeItems(); 

   this.route.queryParams.subscribe(params => {
    if (params) { 
      if (params != null || params != undefined ) {  
          this.fetchEditDeatils(params.id); 
        console.log(params);
      }
    }
  });
 
  }


  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  fetchEditDeatils(expId){
    var getEditValues= "api/auth/app/IndividualProfileDetails/EditExperience";
     this.storageservice.getrequest(getEditValues + "?expId=" + expId).subscribe(result => {
     if (result["success"] == true) {
      this.edit = true;
      this.initializeItems();

      const containsTF = this.checkForTF(result["experienceBean"].organisationName)
      if(containsTF == true){
        this.searchForId(result["experienceBean"].organisationName);  
      }else{
        this.searchForText(result["experienceBean"].organisationName); 
      }


      this.ExperienceForm.get("organisationName").disable(); 

      this.orgLocation(this.desiredItem.id);

      this.validationForCurWorking(result["experienceBean"].currentlyWork)
      const expStart = result["experienceBean"].expStart;
      const startdate = moment(expStart, 'DD/MM/YYYY').toDate();

      if(result["experienceBean"].expEnd != null &&  result["experienceBean"].expEnd != ""){
      const expEnd = result["experienceBean"].expEnd;
      const enddate = moment(expEnd, 'DD/MM/YYYY').toDate();
      this.ExperienceForm.patchValue({
        'expEnd': enddate.toISOString(),
      })
      }


      this.ExperienceForm.patchValue({ 
      'designation': result["experienceBean"].designation,
      'organisationName': this.desiredItem.text,
      'department': result["experienceBean"].department,
      'registrationNumber': result["experienceBean"].registrationNumber,
      'expStart': startdate.toISOString(), 
      'currentlyWork': result["experienceBean"].currentlyWork,
      'jobType': result["experienceBean"].jobType,
      'orgLocation': result["experienceBean"].orgLocation,
      'expDescription': result["experienceBean"].expDescription,
      'ckeditor':result["experienceBean"].ckeditor,
      'expId':result["experienceBean"].expId
      })
     }
   });
  }


  checkForTF(data: string): boolean {
    if (data.indexOf('TF') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  searchForId(id: string) {
    this.desiredItem = null;
    for (const item of this.organisationList) {
      if (item.id === id) {
        this.desiredItem = item; 
        break;
      }
    }
    if (this.desiredItem === null) {
      console.log('Item not found');
    } else {
      console.log(this.desiredItem.text); 
    }
  }


  searchForText(text: string) {
    this.desiredItem = null;
    for (const item of this.organisationList) {
      if (item.text === text) {
        this.desiredItem = item; 
        break;
      }
    }
    if (this.desiredItem === null) {
      console.log('Item not found');
    } else {
      console.log(this.desiredItem.text); 
    }
  }

  certifications()
  {
    this.router.navigate(['/profile/addCertifications']) 
  }
  goto_jobProfile()
  {
    this.router.navigate(['/profile-view']) 
  }


  async validateEndDate(event){
    var startdate = new Date(new Date(this.ExperienceForm.value.expStart).setFullYear(new Date(this.ExperienceForm.value.expStart).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.dateValidation =true;
    if (frm <= startdate) {
      this.dateValidation =false;
      const alert = await this.toastController.create({
        header: '',
        message: 'Job end date should be greater than Start date.',
        duration: 3000,
      });
      this.ExperienceForm.patchValue({
        'expEnd':""
      })
       await alert.present();
    }
  }


  async validateStartDate(event){

    if(this.ExperienceForm.value.expEnd != ""){
      var endDate = new Date(new Date(this.ExperienceForm.value.expEnd).setFullYear(new Date(this.ExperienceForm.value.expEnd).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation =true;
      if (endDate <= frm) {
        this.dateValidation =false;
        const alert = await this.toastController.create({
          header: '',
          message: 'Job end date should be greater than Start date.',
          duration: 3000,
        });
        // this.ExperienceForm.patchValue({
        //   'expStart':""
        // })
         await alert.present();
      }
    }
    
  }

  validationForCurWorking(event){
    var value  = event;
    if(value == true){
      this.ExperienceForm.get("expEnd").disable(); 
    }else{
      this.ExperienceForm.get("expEnd").enable();
    }
  }

  goToSearchSelectedItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.organisationVal = instName;
    this.Exp.orgName = instId;
    this.IsorgListShow = false;
    //this.getstatelist(CtryId);
  }
    async initializeItems(): Promise<any> {
  
      var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
      const InsList = this.storageservice.getrequest(organisationListUrl).subscribe(result => {
        this.organisationList = result["organisationList"];
        this.organisationList = result["organisationList"];
       });
    
      return InsList;
    }
    async filterList(evt) {
      const filterValue = evt.srcElement.value.toLowerCase();
      if(this.isunregOrg == false){
        this.unregisteredOrg = filterValue ;
        this.ExperienceForm.patchValue({
          'orgLocation' : '',
        });
        this.ExperienceForm.get("orgLocation").enable();
      }
      this.isunregOrg = false;
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsorgListShow = true;
        this.OrganisationList = this.organisationList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.OrganisationList = this.organisationList.filter(currentinstitution => {
          countVal++;
          if (currentinstitution.text && searchTerm && countVal < 100) {
            return (currentinstitution.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.OrganisationList == 0) {
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


    getTitle(bookId) {
      var value;
      this.organisationList.forEach(element => {
        if(element.id===bookId){
          value =  element.text;
          this.unregisteredOrg = "" ;
          this.isunregOrg = true;
        }
      });
      return value;
    }

    //Jobtype
    getJobtype(){
      var getjobTypeListUrl= "api/auth/app/jobportal/jobTypeList";
         
      this.storageservice.getrequest(getjobTypeListUrl).subscribe(result => {
       if (result["success"] == true) {
        this.jobTypeList = result["jobTypeList"]; 
       }
     });
    }
    orgLocation(orgid:any){

      var getlocationUrl = "api/auth/app/IndividualProfileDetails/orgLocation";
      this.storageservice.getrequest(getlocationUrl + "?orgid=" + orgid).subscribe(result => {
        if (result["success"] == true) {
          this.ExperienceForm.patchValue({
            'orgLocation' : result["experienceBean"].orgLocation,
          })
          this.ExperienceForm.get("orgLocation").disable();
        }
      });
  }
    //save
  async saveCertification(){
    const errors = this.checkFormValidity(this.ExperienceForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: '',
      message: 'Please provide all the required values!',
      duration: 3000,
    });

    await alert.present();
  } else {

    if(this.dateValidation == true || this.dateValidation == undefined){
      this.ExperienceForm.value.currentUserId = this.userId; 

      this.ExperienceForm.value.expStart =formatDate(this.ExperienceForm.value.expStart, 'dd/MM/yyyy','en-IN');
      if(this.ExperienceForm.value.expEnd != undefined){
       this.ExperienceForm.value.expEnd=formatDate(this.ExperienceForm.value.expEnd, 'dd/MM/yyyy','en-IN');
      }
 
      if(this.unregisteredOrg == ""){
       this.ExperienceForm.value.organisationName = this.Exp.orgName;
      }else{
       this.ExperienceForm.value.organisationName = this.unregisteredOrg;
      }
      this.ExperienceForm.value.unregisteredOrg = this.unregisteredOrg;
      this.Experience = this.ExperienceForm.value;
    console.log(` data: ${JSON.stringify(this.Experience)}`);
   var saveExperience = "api/auth/app/IndividualProfileDetails/saveExperience";
 
    this.storageservice.postrequest(saveExperience, this.Experience).subscribe(async result => {  
       console.log("Image upload response: " + result)
      if (result["success"] == true) {
     
       this.presentToast()
        }else{  
 
        }
    });
    }else{
      const alert = await this.toastController.create({
        header: '',
        message: 'Job end date should be greater than Start date.',
        duration: 3000,
      }); 
   
      this.router.navigate(['/profile-view']);
      window.location.reload();
       await alert.present();
    }
    
  }
  } 

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}



/// update 

async updateCertification(){
  const errors = this.checkFormValidity(this.ExperienceForm);

if (errors.length > 0) {
  // Display errors in a popup
  const alert = await this.toastController.create({
    header: '',
    message: 'Please provide all the required values!',
    duration: 3000,
  });

  await alert.present();
} else {

  if(this.dateValidation == true || this.dateValidation == undefined){
          this.ExperienceForm.value.currentUserId = this.userId; 

          this.ExperienceForm.value.expStart =formatDate(this.ExperienceForm.value.expStart, 'dd/MM/yyyy','en-IN');
          if(this.ExperienceForm.value.expEnd != undefined){
          this.ExperienceForm.value.expEnd=formatDate(this.ExperienceForm.value.expEnd, 'dd/MM/yyyy','en-IN');
          }
          this.Experience = this.ExperienceForm.value;
        console.log(` data: ${JSON.stringify(this.Experience)}`);
      var saveExperience = "api/auth/app/mobile/UpdateExperience";
      
        this.storageservice.postrequest(saveExperience, this.Experience).subscribe(async result => {  
          console.log("Image upload response: " + result)
          if (result["success"] == true) {
          
          this.updateToast()
            }else{  
      
            }
        });
  }else{
      const alert = await this.toastController.create({
        header: '',
        message: 'Job end date should be greater than Start date.',
        duration: 3000,
      }); 
       await alert.present();
    }  
}
} 


async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });

  this.router.navigate(['/profile-view']);
    window.location.reload();

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


  // footer
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
