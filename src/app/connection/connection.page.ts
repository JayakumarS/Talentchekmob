import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import moment from 'moment';
import { StorageService } from '../storage.service';
import { ProfileViewPage as ProfilePage} from '../profile-view/profile-view.page';
import { formatDate } from '@angular/common';
import { OrgProfileViewPage} from '../org-profile-view/org-profile-view.page';
import { InstiProfileViewPage } from '../insti-profile-view/insti-profile-view.page';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

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
  selectedValue: number;
  receiverRegistered: boolean;
  Message: any;
  connectionBean: any;
  username: string;
  roleId: any;
  RoleID: any;
  nonMandatory: boolean = false;
  constructor(public router:Router,public fb: FormBuilder, public storageservice: StorageService,
    private toastController: ToastController,public modalController: ModalController,private elementRef: ElementRef
    ,public alertController: AlertController, private ngZone: NgZone,public route:ActivatedRoute ) { 


    
  }

  ngOnInit() {

    this.userId = localStorage.getItem("userId");
    this.username = localStorage.getItem("userName");
   
    

    this.ConnectionsForm = this.fb.group({
      receiverMobileNo: ["", Validators.required],
      receiverTalentId: [""],
      receiverName: [""],
      receiverEmailId: [""],
      relationshipId:[""],
      acquaintedFromObj:[""],
      acquaintedToObj : [""],
      acquaintedFrom: [""],
      relationship:["",[Validators.required]],
      acquaintedTo: [""],
      currentlyAcquainted:[""],
      relationshipAt:[""],
      markedFavByInitiator:[""],
      markedFavByReceiver:[""],
      remarksInitiator:[""],
      remarksReceiver:[""],
      ratingInitiator:[""],
      markedPrivateByInitiator:[""],
      markedPrivateByReceiver:[""],
      receiverRegistered:[""],      
      action:[""],
      currentUserId:[""],
      currentUserName:[""]

      
   });

   this.getrelationshipList();
 

   
   this.roleId = localStorage.getItem("roleId");
   this.RoleID =  this.roleId.split(",", 3);
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
  

  additionalInfo()
  {
    this.router.navigate(['/profile/addAdditionalInfo']) 
  }
  certifications()
  {
    this.router.navigate(['/profile/addCertifications']) 
  }
  ///rating  star
  countStar(star) {
    this.selectedValue = star;
    this.ConnectionsForm.patchValue({
      'ratingInitiator': this.selectedValue,
      }),
    console.log('Value of star', this.selectedValue);
  }
   //relationshipList
   getrelationshipList(){
    var getrelationshipListUrl= "api/auth/app/IndividualProfileDetails/relationshipList";
       
    this.storageservice.getrequest(getrelationshipListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.relationshipList = result["relationshipList"]; 
     }
   });
  }


  getconnectionDetails(mobileNo: string): void{
    var getRegisterdetails= "api/auth/app/IndividualProfileDetails/Registerdetails";
       
    this.storageservice.getrequest(getRegisterdetails + "?mobileNo=" + mobileNo).subscribe(result => { 
     if(result["success"] == true){

      this.receiverRegistered = true;
    this.ConnectionsForm.patchValue({
      'receiverTalentId' : result["connectionBean"].receiverTalentId, 
      'receiverName' : result["connectionBean"].receiverName,
      'receiverEmailId' : result["connectionBean"].receiverEmailId,
      
    })
  }else if(result["success"] == false){
    this.ConnectionsForm.patchValue({
      'receiverName': null,
      'receiverEmailId' : null,
    })
    this.receiverRegistered = false;
    this.Message = result["message"]
  } 

   });
  }

  
  //validationForCurWorking
  
  validationForCurWorking(event){
    var value  = event;
    if(value == true){
      this.nonMandatory = true
      this.ConnectionsForm.get("acquaintedTo").disable(); 
      this.ConnectionsForm.patchValue({
          'acquaintedTo':""
        })
    }else{
      this.nonMandatory = false
      this.ConnectionsForm.get("acquaintedTo").enable();
    }
  }

  save(){
    if(this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != ""){
      this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');

    }else{
      this.ConnectionsForm.value.currentUserId=this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
    
       this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
         
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
    
    if(this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != ""){
      this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');
  
      this.ConnectionsForm.value.currentUserId=this.userId;
      this.ConnectionsForm.value.currentUserName = this.username
      this.Connection = this.ConnectionsForm.value;
      console.log(` data: ${JSON.stringify(this.Connection)}`);
      var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
    
       this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
         
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
  
    }else{
    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
       
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
  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const profilePage = new ProfilePage(this.router,this.ngZone,this.route, this.storageservice, this.elementRef, this.modalController, this.alertController);
    profilePage.updateData();
    this.router.navigate(['/profile-view']);

  await toast.present();
}


/// org save 

orgsave(){
  if(this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != ""){
    this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');

  }else{
    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
       
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
    }  if(this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != ""){
    this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');

    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
       
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

  }else{
  this.ConnectionsForm.value.currentUserId=this.userId;
  this.ConnectionsForm.value.currentUserName = this.username
  this.Connection = this.ConnectionsForm.value;
  console.log(` data: ${JSON.stringify(this.Connection)}`);
  var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

   this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
     
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
async presentToast2() {
  const toast = await this.toastController.create({
    message: 'Saved Successfully',
    duration: 3000,
    cssClass: 'custom-toast'
  });
  const profilePage = new OrgProfileViewPage(this.router, this.storageservice,this.alertController);
   profilePage.reload();
  this.router.navigate(['/org-profile-view']);

await toast.present();
}
/// insti save////

instisave(){
    
  if(this.ConnectionsForm.value.acquaintedFrom != undefined && this.ConnectionsForm.value.acquaintedFrom != ""){
    this.ConnectionsForm.value.acquaintedFrom = formatDate(this.ConnectionsForm.value.acquaintedFrom, 'MM/yyyy', 'en-IN');

  }else{
    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
       
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
    }  if(this.ConnectionsForm.value.acquaintedTo != undefined && this.ConnectionsForm.value.acquaintedTo != ""){
    this.ConnectionsForm.value.acquaintedTo = formatDate(this.ConnectionsForm.value.acquaintedTo, 'MM/yyyy', 'en-IN');
    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
       
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

  }else{

  
  this.ConnectionsForm.value.currentUserId=this.userId;
  this.ConnectionsForm.value.currentUserName = this.username
  this.Connection = this.ConnectionsForm.value;
  console.log(` data: ${JSON.stringify(this.Connection)}`);
  var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";

   this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
     
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
  async presentToast3() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    const insprofileview = new InstiProfileViewPage(this.router, this.storageservice);
    insprofileview.reload(); 
    this.router.navigate(['/insti-profile-view']);

  await toast.present();
}

goto_profileView(){
  this.router.navigate(['/profile-view']);
}

//editconnectionDetails
editconnectionDetails(id, index){

  var industryURL = "api/auth/app/IndividualProfileDetails/editConnection";
  this.storageservice.getrequest(industryURL + "?relationshipId=" + id +"&action=" + index).subscribe(result => {
    if (result["success"] == true) {
      this.connectionBean = result["connectionBean"]; 
     }
      // const acquaintedFromObj =  this.connectionBean.acquaintedFromObj;
      // const startdate = moment(acquaintedFromObj, 'DD/MM/YYYY').toDate();
      // const eduTodate =  this.connectionBean.eduTodate;
      // const enddate = moment(eduTodate, 'DD/MM/YYYY').toDate();

    this.ConnectionsForm.patchValue({
      //'acquaintedFromObj': startdate,
      'acquaintedFrom': this.connectionBean.acquaintedFrom,
     // 'acquaintedToObj' : enddate,
      'acquaintedTo': this.connectionBean.acquaintedTo,
      'currentlyAcquainted': this.connectionBean.currentlyAcquainted,
      'relationshipAt': this.connectionBean.relationshipAt,
      'markedFavByInitiator': this.connectionBean.markedFavByInitiator,
      'markedFavByReceiver': this.connectionBean.markedFavByReceiver,
      'remarksInitiator' : this.connectionBean.remarksInitiator,
      'remarksReceiver' : this.connectionBean.remarksReceiver,
      'rating': this.connectionBean.ratingInitiator,
      'markedPrivateByInitiator':this.connectionBean.markedPrivateByInitiator ,
      'markedPrivateByReceiver': this.connectionBean.markedPrivateByReceiver ,
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
}
