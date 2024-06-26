import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import moment from 'moment';
import { StorageService } from '../storage.service';
import { ProfileViewPage as ProfilePage } from '../profile-view/profile-view.page';
import { ViewportScroller, formatDate } from '@angular/common';
import { OrgProfileViewPage } from '../org-profile-view/org-profile-view.page';
import { InstiProfileViewPage } from '../insti-profile-view/insti-profile-view.page';
import { LanguageService } from '../language.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {
  selectedLang: string;
  isSaved: boolean;

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

  ConnectionsForm: FormGroup;
  relationshipList: any;
  userId: string;
  Connection: any;

  stars: number[] = [1, 2, 3, 4, 5];
  //selectedValue: number;
  selectedValue: number[]=[];
  receiverRegistered: any;
  Message: any;
  connectionBean: any;
  username: string;
  roleId: any;
  RoleID: any;
  nonMandatory: boolean = false;
  dateValidation: boolean;

  constructor(public router: Router, public fb: FormBuilder, public storageservice: StorageService, public languageService: LanguageService,
    private toastController: ToastController, public modalController: ModalController, private elementRef: ElementRef
    , public alertController: AlertController, private ngZone: NgZone, public route: ActivatedRoute,private renderer: Renderer2,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) {



  }

  ngOnInit() {

    this.selectedLang = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);

    this.userId = localStorage.getItem("userId");
    this.username = localStorage.getItem("userName");



    this.ConnectionsForm = this.fb.group({
      receiverMobileNo: ["", Validators.required],
      receiverTalentId: [""],
      receiverName: [""],
      receiverEmailId: ["", Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      relationshipId: [""],
      acquaintedFromObj: [""],
      acquaintedToObj: [""],
      acquaintedFrom: [""],
      relationship: ["", [Validators.required]],
      acquaintedTo: [""],
      currentlyAcquainted: [""],
      relationshipAt: [""],
      markedFavByInitiator: [""],
      markedFavByReceiver: [""],
      remarksInitiator: [""],
      remarksReceiver: [""],
      ratingInitiator: [""],
      markedPrivateByInitiator: [""],
      markedPrivateByReceiver: [""],
      receiverRegistered: [""],
      action: [""],
      currentUserId: [""],
      currentUserName: [""]


    });

    this.getrelationshipList();



    this.roleId = localStorage.getItem("roleId");
    this.RoleID = this.roleId.split(",", 3);
  }

  countStar(star: number) {
      
    const index = this.selectedValue.indexOf(star);
    if (index !== -1) {
      this.selectedValue.splice(index, 1); // If star is already selected, remove it from the array
    } else {
      this.selectedValue.push(star); // If star is not selected, add it to the array
    }
    
    this.ConnectionsForm.patchValue({
        'ratingInitiator': this.selectedValue.length,
    })
  }

  keyPressmobileNo(event: any) {
    const pattern = /[0-9()+-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  newOrgprofileView() {
    this.router.navigate(['/org-profile-view']);

    // newOrgprofileView(){
  }

  // }

  newInstiprofileView() {
    this.router.navigate(['/insti-profile-view']);
  }


  selectedTab: string = 'profile';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  additionalInfo() {
    this.router.navigate(['/profile/addAdditionalInfo'])
  }
  certifications() {
    this.router.navigate(['/profile/addCertifications'])
  }
  ///rating  star
  // countStar(star) {
  //   this.selectedValue = star;
  //   this.ConnectionsForm.patchValue({
  //     'ratingInitiator': this.selectedValue,
  //   }),
  //     console.log('Value of star', this.selectedValue);
  // }
  //relationshipList
  getrelationshipList() {
    var getrelationshipListUrl = "api/auth/app/IndividualProfileDetails/relationshipList";

    this.storageservice.getrequest(getrelationshipListUrl).subscribe(result => {
      if (result["success"] == true) {
        this.relationshipList = result["relationshipList"];
      }
    });
  }


  getconnectionDetails(mobileNo: string): void {
    var getRegisterdetails = "api/auth/app/IndividualProfileDetails/Registerdetails";

    this.storageservice.getrequest(getRegisterdetails + "?mobileNo=" + mobileNo).subscribe(result => {
      if (result["success"] == true) {

        this.receiverRegistered = true;
        this.ConnectionsForm.patchValue({
          'receiverTalentId': result["connectionBean"].receiverTalentId,
          'receiverName': result["connectionBean"].receiverName,
          'receiverEmailId': result["connectionBean"].receiverEmailId,
          'receiverRegistered': 'true'

        })
      } else if (result["success"] == false) {
        this.ConnectionsForm.patchValue({
          'receiverName': null,
          'receiverEmailId': null,
          'receiverRegistered': 'false'
        })
        this.receiverRegistered = false;
        this.Message = result["message"]
      }

    });
  }


  //validationForCurWorking

  validationForCurWorking(event) {
    var value = event;
    if (value == true) {
      this.nonMandatory = true
      this.ConnectionsForm.get("acquaintedTo").disable();
      this.ConnectionsForm.patchValue({
        'acquaintedTo': ""
      })
    } else {
      this.nonMandatory = false
      this.ConnectionsForm.get("acquaintedTo").enable();
    }
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
  async save() {
    this.isSaved=false;
    const errors = this.checkFormValidity(this.ConnectionsForm);  
    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: '',
        message: 'Please provide all the required values!',
        duration: 3000,
      }); 
      await alert.present();
     }else{
    if (this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != "") {
      if(this.ConnectionsForm.value.acquaintedFrom.includes('T')){
      this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');
      } 
    } else {
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved) {
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast1()
        }
        else 
        // if (result["isSuccess"] == false) 
        {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }
    }
  

    if (this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != "") {
      if(this.ConnectionsForm.value.acquaintedTo.includes('T')){
        this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');

      }
     

      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast1()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }

    } else {
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast1()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }
    }
  }
  }
  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Request Sent',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const profilePage = new ProfilePage(this.renderer,this.router, this.ngZone, this.route, this.storageservice, this.elementRef, this.modalController, this.alertController, this.languageService,
      this.transfer,this.file,this.fileOpener,this.androidPermissions,this.platform);
    profilePage.updateData();
    this.router.navigate(['/profile-view']);

    await toast.present();
  }


  /// org save 

  orgsave() {
    this.isSaved=false;
    if (this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != "") {
      if(this.ConnectionsForm.value.acquaintedFrom.includes('T')){
        this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');
      }
      

    } else {
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast2()
        }
        else 
        //if (result["isSuccess"] == false) 
        {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }

    } if (this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != "") {
      if(this.ConnectionsForm.value.acquaintedTo.includes('T')){
      this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');
      }

      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          this.presentToast2()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }

    } else {
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          this.presentToast2()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }

    }
  }
  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Request Sent',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const profilePage = new OrgProfileViewPage(this.router, this.storageservice, this.alertController, this.languageService, this.route);
    profilePage.reload();
    this.router.navigate(['/org-profile-view']);

    await toast.present();
  }
  /// insti save////

  async instisave() {
    this.isSaved=false;
    const errors = this.checkFormValidity(this.ConnectionsForm);  
    if (errors.length > 0) {
      // Display errors in a popup
      const alert = await this.toastController.create({
        header: '',
        message: 'Please provide all the required values!',
        duration: 3000,
      }); 
      await alert.present();
     }else{
    if (this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != "") {
      if(this.ConnectionsForm.value.acquaintedFrom.includes('T')){
      this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');
      }

    } else {
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast3()
        }
        else
        // if (result["isSuccess"] == false)
          {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }
    } 
  
    if (this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != "") {
   
      if(this.ConnectionsForm.value.acquaintedTo.includes('T')){
      this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');
      }
      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast3()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }

    } else {


      this.ConnectionsForm.value.currentUserId = this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

      if(!this.isSaved){
      this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {
        this.isSaved=true;
        if (result["isSuccess"] == true) {
          // setTimeout(() => {
          //   const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
          //  profilePage.updateData();
          // }, 800);
          this.presentToast3()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];

          "message"

          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
      });
    }
    }
  }
  }
  async presentToast3() {
    const toast = await this.toastController.create({
      message: 'Request Sent',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const insprofileview = new InstiProfileViewPage(this.router, this.storageservice, this.languageService, this.route);
    insprofileview.reload();
    this.router.navigate(['/insti-profile-view']);

    await toast.present();
  }

  goto_profileView() {
    this.router.navigate(['/profile-view']);
  }

  //editconnectionDetails
  editconnectionDetails(id, index) {

    var industryURL = "api/auth/app/IndividualProfileDetails/editConnection";
    this.storageservice.getrequest(industryURL + "?relationshipId=" + id + "&action=" + index).subscribe(result => {
      if (result["success"] == true) {
        this.connectionBean = result["connectionBean"];
      }
      // const acquaintedFromObj =  this.connectionBean.acquaintedFromObj;
      // const startdate = moment(acquaintedFromObj, 'DD/MM/YYYY').toDate();
      // const eduTodate =  this.connectionBean.eduTodate;
      // const enddate = moment(eduTodate, 'DD/MM/YYYY').toDate();

      if(this.connectionBean.ratingInitiator!=null && this.connectionBean.ratingInitiator!=''
      && this.connectionBean.ratingInitiator!=undefined){
        let array=[];
        for(let i=0;i<this.connectionBean.ratingInitiator;i++){
            array[i]=i;
        }
        this.connectionBean.ratingInitiator=array;
      }

      this.ConnectionsForm.patchValue({
        //'acquaintedFromObj': startdate,
        'acquaintedFrom': this.connectionBean.acquaintedFrom,
        // 'acquaintedToObj' : enddate,
        'acquaintedTo': this.connectionBean.acquaintedTo,
        'currentlyAcquainted': this.connectionBean.currentlyAcquainted,
        'relationshipAt': this.connectionBean.relationshipAt,
        'markedFavByInitiator': this.connectionBean.markedFavByInitiator,
        'markedFavByReceiver': this.connectionBean.markedFavByReceiver,
        'remarksInitiator': this.connectionBean.remarksInitiator,
        'remarksReceiver': this.connectionBean.remarksReceiver,
        'rating': this.connectionBean.ratingInitiator,
        'markedPrivateByInitiator': this.connectionBean.markedPrivateByInitiator,
        'markedPrivateByReceiver': this.connectionBean.markedPrivateByReceiver,
        'relationshipId': this.connectionBean.relationshipId,
        'action': index,
      })

    })
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
  async validateStartDate(event){

    if(this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != ""){
      var endDate = new Date(new Date(this.ConnectionsForm.value.acquaintedTo).setFullYear(new Date(this.ConnectionsForm.value.acquaintedTo).getFullYear())); //Currentdate - one year.
      console.log("endDate: " + endDate);
      console.log("startDate: " + event);
      var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
      this.dateValidation =true;
      if (endDate <= frm) {
        const alert = await this.toastController.create({
          header: '',
          message: 'AcquaintedTo date should be greater than Acquainted From date.',
          duration: 3000,
        });
         await alert.present();
         this.ConnectionsForm.patchValue({
          acquaintedTo: ''
        });
      }
    }

  }

  async validateEndDate(event){
    var startdate = new Date(new Date(this.ConnectionsForm.value.acquaintedFrom).setFullYear(new Date(this.ConnectionsForm.value.acquaintedFrom).getFullYear())); //Currentdate - one year.
    console.log("startdate: " + startdate);
    console.log("enddate: " + event);
    var frm = new Date(new Date(event).setHours(new Date(event).getHours() + 0));
    this.dateValidation =true;
    if (frm <= startdate) {
      this.dateValidation =false;
      const alert = await this.toastController.create({
        header: '',
        message: 'AcquaintedTo date should be greater than Acquainted From date.',
        duration: 3000,
      });
      this.ConnectionsForm.patchValue({
        'courseEnd':""
      })
       await alert.present();
       this.ConnectionsForm.patchValue({
        acquaintedTo: ''
      });
    }
  }
  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
 