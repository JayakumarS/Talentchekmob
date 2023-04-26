import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  // refresh screen 
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
  }
 
  public matchedJobList:any;
  userId:string; 
  showflag:any; 

  constructor(public router:Router,public storageservices: StorageService) { 
   this.userId = localStorage.getItem("userId") ;
   interface MyCustomEventInit extends CustomEventInit {
    target?: HTMLElement;
  }

  this.storageservices.refreshDataObservable.subscribe(() => {
    const contentElement = document.getElementById('my-content');
    const eventInit: MyCustomEventInit = {
      detail: {},
      bubbles: true,
      cancelable: true,
      target: contentElement
    };
     this.doRefresh(eventInit);
  });
   }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/job') {
        this.setSelectedTab('earth');
      }
    }); 
    this.BindMatchedJobsList();
  }

  //nav bar
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

  reload(){
    this.storageservices.refreshData();
  }

  //list function
  BindMatchedJobsList(){ 
    var MatchedJobsURL = "api/auth/app/jobportal/getJobMatchDetails"+"?currentUserId=" + this.userId;  
    const matchedJobList = this.storageservices.getrequest(MatchedJobsURL).subscribe(result => {
      this.showflag = false;
      this.matchedJobList = result['jobSeekList'];
      if(result["success"]== true){
        if(this.matchedJobList.length !=0){
          this.showflag = true;
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
        }
      
      } 
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
