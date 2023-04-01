import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.page.html',
  styleUrls: ['./org-profile.page.scss'],
})
export class OrgProfilePage implements OnInit {

  docForm:FormGroup;
  industryList: any;
  orgTypeList: any;
  currentUserId: string;
  profileList: any;
  Orgdetails: any;
  constructor(private fb: FormBuilder,public storageservice:StorageService,public router:Router,private toastController: ToastController) { }

  ngOnInit() {


    this.currentUserId = localStorage.getItem("userId");
    
    this.docForm = this.fb.group({
      orgName: ["", [Validators.required]],
      domain: [""],
      orgEmail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      orgMobile:["",[Validators.required]],
      cinReg: ["", [Validators.required]],
      dob:["", [Validators.required]], 
      size: ["",[Validators.required]],
      orgType: [""],
      taxId:[""],
     // orgLogo: ["",[Validators.required]],
      details: ["",[Validators.required]],
      currentUserId:[""]
  })
this.OrgtypeList();
  this.domainList();
  this.editprofile();
}

//domainList 
domainList () {
  var industryListUrl = "api/auth/app/CommonUtility/industryList";
  this.storageservice.getrequest(industryListUrl).subscribe(result => {

    if (result["success"] == true) {
      this.industryList = result["industryList"];
      console.log(`industryList: ${JSON.stringify(this.industryList)}`);
    }
  });
}

//OrgtypeList 
OrgtypeList () {
  var orgTypeListUrl = "api/auth/app/CommonUtility/orgTypeList";
  this.storageservice.getrequest(orgTypeListUrl).subscribe(result => {

    if (result["success"] == true) {
      this.orgTypeList = result["orgTypeList"];
      console.log(`orgTypeList: ${JSON.stringify(this.orgTypeList)}`);
    }
  });
}

//editprofileDetails 
editprofile(){

  var EditprofileDetails = "api/auth/app/OrganizationProfileDetails/orgeditprofiledetails?currentUserId="+this.currentUserId ;
  this.storageservice.getrequest(EditprofileDetails).subscribe(result => {
  
    
    if (result["success"] == true) {
      this.profileList = result["profileList"]; 
     }
    this.docForm.patchValue({
      'orgName':this.profileList[0].orgName,
      'domain':this.profileList[0].domain,
      'orgEmail':this.profileList[0].orgEmail,
      'orgMobile':this.profileList[0].orgMobile,
      'cinReg':this.profileList[0].cinReg,
       'dob':this.profileList[0].dob,
      'size':this.profileList[0].size,
      'orgType':this.profileList[0].orgType,
      'taxId':this.profileList[0].taxId,
      'details':this.profileList[0].details,
     'languagesknown':this.profileList[0].languagesknown,
    })

  })
}

///profileDetails  Update
async Update(){
  const errors = this.checkFormValidity(this.docForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
    
      message: 'Please provide all the required values!',
      duration: 3000,
    });

    await alert.present();
  } else{
    this.docForm.value.dob =formatDate(this.docForm.value.dob, 'dd/MM/yyyy','en-IN');
    this.docForm.value.currentUserId=this.currentUserId;
    this.Orgdetails = this.docForm.value;
    console.log(` data: ${JSON.stringify(this.Orgdetails)}`);
    var updateprofile = "api/auth/app/mobile/updateprofile";
  
     this.storageservice.postrequest(updateprofile, this.Orgdetails).subscribe(result => {  
        console.log("Image upload response: " + result)
       if (result["success"] == true) {
       this.router.navigate(['/profile-view']);
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
}