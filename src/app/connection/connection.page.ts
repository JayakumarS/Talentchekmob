import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

  ConnectionsForm: FormGroup;
  relationshipList: any;

  constructor(public router:Router,public fb: FormBuilder, public storageservice: StorageService) { }

  ngOnInit() {

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

   //relationshipList
   getrelationshipList(){
    var getrelationshipListUrl= "api/auth/app/IndividualProfileDetails/relationshipList";
       
    this.storageservice.getrequest(getrelationshipListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.relationshipList = result["relationshipList"]; 
     }
   });
  }
}
