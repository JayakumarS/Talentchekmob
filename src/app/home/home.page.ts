import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import Driver from 'driver.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  langSelected: string;
  selectedLang: string;
  driver:any = new Driver();
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  userId: string;
  creditPoints: any;
  profileViewCount:any;
  networkCount:any;
  matchedJobsCount:any;
  avgrating:any;
  categoryType: string;

  constructor(public router:Router,public storageservice: StorageService,
    private languageService: LanguageService,private translate: TranslateService,) {
    

   }

  ngOnInit() {

   // this.langSelected=localStorage.getItem("selLanguage") ;
   // this.translate.setDefaultLang(this.langSelected);


   

   this.selectedLang  = localStorage.getItem('selectedLang');
   this.languageService.setLanguage(this.selectedLang);
    

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home') {
        this.setSelectedTab('apps');
        this.getCreditpoints();
        this.getAvgratingCount();
        this.getProfileViewCount();
        this.getmatchedJobCount();
        this.getnetworkCount();
      }
    });

    this.userId = localStorage.getItem("userId")  ; 
    this.categoryType = localStorage.getItem("categoryType")  ; 
    this.getCreditpoints();
    this.getAvgratingCount();
    this.getProfileViewCount();
    this.getmatchedJobCount();
    this.getnetworkCount();
    this.categoryType = localStorage.getItem("categoryType")  ; 
    this.getcategoryreg();
   this.creditPoints = localStorage.getItem("creditPoints") ;
//Profile View Count

  }
  selectedTab: string = 'apps';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  startTour(){

    this.driver = new Driver({
      stageBackground: "rgba(255, 255, 255, 0.1)", // Background color for the staged behind highlighted element
    });

    this.driver.defineSteps([
      {
        element: '#step1',
        popover: {
         className: 'first-step-popover-class',
          title: 'Step 1',
          description: 'This is the first step.',
          position: 'top',
        },
      },
      {
        element: '#step2',
        popover: {
          title: 'Step 2',
          description: 'This is the second step.',
          position: 'top',
        },
      },
      // Add more steps as needed
    ]);
  
    this.driver.start();
  }


  getProfileViewCount(){

    var indiProfileViewCountURL = "api/auth/app/dashboard/profileviewcount?currentUserId="+this.userId;
    this.storageservice.getrequest(indiProfileViewCountURL).subscribe(result => {
     console.log(result); 888
     this.profileViewCount = result['profileviewcount']
        });
  }


  getnetworkCount(){
    var indiProfileNetworkCountURL = "api/auth/app/dashboard/networkcount?currentUserId="+this.userId;
    this.storageservice.getrequest(indiProfileNetworkCountURL).subscribe(result => {
     console.log(result); 
     this.networkCount = result['networkcount']; 
        });

      }


      getmatchedJobCount(){

        var indiMatchedJobsCountURL = "api/auth/app/dashboard/matchedjobcounts?currentUserId="+this.userId;
    this.storageservice.getrequest(indiMatchedJobsCountURL).subscribe(result => {
     console.log(result); 
     this.matchedJobsCount = result['matchedJobs'] ;
        });
      }


      getAvgratingCount(){

        var indiRatingsCountURL = "api/auth/app/dashboard/avgrating?currentUserId="+this.userId;
            var indiRatingsCountURL = "api/auth/app/dashboard/avgrating?currentUserId="+this.userId;
        this.storageservice.getrequest(indiRatingsCountURL).subscribe(result => {
         console.log(result); 
         this.avgrating = result['avgrating'];
            });

          }

          getCreditpoints(){

    
            var creditpointsURL = "api/auth/app/fileUpload/getImgfile?talentId="+this.userId;
            this.storageservice.getrequest(creditpointsURL).subscribe(data => {
            console.log(data);
            if(data['success'] == true){
        
              localStorage.setItem('creditPoints', data["creditpoints"]);;
              localStorage.setItem('profilePic', data["imageUrl"]);
              localStorage.setItem('categoryType', data["categoryType"]);
              this.creditPoints = localStorage.getItem("creditPoints") ;
            }
            });
          }
 

  goto_settings(){
    this.router.navigate(['/settings']) 
  }

  goto_subscribe(){

    this.router.navigate(['/subscription-individual']) 
  }

  getcategoryreg(){

    if(this.categoryType == ""){

      this.router.navigate(['/category-popup']);
      
    }else{

      this.router.navigate(['/home']);
    }

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
