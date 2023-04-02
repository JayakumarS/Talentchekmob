import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {


  docForm:FormGroup;
  currentUserId: string;
  bankDetails: any;
  paymentDetails: any;
  
  constructor(private fb: FormBuilder,public storageservice:StorageService,private toastController: ToastController, public router:Router) { }

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

  }


  //editpaymentDetails 
  editpayment(){

  var EditpaymentDetails = "api/auth/app/PaymentInfo/getBankDetails?currentUserId="+this.currentUserId ;
  this.storageservice.getrequest(EditpaymentDetails).subscribe(result => {
  
    
    if (result["success"] == true) {
      this.bankDetails = result["bankDetails"]; 
     }
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
    console.log(` data: ${JSON.stringify(this.paymentDetails)}`);
    var updatepayment = "api/auth/app/PaymentInfo/updateBankDetails";
  
     this.storageservice.postrequest(updatepayment, this.paymentDetails).subscribe(result => {  
        //console.log("Image upload response: " + result)
       if (result["success"] == true) {
      
        this.presentToast()
        }
     });
}
  
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
