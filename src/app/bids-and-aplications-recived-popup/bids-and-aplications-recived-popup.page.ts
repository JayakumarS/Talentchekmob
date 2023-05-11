import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bids-and-aplications-recived-popup',
  templateUrl: './bids-and-aplications-recived-popup.page.html',
  styleUrls: ['./bids-and-aplications-recived-popup.page.scss'],
})
export class BidsAndAplicationsRecivedPopupPage implements OnInit {

  talentId : string;
  currendUserId: string;
  basicProfileDetails = [];
  educationList = [];
  certificationsList =[];
  clubsList = [];
  experienceList =[];
  jobSeekList :any;
  bidDetails : any;
  jspid : any;
  bidId : any;
  appRecvFlag : boolean = false;
  bidsRecvFlag : boolean = false;

  constructor(public modalController: ModalController,private navParams: NavParams,public formbuilder: FormBuilder,
    public storageservice: StorageService,public router: Router, ) { }

  ngOnInit() {
    this.talentId = this.navParams.data.talentId;
    this.jspid = this.navParams.data.jspid;
    this.bidId = this.navParams.data.bidId;
    console.log(this.talentId);
    console.log(this.jspid);
    console.log(this.bidId);
    this.currendUserId = localStorage.getItem("userId")  ; 
    this.lessCredit();
    var profileViewUrl = "api/auth/app/IndividualProfileDetails/viewmatchesprofile"+"?talentId=" +this.talentId;

    this.storageservice.getrequest(profileViewUrl).subscribe(result => {
    this.basicProfileDetails = result['profileViewList'];
    this.experienceList = result['profileViewList'][0]["experienceList"];
    this.educationList = result['profileViewList'][0]["educationList"];
    this.certificationsList = result['profileViewList'][0]["certificationsList"];
    this.clubsList = result['profileViewList'][0]["clubsList"];
      console.log(result["profileViewList"]); 
       
   });



   if(this.jspid != "" && this.bidId == "empty"){
    this.getappRecv();
    this.appRecvFlag = true; 
  }
  else if(this.jspid == "empty" && this.bidId != ""){
    this.getbidsRecv();
    this.bidsRecvFlag = true;
  }

  }


  lessCredit(){

    var lessCreditURL = "api/auth/app/CommonUtility/creditPointdebit?talentId="+this.currendUserId+"&id="+this.talentId; 
    this.storageservice.getrequest(lessCreditURL).subscribe(result => {
     if (result["success"] == true) {
     console.log(result);
      }
   });
  }
 
  getappRecv(){

    var appRecdetailsUrl = "api/auth/app/jobportal/viewJobSeekDetailsForOrg?jspId="+this.jspid;
    this.storageservice.getrequest(appRecdetailsUrl).subscribe(result => {
   
       console.log(result); 

       if(result['success'] == true){

        this.jobSeekList = result['jobSeekList'][0];

       result['jobSeekList'].forEach(element=>{
       let skillstext = "";
       let jobTypetext = "";
       let reqLanguagestext =""
        for(let jb=0;jb<element.jobSkills.length;jb++){
          skillstext += element.jobSkills[jb]+", ";
        }
        element.skillstext = skillstext.substring(0, skillstext.length-2);

        for(let jb=0;jb<element.jobType.length;jb++){
          jobTypetext += element.jobType[jb]+", ";
        }
        element.jobTypetext = jobTypetext.substring(0, jobTypetext.length-2);

        for(let jb=0;jb<element.reqLanguages.length;jb++){
          reqLanguagestext += element.reqLanguages[jb]+", ";
        }
        element.reqLanguagestext = reqLanguagestext.substring(0, reqLanguagestext.length-2);
      });        
       }     
    });
  }

  getbidsRecv(){

    var BiddetailsURL="api/auth/app/jobAuctionBid/getBidPostDetails?bidId="+this.bidId;
    this.storageservice.getrequest(BiddetailsURL).subscribe(result => {
   
      console.log(result); 

      if(result['success'] == true)

      this.bidDetails = result['bidpostDetails'][0];
       
   });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  Apply(){
    this.modalController.dismiss();
 this.router.navigate(['/web-app-nav']);

  }

}
