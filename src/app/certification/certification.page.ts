import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
import { formatDate } from '@angular/common';
import moment from 'moment';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {
  uploadedFile: any;
  doRefresh(event) {
    this.ngOnInit();
  setTimeout(() => {
     event.target.complete();
  }, 2000);
 }

 //date function
  getMaxDate(){
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    return maxDate.toISOString().split('T')[0];
  }

  certificationForm: FormGroup;
  userId: string;
  CertificationForm: any;
  edit: boolean =false;
  dateValidation: boolean; 
  uploadedFilenameWithoutExt: string;
  uploadedFileSize: string;
  uploadedFileExtension: string;
  
  constructor(public router:Router,public modalController: ModalController,
    public fb: FormBuilder, private route: ActivatedRoute,private elementRef: ElementRef
    ,public alertController: AlertController, private ngZone: NgZone,
    public storageservice: StorageService,private toastController: ToastController,) { }

  ngOnInit() {
      this.userId = localStorage.getItem("userId");
      this.certificationForm = this.fb.group({
      certificationName:['', Validators.required],
      issuedBy:['', Validators.required],
      issuedDateObj:['', Validators.required],
      expiryDateObj:[''],
      issuedDate:[''],
      expiryDate:[''],
      certificationId:["", Validators.required],
      certId:[""],
      currentUserId:[""],
      uploadCertification :["", Validators.required],
      uploadFile:['']
    }) 

    this.route.queryParams.subscribe(params => {
      this.uploadedFile = '';
      if (params) { 
        if (params != null || params != undefined ) {   
            this.fetchEditDeatils(params.id); 
          console.log(params);
        }
      }
    });  
   }

   //nav bar
   selectedTab: string = 'profile'; 
   setSelectedTab(tabName: string) {
     this.selectedTab = tabName;
   }
 
   // file upload
   upload(event) {
     var files = event.target.files[0];
     var file = files;
     var fileName = file.name;
     this.uploadedFilenameWithoutExt = this.removeExtension(fileName);
     this.uploadedFileExtension = fileName.split('.').pop().toLowerCase();
     this.uploadedFileSize = Math.round((file.size / 1000)) + " KB";
 
     console.log(`fileName: ${JSON.stringify(fileName)}`);
     console.log(`uploadedFilenameWithoutExt: ${JSON.stringify(this.uploadedFilenameWithoutExt)}`);
     console.log(`uploadedFileExtension: ${JSON.stringify(this.uploadedFileExtension)}`);
     console.log(`uploadedFileSize: ${JSON.stringify(this.uploadedFileSize)}`);

    var fileExtension = files.name;
    var frmData: FormData = new FormData();
    frmData.append("file", files);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileImg");

    var filepathurl = "api/auth/app/fileUpload/uploadFile";
    if(this.uploadedFileExtension == "pdf"){
      this.storageservice.post<any>(filepathurl, frmData).subscribe({
        next: (data) => {
          if(data["success"] == true){
            console.log(data);
            this.uploadedFile = data.filePath;
            this.certificationForm.patchValue({
              'uploadCertification':data.filePath,
            })
          }else{
              this.uploadedFile='';
              this.fileAlert();
            } 
          },
        error: (error) => {
          console.log(error);
        }
      });
    }else{
      this.certificationForm.patchValue({
        'uploadCertification':'',
      })
      this.uploadedFile='';
      this.pdfError();
    }
    
   }

    // Unable to upload toast
    async pdfError(){
      const alert = await this.toastController.create({
        header: '',
        message: 'Invalid File Type',
        duration: 3000,
      }); 
       await alert.present();
     }

   // Unable to upload toast
   async fileAlert(){
    const alert = await this.toastController.create({
      header: '',
      message: 'Unable to upload File',
      duration: 3000,
    }); 
     await alert.present();
   }

   //remove file extension
   removeExtension(filename) {
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
  }
 
  //edit function
  fetchEditDeatils(certId){
    this.storageservice.showLoading();
    var getEditValues= "api/auth/app/IndividualProfileDetails/editCertification"; 
    this.storageservice.getrequest(getEditValues + "?certId=" + certId).subscribe(result => { 
     if (result["success"] == true) {
      this.edit = true;
      this.storageservice.dismissLoading();
      
      if(result["skillandCertificationsBean"].issuedDate != null &&  result["skillandCertificationsBean"].issuedDate != ""){
        const issuedate = result["skillandCertificationsBean"].issuedDate;
        const startdate = moment(issuedate, 'DD/MM/YYYY').toDate();
        this.certificationForm.patchValue({
          'issuedDateObj': startdate.toISOString(),
        })
        }

      if(result["skillandCertificationsBean"].expiryDate != null &&  result["skillandCertificationsBean"].expiryDate != ""){
        const expdate = result['skillandCertificationsBean'].expiryDate;
        const enddate = moment(expdate, 'DD/MM/YYYY').toDate();
        this.certificationForm.patchValue({
          'expiryDateObj': enddate.toISOString(),
        })
        }

      this.uploadedFile = result["skillandCertificationsBean"].uploadCertification;
 
      this.certificationForm.patchValue({ 
      'certId': result["skillandCertificationsBean"].certId,
      'certificationName': result["skillandCertificationsBean"].certificationName,
      'issuedBy': result["skillandCertificationsBean"].issuedBy,
      'certificationId': result["skillandCertificationsBean"].certificationId,
      'uploadCertification': result["skillandCertificationsBean"].uploadCertification
      })
     }else{
      this.storageservice.dismissLoading();
     }
     this.storageservice.dismissLoading();
   });
  }
  
  // save function
  async saveCertification(){
    const errors = this.checkFormValidity(this.certificationForm);  
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
         this.certificationForm.value.currentUserId = this.userId; 
    
         if(this.certificationForm.value.issuedDateObj != "" && this.certificationForm.value.issuedDateObj != null){
          this.certificationForm.value.issuedDateObj =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
          }
          if(this.certificationForm.value.expiryDateObj != "" && this.certificationForm.value.expiryDateObj != null){
          this.certificationForm.value.expiryDateObj =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
         }
        this.CertificationForm = this.certificationForm.value;
        console.log(` data: ${JSON.stringify(this.CertificationForm)}`);
        var saveSkill = "api/auth/app/mobile/saveCretification";
    
        this.storageservice.postrequest(saveSkill, this.CertificationForm).subscribe(async result => {  
            console.log("Image upload response: " + result)
            if (result["success"] == true) {
            setTimeout(() => {
              const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
            profilePage.updateData();
            }, 800);
              this.presentToast()
            }
       });
      }else{
        const alert = await this.toastController.create({
          header: '',
          message: 'Expiry Date should be greater than Issue date.2',
          duration: 3000,
        }); 
         await alert.present();
      }
    } 
  } 

  // update function
  async UpdateCertification(){
    const errors = this.checkFormValidity(this.certificationForm); 
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
     this.certificationForm.value.currentUserId = this.userId; 
     if(this.certificationForm.value.issuedDateObj != "" && this.certificationForm.value.issuedDateObj != null){
     this.certificationForm.value.issuedDate =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
     }
     if(this.certificationForm.value.expiryDateObj != "" && this.certificationForm.value.expiryDateObj != null){
      this.certificationForm.value.expiryDate =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
     }
       this.CertificationForm = this.certificationForm.value;
    console.log(` data: ${JSON.stringify(this.CertificationForm)}`);
    var saveSkill = "api/auth/app/IndividualProfileDetails/updateCertification";

   this.storageservice.postrequest(saveSkill, this.CertificationForm).subscribe(async result => {  
      console.log("Image upload response: " + result)
      if (result["success"] == true) {
      setTimeout(() => {
         const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
        profilePage.updateData();
      }, 800);
       this.updateToast()
       }else{  

       }
   });
  }else{
    const alert = await this.toastController.create({
      header: '',
      message: 'Expiry Date should be greater than Issue date.3',
      duration: 3000,
    }); 
     await alert.present();
  }
  }
  }

  // success toast popup
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/profile-view']);
   await toast.present();
}

