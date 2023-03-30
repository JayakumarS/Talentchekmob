import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
import { formatDate } from '@angular/common';
import moment from 'moment';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {

  certificationForm: FormGroup;
  userId: string;
  CertificationForm: any;
  edit: boolean =false;

  constructor(public router:Router,public modalController: ModalController,
    public fb: FormBuilder, private route: ActivatedRoute,
    public storageservice: StorageService,private toastController: ToastController,) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.certificationForm = this.fb.group({
      certificationName:['', Validators.required],
      issuedBy:['', Validators.required],
      issuedDateObj:[''],
      expiryDateObj:[''],
      issuedDate:[''],
      expiryDate:[''],
      certificationId:["", Validators.required],
      certId:[""],
      currentUserId:[""],
      certificationPath :[""]
    })

    this.route.queryParams.subscribe(params => {
      if (params) { 
        if (params != null || params != undefined ) {  
            this.fetchEditDeatils(params.id); 
          console.log(params);
        }
      }
    });


   }





  fetchEditDeatils(certId){
    var getEditValues= "api/auth/app/IndividualProfileDetails/editCertification";
         
    this.storageservice.getrequest(getEditValues + "?certId=" + certId).subscribe(result => {

     if (result["success"] == true) {
      this.edit = true;
 
      const issuedate = result["skillandCertificationsBean"].issuedDate;
      const startdate = moment(issuedate, 'DD/MM/YYYY').toDate();

      const expdate = result['skillandCertificationsBean'].expiryDate;
      const enddate = moment(expdate, 'DD/MM/YYYY').toDate();
 
      this.certificationForm.patchValue({ 
      'certId': result["skillandCertificationsBean"].certId,
      'certificationName': result["skillandCertificationsBean"].certificationName,
      'issuedBy': result["skillandCertificationsBean"].issuedBy,
      'certificationId': result["skillandCertificationsBean"].certificationId,
      'issuedDateObj': startdate.toISOString(),
      'expiryDateObj': enddate.toISOString(),
      'certificationPath': result["skillandCertificationsBean"].uploadCertification
      })
     }
   });
  }




  clubs()
  {
    this.router.navigate(['/profile/addClubs']) 
  }

  experience()
  {
    this.router.navigate(['/profile/addExperience']) 
  }

  
  
//FOR File UPLOAD
loadImageFromDevice(event) {
  var file = event.target.files[0]; 
  if (file.size > 2000000) { 
  }
   var fileExtension = file.name;
  var frmData: FormData = new FormData();
  frmData.append("file", file);
  frmData.append("fileName", fileExtension);
  frmData.append("folderName", "knowledgebankfiles");

  var filepathurl = "api/auth/app/commonServices/uploadFile";
  this.storageservice.postrequest(filepathurl, frmData).subscribe(async result => {  
    console.log("Image upload response: " + result)
   if (result["success"] == true) {
    if (result["filePath"] != undefined && result["filePath"] != null && result["filePath"] != '') {
      this.certificationForm.patchValue({
       'certificationPath': result["filePath"],
       'certificationName': file.name,
       'fileSize': file.size, 
     })
    }
 } else { 
 //  window.location.reload();
 }
  //  this.router.navigate(['/profile-view']);
     
 });
   
}


   presentModal() {
     this.router.navigate(['/skill-popup']);
  }


  //save
  async saveCertification(){
    const errors = this.checkFormValidity(this.certificationForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: 'Validation Error',
      message: 'Please provide all the required values!',
      buttons: ['OK']
    });

    await alert.present();
  } else {
     this.certificationForm.value.currentUserId = this.userId; 

     this.certificationForm.value.issuedDateObj =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
     this.certificationForm.value.expiryDateObj =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
  this.CertificationForm = this.certificationForm.value;
  console.log(` data: ${JSON.stringify(this.CertificationForm)}`);
  var saveSkill = "api/auth/app/mobile/saveCretification";

   this.storageservice.postrequest(saveSkill, this.CertificationForm).subscribe(async result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.router.navigate(['/profile-view']);
      this.presentToast()
       }else{  

       }
   });
  }
  } 

  async UpdateCertification(){
    const errors = this.checkFormValidity(this.certificationForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: 'Validation Error',
      message: 'Please provide all the required values!',
      buttons: ['OK']
    });

    await alert.present();
  } else {
     this.certificationForm.value.currentUserId = this.userId; 

     this.certificationForm.value.issuedDate =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
     this.certificationForm.value.expiryDate =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
  this.CertificationForm = this.certificationForm.value;
  console.log(` data: ${JSON.stringify(this.CertificationForm)}`);
  var saveSkill = "api/auth/app/IndividualProfileDetails/updateCertification";

   this.storageservice.postrequest(saveSkill, this.CertificationForm).subscribe(async result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      this.router.navigate(['/profile-view']);
      this.updateToast()
       }else{  

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

async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
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

  goto_profileView(){
    this.router.navigate(['/profile-view']);
  }
}
