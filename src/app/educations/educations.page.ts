
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
  selector: 'app-educations',
  templateUrl: './educations.page.html',
  styleUrls: ['./educations.page.scss'],
})
export class EducationsPage implements OnInit {
  uploadedFile: any;
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

  industryList = [];
  EducationForm: FormGroup;
  work: boolean = false;
  IsSearchListShow: boolean = false;
  institutionList: any;
  institutionVal: String;
  IsDegreeListShow: boolean = false;
  degreeList: any;
  degreeListVal: any;
  studyList: any;
  studyListVal: any;
  IsstudyListShow: boolean = false;
  selectedDate: string;
  courseStart: string;
  courseEnd: string;
  userId: any;
  Education: any;

  datePicker: any;
  isunregIns: boolean;
  unregistered: string;
  fromdate: any;

  searchCtrl = new FormControl('');
  searchInstitutionResults: any;
  searchDegreeResults: string[] = [];
  selecteInstitution: any;
  InstitutionList: any;
  institutionid: string;
  edit: boolean = false;
  searchStudyResults: string[] = [];
  selecteStudy: any;
  selectStudySet: any;
  selectDegreeSet: string;
  dateValidation: boolean;
  desiredItem: any;
  disabled: boolean =false;
  uploadedFilenameWithoutExt: string;
  uploadedFileSize: string;
  uploadedFileExtension: string;
  nonMandatory: boolean = false;
  fieldOfStudyDisable: boolean = false;
  constructor(public router: Router, public storageservice: StorageService, private fb: FormBuilder,
    private toastController: ToastController,private route: ActivatedRoute,public languageService:LanguageService,
    public modalController: ModalController,private elementRef: ElementRef
    ,public alertController: AlertController) {

     
  }
  Exp = {
    orgName: '',
  }


  ngOnInit() {

    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
    //this.getstudyList();
    this.EducationForm = this.fb.group({
      institutionName: [""],
      institutionLocation: ["", Validators.required],
      courseStartObj: [""],
      courseEndObj: [""],
      courseStart: ["", Validators.required],
      courseEnd: ["", Validators.required],
      ckeditor: [""],
      uploadUrl:["",Validators.required],
      currentlyStudy: [""],
      degree: [""],
      fieldofStudy: ["", Validators.required],
      stuRegisterNumber: ["", Validators.required],
      aggregateMarks: [""],
      eduDescription: [""],
      eduId: [""],
      currentUserId: [""]
    });
    this.userId = localStorage.getItem("userId");
    this.getinstitutionList();

    this.getDegreeList();
    this.getStudyList();
    this.isunregIns = false;
    let currentDate = new Date();
    // this.selectedDate = currentDate.toISOString();

    this.route.queryParams.subscribe(params => {
      if (params) { 
        if (params != null || params != undefined ) { 
          this.getinstitutionListEdit(params.id);  
          console.log(params);
        }
      }
    });
    
  }


  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  experience() {
    this.router.navigate(['/profile/addExperience'])
  }

  profileView() {
    this.institutionList = [];
    this.degreeList = [];
    this.studyList = [];
    this.refreshdata();
    this.router.navigate(['/profile-view'])
  }

  refreshdata(){
    this.EducationForm.patchValue({
      'institutionName': '', 
      'currentlyStudy': '',
      'degree': '',
      'stuRegisterNumber': '',
      'aggregateMarks': '',
      'eduDescription': '',
      'eduId': '',
      'courseStart': '',
      'courseEnd': '',
      'ckeditor':'',
      'fieldofStudy':'',
      'institutionLocation':'',
     })  
  }


