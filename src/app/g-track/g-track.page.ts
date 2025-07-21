import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-g-track',
  templateUrl: './g-track.page.html',
  styleUrls: ['./g-track.page.scss'],
})
export class GTrackPage implements OnInit {

  title = 'app';
  searchValue : String;
  searchby : string;
  searchdata: String;
   testdata:String ;
  ctsType:String;

  isSubmitted = false;
  isShow = true;

  tracking :any;
  searchListResponse: any;
  searchListCount: number = 0;
  resultArray: any;
  resultArrayLength : any;

institutionVal: string;
modelList = ['Job No', 'Booking No', 'HBL No','MBL No','HAWB No','MAWB No'];



  constructor(public router: Router,public storageservice: StorageService,private loadingCtrl: LoadingController) { 


    
  }

  async IndustryChangeEvent(event) {
    var industryId = event.target.value;
    console.log("industryId: " + industryId);

   // var listConstant = await this.BindJobTitleList(industryId);
  }
  searchClick() {
    this.BindSearchList();
  }
   
  getValue( ){

    this.testdata = this.searchby;
  console.log(this.searchby);
  // the value will be displayed
  }

  resetClick() {
    this.searchby = "";
    this.searchdata = "";
    this.searchListResponse = null;
    this.searchListCount = 0;
  }

  BindSearchList() {
  
if(this.searchby == "Job No"){

  var JobURL = "/app/track/mobjobsearchlist?jobid=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(JobURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "JOB";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["statuslist"];
         this.resultArrayLength = this.resultArray.length;
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;
 }

 else if (this.searchby == "Booking No"){

  var BookingURL = "/app/track/booksearchMoblist?blno=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(BookingURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "Direct";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["bostatuslist"];
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;


 }
 else if (this.searchby == "MBL No"){

  var MBLURL = "/app/track/mblMOBsearchlist?mblno=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(MBLURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "Direct";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["mblstatuslist"];
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;



 }
 else if (this.searchby == "HBL No") {

  var HBLURL = "/app/track/hblMobsearchlist?hblno=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(HBLURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "Direct";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["hblstatuslist"];
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;

 }

 else if (this.searchby == "HAWB No")
 {

  var HAWBURL = "/app/track/airhblMOBsearchlist?airhblno=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(HAWBURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "Direct";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["airhblstatuslist"];
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;
 }

 else if (this.searchby == "MAWB No")
 {

  var HAWBURL = "/app/track/airmblsearchMoblist?airmblno=" +this.searchdata;
  // this.showLoadingIndicator();
   const SearchList = this.storageservice.getrequest(HAWBURL).subscribe(result => {

     if(result) {

       if(result["booking_no"]!==null) {

         this.tracking = result;
         this.ctsType = "Direct";
         this.tracking["jobid"] = this.searchdata;
         this.tracking["hblno"] = '';
         this.tracking["mblno"] = '';
         this.tracking["blno"] = '';
         this.tracking["airmblno"] = '';
         this.tracking["airhblno"] = '';
         this.resultArray = result["airmblstatuslist"];
         console.log(result)
         this.isSubmitted = true;
         this.isShow = false;
       }
       else
       {
         this.storageservice.generalAlertToast("No data found!");
       }
     }
  // this.hideLoadingIndicator();
   });

   return SearchList;
   
 }


}

    


  showLoadingIndicator() {
    this.loadingCtrl.create({
      message: 'Processing...',
      spinner: 'bubbles',
      cssClass: 'loadingIndicatorCustom'
    }).then((loading) => {
      loading.present();
    });
  }
  hideLoadingIndicator() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    });
  }


  ngOnInit() {
    

  }

}
