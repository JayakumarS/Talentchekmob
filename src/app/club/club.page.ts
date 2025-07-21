import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import moment from 'moment';
import { StorageService } from '../storage.service';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
import { LanguageService } from '../language.service';

//For using Razorpay
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {
  name: string;
  clubBranch: any;
  selectedLang: string;
  doRefresh(event) {
    this.ngOnInit();
     setTimeout(() => {
     event.target.complete();
    }, 2000);
 }
  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    return maxDate.toISOString().split('T')[0];
  }

  clubFrom: FormGroup;
  organisationList: any;
  testOrganisationList:any;
  IsorgListShow: boolean = false;
  organisationVal: any;
  club: any;
  userId: any;
  Extracurricular: any;
  clubid: any;
  isunregIns: boolean;
  unregisteredIns: string;
  searchCtrl = new FormControl('');
  searchOrganisationResults: any;
  selectedOrganisation: any;
  extracurricularBean: any;
  experienceBean:any;
  edit: boolean = false;
  disabled: boolean =false;
  desiredItem: any;
  nonMandatory: boolean= false; 

  currencyVal: any;
  amountVal: any;
  currencySymbolVal: any;
  paymentDetails: any;

  pay ={
    amount:0,
    currency:'INR',
    receipt:'TalentChek',
    exAmount:0,
  };
  inrExAmt: any;
  amt: any;
  usdExAmt: any;
  aedExAmt: any;
  myrExAmt: any;
  sgdExAmt: any;

  constructor(public router: Router, public fb: FormBuilder,public languageService:LanguageService,private route: ActivatedRoute,public modalController: ModalController,
     public storageservice: StorageService, private toastController: ToastController
     ,public alertController: AlertController,) { }
    
  ngOnInit() {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    this.clubFrom = this.fb.group({
      clubName: [""],
     clubBranch: [""],
     titleHeld: [""],
     rolePlayed: [""],
     participatedFrom: ["",Validators.required],
     participatedTill: [""],
     currentMember: [""],
     extId: [""],
     checked: [""],
     unregisteredClub: [""],
     currentUserId: [""]
   });

    this.getOrganisationList();

    this.route.queryParams.subscribe(params => {
      if (params) { 
        if (params.id != null || params.id != undefined ) {  
          this.getOrganisationListEdit(params.id);
             
          console.log(params);
        }
        else{
          this.edit = false;
          this.disabled=false;
        }
      }
      
    });
    
    // this.edit = false;
   

    // this.getOrganisationList();

    //var listConstant = this.initializeItems();

    this.userId = localStorage.getItem("userId");

    

  }

  cleardata(){
    this.clubFrom.patchValue({
      'clubName': '',
      'clubBranch': '',
      'titleHeld': '',
      'rolePlayed': '',
      'participatedFrom': '',
      'participatedTill': '',
      'currentMember': '',
      'extId': '',
      'checked': '',
      'unregisteredClub': '',
    })
  }



  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  

 //  Organisation auto complete 
 onSearchOrganisation(value: string) {
  if (value.length > 0) {

    if(this.isunregIns == false){
      this.unregisteredIns = value ;
    }
    this.isunregIns = false;
    this.IsorgListShow = true;
   
    this.searchOrganisationResults = this.organisationList.filter(Organisation => Organisation.text && Organisation.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
  
    if (this.searchOrganisationResults == 0) {
      this.IsorgListShow = false;
      this.clubFrom.patchValue({
      'clubName':value

      })
    }
    else {
      this.IsorgListShow = true;
    }
 
  } else {
    this.IsorgListShow = false;
    this.searchOrganisationResults = [];
  }
}

selectOrganisation(institutionName: string,id:string) {
  this.selectedOrganisation = institutionName;
  this.name=institutionName;
  this.IsorgListShow = false;
  this.clubid = id;
  this.clubFrom.patchValue({
    'clubName':this.clubid
  })

  this.searchOrganisationResults = [];
  this.searchCtrl.setValue('');
  this.orgLocation(this.clubid)
}
//organisation Location
orgLocation(orgid:any){
  var saveperonalinfo = "api/auth/app/IndividualProfileDetails/orgLocation";
  this.storageservice.getrequest(saveperonalinfo + "?orgid=" + orgid ).subscribe(result => {
    this.clubFrom.patchValue({
      'clubBranch' : result["experienceBean"].orgLocation
    })

    this.clubFrom.get("clubBranch").disable();
      
    this.clubBranch = result["experienceBean"].orgLocation
});

// Payment Info
var getPaymentInfo = "api/auth/app/PaymentInfo/getBankDetails";
this.storageservice.getrequest(getPaymentInfo + "?currentUserId=" + orgid).subscribe((resultValue:any) => {
  if(resultValue.success==true){
    this.paymentDetails=resultValue.bankDetails;
  } 
  
});

}
getOrganisationList(){
  var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
  this.storageservice.getrequest(organisationListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.organisationList = result["organisationList"]; 
    this.testOrganisationList = result["organisationList"];
    }
 });
}