  orgLocation(orgid: any) {

    var getlocationUrl = "api/auth/app/IndividualProfileDetails/orgLocation";
    this.storageservice.getrequest(getlocationUrl + "?orgid=" + orgid).subscribe(result => {
      if (result["success"] == true) {
        this.EducationForm.patchValue({
          'institutionLocation': result["experienceBean"].orgLocation,
        })
        this.EducationForm.get("institutionLocation").disable();
      }
    });

    // Payment Info
    var getPaymentInfo = "api/auth/app/PaymentInfo/getBankDetails";
    this.storageservice.getrequest(getPaymentInfo + "?currentUserId=" + orgid).subscribe((resultValue:any) => {
      if(resultValue.success==true){
        this.paymentDetails=resultValue.bankDetails;
      } 
      
    });
  }
  //  institutionList auto complete 

  getinstitutionList() {
    var institutionListUrl = "api/auth/app/IndividualProfileDetails/institutionList";
    this.storageservice.getrequest(institutionListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.institutionList = result["institutionList"];
      }
    });
  }

  getinstitutionListEdit(param:any) {
    var institutionListUrl = "api/auth/app/IndividualProfileDetails/institutionList";
    this.storageservice.getrequest(institutionListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.institutionList = result["institutionList"];
        this.editEducation(param);
      }
    });
  }

  onSearchInstitution(value: string) {

    const filterValue = value.toLowerCase();
    if (this.isunregIns == false) {
      this.unregistered = filterValue;
      this.EducationForm.patchValue({
        'institutionLocation': '',
      });
      this.EducationForm.get("institutionLocation").enable();
    }
    this.isunregIns = false;
    if (filterValue.length > 0) {
      this.IsSearchListShow = true;
      this.searchInstitutionResults = this.institutionList.filter(Institution => Institution.text.toLowerCase().indexOf(value.toLowerCase()) > -1);

      if (this.searchInstitutionResults == 0) {
        this.IsSearchListShow = false;
        this.EducationForm.patchValue({
          'institutionName':filterValue
          })
      }
      else {
        this.IsSearchListShow = true;
      }

    } else {
      this.IsSearchListShow = false;
      this.searchInstitutionResults = [];
    }
  }


  removeOrganisation(selecteInstitution: string) {
    this.selecteInstitution = undefined;
  }
  removeDegree(selectDegreeSet: string) {
    this.fieldOfStudyDisable = false;
    this.EducationForm.get("fieldofStudy").enable();
    this.selectDegreeSet = undefined;
    this.selectStudySet = "";
  }
  remove() {
    this.selectStudySet = undefined;
  }

