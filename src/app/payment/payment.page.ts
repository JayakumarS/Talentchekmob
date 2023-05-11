import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InstiProfileViewPage } from '../insti-profile-view/insti-profile-view.page';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
      event.target.complete();
  }


  docForm:FormGroup;
  currentUserId: string;
  bankDetails: any;
  paymentDetails: any;
  roleId: any;
  RoleID: any;
  edit: boolean = false;
  constructor(private fb: FormBuilder,public storageservice:StorageService,public alertController: AlertController,private toastController: ToastController, public router:Router) { }

  ngOnInit() {


    this.currentUserId = localStorage.getItem("userId");

    this.docForm = this.fb.group({
      accountHolderName: ["", [Validators.required]],
      bankAccountNo: ['', [Validators.required,Validators.pattern('^[0-9]{9,18}$')]],
      holderEmailId:['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]], 
      ifscCode: ['', [Validators.required,Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      accType: ["", [Validators.required]],
      businessName: ["",[Validators.required]],
      businessType: ["", [Validators.required]],
      currentUserId:[""],
      amount:[""],
      currency:[""]

    });

    this.editpayment();

    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);

  }
  
  public newOrgprofileView(): void {
    this.router.navigate(['/org-profile-view']);
  
  // newOrgprofileView(){
  }
  
  // }

  public newInstiprofileView(): void {
    this.router.navigate(['/insti-profile-view']);
  }
  // newInstiprofileView(){
    
  
  
  // }

  //editpaymentDetails 
  editpayment(){
    this.storageservice.showLoading();
  var EditpaymentDetails = "api/auth/app/PaymentInfo/getBankDetails?currentUserId="+this.currentUserId ;
  this.storageservice.getrequest(EditpaymentDetails).subscribe(result => {
  
    
    if (result["success"] == true) {
      this.storageservice.dismissLoading(); 
      this.edit = true;
      this.bankDetails = result["bankDetails"]; 
      this.docForm.patchValue({
        'accountHolderName': this.bankDetails[0].accountHolderName,
           'bankAccountNo': this.bankDetails[0].bankAccountNo,
           'holderEmailId':this.bankDetails[0].holderEmailId,
           'ifscCode':this.bankDetails[0].ifscCode,
           'accType':this.bankDetails[0].accType,
            'businessName':this.bankDetails[0].businessName,
           'businessType':this.bankDetails[0].businessType,
           'amount':this.bankDetails[0].amount,
           'currency':this.bankDetails[0].currency,
      })
     }else{
      this.storageservice.dismissLoading(); 
     }
   

  })
}


///paymentDetails  Update
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

    this.docForm.value.currentUserId=this.currentUserId;
    this.paymentDetails = this.docForm.value;
    let bankdetails = {
      "name":this.docForm.value.accountHolderName,
      "email":this.docForm.value.holderEmailId,
      
      "tnc_accepted":true,
      "account_details":{
         "business_name":this.docForm.value.businessName,
         "business_type":this.docForm.value.businessType
      },
      "bank_account":{
         "ifsc_code":this.docForm.value.ifscCode,
         "beneficiary_name":this.docForm.value.accountHolderName,
         "account_type":this.docForm.value.accType,
         "account_number":parseInt(this.docForm.value.bankAccountNo)

      }
}

let usr ={
  bankdetails,
  "userid":this.currentUserId,

}

let createAccountIdurl = "api/auth/app/subscription/payments/createActIdRazorpay";

this.storageservice.post(createAccountIdurl,usr).subscribe(result => {
  console.log(result)
  if(result['isSuccess'] == true){
 
    this.presentToast();
  
  }else{
    var msg = result["id"];
     if (msg == null) {
       "id"
     }
     this.storageservice.dismissLoading();
 this.storageservice.generalAlertToast(msg);
 //this.hideLoadingIndicator(); //Hide loading indicator



  }
   
     });
}
  
}



update2(){

  this.docForm.value.currentUserId=this.currentUserId;
  this.paymentDetails = this.docForm.value;

  console.log(` data: ${JSON.stringify(this.paymentDetails)}`);
  var updatepayment = "api/auth/app/PaymentInfo/updateBankDetails";

   this.storageservice.post(updatepayment, this.paymentDetails).subscribe(result => {  
      //console.log("Image upload response: " + result)
     if (result["success"] == true) {
      const Instprofileview = new InstiProfileViewPage(this.router, this.storageservice);
      Instprofileview.reload(); 
      this.presentToast1()
      }
    })
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Update Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/org-profile-view']);
await toast.present();
}
async presentToast1() {
  const toast = await this.toastController.create({
    message: 'Update Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/org-profile-view']);
await toast.present();
}

///paymentDetails  Update
async instiUpdate(){
  const errors = this.checkFormValidity(this.docForm);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
    
      message: 'Please provide all the required values!',
      duration: 3000,
    });

    await alert.present();
  } else{
   
    this.docForm.value.currentUserId=this.currentUserId;
    this.paymentDetails = this.docForm.value;
    let bankdetails = {
      "name":this.docForm.value.accountHolderName,
      "email":this.docForm.value.holderEmailId,
      "tnc_accepted":true,
      "account_details":{
         "business_name":this.docForm.value.businessName,
         "business_type":this.docForm.value.businessType
      },
      "bank_account":{
         "ifsc_code":this.docForm.value.ifscCode,
         "beneficiary_name":this.docForm.value.accountHolderName,
         "account_type":this.docForm.value.accType,
         "account_number":parseInt(this.docForm.value.bankAccountNo)
      }
}
let createAccountIdurl = "api/auth/app/subscription/payments/createActIdRazorpay";

this.storageservice.postrequest(createAccountIdurl, bankdetails).subscribe(result => {
  console.log(result)
    console.log(` data: ${JSON.stringify(this.paymentDetails)}`);
    var updatepayment = "api/auth/app/PaymentInfo/updateBankDetails";
  
     this.storageservice.postrequest(updatepayment, this.paymentDetails).subscribe(result => {  
        //console.log("Image upload response: " + result)
       if (result["success"] == true) {
        const Instprofileview = new InstiProfileViewPage(this.router, this.storageservice);
        Instprofileview.reload();
        this.presentToast2()
        }
      })
     });
}
  
}

async presentToast2() {
  const toast = await this.toastController.create({
    message: 'Update Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/insti-profile-view']);
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

keyPressAlphaNumeric(event) {

  var inp = String.fromCharCode(event.keyCode);

  if (/^[a-zA-Z\s]*$/ .test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
}
