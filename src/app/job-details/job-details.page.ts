import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }


  jobDetails:any;
  jobSkills:[];
  profileFlag:boolean =false;
  jobId :any;
  userId: string;
  userName: string;

  constructor(public router:Router,private route: ActivatedRoute,public storageservice: StorageService,
    private toastController: ToastController) { 

    
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

    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");

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
    this.storageservice.showLoading();
    var jobapplyURL = "api/auth/app/jobportal/applyForJob";
    this.storageservice.getrequest(jobapplyURL + "?jobId=" + this.jobId + "&talentId="+this.userId +"&currentUserName="+this.userName).subscribe(result => {
  console.log(result);
  if (result["success"] == true) {
    this.storageservice.dismissLoading();
    this.router.navigate(['/apply-for-job']);
    }else if (result["success"] == false) {
                  var message = result["message"];
                  if (message == null) {
                    "message" 
                  }
                  
                  this.storageservice.warningToast(message);
                  this.storageservice.dismissLoading();
                  
                }
    });


   


  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved Successfully',
      duration: 3000,
      cssClass: 'custom-toast'
     
    });
    this.router.navigate(['/apply-for-job']);

    await toast.present();
  }

   getJobDetails(jobID){
    this.storageservice.showLoading();
    var oniDashboardListURL = "api/auth/app/jobportal/JobAdvertisementview?jobId="+jobID;
    this.storageservice.getrequest(oniDashboardListURL).subscribe(result => {
      if(result['success'] == true) {
        this.jobDetails = result['JobAdvertisementList'][0];
        this.jobSkills = result['JobAdvertisementList'][0]['jobSkills'];
        if(result['JobAdvertisementList'][0].profileimg != null){
          this.profileFlag = true
        }
       
        //job Type string 
        this.storageservice.dismissLoading();
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
      }else{
        this.storageservice.dismissLoading();
      }
      

           console.log(result);
           console.log(this.jobSkills); 
  
        });
   }         


}
