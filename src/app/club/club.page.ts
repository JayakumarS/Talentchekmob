import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  clubFrom: FormGroup;
  organisationList: any;
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
  constructor(public router: Router, public fb: FormBuilder, public storageservice: StorageService, private toastController: ToastController) { }

  ngOnInit() {

    this.clubFrom = this.fb.group({
       clubName: [""],
      clubBranch: [""],
      titleHeld: ["",Validators.required],
      rolePlayed: [""],
      participatedFrom: ["",Validators.required],
      participatedTill: ["",Validators.required],
      currentMember: [""],
      extId: [""],
      checked: [""],
      unregisteredClub: [""],
      currentUserId: [""]
    });

    this.getOrganisationList();

    //var listConstant = this.initializeItems();

    this.userId = localStorage.getItem("userId");
  }

 //  Organisation auto complete 
 onSearchOrganisation(value: string) {
  if (value.length > 0) {
    this.IsorgListShow = true;
    this.searchOrganisationResults = this.organisationList.filter(Organisation => Organisation.text.toLowerCase().indexOf(value.toLowerCase()) > -1);
 
    if (this.searchOrganisationResults == 0) {
      this.IsorgListShow = false;
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
  this.IsorgListShow = false;
  this.clubid = id;
  this.searchOrganisationResults = [];
  this.searchCtrl.setValue('');
}

getOrganisationList(){
  var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
  this.storageservice.getrequest(organisationListUrl).subscribe(result => {
   if (result["success"] == true) {
    this.organisationList = result["organisationList"]; 
    }
 });
}
 

 removeOrganisation(selectedOrganisation: string) {
  this.selectedOrganisation = undefined;
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
    if(this.clubid != undefined){
      const errors = this.checkFormValidity(this.clubFrom); 
      if (errors.length > 0) {
        // Display errors in a popup
        const alert = await this.toastController.create({
          header: 'Validation Error',
          message: 'Please provide all the required values!',
          buttons: ['OK']
        });
    
        await alert.present();
      } else{
  
        if(this.unregisteredIns == ""){
          this.clubFrom.value.unregisteredIns = this.clubid;
         }else{
          this.clubFrom.value.unregisteredIns = this.unregisteredIns;
         }
  
         this.clubFrom.value.participatedFrom =formatDate(this.clubFrom.value.participatedFrom, 'dd/MM/yyyy','en-IN');
         this.clubFrom.value.participatedTill =formatDate(this.clubFrom.value.participatedTill, 'dd/MM/yyyy','en-IN');          
         this.clubFrom.value.currentUserId = this.userId;
         this.clubFrom.value.clubName = this.clubid; 
         this.Extracurricular = this.clubFrom.value;
         console.log(` data: ${JSON.stringify(this.Extracurricular)}`);
         var saveperonalinfo = "api/auth/app/IndividualProfileDetails/saveExtracurricular";
     
         this.storageservice.postrequest(saveperonalinfo, this.Extracurricular).subscribe(result => {
     
           if (result["success"] == true) {
             // this.router.navigate(['/job']);
             this.presentToast()
           }
         });
    
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
    this.router.navigate(['/profile-view'])
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
    this.router.navigate(['/profile-view']) 
  }


}