//update toast popup
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/profile-view']);
  await toast.present();
  }

  // validation check function
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

  //back button
  goto_profileView(){
    this.certificationForm.reset();
    this.router.navigate(['/profile-view']);
  }

  //end date validation
  async validateEndDate(event){
    var startdate = new Date(new Date(this.certificationForm.value.issuedDateObj).setFullYear(new Date(this.certificationForm.value.issuedDateObj).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.dateValidation = true;
    if (frm <= startdate) {
      this.dateValidation = false;
      const alert = await this.toastController.create({
        header: '',
        message: 'Expiry Date should be greater than Issue date.4',
        duration: 3000,
      });
      this.certificationForm.patchValue({
        'expiryDateObj':""
      })
       await alert.present();
    }
  }


  // start date validation
  async validateStartDate(event){ 
    if(this.certificationForm.value.expiryDateObj != "" && this.certificationForm.value.expiryDateObj != null){
      var endDate = new Date(new Date(this.certificationForm.value.expiryDateObj).setFullYear(new Date(this.certificationForm.value.expiryDateObj).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation = true;
      if (endDate <= frm) {
        this.dateValidation = false;
        const alert = await this.toastController.create({
          header: '',
          message: 'Expiry Date should be greater than Issue date.1',
          duration: 3000,
        }); 
         await alert.present();
      }
    } 
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
