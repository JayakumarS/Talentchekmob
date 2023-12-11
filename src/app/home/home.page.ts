import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import  {driver}  from "driver.js";
import "driver.js/dist/driver.css";
import * as HighCharts from "highcharts";
import { PopoverController } from '@ionic/angular';
import { SearchPopupPage } from '../search-popup/search-popup.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,AfterViewInit {
  langSelected: string;
  selectedLang: string;
  totalViewCount: any;
  totalContactCount: any;
  sharedContactCount: any;
  chartInitialized: boolean;
  countAvailable: boolean = false;
  filterEnabled: boolean = false;
  initialCount: any =0;
  isFilterChose: boolean = false;
  isChecked: boolean=true;
  shareChecked: boolean =  true;
  totalViewCountFlag: boolean =  false;
  totalContactCountFlag: boolean =  false;
  sharedContactCountFlag: boolean =  false;


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
  barChartList2: any;
  barChartList3: any;
  fromDateValue:any;
  toDateValue:any;
  fromDateValue2:any;
  toDateValue2:any;
 

  constructor(public router:Router,public storageservice: StorageService,
    private languageService: LanguageService,private translate: TranslateService,private el: ElementRef,private popoverController: PopoverController) {
    

   }

  ngOnInit() {
    this.userId = localStorage.getItem("userId")  ;
   // this.langSelected=localStorage.getItem("selLanguage") ;
   // this.translate.setDefaultLang(this.langSelected);


   const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };
   const currentDate = new Date();
   var fromDate = new Date(currentDate.getFullYear(), 0, 1);
   var toDate = new Date(currentDate);
   this.fromDateValue2=formatDate(fromDate);
   this.toDateValue2=formatDate(toDate);

 

  var postData2 = {
    "currentUserId": this.userId,
    "fromDate":this.fromDateValue2,
    "todate":this.toDateValue2
  };


  var url2 = "api/auth/app/VisitingCard/getAnalyticsDetailsWeb";
  this.storageservice.postrequest(url2, postData2).subscribe(result => {
    var datas = result["vcardAnalyticsDetails"];
     this.initialCount=datas.length;
 
  },
    err => {
      this.storageservice.warningToast("Network Issue...");
      console.log("Error", err);
    }
  );


  this.languageService.setFilterValues("This year");
  this.selectDate("This year");

  var postData = {
    "currentUserId": this.userId,
    "fromDate":this.fromDateValue,
    "todate":this.toDateValue
  };

   var url = "api/auth/app/VisitingCard/getAnalyticsDetailsWeb";
    this.storageservice.postrequest(url, postData).subscribe(result => {
      this.barChartList = result["vcardAnalyticsDetails"];
      this.barChartList2 = result["vcardAnalyticsDetails"];
      this.barChartList3 = result["vcardAnalyticsDetails"];
      if(this.barChartList.length>0){
        this.countAvailable=true;
        this.getTuesByPort();
      } else {
        this.countAvailable=false;
      }
    },
      err => {
        this.storageservice.warningToast("Network Issue...");
        console.log("Error", err);
      }
    );
   
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
 // this.getTuesByPort();
  }

  ngAfterViewInit(): void {
    if (this.countAvailable) {
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


      HighCharts.chart(this.el.nativeElement.querySelector('#container2'), {
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
          data:this.barChartList2
          }
        ]
        
      });

      HighCharts.chart(this.el.nativeElement.querySelector('#container3'), {
        // Highcharts configuration options
        // ...
        chart: {
          type: "column"
        },
        title: {
          text: "No. of shares / day"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "No. of shares"
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
          data:this.barChartList3
          }
        ]
        
      });

      this.chartInitialized = true;
    }
  }

  listPage(){
    if(this.sharedContactCount!=null && this.sharedContactCount!=undefined &&
      this.sharedContactCount!=''){
        this.sharedContactCount=Number(this.sharedContactCount);
    } else {
      this.sharedContactCount=0;
    }
    // if(this.sharedContactCount>0){
    //   this.router.navigate(['/shared-contact']);
    // }

    this.router.navigate(['/shared-contact']);

  }



  selectedTab: string = 'apps';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  selectDate(range:any){
  const currentDate = new Date();
  let fromDate: Date;
  let toDate: Date;

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

  if (range === 'Today') {
    fromDate = new Date(currentDate);
    toDate = new Date(currentDate);
  } else if (range === 'This week') {
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week
    fromDate = firstDayOfWeek;
    toDate = new Date(currentDate);
  } else if (range === 'This month') {
    fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    toDate = new Date(currentDate);
  } else if (range === 'This year') {
    fromDate = new Date(currentDate.getFullYear(), 0, 1);
    toDate = new Date(currentDate);
  } else if (range === 'All') {
    // Set fromDate to the earliest date possible
    fromDate = new Date(0);
    toDate = new Date(currentDate);
  }
  this.fromDateValue=formatDate(fromDate);
  this.toDateValue=formatDate(toDate);
  this.isChecked = true;
  this.shareChecked = true;
  this.getTuesByPort();
  }


  getTuesByPort() {
    this.totalViewCount=0;
    this.totalContactCount=0;
    this.sharedContactCount=0;
    this.totalViewCountFlag=false;
    this.totalContactCountFlag=false;
    this.sharedContactCountFlag=false;
    var postData = {
      "currentUserId": this.userId,
      "fromDate":this.fromDateValue,
      "todate":this.toDateValue
    };
  
    var url = "api/auth/app/VisitingCard/getAnalyticsDetailsWeb";
    this.storageservice.postrequest(url, postData).subscribe(result => {
      this.barChartList = result["vcardAnalyticsDetails"];
      this.barChartList2 = result["vcardAnalyticsDetails"];
      this.barChartList3 = result["vcardAnalyticsDetails"];
      console.log(`barChartList: ${JSON.stringify(this.barChartList)}`);

      for (var i = 0; i < this.barChartList.length; i++) {
        this.barChartList[i].name = this.barChartList[i].viewedDate;
        this.barChartList[i].y = this.barChartList[i].viewcount;
        this.barChartList[i].color = this.getRandomColor();

        this.totalViewCount=this.totalViewCount+this.barChartList[i].viewcount;
        // if(this.barChartList2[i].saveContactCount!=null && this.barChartList2[i].saveContactCount!=undefined &&
        //   this.barChartList2[i].saveContactCount!=''){
        //     this.totalContactCount=this.totalContactCount+Number(this.barChartList2[i].saveContactCount);
        // } else {
        //   this.totalContactCount=this.totalContactCount;
        // }
      }
      setTimeout(() => {
        if(this.totalViewCount == 0){
          this.totalViewCountFlag=true;
        } else {
          this.totalViewCountFlag=false;
        }
      }, 500);


// For chart2

  if(this.isChecked){
  for (var i = 0; i < this.barChartList2.length; i++) {
    this.isChecked = false;
    this.barChartList2[i].name = this.barChartList2[i].viewedDate;
    if(this.barChartList2[i].saveContactCount!=null && this.barChartList2[i].saveContactCount!=undefined &&
      this.barChartList2[i].saveContactCount!=''){
        this.barChartList2[i].y = parseInt(this.barChartList2[i].saveContactCount);
    } else {
      this.barChartList2[i].y = 0;
    }
   // this.barChartList2[i].y = this.barChartList2[i].viewcount;
    this.barChartList2[i].color = this.getRandomColor();

    if(this.barChartList2[i].saveContactCount!=null && this.barChartList2[i].saveContactCount!=undefined &&
      this.barChartList2[i].saveContactCount!=''){
        this.totalContactCount=this.totalContactCount+Number(this.barChartList2[i].saveContactCount);
        console.log(this.totalContactCount);
    } else {
      this.totalContactCount=this.totalContactCount;
    }
  }
  setTimeout(() => {
    if(this.totalContactCount == 0){
      this.totalContactCountFlag=true;
    } else {
      this.totalContactCountFlag=false;
    }
  }, 500);
}
 // this.barChart();


//


// For chart3

  if(this.shareChecked){
  for (var i = 0; i < this.barChartList3.length; i++) {
    this.shareChecked = false;
    this.barChartList3[i].name = this.barChartList3[i].viewedDate;
    if(this.barChartList3[i].sharedContactCount!=null && this.barChartList3[i].sharedContactCount!=undefined &&
      this.barChartList3[i].sharedContactCount!=''){
        this.barChartList3[i].y = parseInt(this.barChartList3[i].sharedContactCount);
    } else {
      this.barChartList3[i].y = 0;
    }
   // this.barChartList2[i].y = this.barChartList2[i].viewcount;
    this.barChartList3[i].color = this.getRandomColor();

    if(this.barChartList3[i].sharedContactCount!=null && this.barChartList3[i].sharedContactCount!=undefined &&
      this.barChartList3[i].sharedContactCount!=''){
        this.sharedContactCount=this.sharedContactCount+Number(this.barChartList3[i].sharedContactCount);
    } else {
      this.sharedContactCount=this.sharedContactCount;
    }
  }
   setTimeout(() => {
    if(this.sharedContactCount == 0){
      this.sharedContactCountFlag=true;
    } else {
      this.sharedContactCountFlag=false;
    }
  }, 500);
 // this.barChart();
}

//


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

  navi(){
    this.router.navigate(['/profile-vcard/qE2PH1v9jR%2B9ePtNewMsfA%3D%3D']);
  }

  barChart() {
    //this.totalViewCount=0;
    // if(this.totalViewCount>0){
      if(this.initialCount>0){

    
    var myChart = HighCharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Views / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Views"
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

    var myChart2 = HighCharts.chart("container2", {
      chart: {
        type: "column"
      },
      title: {
        text: "Saves / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Saves"
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
        data:this.barChartList2
        }
      ]
    });

    var myChart3 = HighCharts.chart("container3", {
      chart: {
        type: "column"
      },
      title: {
        text: "Shares / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Shares"
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
        data:this.barChartList3
        }
      ]
    });

  } else if(this.isFilterChose) {
    var myChart = HighCharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Views / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Views"
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
        data:[]
        }
      ]
    });

    var myChart2 = HighCharts.chart("container2", {
      chart: {
        type: "column"
      },
      title: {
        text: "Saves / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Saves"
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
        data:[]
        }
      ]
    });

    var myChart3 = HighCharts.chart("container3", {
      chart: {
        type: "column"
      },
      title: {
        text: "Shares / day"
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Shares"
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
        data:[]
        }
      ]
    });
  }
  }

  async openPopOver($event) {
    this.isFilterChose=true;
    const popover = await this.popoverController.create({
      component: SearchPopupPage,
      event: $event
    });
    // Listen for the dismissal of the popover
  popover.onDidDismiss().then((data) => {
    // data will contain information about the dismissal, if needed
    // Now you can call selectDate after the popup is closed
    this.selectDate(this.languageService.selectedFilter);
  });
    await popover.present();
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