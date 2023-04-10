import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-oni-job-post-list',
  templateUrl: './oni-job-post-list.page.html',
  styleUrls: ['./oni-job-post-list.page.scss'],
})
export class OniJobPostListPage implements OnInit {

  jobPostList:[];
  userId:string;

  constructor(public router:Router,public storageservices: StorageService) {

    this.userId = localStorage.getItem("userId") ;
   }

  ngOnInit() {

    this.bindJobAdvertiseMentList();
  }


bindJobAdvertiseMentList(){

  var JobPostListsURL = "api/auth/app/jobportal/JobAdvertisementList?currentUserId="+this.userId;


    const JobPostList = this.storageservices.getrequest(JobPostListsURL).subscribe(result => {

      this.jobPostList = result['JobAdvertisementList'];
  
      console.log(this.jobPostList);
    });

  
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

viewMatches(jobId){
  let edit = {

    jobID :jobId
  }

  let navigationExtras: NavigationExtras = {
    queryParams: edit
  };
  this.router.navigate(['/oni-view-job-profile-matches-list'], navigationExtras);
}
  

}
