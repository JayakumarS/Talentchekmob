import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import moment from 'moment';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-profilee',
  templateUrl: './profilee.page.html',
  styleUrls: ['./profilee.page.scss'],
})
export class ProfileePage implements OnInit {
  industryList =[];
  profileForm:FormGroup;
  categoryList: any;
  hobby = new FormControl();
  hobbyList = [];
  hobbie= [];
  languageList: any;
  profiledetails: any;
  userId: any;
  currentUserId: string;
  profileList: any;
  constructor(public router:Router,public storageservice:StorageService,private fb: FormBuilder,private toastController: ToastController) { }

  ngOnInit() {

    this.currentUserId = localStorage.getItem("userId");
    
    this.getIndustry();
    this.profileForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["",[Validators.required]],
      gender: ["", [Validators.required]],
      dob:["",[Validators.required]],
      dobObj:[""],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)],],
      nationalid: ["",[Validators.required]],
      category: ["",[Validators.required]],
      linkurl:[""],
      details:[""],
      uploadImg:[""],
      permAddress:["",[Validators.required]],
      hobbies:[""],
      languagesknown:[""],
    // uploadImg:[""],
      currentUserId:[""],
    });
this.editprofile();
    this.hobbeList();
    this.List();
  }


  
  hobbeList () {
    var gethobbyListUrl = "api/auth/app/CommonUtility/hobbyList";
    this.storageservice.getrequest(gethobbyListUrl).subscribe(result => {

      if (result["success"] == true) {
        this.hobbyList = result["hobbyList"];
        console.log(`hobbyList: ${JSON.stringify(this.hobbyList)}`);
      }
    });
  }

  List () {
    var getlanguageListUrl = "api/auth/app/CommonUtility/languageList";
    this.storageservice.getrequest(getlanguageListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.languageList = result["languageList"];
      }
    });
  }
  education()
  {
    this.router.navigate(['/profile/addEducation']) 
  }
  profileView()
  {
    this.router.navigate(['/profile-view']) 
  }

  getIndustry(){
    var getcategoryListUrl= "api/auth/app/CommonUtility/categoryList";
       
    this.storageservice.getrequest(getcategoryListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.categoryList = result["categoryList"]; 
     }
   });
  }

  async Update(){
    const errors = this.checkFormValidity(this.profileForm);

    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: 'Validation Error',
        message: 'Please provide all the required values!',
        buttons: ['OK']
      });
  
      await alert.present();
    } else{
      this.profileForm.value.dob =formatDate(this.profileForm.value.dob, 'dd/MM/yyyy','en-IN');
      this.profileForm.value.currentUserId=this.currentUserId;
      this.profiledetails = this.profileForm.value;
      console.log(` data: ${JSON.stringify(this.profiledetails)}`);
      var updateprofile = "api/auth/app/mobile/updateprofile";
    
       this.storageservice.postrequest(updateprofile, this.profiledetails).subscribe(result => {  
          console.log("Image upload response: " + result)
         if (result["success"] == true) {
        
          this.presentToast()
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
   
    window.location.reload();
    this.router.navigate(['/profile-view']);
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



  //editprofileDetails
  editprofile(){

    var industryURL = "api/auth/app/mobile/editprofiledetails?currentUserId="+this.currentUserId ;
    this.storageservice.getrequest(industryURL).subscribe(result => {
    
      
      if (result["success"] == true) {
        this.profileList = result["profileList"]; 
       }
        const dob =  this.profileList[0].dob;
        const startdate = moment(dob, 'DD/MM/YYYY').toDate();

      this.profileForm.patchValue({
       'dob': startdate.toISOString(),
       'firstname': this.profileList[0].firstname,
       'lastname': this.profileList[0].lastname,
       'gender':this.profileList[0].gender,
       'mobile':this.profileList[0].mobile,
       //'dob':this.profileList[0].dob,
       'dobObj':result,
       'permAddress':this.profileList[0].permAddress,
       'email':this.profileList[0].email,
       'nationalid':this.profileList[0].nationalid,
       'category': this.profileList[0].category,
       'uploadImg':this.profileList[0].uploadImg,
       'linkurl': this.profileList[0].linkurl,
       'details': this.profileList[0].details,
       'hobbies':this.profileList[0].hobbies,
       'languagesknown':this.profileList[0].languagesknown,
      })
  
    })
  }
}