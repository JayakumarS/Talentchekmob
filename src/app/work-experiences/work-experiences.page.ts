import { Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import moment from 'moment';
import { LanguageService } from '../language.service';

//For using Razorpay
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-work-experiences',
  templateUrl: './work-experiences.page.html',
  styleUrls: ['./work-experiences.page.scss'],
})
export class WorkExperiencesPage implements OnInit {
  selectedorglist: any;
  OrgForm: any;
  selectedOrg: any;
  selectedOrganisation: string;
  locationname: any;
  selectedLang: string;

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

  //refresh function
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // date function
  getMaxDate() {
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);
    return maxDate.toISOString().split('T')[0];
  }

  ExperienceForm: FormGroup;
  organisationList: any;
  OrganisationList: any;
  IsorgListShow: boolean = false;
  institutionVal: any;
  organisationVal: any;
  jobTypeList: any;
  isunregOrg: boolean;
  unregisteredOrg: string;
  unregisteredIns: string;
  Experience: any;
  userId: string;
  empId: any;
  edit: boolean = false;
  desiredItem: any;
  disabled: boolean = false;
  dateValidation: boolean;
  nonMandatory: boolean = false;
  isunregIns: boolean;
  searchOrganisationResults: any;
  searchOrgResults: string[] = [];
  searchCtrl = new FormControl('');
  constructor(public router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    public storageservice: StorageService, public toastController: ToastController, private elementRef: ElementRef,
    public modalController: ModalController, public alertController: AlertController,public languageService:LanguageService) { }
  Exp = {
    orgName: '',
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    this.userId = localStorage.getItem("userId");
    this.isunregOrg = false;
    this.ExperienceForm = this.fb.group({
      designation: ["", Validators.required],
      organisationName: [""],
      department: ["", Validators.required],
      registrationNumber: ["", Validators.required],
      expStart: ["", Validators.required],
      expEnd: ["", Validators.required],
      currentlyWork: [""],
      jobType: ["", Validators.required],
      orgLocation: ["", Validators.required],
      expDescription: [""],
      unregisteredOrg: [""],
      ckeditor: [""],
      currentUserId: [""],
      expId: [""]
    });
    this.getJobtype();
    this.initializeItems();
    // this.BindDefaultCurrencyAsPerCurrentUser();
    this.isunregIns = false;
  });
  }


  //nav bar
  selectedTab: string = 'profile';
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  paramFunction(){
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params != null || params != undefined) {
          console.log("PageLoad: " + params.id);
          this.fetchEditDeatils(params.id);
          console.log(params);
        }
      }
    });
  }

  //edit function
  fetchEditDeatils(expId) {
    this.storageservice.showLoading();
    var getEditValues = "api/auth/app/IndividualProfileDetails/EditExperience";
    this.storageservice.getrequest(getEditValues + "?expId=" + expId).subscribe(result => {
      if (result["success"] == true) {
        this.storageservice.dismissLoading();
        this.edit = true;
        this.disabled = true;
      //  this.initializeItems();
        const containsTF = this.checkForTF(result["experienceBean"].organisationName)
        if (containsTF == true) {
          this.searchForId(result["experienceBean"].organisationName);
        } else {
          this.searchForText(result["experienceBean"].organisationName);
        }
        this.ExperienceForm.get("organisationName").disable();
        this.orgLocation(this.desiredItem.id);

        this.validationForCurWorking(result["experienceBean"].currentlyWork)

        const expStart = result["experienceBean"].expStart;
        const startdate = moment(expStart, 'DD/MM/YYYY').toDate();

        if (result["experienceBean"].expEnd != null && result["experienceBean"].expEnd != "") {
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
          'ckeditor': result["experienceBean"].ckeditor,
          'expId': result["experienceBean"].expId
        })
        this.selectedOrganisation = this.desiredItem.text
      } else {
        this.storageservice.dismissLoading();
      }
    });
    this.storageservice.dismissLoading();
  }

  //check the data contains TF or Not
  checkForTF(data: string): boolean {
    if (data.indexOf('TF') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  //search ID from data array
  searchForId(id: string) {
    this.desiredItem = null;
    for (const item of this.organisationList) {
      if (item.id === id) {
        this.desiredItem = item;
        break;
      }
      //this.orgLocation(this.desiredItem.id);
    }
    if (this.desiredItem === null) {
      console.log('Item not found');
    } else {
      console.log(this.desiredItem.text);
    }
  }

  //search text from data array
  searchForText(text: string) {
    this.desiredItem = null;
    for (const item of this.organisationList) {
      if (item.text === text) {
        this.desiredItem = item;
        break;
      }
      // this.orgLocation(this.desiredItem.text);
    }
    if (this.desiredItem === null) {
      console.log('Item not found');
    } else {
      console.log(this.desiredItem.text);
    }
  }

  //back button
  goto_jobProfile() {
    this.ExperienceForm.reset();
    this.router.navigate(['/profile-view'])
  }

  // end date validation
  async validateEndDate(event) {
    var startdate = new Date(new Date(this.ExperienceForm.value.expStart).setFullYear(new Date(this.ExperienceForm.value.expStart).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.dateValidation = true;
    if (frm <= startdate) {
      this.dateValidation = false;
      const alert = await this.toastController.create({
        header: '',
        message: 'Job end date should be greater than Start date.',
        duration: 3000,
      });
      this.ExperienceForm.patchValue({
        'expEnd': ""
      })
      await alert.present();
    }
  }


  // start date validation
  async validateStartDate(event) {
    if (this.ExperienceForm.value.expEnd != "") {
      var endDate = new Date(new Date(this.ExperienceForm.value.expEnd).setFullYear(new Date(this.ExperienceForm.value.expEnd).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation = true;
      if (endDate <= frm) {
        this.dateValidation = false;
        const alert = await this.toastController.create({
          header: '',
          message: 'Job end date should be greater than Start date.',
          duration: 3000,
        });
        await alert.present();
      }
    }

  }

  //validation for currently working or not
  validationForCurWorking(event) {
    var value = event;
    if (value == true) {
      this.nonMandatory = true
      this.ExperienceForm.get("expEnd").disable();
      this.ExperienceForm.patchValue({
        'expEnd': ""
      })
    } else {
      this.nonMandatory = false
      this.ExperienceForm.get("expEnd").enable();
    }
  }

  goToSearchSelectedItem(instName, instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    this.organisationVal = instName;
    this.Exp.orgName = instId;
    this.IsorgListShow = false;
  }

  async initializeItems(): Promise<any> {
    var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
    const InsList = await this.storageservice.getrequest(organisationListUrl).subscribe(result => {
      this.organisationList = result["organisationList"];
      this.organisationList = result["organisationList"];
      this.paramFunction();
    });

    return InsList;
  }

  //  onSearchSkill(value: string) {
  //   if (value.length > 2) {
  //     this.showOrgResults = true;
  //     this.searchOrgResults = this.organisationList.filter(Org => Org.text.toLowerCase().indexOf(value.toLowerCase()) > -1);

  //     console.log(this.searchOrgResults)
  //   } else {
  //     this.showOrgResults = false;
  //     this.searchOrgResults = [];
  //   }
  // }
  //  selectorg(org: string,id:string) {
  //   this.selectedOrg = org;
  //   this.showOrgResults = false;
  //   this.ExperienceForm.patchValue({
  //     'organisationName':this.selectedOrg
  //   })
  //    this.searchOrgResults = [];
  //   this.searchCtrl.setValue('');
  // }

  // removeorg(org: string) {
  //   this.selectedorglist = undefined;
  // } 
  //  Organisation auto complete 
  onSearchOrganisation(value: string) {
    if (value.length > 0) {

      if (this.isunregIns == false) {
        this.unregisteredOrg = value;
        this.ExperienceForm.patchValue({
          'orgLocation': '',
        });
        this.ExperienceForm.get("orgLocation").enable();
      }
      this.isunregIns = false;
      this.IsorgListShow = true;

      this.searchOrganisationResults = this.organisationList.filter(Organisation => Organisation.text && Organisation.text.toLowerCase().indexOf(value.toLowerCase()) > -1);

      if (this.searchOrganisationResults == 0) {
        this.IsorgListShow = false;
        // this.clubFrom.patchValue({ 
        // 'clubName':value

        // })
      }
      else {
        this.IsorgListShow = true;
      }

    } else {
      this.IsorgListShow = false;
      this.searchOrganisationResults = [];
    }
  }
  selectOrganisation(institutionName: string, id: string) {
    this.selectedOrganisation = institutionName;
    this.Exp.orgName = id;
    //this.name=institutionName;
    this.IsorgListShow = false;
    //this.clubid = id;
    this.ExperienceForm.patchValue({
      'orgLocation': institutionName,
    });

    this.searchOrganisationResults = [];
    this.searchCtrl.setValue('');
    this.orgLocation(id)
  }
  removeOrganisation(selectedOrganisation: string) {
    this.selectedOrganisation = undefined;
    this.ExperienceForm.patchValue({
      'orgLocation': '',
    });
    this.ExperienceForm.get("orgLocation").enable();
  }

  async filterList(evt) {
    const filterValue = evt.srcElement.value.toLowerCase();
    if (this.isunregOrg == false) {
      this.unregisteredOrg = filterValue;
      this.ExperienceForm.patchValue({
        'orgLocation': '',
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
      if (element.id === bookId) {
        value = element.text;
        this.unregisteredOrg = "";
        this.isunregOrg = true;
      }
    });
    return value;
  }

  //Jobtype list
  getJobtype() {
    var getjobTypeListUrl = "api/auth/app/jobportal/jobTypeList";
    this.storageservice.getrequest(getjobTypeListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.jobTypeList = result["jobTypeList"];
      }
    });
  }

  //location list
  orgLocation(orgid: any) {
    var getlocationUrl = "api/auth/app/IndividualProfileDetails/orgLocation";
    this.storageservice.getrequest(getlocationUrl + "?orgid=" + orgid).subscribe(result => {
      if (result["success"] == true) {
        this.ExperienceForm.patchValue({
          'orgLocation': result["experienceBean"].orgLocation,

        })

        this.ExperienceForm.get("orgLocation").disable();

      }
      this.locationname = result["experienceBean"].orgLocation
    });

    // Payment Info
    var getPaymentInfo = "api/auth/app/PaymentInfo/getBankDetails";
    this.storageservice.getrequest(getPaymentInfo + "?currentUserId=" + orgid).subscribe((resultValue:any) => {
      if(resultValue.success==true){
        this.paymentDetails=resultValue.bankDetails;
      } 
      
    });

  }

  //save
  async saveCertification() {
    console.log(this.isunregOrg)
    if (this.isunregOrg == true) {
      this.ExperienceForm.value.orgLocation = this.locationname
    }
    // this.ExperienceForm.value.orgLocation =this.locationname
    console.log(this.ExperienceForm.value.orgLocation)
    this.ExperienceForm.value.organisationName = this.selectedOrganisation
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
      if (this.dateValidation == true || this.dateValidation == undefined) {
        this.ExperienceForm.value.currentUserId = this.userId;

        this.ExperienceForm.value.expStart = formatDate(this.ExperienceForm.value.expStart, 'dd/MM/yyyy', 'en-IN');
        if (this.ExperienceForm.value.expEnd != undefined) {
          this.ExperienceForm.value.expEnd = formatDate(this.ExperienceForm.value.expEnd, 'dd/MM/yyyy', 'en-IN');
        }
        if (this.unregisteredOrg == "") {
          this.ExperienceForm.value.organisationName = this.Exp.orgName;
        } else {
          this.ExperienceForm.value.organisationName = this.unregisteredOrg;
        }
        this.ExperienceForm.value.unregisteredOrg = this.unregisteredOrg;
        this.Experience = this.ExperienceForm.value;
        console.log(` data: ${JSON.stringify(this.Experience)}`);
        var saveExperience = "api/auth/app/IndividualProfileDetails/saveExperience";

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
      && this.ExperienceForm.controls.currentlyWork.value !=true){
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
                          this.storageservice.postrequest(saveExperience, this.Experience).subscribe(async result => {
                            console.log("Image upload response: " + result)
                            if (result["success"] == true) {
                              this.presentToast() 
                              let edit = {
                                orgId: result["experienceBean"].organisationId,
                                expId: result["experienceBean"].expId,
                              }
                              let navigationExtras: NavigationExtras = {
                                queryParams: edit
                              };
                              this.payWithRazorStandard();
                              this.router.navigate(['/exp-verification'], navigationExtras)
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
        this.storageservice.postrequest(saveExperience, this.Experience).subscribe(async result => {
          console.log("Image upload response: " + result)
          if (result["success"] == true) {
            this.presentToast() 
            let edit = {
              orgId: result["experienceBean"].organisationId,
              expId: result["experienceBean"].expId,
            }
            let navigationExtras: NavigationExtras = {
              queryParams: edit
            };
            this.router.navigate(['/exp-verification'], navigationExtras)
          }
        });
      }
        

        
      } else {
        const alert = await this.toastController.create({
          header: '',
          message: 'Job end date should be greater than Start date.',
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
    await toast.present();
  }

  /// update 
  async updateCertification() {
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
      if (this.dateValidation == true || this.dateValidation == undefined) {

        if (this.isunregOrg == true) {
          this.ExperienceForm.value.orgLocation = this.locationname
        }
        this.ExperienceForm.value.currentUserId = this.userId;

        this.ExperienceForm.value.expStart = formatDate(this.ExperienceForm.value.expStart, 'dd/MM/yyyy', 'en-IN');
        if (this.ExperienceForm.value.expEnd != undefined) {
          this.ExperienceForm.value.expEnd = formatDate(this.ExperienceForm.value.expEnd, 'dd/MM/yyyy', 'en-IN');
        }
        if (this.unregisteredOrg == "") {
          this.ExperienceForm.value.organisationName = this.Exp.orgName;
        } else {
          this.ExperienceForm.value.organisationName = this.unregisteredOrg;
        }
        this.Experience = this.ExperienceForm.value;
        console.log(` data: ${JSON.stringify(this.Experience)}`);
        var updateExperience = "api/auth/app/mobile/UpdateExperience";

        this.storageservice.postrequest(updateExperience, this.Experience).subscribe(async result => {
          console.log("Image upload response: " + result)
          if (result["success"] == true) {
            this.updateToast()
            let edit = {
              orgId: this.desiredItem.id,
              expId: this.Experience.expId,
            }
            let navigationExtras: NavigationExtras = {
              queryParams: edit
            };
            this.router.navigate(['/exp-verification'], navigationExtras)
          }
        });
      } else {
        const alert = await this.toastController.create({
          header: '',
          message: 'Job end date should be greater than Start date.',
          duration: 3000,
        });
        await alert.present();
      }
    }
  }

  //update toast popup
  async updateToast() {
    const toast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });


    await toast.present();
  }

  //check form validation before save
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
