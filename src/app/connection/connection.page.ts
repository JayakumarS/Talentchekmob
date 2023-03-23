import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor(public router:Router,public fb: FormBuilder, public storageservice: StorageService,private toastController: ToastController) { 


    
  }

  ngOnInit() {

    this.userId = localStorage.getItem("userId");

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
      currentUserId:[""]

      
   });

   this.getrelationshipList();
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


  save(){

    this.ConnectionsForm.value.currentUserId=this.userId;
    this.Connection = this.ConnectionsForm.value;
    console.log(` data: ${JSON.stringify(this.Connection)}`);
    var saveConnections = "api/auth/app/IndividualProfileDetails/saveConnections";
  
     this.storageservice.postrequest(saveConnections, this.Connection).subscribe(result => {  
        console.log("Image upload response: " + result)
       if (result["success"] == true) {
       // this.router.navigate(['/job']);
        this.presentToast()
        }
     });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
    });

  await toast.present();
}
}
