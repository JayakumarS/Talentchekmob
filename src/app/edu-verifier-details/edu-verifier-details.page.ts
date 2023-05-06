import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edu-verifier-details',
  templateUrl: './edu-verifier-details.page.html',
  styleUrls: ['./edu-verifier-details.page.scss'],
})
export class EduVerifierDetailsPage implements OnInit {
  instiId: any;
  eduId: any;
  EducationForm:FormGroup;
  Education: any;
  userId: string;
  splCharRegex: string = "^[^<>{}\"/|;:,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";
  constructor(private route: ActivatedRoute, public router:Router,public storageservice:StorageService,
     private fb: FormBuilder,public toastController:ToastController,) { }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.instiId=params.instiId;
      this.eduId=params.eduId;
      });

      this.userId = localStorage.getItem("userId")  ;   

      this.EducationForm= this.fb.group({
        verifierName: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern(this.splCharRegex), Validators.required])],
        verifierEmail:["",Validators.compose([Validators.maxLength(70),Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        verifierDesignation:["",Validators.required],
        verifierMobile:[""],
        oniCode:[""],
        remarks: [""],
        rating: [""],
        eduId: [""],
        currentUserId: [""]
     });
  }
  addverifier(){
   
    this.EducationForm.value.currentUserId =this.userId;
    this.EducationForm.value.oniCode =this.instiId;
    this.Education=this.EducationForm.value;

 var saveEducation = "api/auth/app/IndividualProfileDetails/addVerifierdetails";

  this.storageservice.postrequest(saveEducation,this.Education).subscribe(async result => {  
    if (result["success"] == true) {
      
        //  const profilePage = new ProfilePage(this.router, this.storageservice, this.elementRef, this.modalController, this.alertController);
        //  profilePage.updateData();
    
      this.presentToast()
      let edit = {
        
        eduId:this.eduId
           }
     let navigationExtras: NavigationExtras = {
       queryParams: edit
     };
      this.router.navigate(['/rating-insti-popup'],navigationExtras)
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
  move(eduId){
    let edit = {
      
      eduId:eduId
   }
   let navigationExtras: NavigationExtras = {
     queryParams: edit
   };
    this.router.navigate(['/rating-insti-popup'],navigationExtras)
  }
  limitInputLength($event, maxLength=10) {
    if($event.target.value.length>=maxLength) {
        $event.preventDefault();
        return;
    }
}
}
