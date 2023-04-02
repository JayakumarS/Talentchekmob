import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {


  jobDetails:any;
  jobSkills:[];

  jobId :any;

  constructor(public router:Router,private route: ActivatedRoute,public storageservice: StorageService) { 

    
    this.route.queryParams.subscribe(params => {
      if (params) {
  
        if (params != null) {

          console.log(params);
          this.jobId = params.jobID;
        }
      }
    });
  }

  ngOnInit() {

    this.getJobDetails(this.jobId)
  }

  selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }
  
  goto_job(){
    this.router.navigate(['/job']) 
  }
  Apply(){

    this.router.navigate(['/apply-for-job']) 

  }


   getJobDetails(jobID){

    var oniDashboardListURL = "api/auth/app/jobportal/JobAdvertisementview?jobId="+jobID;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {
  
      this.jobDetails = result['JobAdvertisementList'][0];
      this.jobSkills = result['JobAdvertisementList'][0]['jobSkills'];

      //job Type string 

      result['JobAdvertisementList'].forEach(element=>{
        let jobType = "";
        for(let jb=0;jb<element.jobType.length;jb++){
          jobType += element.jobType[jb]+", ";
        }
        element.jobTypeStr = jobType.substring(0, jobType.length-2);
      });


      result['JobAdvertisementList'].forEach(element=>{
        let reqLanguages = "";
        for(let jb=0;jb<element.reqLanguages.length;jb++){
          reqLanguages += element.reqLanguages[jb]+", ";
        }
        element.reqLanguagesStr = reqLanguages.substring(0, reqLanguages.length-2);
      });

           console.log(result);
           console.log(this.jobSkills); 
  
        });
   }         


}
