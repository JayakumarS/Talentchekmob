import { Component, OnInit, NgZone } from '@angular/core';
import { StorageService } from '../storage.service';
import { NavigationExtras, Router } from '@angular/router';
 import { AlertController } from '@ionic/angular';
 import { NavigationEnd } from '@angular/router';
 import { ActivatedRoute } from '@angular/router';

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
  fromAddPage: any;
  queryParams: any;

  constructor(public router:Router, private ngZone: NgZone,public route:ActivatedRoute,public storageservice: StorageService,public alertController: AlertController) {

    this.userId = localStorage.getItem("userId") ;
    interface MyCustomEventInit extends CustomEventInit {
      target?: HTMLElement;
    }

    this.storageservice.refreshDataObservable.subscribe(() => {
      const contentElement = document.getElementById('my-content');
      const eventInit: MyCustomEventInit = {
        detail: {},
        bubbles: true,
        cancelable: true,
        target: contentElement
      };
       this.doRefresh(eventInit);
    });

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.fromAddPage = params; 
         if (this.fromAddPage != null && this.fromAddPage.refreshPage != null) {
            console.log("hello");
            this.jobPostList = [];
             this.bindJobAdvertiseMentList();
         }
      }
    });
   }

   //refresh page function
   doRefresh(event) {
     this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
   }

   //nav bar
   selectedTab: string = 'earth';
   setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/oni-job-post-list') {
        this.setSelectedTab('earth');
      }
    });
      this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3); 
    this.bindJobAdvertiseMentList();
  }

// list function
bindJobAdvertiseMentList(){
   this.storageservice.showLoading();
  var JobPostListsURL = "api/auth/app/jobportal/JobAdvertisementList?currentUserId="+this.userId; 
    const JobPostList = this.storageservice.getrequest(JobPostListsURL).subscribe(result => { 
      if(result['success'] == true) {
        this.storageservice.dismissLoading(); 
        this.jobPostList = result['JobAdvertisementList']; 
        console.log(this.jobPostList); 
      }
    },error =>{
      this.storageservice.dismissLoading(); 
      console.log('Error');
    },
    () =>{
      this.storageservice.dismissLoading(); 
      console.log('Completed bind.');
    }
  );

  
}

  //back button
  goto_profileView(){ 
    this.router.navigate(['/organization-dashboard']);
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
  
  //delete function
  async deletejob(jobid){ 
    let alert = await this.alertController.create({ 
      message: 'Are you sure that you want to permanently delete the selected item?',
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
           handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'YES',
          cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay'); 
             console.log("Id: " + jobid);
             try {
              var postData = {
                'jobId': jobid
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`); 
              var deleteExperienceServiceUrl = "api/auth/app/jobportal/deletejobadvertisement"; 
              this.storageservice.postrequest(deleteExperienceServiceUrl,postData.jobId).subscribe(async result => {  
                 this.bindJobAdvertiseMentList();
                if (result  == true) {
                  this.storageservice.successToast('Deleted successfully');
                 this.bindJobAdvertiseMentList();
                  }
                else if (result == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                 }
                else {
                  this.storageservice.warningToast("Connection unavailable!");                
                }
              },
              error =>{
                console.log("error")
              },
              ()=>{
                console.log("start")
                   this.ngZone.run(() => {
                    const randomString = this.generateRandomString(); 
 
                   let navigationExtras: NavigationExtras = {
                    queryParams: {
                      refreshPage: randomString
                    }
                  }; 
                    this.router.navigate(['oni-job-post-list'], navigationExtras)
                  });
                 console.log("end")
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

  // random string generator
   generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  // refresh screen
  reload(){
    this.storageservice.refreshData();
  }


    // footer 
    goto_profileSearch(){
      this.router.navigate(['/job-search']);
    }
    goto_jobs(){
      this.router.navigate(['/oni-job-post-list']);
    }

    goto_orghome(){ 

      if(this.roleId.includes('2')){

        console.log(this.roleId);

        this.router.navigate(['/organization-dashboard']); 
      }
      else if(this.roleId.includes('3')){  
        this.router.navigate(['/institution-dashboard']); 
      }
   
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

 
