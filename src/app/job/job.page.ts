import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  public matchedJobList:any;
  userId:string; 

  constructor(public router:Router,public storageservices: StorageService) { 
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit() {

    this.BindMatchedJobsList();
  }

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  goto_jobdetails(){
   this.router.navigate(['/job-details']) 
  }

  
  BindMatchedJobsList(){

    

    var MatchedJobsURL = "api/auth/app/jobportal/getJobMatchDetails"+"?currentUserId=" + this.userId;


    const matchedJobList = this.storageservices.getrequest(MatchedJobsURL).subscribe(result => {

      this.matchedJobList = result['jobSeekList'];
      console.log(this.matchedJobList);
    })

  }


}
