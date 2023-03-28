import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userId: string;
  creditPoints: any;
  profileViewCount:any;
  networkCount:any;
  matchedJobsCount:any;
  avgrating:any;

  constructor(public router:Router,public storageservice: StorageService) { }

  ngOnInit() {

    this.userId = localStorage.getItem("userId")  ; 
   this.creditPoints = localStorage.getItem("creditPoints") ;
//Profile View Count
    var indiProfileViewCountURL = "api/auth/app/dashboard/profileviewcount?currentUserId="+this.userId;
    this.storageservice.getrequest(indiProfileViewCountURL).subscribe(result => {
     console.log(result); 
     this.profileViewCount = result['profileviewcount']
        });

//Network Count
        var indiProfileNetworkCountURL = "api/auth/app/dashboard/networkcount?currentUserId="+this.userId;
        this.storageservice.getrequest(indiProfileNetworkCountURL).subscribe(result => {
         console.log(result); 
         this.networkCount = result['networkcount']; 
            });

//MatchedjobsCount
var indiMatchedJobsCountURL = "api/auth/app/dashboard/matchedjobcounts?currentUserId="+this.userId;
this.storageservice.getrequest(indiMatchedJobsCountURL).subscribe(result => {
 console.log(result); 
 this.matchedJobsCount = result['matchedJobs'] ;
    });

//avg Rating

var indiRatingsCountURL = "api/auth/app/dashboard/avgrating?currentUserId="+this.userId;
this.storageservice.getrequest(indiRatingsCountURL).subscribe(result => {
 console.log(result); 
 this.avgrating = result['avgrating'];
    });



  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goto_settings(){
    this.router.navigate(['/settings']) 
  }

  goto_subscribe(){

    this.router.navigate(['/subscription-individual']) 
  }


     // footer
     goto_profileSearch(){
      this.router.navigate(['/job-search']);
    }
    goto_jobs(){
      this.router.navigate(['/job']);
    }
    goto_home(){
      this.router.navigate(['/home']);
    }
    goto_profile(){
      this.router.navigate(['/profile-view']);
    }
    goto_more(){
      this.router.navigate(['/settings']);
    }
}