//validate dates
  async validateEndDate(event){
    var startdate = new Date(new Date(this.EducationForm.value.courseStart).setFullYear(new Date(this.EducationForm.value.courseStart).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.dateValidation =true;
    if (frm <= startdate) {
      this.dateValidation =false;
      const alert = await this.toastController.create({
        header: '',
        message: 'Course End date should be greater than Course Start date.',
        duration: 3000,
      });
      this.EducationForm.patchValue({
        'courseEnd':""
      })
       await alert.present();
    }
  }


  async validateStartDate(event){

    if(this.EducationForm.value.courseEnd != undefined && this.EducationForm.value.courseEnd != ""){
      var endDate = new Date(new Date(this.EducationForm.value.courseEnd).setFullYear(new Date(this.EducationForm.value.courseEnd).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation =true;
      if (endDate <= frm) {
        const alert = await this.toastController.create({
          header: '',
          message: 'Course End date should be greater than Course Start date.',
          duration: 3000,
        }); 
         await alert.present();
      }
    }
    
  }
 
  selectInstitution(institutionName: string, id: string) {
    this.selecteInstitution = institutionName;
    this.IsSearchListShow = false;
    this.institutionid = id;

    this.EducationForm.patchValue({
      'institutionName':id
    })
    
    this.searchInstitutionResults = [];
    this.searchCtrl.setValue('');
  }

  //institution reg 
  getTitle(bookId) {
    var value;
    this.institutionList.forEach(element => {
      if (element.id === bookId) {
        value = element.text;
        this.unregistered = "";
        this.isunregIns = true;
      }
    });
    return value;
  }


  /// DegreeList auto complete 
  onSearchDegree(value: string) {
    if (value.length > 0) {
      this.IsDegreeListShow = true;
      this.searchDegreeResults = this.degreeList.filter(Degree => Degree.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.IsDegreeListShow = false;
      this.searchDegreeResults = [];
    }
  }

  selectDegree(institutionName: string, id: string) {
    this.selectDegreeSet = institutionName;
     this.IsDegreeListShow = false;
    this.EducationForm.patchValue({
    'degree':this.selectDegreeSet
    })
  
    this.institutionid = id;
    this.searchDegreeResults = [];
    this.searchCtrl.setValue('');
  }
  getDegreeList() {
    var degreeListUrl = "api/auth/app/IndividualProfileDetails/degreeList";
    this.storageservice.getrequest(degreeListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.degreeList = result["degreeList"];
      }
    });
  }

  disableFiledOfStudy(value){

    if(value == "High School Diploma"){
      this.fieldOfStudyDisable = true;
      this.EducationForm.get("fieldofStudy").disable();
    }else if(value == "SSLC"){
      this.fieldOfStudyDisable = true;
      this.EducationForm.get("fieldofStudy").disable();
    }else if(value == "HSC"){
      this.fieldOfStudyDisable = true;
      this.EducationForm.get("fieldofStudy").disable();
    }else{
      const checkForClass = this.checkForClass(value) 
      if(checkForClass){
          this.fieldOfStudyDisable = true;
          this.EducationForm.get("fieldofStudy").disable();
      }else{
        this.fieldOfStudyDisable = false;
        this.EducationForm.get("fieldofStudy").enable();
      }
    }
    
  }
  checkForClass(data: string): boolean {
    if (data.indexOf('Class') !== -1) {
      return true;
    } else {
      return false;
    }
  }


  ///studyList auto complete 
  onSearchStudy(value: string) {
    if (value.length > 0) {
      this.IsstudyListShow = true;
      this.searchStudyResults = this.studyList.filter(study => study.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.IsstudyListShow = false;
      this.searchStudyResults = [];
    }
  }

  selectStudy(Study: string, id: string) {
    this.selectStudySet = Study;
    this.IsstudyListShow = false;
    this.EducationForm.patchValue({
      'fieldofStudy':this.selectStudySet
      })
    
    //this.institutionid = id;
    this.searchStudyResults = [];
    this.searchCtrl.setValue('');
  }
  getStudyList() {
    var StudyListUrl = "api/auth/app/IndividualProfileDetails/studyList";
    this.storageservice.getrequest(StudyListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.studyList = result["studyList"];
      }
    });
  }


  async save() {

    if (this.EducationForm.value.institutionName != "") {
      const errors = this.checkFormValidity(this.EducationForm);

      if (errors.length > 0) {
        // Display errors in a popup
        const alert = await this.toastController.create({
          header: '',
          message: errors.join('<br>'),
          duration: 3000,
        });

        await alert.present();
      } else {

        if(this.dateValidation == true || this.dateValidation == undefined){
          if(this.EducationForm.value.courseStart.includes("T")){
            this.EducationForm.value.courseStart = formatDate(this.EducationForm.value.courseStart, 'MM/yyyy', 'en-IN');
          }
          if(this.EducationForm.value.courseEnd != undefined && this.EducationForm.value.courseEnd.includes("T")){
            this.EducationForm.value.courseEnd = formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy', 'en-IN');
          }
          if (this.unregistered == "") {
            this.EducationForm.value.unregisteredIns = this.Exp.orgName;
          } else {
            this.EducationForm.value.unregisteredIns = this.unregistered;
          }
  
  
          console.log(this.fromdate);
          // this.EducationForm.value.institutionName = this.Exp.orgName;
          this.EducationForm.value.currentUserId = this.userId;
          this.Education = this.EducationForm.value;
          // this.EducationForm.value.courseStart = formatDate(this.EducationForm.value.courseStart, 'MM/yyyy', 'en-IN');
          // this.EducationForm.value.courseEnd = formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy', 'en-IN');
  
          console.log(` data: ${JSON.stringify(this.Education)}`);
          var saveEducation = "api/auth/app/IndividualProfileDetails/saveEducation";

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
      && this.EducationForm.controls.currentlyStudy.value !=true){
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
                          this.storageservice.postrequest(saveEducation, this.Education).subscribe(result => {
                            console.log("Image upload response: " + result)
                            if (result["success"] == true) { 
                              
                              this.presentToast()
                
                              let edit = {
                                instiId:result["educationBean"].institutionId,
                                edu:result["educationBean"].eduId,
                             }
                             let navigationExtras: NavigationExtras = {
                               queryParams: edit
                             };
                             this.payWithRazorStandard();
                              this.router.navigate(['/edu-verification'],navigationExtras)
                      
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
        this.storageservice.postrequest(saveEducation, this.Education).subscribe(result => {
          console.log("Image upload response: " + result)
          if (result["success"] == true) { 
            
            this.presentToast()

            let edit = {
              instiId:result["educationBean"].institutionId,
              edu:result["educationBean"].eduId,
           }
           let navigationExtras: NavigationExtras = {
             queryParams: edit
           };
            this.router.navigate(['/edu-verification'],navigationExtras)
    
          }
        });
      }
  
          
        }else{
          const alert = await this.toastController.create({
            header: '',
            message: 'course End date should be greater than Course Start date.',
            duration: 3000,
          }); 
           await alert.present();
        } 
      }

    } else {

      this.presentToast1()
    }



  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.institutionList = [];
    this.degreeList = [];
    this.studyList = [];
    this.refreshdata();
   
    await toast.present();
   

  }

  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Institution Name is required',
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


  //editEducationDetails
  editEducation(eduId) {

    this.storageservice.showLoading();

    var industryURL = "api/auth/app/IndividualProfileDetails/EditEducation?eduId=" + eduId;
    this.storageservice.getrequest(industryURL).subscribe(result => {

      if (result["success"] == true) {
        this.storageservice.dismissLoading();
        this.Education = result["educationBean"];

      
        this.selectDegreeSet=this.Education.degree;

        const study = this.Education.fieldofStudy;
       
        if(study != "" && study != "null"){
          this.fieldOfStudyDisable = false;
          this.EducationForm.get("fieldofStudy").enable();
          this.selectStudySet = this.Education.fieldofStudy;
        }else{
          this.fieldOfStudyDisable = true;
          this.EducationForm.get("fieldofStudy").disable(); 
        }
       


        const containsTF = this.checkForTF(this.Education.institutionName)
        let containsString=this.containsAlphabets(this.Education.institutionName);
        if(containsTF == true || containsString==false){
          this.searchForId(this.Education.institutionName);  
        }else{
          this.searchForText(this.Education.institutionName); 
        }
        this.orgLocation(this.desiredItem.id);
        this.EducationForm.get("institutionName").disable();
        this.selecteInstitution = this.desiredItem.text;
       // this.EducationForm.value.get("this.selecteInstitution").disable(); 
       // const arr: string[] = str.split(",");

        // for(let i=0;i<arr.length;i++){
        //   var selectStudySet = arr[i]
        //   this.studyListVal.push(selectStudySet);
        // }

       // this.validationForCurWorking(this.Education.currentlyStudy)

        const courseStart =  this.Education.courseStart;
        const startdate = moment(courseStart, 'MM/yyyy').toDate();
        this.EducationForm.patchValue({
          'courseStart':startdate.toISOString(),
        })
        this.courseStart = moment(startdate).format('DD/MM/YYYY');

       const courseEnd =  this.Education.courseEnd;
       const enddate = moment(courseEnd, 'MM/yyyy').toDate();
       this.EducationForm.patchValue({
        'courseEnd':enddate.toISOString(),
       })
       this.selectedDate = moment(enddate).format('DD/MM/YYYY');
       
       this.edit = true;
       this.disabled =true;
       this.EducationForm.patchValue({
         'institutionName': this.Education.institutionName,
        // 'institutionLocation': this.Education.institutionLocation,
          
          'currentlyStudy': this.Education.currentlyStudy,
         'degree': this.Education.degree,
          'stuRegisterNumber': this.Education.stuRegisterNumber,
         'aggregateMarks': this.Education.aggregateMarks,
         'eduDescription': this.Education.eduDescription,
         'eduId': this.Education.eduId,
         'uploadUrl': this.Education.uploadUrl,
        })  
        this.uploadedFile =  this.Education.uploadUrl;
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
    this.desiredItem = null;
    for (const item of this.institutionList) {
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
    for (const item of this.institutionList) {
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

  containsAlphabets(inputString: string): boolean {
    // Define a regular expression pattern that matches any alphabet (A-Z, a-z)
    const alphabetPattern = /[a-zA-Z]/;
  
    // Use the test method to check if the string contains any alphabet
    return alphabetPattern.test(inputString);
  }



  //UpdateEducation

  async UpdateEducation() {
    this.EducationForm.patchValue({
      'fieldofStudy':this.selectStudySet
      })
    const errors = this.checkFormValidity(this.EducationForm);

    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: '',
        //message: 'Please provide all the required values!',
        message: errors.join('<br>'),
        duration: 3000,
      });

      await alert.present();
    } else {

      if(this.dateValidation == true || this.dateValidation == undefined){

        this.EducationForm.value.courseStart = formatDate(this.EducationForm.value.courseStart, 'MM/yyyy', 'en-IN');
      if(this.EducationForm.value.courseEnd != undefined){
        this.EducationForm.value.courseEnd = formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy', 'en-IN');
      }
      this.EducationForm.value.institutionName = this.Exp.orgName;
      this.EducationForm.value.currentUserId = this.userId;
      this.Education = this.EducationForm.value;
      // this.EducationForm.value.courseStart = formatDate(this.EducationForm.value.courseStart, 'MM/yyyy', 'en-IN');
      // this.EducationForm.value.courseEnd = formatDate(this.EducationForm.value.courseEnd, 'MM/yyyy', 'en-IN');


      // this.EducationForm = this.EducationForm.value;
      console.log(` data: ${JSON.stringify(this.Education)}`);
      var updateclub = "api/auth/app/IndividualProfileDetails/UpdateEducation";

      this.storageservice.postrequest(updateclub, this.Education).subscribe(async result => {
        console.log("Image upload response: " + result)
        if (result["success"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.updateToast()
          let edit = {
            instiId:this.desiredItem.id,
            edu:this.Education.eduId,
         }
         let navigationExtras: NavigationExtras = {
           queryParams: edit
         };
          this.router.navigate(['/edu-verification'],navigationExtras)
  
        } else {

        }
      });
      }else{
        const alert = await this.toastController.create({
          header: '',
          message: 'Course End date should be greater than Course Start date.',
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
    this.institutionList = [];
    this.degreeList = [];
    this.studyList = [];
    this.refreshdata();
 
     await toast.present();
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
           this.EducationForm.patchValue({
             'uploadUrl':data.filePath,
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
     this.EducationForm.patchValue({
       'uploadUrl':'',
     })
     this.uploadedFile='';
     this.pdfError();
   }
   
  }
    // Unable to upload toast
    async fileAlert(){
      const alert = await this.toastController.create({
        header: '',
        message: 'Unable to upload Image',
        duration: 3000,
      }); 
       await alert.present();
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
      //remove file extension
   removeExtension(filename) {
    var lastDotPosition = filename.lastIndexOf(".");
    if (lastDotPosition === -1) return filename;
    else return filename.substr(0, lastDotPosition);
  }
  //validation for currently working or not
  validationForCurWorking(event){
    var value  = event;
    if(value == true){
      this.nonMandatory = true
      this.EducationForm.get("uploadUrl").disable(); 
      this.EducationForm.patchValue({
          'uploadUrl':""
        })
    }else{
      this.nonMandatory = false
    this.EducationForm.get("uploadUrl").enable();
    }
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
//   // footer
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
