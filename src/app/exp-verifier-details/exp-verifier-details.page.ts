import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ProfilePage } from '../profile/profile.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-exp-verifier-details',
  templateUrl: './exp-verifier-details.page.html',
  styleUrls: ['./exp-verifier-details.page.scss'],
})
export class ExpVerifierDetailsPage implements OnInit {
  orgId: any;
  expId: any;
  ExperienceForm:FormGroup;
  userId: string;
  Experience: any;
  constructor(public router:Router,private fb: FormBuilder,public toastController:ToastController,
     public storageservice:StorageService,private route: ActivatedRoute,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
  this.orgId= params.org;
   this.expId= params.expid;
    });

    this.ExperienceForm= this.fb.group({
      verifierName: ["", Validators.required],
      verifierEmail:["", Validators.required],
      verifierDesignation:["", Validators.required],
      verifierMobile:[""],
      oniCode:[""],
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });
   this.userId = localStorage.getItem("userId")  ; 

  }


  addVerifier(){
   
    this.ExperienceForm.value.currentUserId =this.userId;
    this.ExperienceForm.value.oniCode =this.orgId;
    this.Experience=this.ExperienceForm.value;

 var saveExperience = "api/auth/app/IndividualProfileDetails/addVerifierdetails";

  this.storageservice.postrequest(saveExperience,this.Experience).subscribe(async result => {  
    if (result["success"] == true) {
      
        //  const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
        //  profilePage.updateData();
    
      this.presentToast()
      let edit = {
        
       exp:this.expId
           }
     let navigationExtras: NavigationExtras = {
       queryParams: edit
     };
      this.router.navigate(['/rating-org-popup'],navigationExtras)
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

move(expId){

  let edit = {
      
    exp:expId
  }
  let navigationExtras: NavigationExtras = {
    queryParams: edit
  };
   this.router.navigate(['/rating-org-popup'],navigationExtras)
}
}
