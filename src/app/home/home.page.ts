import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import  {driver}  from "driver.js";
import "driver.js/dist/driver.css";
import * as HighCharts from "highcharts";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,AfterViewInit {
  langSelected: string;
  selectedLang: string;
  totalViewCount: any;
  chartInitialized: boolean;

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
  categoryShow:boolean=true;
  barChartList: any;


  testData:any="'EMBDSCD','PKGDEK9','KHIDPVD','LKRDCMC','INMUN','YTNTYCT','HKGTMCT','NSACJCF','PUSTHPN'";

  constructor(public router:Router,public storageservice: StorageService,
    private languageService: LanguageService,private translate: TranslateService,private el: ElementRef) {
    

   }

  ngOnInit() {

   // this.langSelected=localStorage.getItem("selLanguage") ;
   // this.translate.setDefaultLang(this.langSelected);
   this.getTuesByPort();


   this.selectedLang  = localStorage.getItem('selectedLang');
   if(this.selectedLang=="null")
   {
     this.languageService.setLanguage('ur');
   }
   else{
     this.languageService.setLanguage(this.selectedLang);
   }

  //  this.selectedLang  = localStorage.getItem('selectedLang');
  //  this.languageService.setLanguage(this.selectedLang);
    

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/home') {
        this.categoryType = localStorage.getItem("categoryType")  ;
        this.setSelectedTab('apps');
        this.getCreditpoints();
        this.getAvgratingCount();
        this.getProfileViewCount();
        if(this.categoryType=="" || this.categoryType==undefined){
          this.getcategoryreg();
          this.categoryShow=false;
          this.getTour();
        }
        this.getmatchedJobCount();
        //this.getcategoryreg();
        this.categoryType = localStorage.getItem("categoryType")  ; 
        this.getnetworkCount();
        if(this.categoryType != ""){
          this.getTour();
         }
        //this.getTour()
      }
    });

    this.userId = localStorage.getItem("userId")  ; 
    this.categoryType = localStorage.getItem("categoryType")  ; 
    this.getCreditpoints();
    this.getAvgratingCount();
    this.getProfileViewCount();
    this.getmatchedJobCount();
    this.getnetworkCount();
    this.getcategoryreg();
    // this.getTour();
    // this.categoryType = localStorage.getItem("categoryType")  ; 
    if(this.categoryShow){
      this.getcategoryreg();
    }
   this.creditPoints = localStorage.getItem("creditPoints") ;

   if(this.categoryType != ""){
    this.getTour();
   }
  //this.getTour()

  //Profile View Count
  this.getTuesByPort();
  }

  ngAfterViewInit(): void {
    if (this.totalViewCount > 0) {
      HighCharts.chart(this.el.nativeElement.querySelector('#container'), {
        // Highcharts configuration options
        // ...
        chart: {
          type: "column"
        },
        title: {
          text: "No. of views / day"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "No. of Views"
          }
        },
        plotOptions: {
          series: {
            borderWidth: 0 /* ,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
            } */
          }
        },
  
        series: [
          {
            // name: this.barChartList.date,
            name: 'Date',
            colorByPoint: true,
            type: undefined,
          //   data: [ {
          //     name: '20/09/2023',
          //     y: 63.06,
          //     drilldown: '20/09/2023'
          // },
          // {
          //     name: '21/09/2023',
          //     y: 19.84,
          //     drilldown: '21/09/2023'
          // }]
          data:this.barChartList
          }
        ]
        
      });
      this.chartInitialized = true;
    }
  }



  selectedTab: string = 'apps';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }


  getTuesByPort() {
    this.totalViewCount=0;
    var postData = {
      "currentUserId": this.userId
    };
  
    var url = "api/auth/app/VisitingCard/getAnalyticsDetailsWeb";
    this.storageservice.postrequest(url, postData).subscribe(result => {
      this.barChartList = result["vcardAnalyticsDetails"];
      console.log(`barChartList: ${JSON.stringify(this.barChartList)}`);
      
      for (var i = 0; i < this.barChartList.length; i++) {
        this.barChartList[i].name = this.barChartList[i].viewedDate;
        this.barChartList[i].y = this.barChartList[i].viewcount;
        this.barChartList[i].color = this.getRandomColor();
        //this.barChartList[1].name = "hfh";
        this.totalViewCount=this.totalViewCount+this.barChartList[i].viewcount;
      }
      this.barChart();
    },
      err => {
        this.storageservice.warningToast("Network Issue...");
        console.log("Error", err);
      }
    );

    // var organizationCountUrl = "api/auth/app/dashboard/orgCountlist?currentUserId="+this.userId;
    //     this.storageservice.getrequest(organizationCountUrl).subscribe(result => {
    //      console.log(result); 
    //      this.barChartList = result['orgCountlist'];
       
    // this.barChartList[0].name='11/08/2023';
    // this.barChartList[0].x=20;
    // this.barChartList[0].y=30;
    // this.barChartList[0].z=40;
    // this.barChartList[0].color = this.getRandomColor();
  
    //         });

 
      this.barChart();

  }

  barChart() {
    //this.totalViewCount=0;
    if(this.totalViewCount>0){

    
    var myChart = HighCharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "No. of views / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "No. of Views"
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0 /* ,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          } */
        }
      },

      series: [
        {
          // name: this.barChartList.date,
          name: 'Date',
          colorByPoint: true,
          type: undefined,
        //   data: [ {
        //     name: '20/09/2023',
        //     y: 63.06,
        //     drilldown: '20/09/2023'
        // },
        // {
        //     name: '21/09/2023',
        //     y: 19.84,
        //     drilldown: '21/09/2023'
        // }]
        data:this.barChartList
        }
      ]
    });
  }
  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }



  startTour(){

    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#step1', popover: { title: 'Profile Lookup', description: 'You can search and view profiles here.' } },
        { element: '#step2', popover: { title: 'Job Search', description: 'Add your preferences here to get matched with right opportunities.' } },
        { element: '#step3', popover: { title: 'Profile', description: 'Update your professional portfolio over here and get your claims verified.' } },
        { element: '#step4', popover: { title: 'More', description: 'Discover Alumni profiles, manage subscriptions and other settings over here.' } },
      ]
    });
    
    driverObj.drive();
    this.getTourFlagUpdate();
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

      getTour(){

        var getCurrencyURL = "api/auth/app/mobile/getfirstTimeLoginUser?currentUserId=" + this.userId;
        this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
        console.log(result);
        if(result[0].fistTimeloginValue == true){
          this.startTour();
        }
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


          getTourFlagUpdate(){
            var data = {
              "currentUserId":this.userId,
              "fistTimeloginValue":false
 
             }  
            var updateTourFlag = "api/auth/app/mobile/updateFirstTimeLoginMoblie"; 
            this.storageservice.postrequest(updateTourFlag, data).subscribe(result => {  
               console.log("Image upload response: " + result)
              if (result["success"] == true) {
              // this.presentToast()
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