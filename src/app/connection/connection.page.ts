import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import moment from 'moment';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

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

  constructor(public router:Router,public fb: FormBuilder, public storageservice: StorageService,private toastController: ToastController) { 


    
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
   this.editconnectionDetails(108,'receiver');
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


  save(){

    this.ConnectionsForm.value.currentUserId=this.userId;
    this.ConnectionsForm.value.currentUserName = this.username
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
        console.log("Image upload response: " + result)
       if (result["isSuccess"] == true) {
      
        this.presentToast()
        }
        else if (result["isSuccess"] == false) {
          var message = result["message"];
          if (message == null) {
            "message" 
          }
          // this.showNotification('snackbar-danger',result['msg'],'top','Right');
          this.storageservice.warningToast(message);
          //this.hideLoadingIndicator(); //Hide loading indicator
        }
     });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });
    this.router.navigate(['/profile-view']);
    window.location.reload();
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
}
