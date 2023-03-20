import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  clubFrom:FormGroup;
  organisationList: any;
  IsorgListShow:boolean=false;
  organisationVal: any;
  constructor(public router:Router,public fb: FormBuilder, public storageservice: StorageService) { }

  ngOnInit() {

    this.clubFrom = this.fb.group({
      institutionName: [""],
      clubName: [""],
      clubBranch: [""],
      titleHeld: [""],
      rolePlayed:[""],
      participatedFromObj:[""],
      participatedFrom: [""],
      participatedTillObj:[""],
      participatedTill: [""],
      currentMember: [""],
      extId:[""],
      checked:[""],
      unregisteredClub:[""],
      currentUserId:[""]
    });

    var listConstant =  this.initializeItems(); 
  }

   //institutionNameList
   unCheckFocus() {
    // this.ionSearchListShow = false;
  }
  goToSearchSelectedItem( instName,instId) {
    console.log("InsName: " + instName)
    console.log("InsId: " + instId)
    
    this.organisationVal = instName;
    this.clubFrom.value.institutionName = instId;
    this.IsorgListShow = false;
    //this.getstatelist(CtryId);
  }
    async initializeItems(): Promise<any> {
  
      var organisationListUrl = "api/auth/app/IndividualProfileDetails/organisationList";
      const InsList = this.storageservice.getrequest(organisationListUrl).subscribe(result => {
        this.organisationList = result["organisationList"];
        this.organisationList = result["organisationList"];
     //   console.log(`countryResponse: ${JSON.stringify(this.countryResponse)}`);
      });
    
      return InsList;
    }
    async filterList(evt) {
      if (evt.srcElement.value != null && evt.srcElement.value != '') {
        this.IsorgListShow = true;
        this.organisationList = this.organisationList;
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
        }
    
        var countVal = 0;
        this.organisationList = this.organisationList.filter(currentinstitution => {
          countVal++;
          if (currentinstitution.text && searchTerm && countVal < 100) {
            return (currentinstitution.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          }
        });
    
        if (this.organisationList == 0) {
          this.IsorgListShow = false;
        }
        else {
          this.IsorgListShow = true;
        }
      }
      else {
        this.IsorgListShow = false;
      }
    }
  certifications()
  {
    this.router.navigate(['/profile/addCertifications']) 
  }
  connections()
  {
    this.router.navigate(['/profile/addConnections']) 
  }
}
