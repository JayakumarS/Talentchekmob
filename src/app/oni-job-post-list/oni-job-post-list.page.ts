import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { NavigationExtras, Router } from '@angular/router';
 import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-oni-job-post-list',
  templateUrl: './oni-job-post-list.page.html',
  styleUrls: ['./oni-job-post-list.page.scss'],
})
export class OniJobPostListPage implements OnInit {

  jobPostList:[];
  userId:string;
  roleId: string;
  RoleID: string[];

  constructor(public router:Router,public storageservice: StorageService,public alertController: AlertController) {

    this.userId = localStorage.getItem("userId") ;
   }
   selectedTab: string = 'earth';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  ngOnInit() {
      this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);

    this.bindJobAdvertiseMentList();
  }


bindJobAdvertiseMentList(){

  this.storageservice.showLoading();
  var JobPostListsURL = "api/auth/app/jobportal/JobAdvertisementList?currentUserId="+this.userId;


    const JobPostList = this.storageservice.getrequest(JobPostListsURL).subscribe(result => {

      if(result['success'] == true) {
        this.storageservice.dismissLoading(); 
        this.jobPostList = result['JobAdvertisementList'];
  
        console.log(this.jobPostList);

      }


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

editCall(id){
  let edit = {
    id
 }
 let navigationExtras: NavigationExtras = {
   queryParams: edit
 };
 this.router.navigate(['/oni-job-post'], navigationExtras);
}

goto_addJobPost(){
  this.router.navigate(['/oni-job-post']);
}
  
  async deletejob(jobid){ 
    let alert = await this.alertController.create({
     
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');

            //Main concept.
            console.log("Id: " + jobid);
           // this.showLoadingIndicator(); // Show Loading indicator
            try {
              var postData = {
                'jobId': jobid
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/jobportal/deletejobadvertisement";

              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.jobId).subscribe(async result => {  

                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                  window.location.reload()
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                //  this.hideLoadingIndicator(); //Hide loading indicator
                }
                else {
                  this.storageservice.warningToast("Connection unavailable!");
                
                }
              });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
             // this.hideLoadingIndicator(); //Hide loading indicator
            }

          }
        }
      ]
    });
    await alert.present();
  }

  reload(){
    window.location.reload();
  }


    // footer

    goto_profileSearch(){
      this.router.navigate(['/job-search']);
    }
    goto_jobs(){
      this.router.navigate(['/oni-job-post-list']);
    }
    goto_instihome(){
      this.router.navigate(['/institution-dashboard']);
    
    }
    goto_orghome(){
    
      this.router.navigate(['/organization-dashboard']);
    }
    goto_home(){
      this.router.navigate(['/home']);
    }
    goto_orgprofile(){
      this.router.navigate(['/org-profile-view']);
    
    }
    goto_instiprofile(){
    
      this.router.navigate(['/insti-profile-view']);
    }
    goto_profile(){
      this.router.navigate(['/profile-view']);
    }
    goto_more(){
      this.router.navigate(['/settings']);
    }

}

 
