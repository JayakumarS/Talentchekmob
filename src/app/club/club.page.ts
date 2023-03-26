import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  searchOrganisationResults: string[] = [];
  selectedOrganisation: any;
  constructor(public router: Router, public fb: FormBuilder, public storageservice: StorageService, private toastController: ToastController) { }

  ngOnInit() {

    this.clubFrom = this.fb.group({
      institutionName: [""],
      clubName: [""],
      clubBranch: [""],
      titleHeld: [""],
      rolePlayed: [""],
      participatedFromObj: [""],
      participatedFrom: [""],
      participatedTillObj: [""],
      participatedTill: [""],
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
// removeOrganisation(selectedOrganisation: string) {
//   this.selectedOrganisation.splice(this.selectedSkills.indexOf(selectedOrganisation), 1);
// }  
  
  
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

  Save() {

    this.clubFrom.value.participatedFrom =formatDate(this.clubFrom.value.participatedFrom, 'dd/MM/yyyy','en-IN');
    this.clubFrom.value.participatedTill =formatDate(this.clubFrom.value.participatedTill, 'dd/MM/yyyy','en-IN');    
    //this.clubFrom.value.institutionName = instId;
    this.clubFrom.value.unregisteredIns = this.unregisteredIns;
    this.clubFrom.value.clubName = this.clubid;
    this.clubFrom.value.currentUserId = this.userId;
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
     
    });
    this.router.navigate(['/profile-view'])
    await toast.present();
  }
  profileView()
  {
    this.router.navigate(['/profile-view']) 
  }


}
