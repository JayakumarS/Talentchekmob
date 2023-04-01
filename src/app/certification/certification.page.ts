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
  dateValidation: boolean;

  constructor(public router:Router,public modalController: ModalController,
    public fb: FormBuilder, private route: ActivatedRoute,
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
      certificationPath :[""],
      uploadFile:['']
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


   selectedTab: string = 'profile';

   setSelectedTab(tabName: string) {
     this.selectedTab = tabName;
   }

   _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    console.log("binaryString: " + binaryString);

    var base64textString = btoa(binaryString);
    console.log("base64textString: " + base64textString);

    var base64img1 = "data:image/jpeg;base64," + base64textString

    console.log(`readerEvt Data: ${JSON.stringify(readerEvt)}`);
    console.log(`readerEvt.target Data: ${JSON.stringify(readerEvt.target)}`);
    //var uploadFileServiceUrl = "/hrms/master/employeeAdminMaster/uploadfile";
    this.uploadImageToServer(base64img1);
  }

  imgFileNameWithPath: string = "";
  uploadImageToServer(imgSixtyFourData) {

    var uploadImgServiceUrl = "api/auth/app/mobile/uploadImageMob";
    var postDataUpload = {
      "file": imgSixtyFourData,
      "firstName": ''
    }

    console.log(`Upload image posting data: ${JSON.stringify(postDataUpload)}`);

    this.storageservice.postrequest(uploadImgServiceUrl, postDataUpload).subscribe(result => {
      var response = result;
      console.log(`Image upload response: ${JSON.stringify(result)}`);
      if (result["success"] == true) {
        this.imgFileNameWithPath = result["uploadPhoto"];
        console.log("imgFileNameWithPath: " + this.imgFileNameWithPath)
      }
    });
  }
   base64textString: string;
   uploadedFilenameWithoutExt: string;
   uploadedFileSize: string;
   uploadedFileExtension: string;
   uploadFileIcon: string;
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
 
     switch (this.uploadedFileExtension) {
       case ".pdf":
       case ".jpg":
       case ".jpeg":
       case ".png":
         this.uploadFileIcon = "/img/dm/books.png";
         break;
       case ".doc":
       case ".docx":
         this.uploadFileIcon = "/img/dm/doc.png";
         break;
       case ".ppt":
       case ".pptx":
         this.uploadFileIcon = "/img/dm/ppt.png";
         break;
       default:
         this.uploadFileIcon = "/img/dm/file.png";
         break;
     }
 
 
     if (files && file) {
       var reader = new FileReader();
       reader.onload = this._handleReaderLoaded.bind(this);
 
       var ans = reader.readAsBinaryString(file);
       console.log("ans: " + ans);
     }
 
   }

   removeExtension(filename) {
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
  }


  fetchEditDeatils(certId){
    var getEditValues= "api/auth/app/IndividualProfileDetails/editCertification";
         
    this.storageservice.getrequest(getEditValues + "?certId=" + certId).subscribe(result => {

     if (result["success"] == true) {
      this.edit = true;
 
      
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

      
 
      this.certificationForm.patchValue({ 
      'certId': result["skillandCertificationsBean"].certId,
      'certificationName': result["skillandCertificationsBean"].certificationName,
      'issuedBy': result["skillandCertificationsBean"].issuedBy,
      'certificationId': result["skillandCertificationsBean"].certificationId,
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
// loadImageFromDevice(event) {
//   var file = event.target.files[0]; 
//   if (file.size > 2000000) { 
//   }
//    var fileExtension = file.name;
//   var frmData: FormData = new FormData();
//   frmData.append("file", file);
//   frmData.append("fileName", fileExtension);
//   frmData.append("folderName", "knowledgebankfiles");

//   var filepathurl = "api/auth/app/commonServices/uploadFile";
//   this.storageservice.postrequest(filepathurl, frmData).subscribe(async result => {  
//     console.log("Image upload response: " + result)
//    if (result["success"] == true) {
//     if (result["filePath"] != undefined && result["filePath"] != null && result["filePath"] != '') {
//       this.certificationForm.patchValue({
//        'certificationPath': result["filePath"],
//        'certificationName': file.name,
//        'fileSize': file.size, 
//      })
//     }
//  } else { 
//  //  window.location.reload();
//  }
//   //  this.router.navigate(['/profile-view']);
     
//  });
   
// }


   presentModal() {
     this.router.navigate(['/skill-popup']);
  }


  //save
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
    
         if(this.certificationForm.value.issuedDateObj != ""){
          this.certificationForm.value.issuedDateObj =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
          }
          if(this.certificationForm.value.expiryDateObj != ""){
          this.certificationForm.value.expiryDateObj =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
         }
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
      }else{
        const alert = await this.toastController.create({
          header: '',
          message: 'Expiry Date should be greater than Issue date.',
          duration: 3000,
        }); 
         await alert.present();
      }
    } 
  } 

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
     if(this.certificationForm.value.issuedDateObj != ""){
     this.certificationForm.value.issuedDate =formatDate(this.certificationForm.value.issuedDateObj, 'dd/MM/yyyy','en-IN');
     }
     if(this.certificationForm.value.expiryDateObj != ""){
      this.certificationForm.value.expiryDate =formatDate(this.certificationForm.value.expiryDateObj, 'dd/MM/yyyy','en-IN');
     }
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
  }else{
    const alert = await this.toastController.create({
      header: '',
      message: 'Expiry Date should be greater than Issue date.',
      duration: 3000,
    }); 
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
    this.router.navigate(['/profile-view']);
    //window.location.reload();
  await toast.present();
}

async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/profile-view']);
    // window.location.reload();
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
        message: 'Expiry Date should be greater than Issue date.',
        duration: 3000,
      });
      this.certificationForm.patchValue({
        'expiryDateObj':""
      })
       await alert.present();
    }
  }


  async validateStartDate(event){

    if(this.certificationForm.value.expiryDateObj != ""){
      var endDate = new Date(new Date(this.certificationForm.value.expiryDateObj).setFullYear(new Date(this.certificationForm.value.expiryDateObj).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation = true;
      if (endDate <= frm) {
        this.dateValidation = false;
        const alert = await this.toastController.create({
          header: '',
          message: 'Expiry Date should be greater than Issue date.',
          duration: 3000,
        });
        // this.certificationForm.patchValue({
        //   'issuedDateObj':""
        // })
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
