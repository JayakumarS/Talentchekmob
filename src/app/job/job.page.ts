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
   this.userId = localStorage.getItem("userId") ;

   // this.userId = "TFIN10000000106" ;
  }

  ngOnInit() {

    this.BindMatchedJobsList();
  }

  selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  goto_jobdetails(jobId){
    let edit = {

      jobID :jobId
    }

    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/job-details'], navigationExtras);
  }

  
  BindMatchedJobsList(){

    

    var MatchedJobsURL = "api/auth/app/jobportal/getJobMatchDetails"+"?currentUserId=" + this.userId;


    const matchedJobList = this.storageservices.getrequest(MatchedJobsURL).subscribe(result => {

      this.matchedJobList = result['jobSeekList'];
      this.matchedJobList.forEach(element=>{
        let jobType = "";
        for(let jb=0;jb<element.jobType.length;jb++){
          jobType += element.jobType[jb]+", ";
        }
        element.jobTypeStr = jobType.substring(0, jobType.length-2);
      });
      var str = result['jobSeekList'][0]['jobType'].toString(); 

      console.log("Returned string is : " + str );
      console.log(this.matchedJobList);
    })

  }

  goto_editJob(){

    let edit = {

      call : "edit-call"
    }

    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/job-profile'], navigationExtras);
  }


  goto_addJob(){
    this.router.navigate(['/job-profile']);
  }


  // footer nav

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