getOrganisationListEdit(param:any){
  var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
  this.storageservice.getrequest(organisationListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.organisationList = result["organisationList"]; 
    this.testOrganisationList = result["organisationList"];
    this.editextracurricular(param);
    }
 });
}



// async initializeItems(): Promise<any> { 
//   var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
//   const InsList = this.storageservice.getrequest(organisationListUrl).subscribe(result => {
//     this.organisationList = result["organisationList"];
//     this.organisationList = result["organisationList"];
//    });

//   return InsList;
// }

 removeOrganisation(selectedOrganisation: string) {
  this.selectedOrganisation = undefined;
  this.clubFrom.patchValue({
    'clubBranch':""

  })
  this.clubFrom.get("clubBranch").enable();
}



///
//validate dates
  async validateEndDate(event){
    var startdate = new Date(new Date(this.clubFrom.value.participatedFrom).setFullYear(new Date(this.clubFrom.value.participatedFrom).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    if (frm <= startdate) {
      const alert = await this.toastController.create({
        header: '',
        message: 'Participated Till date should be greater than Participated From date.',
        duration: 3000,
      });
      this.clubFrom.patchValue({
        'participatedTill':""
      })
       await alert.present();
    }
  }


  async validateStartDate(event){

    if(this.clubFrom.value.participatedTill != undefined){
      var endDate = new Date(new Date(this.clubFrom.value.participatedTill).setFullYear(new Date(this.clubFrom.value.participatedTill).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      if (endDate <= frm) {
        const alert = await this.toastController.create({
          header: '',
          message: 'Participated Till date should be greater than Participated From date.',
          duration: 3000,
        });
         await alert.present();
      }
    }
    
  }

  validationForCurMember(event){
    var value  = event;
    if(value == true){
      this.nonMandatory = true
      this.clubFrom.get("participatedTill").disable(); 
      this.clubFrom.patchValue({
          'participatedTill':""
        })
    }else{
      this.nonMandatory = false
      this.clubFrom.get("participatedTill").enable();
    }
  }
  

  getTitle(bookId) {
    var value;
    this.organisationList.forEach(element => {
      if (element.id === bookId) {
        value = element.text;
        this.unregisteredIns = "";
        this.isunregIns = true;
      }
    });
    return value;
  }
  certifications() {
    this.router.navigate(['/profile/addCertifications'])
  }
  connections() {
    this.router.navigate(['/profile/addConnections'])
  }

  async Save() { 
   // this.clubFrom.value.clubBranch = this.clubBranch ;
    if(this.clubFrom.value.clubName != ""){
      const errors = this.checkFormValidity(this.clubFrom); 
      if (errors.length > 0) {
        // Display errors in a popup
        const alert = await this.toastController.create({
         
          message: 'Please provide all the required values!',
          duration: 3000,
        });
    
        await alert.present();
      } else{
  
        if(this.unregisteredIns == ""){
          this.clubFrom.value.clubId = this.clubid;
         }else{
          this.clubFrom.value.unregisteredClub = this.unregisteredIns;
         }
  
         this.clubFrom.value.participatedFrom =formatDate(this.clubFrom.value.participatedFrom, 'dd/MM/yyyy','en-IN');
         if(this.clubFrom.value.participatedTill != undefined){
         this.clubFrom.value.participatedTill =formatDate(this.clubFrom.value.participatedTill, 'dd/MM/yyyy','en-IN');          
         }
         this.clubFrom.value.currentUserId = this.userId;
         //this.clubFrom.value.clubName = this.clubFrom.value.clubId;
         this.Extracurricular = this.clubFrom.value;
         console.log(` data: ${JSON.stringify(this.Extracurricular)}`);
         var saveperonalinfo = "api/auth/app/IndividualProfileDetails/saveExtracurricular";

         if(this.paymentDetails!=undefined && this.paymentDetails!=null && this.paymentDetails.length>0){
          if (this.paymentDetails[0].currency == 'INR') {
            this.amountVal = this.paymentDetails[0].amount;
            this.currencySymbolVal = "₹";
          }
          else if (this.paymentDetails[0].currency == 'USD') {
            this.amountVal = this.paymentDetails[0].amount;
            this.currencySymbolVal = "$";
          }
          else if (this.paymentDetails[0].currency == 'AED') {
            this.amountVal = this.paymentDetails[0].amount;
            this.currencySymbolVal = "د.إ";
          }
          else if (this.paymentDetails[0].currency == 'MYR') {
            this.amountVal = this.paymentDetails[0].amount;
            this.currencySymbolVal = "RM";
          }
          else if (this.paymentDetails[0].currency == 'SGD') {
            this.amountVal = this.paymentDetails[0].amount;
            this.currencySymbolVal = "S$";
          }
        }

        if(this.amountVal!=undefined && this.amountVal!=null && this.amountVal!=0 && this.amountVal!='0'
      && this.clubFrom.controls.currentMember.value !=true){
                // Fee popup
                let alert = await this.alertController.create({

                  //message: 'Are you sure that you want to permanently delete the selected item?',
                  message:'<div class="generic_content"> <div class="generic_head_price"><div class="generic_head_content"> <div class="head_bg"></div> <div class="head"><span>Verification</span> </div></div> <div class="generic_price_tag clearfix"> <span class="price"> <span class="sign">'+this.currencySymbolVal+'</span> <span class="currency">'+this.amountVal+'</span></span></div></div></div>',
                  cssClass: 'alertclass',
                  buttons: [
                    {
                      text: 'PAY',
                      cssClass: 'btncss',
                      handler: () => {
                        console.log('Confirm Okay');
                      // console.log("Id: " + certId);
                        try {
                          
         this.storageservice.postrequest(saveperonalinfo, this.Extracurricular).subscribe(result => {
     
          if (result["success"] == true) {
           // setTimeout(() => {
           //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
           //  profilePage.updateData();
           // }, 800);
            this.presentToast()

            
            let edit = {
             clubId :result["extracurricularBean"].clubId,
             extId:result["extracurricularBean"].extId,
          }
          let navigationExtras: NavigationExtras = {
            queryParams: edit
          };
          this.payWithRazorStandard();
           this.router.navigate(['/activity-verification'],navigationExtras)
   
          }
        });
                        
                        }
                        catch (Exception) {
                          this.storageservice.warningToast('Connection unavailable!');
                        }
                      }
                    },
                    {
                      text: 'CANCEL',
                      role: 'cancel',
                      handler: () => {
                        console.log('Confirm Cancel');
                      }
                    }
                  ]
                });
                await alert.present();

                //
      } else {
       
        this.storageservice.postrequest(saveperonalinfo, this.Extracurricular).subscribe(result => {
     
          if (result["success"] == true) {
           // setTimeout(() => {
           //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
           //  profilePage.updateData();
           // }, 800);
            this.presentToast()

            
            let edit = {
             clubId :result["extracurricularBean"].clubId,
             extId:result["extracurricularBean"].extId,
          }
          let navigationExtras: NavigationExtras = {
            queryParams: edit
          };
           this.router.navigate(['/activity-verification'],navigationExtras)
   
          }
        });
      }

     
    
    } 
    }else{
      this.presentToast1();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
     
    });
    
    this.cleardata();
    this.selectedOrganisation = undefined;
    await toast.present();
  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Name of the Club/Association is required',
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



  profileView()
  {
    this.cleardata();
    this.selectedOrganisation = undefined;
    this.router.navigate(['/profile-view']) 
  }


   //editextracurricularDetails
   editextracurricular(extId){
    this.edit = true;
    this.storageservice.showLoading();
    var industryURL = "api/auth/app/IndividualProfileDetails/EditExtracurricular?extId=" + extId ;
    this.storageservice.getrequest(industryURL).subscribe(result => {
    
      
      
      if (result["success"] == true) {
        this.extracurricularBean = result["extracurricularBean"]; 
        this.storageservice.dismissLoading();
        
        this.disabled =true;
        //  this.getOrganisationList();
        //this.initializeItems();
        
        const containsTF = this.checkForTF(this.extracurricularBean.clubName)
        let containsString=this.containsAlphabets(this.extracurricularBean.clubName); 
        if(containsTF == true || containsString==false){
          this.searchForId(this.extracurricularBean.clubName);  
        }else{
          this.searchForText(this.extracurricularBean.clubName); 
        }
        
        this.clubFrom.get("clubName").disable();
       
        // this.extracurricularBean = result["extracurricularBean"]; 
 
        
        console.log(this.selectedOrganisation)
        // this.selectedOrganisation = this.desiredItem.text;
        
        const participatedFrom =  this.extracurricularBean.participatedFrom;
        const startdate = moment(participatedFrom, 'DD.MM.YYYY').toDate();

        this.validationForCurMember(this.extracurricularBean.currentMember);

        if(this.extracurricularBean.participatedTill != null &&  this.extracurricularBean.participatedTill != ""){
          const expEnd = this.extracurricularBean.participatedTill;
          const enddate = moment(expEnd, 'DD/MM/YYYY').toDate();
          this.clubFrom.patchValue({
            'participatedTill' :enddate.toISOString(),
          })
          }
 
          const participatedTill =  this.extracurricularBean.participatedTill;
          const Enddate = moment(participatedTill, 'DD.MM.YYYY').toDate();
     
       
      
         this.clubFrom.patchValue({
          
            'clubName':this.selectedOrganisation,
           'clubBranch' :this.extracurricularBean.clubBranch,
           'titleHeld': this.extracurricularBean.titleHeld,
           'rolePlayed':this.extracurricularBean.rolePlayed,
          // 'participatedFromObj' : extFromdate,
           'participatedFrom': startdate.toISOString(),
           //'participatedTillObj' : extTodate,
          // 'participatedTill' :Enddate.toISOString(),
           'currentMember': this.extracurricularBean.currentMember,
           'extId': this.extracurricularBean.extId,
           })
           
           this.clubFrom.get("clubBranch").disable();
         
          //  if(this.extracurricularBean.value.clubName.includes('TF')){
          //   this.orgLocation(this.desiredItem.id,);
          // }else{
          // }
         this.orgLocation(this.extracurricularBean.clubName)
       }else{
        this.storageservice.dismissLoading();
       }
      
    })
  }


  checkForTF(data: string): boolean {
    if (data.indexOf('TF') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  searchForId(id: string) {
    var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
  // this.storageservice.getrequest(organisationListUrl).subscribe(result => {
  //  if (result["success"] == true) {
  //   this.organisationList = result["organisationList"]; 
  //   this.testOrganisationList = result["organisationList"];

    this.desiredItem = null;
    console.log(this.organisationList)
    for (const item of this.testOrganisationList) {
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
    this.selectedOrganisation = this.desiredItem.text;
//     }
//  });
    // this.desiredItem = null;
    // console.log(this.organisationList)
    // for (const item of this.testOrganisationList) {
    //   if (item.id === id) {
    //     this.desiredItem = item; 
    //     break;
    //   }
    // }
    // if (this.desiredItem === null) {
    //   console.log('Item not found');
    // } else {
    //   console.log(this.desiredItem.text); 
    // }
  }


  searchForText(text: string) {
    var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
  // this.storageservice.getrequest(organisationListUrl).subscribe(result => {
  //  if (result["success"] == true) {
  //   this.organisationList = result["organisationList"]; 
  //   this.testOrganisationList = result["organisationList"];
    this.desiredItem = null;
    for (const item of this.testOrganisationList) {
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
    this.selectedOrganisation = this.desiredItem.text;
//     }
//  });
 console.log( this.selectedOrganisation)
    // this.desiredItem = null;
    // for (const item of this.testOrganisationList) {
    //   if (item.text === text) {
    //     this.desiredItem = item; 
    //     break;
    //   }
    // }
    // if (this.desiredItem === null) {
    //   console.log('Item not found');
    // } else {
    //   console.log(this.desiredItem.text); 
    // }
  }

  containsAlphabets(inputString: string): boolean {
    // Define a regular expression pattern that matches any alphabet (A-Z, a-z)
    const alphabetPattern = /[a-zA-Z]/;
  
    // Use the test method to check if the string contains any alphabet
    return alphabetPattern.test(inputString);
  }

//Updateclub

  async Updateclub(){
    const errors = this.checkFormValidity(this.clubFrom);

  if (errors.length > 0) {
    // Display errors in a popup
    const alert = await this.toastController.create({
      header: '',
      message: 'Please provide all the required values!',
      duration: 3000,
    });

    await alert.present();
  } else {
     this.clubFrom.value.currentUserId = this.userId; 

     this.clubFrom.value.participatedFrom =formatDate(this.clubFrom.value.participatedFrom, 'dd/MM/yyyy','en-IN');
     if(this.clubFrom.value.participatedTill != undefined){
      this.clubFrom.value.participatedTill =formatDate(this.clubFrom.value.participatedTill, 'dd/MM/yyyy','en-IN');          
      }  this.club = this.clubFrom.value;
  console.log(` data: ${JSON.stringify(this.club)}`);
  var updateclub = "api/auth/app/IndividualProfileDetails/UpdateExtracurricular";

   this.storageservice.postrequest(updateclub, this.club).subscribe(async result => {  
      console.log("Image upload response: " + result)
     if (result["success"] == true) {
      // setTimeout(() => {
      //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
      //  profilePage.updateData();
      // }, 800);
      this.updateToast()
      let edit = {
        clubId:this.desiredItem.id,
        extId:this.club.extId,
     }
     let navigationExtras: NavigationExtras = {
       queryParams: edit
     };
      this.router.navigate(['/activity-verification'],navigationExtras)

       }else{  

       }
   });
  }
  }


async updateToast() {
  const toast = await this.toastController.create({
    message: 'Updated Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  this.cleardata();
  this.selectedOrganisation = undefined;
  // this.router.navigate(['/profile-view']);

await toast.present();
}

payWithRazorStandard() {


  if(this.currencySymbolVal == 'INR'){

    this.inrExAmt=parseInt(this.amountVal)
    this.amt = this.inrExAmt * 100;
    this.pay.exAmount =this.amt;
    this.pay.amount =this.amt;

  }
  if(this.currencySymbolVal == 'USD'){

    this.usdExAmt=parseInt(this.amountVal)
    this.amt = this.usdExAmt * 100;
    this.pay.exAmount =this.amt;
    this.pay.amount =this.amt;

  }
  if(this.currencySymbolVal == 'AED'){

    this.aedExAmt=parseInt(this.amountVal)
    this.amt = this.aedExAmt * 100;
    this.pay.exAmount =this.amt;
    this.pay.amount =this.amt;
  }
  if(this.currencySymbolVal == 'MYR'){

    this.myrExAmt=parseInt(this.amountVal)
    this.amt = this.myrExAmt * 100;
    this.pay.exAmount =this.amt;
    this.pay.amount =this.amt;
  }
  if(this.currencySymbolVal == 'SGD'){

    this.sgdExAmt=parseInt(this.amountVal)
    this.amt = this.sgdExAmt * 100;
    this.pay.exAmount =this.amt;
    this.pay.amount =this.amt;
  }

  // if(this.isdiscount == true){
  //   this.amountVal = this.standardcountAmt;
  // }

  //var subscripamt = (this.amountVal * 100); //To conver to paisa/units
  // var subscripamt = this.amountVal; //To conver to paisa/units
  let orderURL = "api/auth/app/subscription/payments/Subscriptionpayment";
  var options = {
    "amount": this.pay.amount,
    "currency": this.currencyVal,
    "receipt": "TALENTCHEK",
    "exAmount": this.pay.exAmount
  }
  console.log("Order URL: " + orderURL);
  console.log(`Options: ${JSON.stringify(options)}`);

  var orderId: string;
  this.storageservice.postrequest(orderURL, options).subscribe(result => {

    let orId = result['orderid'];
    console.log("OrderId: " + orId);
    orderId = orId;
  },
    error => {
      console.log(`Error data: ${JSON.stringify(error)}`);
      if (error.name == "HttpErrorResponse") {
        this.storageservice.warningToast('Internet connection problem, Pls check your internet.');
        this.storageservice.GeneralAlert('HttpErrorResponse', 'Internet connection problem, Pls check your internet.');
      }
      else {
        this.storageservice.warningToast('Error: ' + error.message);
      }
    },
    () => {
      // 'onCompleted' callback.
      if (orderId != null && orderId != '') {
        var paymentStoreURL = this.storageservice.mobileserverurl +"api/auth/app/subscription/payments/paymentHistory";
        var subscriptype = "Service Fee";
        this.payWithRazorOne(paymentStoreURL, orderId, this.userId, subscriptype, this.pay.amount);
      }
      else {
        this.storageservice.generalAlertToast("Order Id is empty. Please contact support.");
      }
    }

  );
}

payWithRazorOne(paymentStoreURL: string, orderId: string, userId: string, subscriptype: string, subscripamt: number) {
  var options = {
    description: 'Talent Chek Payment Transaction',
    image: 'https://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png',
    order_id: orderId,
    currency: this.currencyVal,
    key: 'rzp_live_ABLgrHfsy2Fhkb', //For Test
    // key: 'rzp_live_ABLgrHfsy2Fhkb', //For Live
    amount: subscripamt,
    name: 'Talent Chek',
    theme: {
      color: '#fcc33e'
    },
    modal: {
      ondismiss: function () {
        console.log('dismissed');
      }
    }
  };
  localStorage.setItem('currency', this.currencyVal);
  console.log(localStorage.getItem("currency"));
  console.log("paymentStore URL: " + paymentStoreURL);
  console.log(`Main Options: ${JSON.stringify(options)}`);

  var successCallback = function (success) {
    alert('Payment success');
    console.log(`Payment success Storing data: ${JSON.stringify(success)}`);
    console.log('payment_id: ' + success.razorpay_payment_id);
    console.log('order_id: ' + success.razorpay_order_id);
    console.log('signature: ' + success.razorpay_signature);

    var payhistory = {
      "orderid":success.razorpay_order_id,
      "paymentid":success.razorpay_payment_id,
      "signature":success.razorpay_signature,
      "subscriptype":subscriptype,
      "subscripamt":subscripamt,
      "userId":localStorage.getItem("userId"),
      "country":localStorage.getItem("countryCode"),
      "currency":localStorage.getItem("currency"),
      "userName":localStorage.getItem("userName"),
      "email":localStorage.getItem("email")
    }
    console.log(`myJSONObject payment data: ${JSON.stringify(payhistory)}`);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", paymentStoreURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payhistory));
    xhr.onload = function () {
      var data = JSON.parse(this.responseText);
      console.log(`Completed payment response data: ${JSON.stringify(data)}`);
    };

  };
  this.router.navigate(['/home']);
  var cancelCallback = function (error) {
    //alert(error.description + ' (Error ' + error.code + ')');
    console.log(error.description + ' (Error ' + error.code + ')');
  };

  RazorpayCheckout.on('payment.success', successCallback);
  RazorpayCheckout.on('payment.cancel', cancelCallback);
  RazorpayCheckout.open(options);

}


// // footer
// goto_profileSearch(){
//   this.router.navigate(['/job-search']);
// }
// goto_jobs(){
//   this.router.navigate(['/job']);
// }
// goto_home(){
//   this.router.navigate(['/home']);
// }
// goto_profile(){
//   this.router.navigate(['/profile-view']);
// }
// goto_more(){
//   this.router.navigate(['/settings']);
// }
config = {
  //startupFocus : true,
  tabSpaces: 10,
  extraPlugins: 'smiley,justify,indentblock,colordialog,font,exportpdf,pagebreak',
  font_names: 'कृति देवी/Kruti;Andale Mono;Arial; Arial Black; Arial Narrow; Comic Sans MS; Courier New; Georgia; Helvetica; Impact; Tahoma; Terminal; Times New Roman; Verdana;',
  removeButtons: 'Paste,PasteText,PasteFromWord',
  removePlugins: 'elementspath',
  versionCheck: false
}
}
