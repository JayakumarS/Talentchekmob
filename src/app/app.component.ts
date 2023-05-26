import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { timer } from 'rxjs/internal/observable/timer';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userId:any;

loading = false;


  loginstatus: boolean = true;
  status: any;
  IsIndividual: boolean = false;

  IsStudentOnly: boolean = false;

  IsInstitution: boolean = false;

  dashboardLabel: string;
  logoutLabel: string;
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private zone: NgZone,
    public router: Router,
    public storageservice: StorageService,
    public nativeStorage: NativeStorage,
    private translate: TranslateService,
    private deeplinks: Deeplinks,
    private languageService: LanguageService
    //private push: Push
  ) {
    this.initializeApp();
    this.userId = localStorage.getItem("userId")  ; 
    //To get the details from DB

    var empId = localStorage.getItem("empId");
    console.log("EmpId frm Code:" + empId)
    if (empId != null) {
      this.IsIndividual = true;
    }
    //End

    //#region Get the user type from local storage
    var userRefFlagObj = localStorage.getItem("userRefFlag");
    console.log("userRefFlagObj: " + userRefFlagObj)
    if (userRefFlagObj == "IU") {
      this.IsInstitution = false;
    }
    else if (userRefFlagObj == "OU") {
      this.IsInstitution = false;
    }
    else if (userRefFlagObj == "GU") {
      this.IsInstitution = true;
    }
    else {
      this.IsInstitution = false;
    }
    //#endregion

    this.storageservice.getObservable().subscribe((data) => {

      this.loginstatus = data.status_get;
      // alert('Data received'+data.status_get); 

      //Test
      if (data.IsIndividual != null) {
        //alert('Data received'+data.IsIndividual); 
        console.log("IsIndividual frm Code:" + data.IsIndividual)

        this.IsIndividual = data.IsIndividual;
      }

      //#region To get "Is student only" values.
      if (data.IsStudentOnly != null) {
        console.log("IsStudentOnly frm Code:" + data.IsStudentOnly)
        this.IsStudentOnly = data.IsStudentOnly;
      }
      else {
        this.IsStudentOnly = false;
        console.log("IsStudentOnly frm Code: false")
      }
      //#endregion

      if (this.loginstatus) {
        this.loginstatus = true;
        localStorage.setItem('loginstatus', 'true');
        console.log(this.loginstatus);
        // alert(this.loginstatus+'true');	


      }
      else {
        this.loginstatus = false;
        localStorage.setItem('loginstatus', 'false');

        console.log(this.loginstatus);
        //alert(this.loginstatus+'false');	
      }

      //#region Language set
      if (data.selectedLang != null) {
        console.log("selectedLang frm Code:" + data.selectedLang)
        this.TranslateMenuContent(data.selectedLang);
      }
      //#endregion

    });


    let postData = {}


    this.storageservice.postrequest('get-details', postData).subscribe(data => {


      if (data['success'] == true) {

        let user_name = data['data'].name;
        let user_address = data['data'].location;
        localStorage.setItem('user_name', user_name);
        localStorage.setItem('user_address', user_address);


        this.storageservice.publishSomeData({

          status_get: true
        });
      }
    }, err => {
      this.storageservice.publishSomeData({
        status_get: false
      });

    }


    );

  }

  //#region OnInit
  ngOnInit() {
    //Test language
    console.log("OnInit: Test language");
    this.getImgandCreditpoints();
    // if (!this.languageService.selectedLang) {
    //   this.languageService.setInitialAppLanguage();
    // }
    //this.translate.setDefaultLang('tn');
    // this.translate.setDefaultLang(this.languageService.selectedLang);
    // console.log("this.languageService.selectedLang: "+ this.languageService.selectedLang)
    // this.translate.get('Menu.profileUpdate').subscribe( value => {
    //   this.AfterLogin[0].title = value;
    //   console.log("value: " + value)
    //   }
    // );
  }
  //#endregion

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_mobile');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_address');
    localStorage.removeItem('Id');
    localStorage.removeItem('Pwd');
    localStorage.removeItem('userRefFlag');
  
    this.storageservice.publishSomeData({
      status_get: false
    });
  
    localStorage.clear();
  
    this.nativeStorage.clear();
  
    this.router.navigate(['/login']);
  
    if (window && window.caches) {
      caches.keys().then(function (names) {
        for (let name of names)
          caches.delete(name);
      });
    }
  }
  

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.watchLoading();
      this.setupDeepLinks();


      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');

      // get FCM token
      timer(3000).subscribe(()=>this.showSplash=false);
      });

      // ionic push notification example


      // refresh the FCM token
      // this.fcm.onTokenRefresh().subscribe(token => {
      //   console.log(token);
      // });

      // unsubscribe from a topic
      // this.fcm.unsubscribeFromTopic('offers');





    // unsubscribe from a topic
    // this.fcm.unsubscribeFromTopic('offers');

    // to check if we have permission
    // this.push.hasPermission()
    // .then((res: any) => {

    //   if (res.isEnabled) {
    //     console.log('We have permission to send push notifications');
    //   } else {
    //     console.log('We do not have permission to send push notifications');
    //   }

    // });

    // // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    // this.push.createChannel({
    // id: "testchannel1",
    // description: "My first test channel",
    // // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    // importance: 3,
    // //badge is used to if badge appears on the app icon see https://developer.android.com/reference/android/app/NotificationChannel.html#setShowBadge(boolean).
    // //false = no badge on app icon.
    // //true = badge on app icon
    // badge: false
    // }).then(() => console.log('Channel created'));

    // // Delete a channel (Android O and above)
    // this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // // Return a list of currently configured channels
    // this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // // to initialize push notifications

    // const options: PushOptions = {
    //  android: {},
    //  ios: {
    //      alert: 'true',
    //      badge: true,
    //      sound: 'false'
    //  },
    //  windows: {},
    //  browser: {
    //      pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //  }
    // }

    // const pushObject: PushObject = this.push.init(options);


    // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));


    // this.fcm.subscribeToTopic('marketing');

    // this.fcm.getToken().then(token => {

    //  alert(token);
    //  localStorage.setItem('fcm',token);
    //  console.log("fcm getToken: " + token);

    // });

    // this.fcm.onNotification().subscribe(data => {
    //   console.log(data);
    //   if(data.wasTapped){
    // 	console.log("Received in background");
    //   this.router.navigate([data.landing_page, data.price]);
    //   } else {
    // 	console.log("Received in foreground");
    //   this.router.navigate([data.landing_page, data.price]);
    //   };
    // });

    // this.fcm.onTokenRefresh().subscribe(token => {

    // 	 localStorage.setItem('fcm',token);
    // 	 alert(token);
    //    console.log("refresh fcm: " + token);

    // });

    // this.fcm.unsubscribeFromTopic('marketing'); 
  }

  getImgandCreditpoints(){

    var ImgUrl = "api/auth/app/fileUpload/getImgfile?talentId="+this.userId;

    this.storageservice.getrequest(ImgUrl).subscribe(result => {
      if (result["success"] == true) {
       console.log(result);
       localStorage.setItem('creditPoints', result["creditpoints"]);
       localStorage.setItem('profilePic', result["imageUrl"]);
       }
    });

}

setupDeepLinks() {
  this.deeplinks.route({
    '/:param1': 'profile-vcard',
  }).subscribe(match => {
    // match.$route - the route we matched, which is the matched entry from the arguments to route()
    // match.$args - the args passed in the link
    // match.$link - the full link data  
   // this.router.navigate(['/profile-vcard/:param1']);
    console.log('Successfully matched route', match.$args);
    console.log('Successfully matched route', match.$link);
    console.log('Successfully matched route', match.$route);

    const internalPath = `/${match.$route}/${match.$args['param1']}`;


     // Run the navigation in the Angular zone
     this.zone.run(() => {
      this.router.navigateByUrl(internalPath);
    });
    
    // You can then navigate to the desired page based on the matched route and arguments
  }, nomatch => {
    // nomatch.$link - the full link data
    console.error('Got a deeplink that didn\'t match', nomatch.$link);
  });
}


watchLoading(){

  this.storageservice.watchLoading().subscribe(loading => {
    this.loading = loading;
  })
}

  goto_Dashboard() {
    var userRefFlag = localStorage.getItem("userRefFlag");
    console.log("userRefFlag: " + userRefFlag)
    if (userRefFlag == "IU") {
      this.router.navigate(['/dashboard-individual'])
    }
    else if (userRefFlag == "OU") {
      this.router.navigate(['/dashboard-corporate'])
    }
    else if (userRefFlag == "GU") {
      this.router.navigate(['/dashboard-institution'])
    }
  }

  TranslateMenuContent(selectedLang: string) {
    this.translate.setDefaultLang(selectedLang);
    console.log("TranslateMenuContent selectedLang: " + selectedLang)

    this.translate.get('Menu.dashboard').subscribe(value => {
      this.dashboardLabel = value;
      console.log("dashboardLabel: " + value)
    });
    this.translate.get('Menu.logout').subscribe(value => {
      this.logoutLabel = value;
      console.log("logoutLabel: " + value)
    });

 
  }
}

/* if (this.platform.is("cordova"))
   {  
 
 } 

 //this.Checknetwork();
this.network_connection();
} */
/*  network_connection() {
    console.log("first")
    this.network.onDisconnect().subscribe(async () => {      
      console.log('network was disconnected :-(');
      const toast = await this.toastController.create({
        message: 'Please check Your Internet Connection',
        duration: 5000
      });
      toast.present();
    
     
       const modal = await this.modal.create({
        component: NetworkPage,
      });
      modal.onDidDismiss().then(() => {
       })
      await modal.present();
    });
  }  */


/* initializeApp() {} */



/*  this.fcm.subscribeToTopic('marketing');

this.fcm.getToken().then(token => {
	
 alert(token);
localStorage.setItem('fcm',token);
});

this.fcm.onNotification().subscribe(data => {
if(data.wasTapped){
console.log("Received in background");
} else {
console.log("Received in foreground");
};
});

this.fcm.onTokenRefresh().subscribe(token => {
	
 localStorage.setItem('fcm',token);
 alert(token);
});

this.fcm.unsubscribeFromTopic('marketing');  */










/*  let postData={}
this.storageservice.AddPageRecord('logoutApi',postData).subscribe(data=>{
  if(JSON.parse(data['_body']).success==true)
     {
   localStorage.removeItem('token');
   localStorage.removeItem('user_name');
   localStorage.removeItem('user_mobile');
   localStorage.removeItem('user_email');
   localStorage.removeItem('user_address');
	
        this.storageservice.publishSomeData({
        status_get: false
       });
      localStorage.clear();
       this.router.navigate(['/login']);
 }
 }); */
/*  logOut(){
   
  var apiUrl = environment.baseurl+'logoutApi';
   var user_token = localStorage.getItem("token");
  let postData={}
  const options = {
      headers: {
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + user_token
      }
  };
   console.log(user_token);
   console.log(options);
   this.http.post(apiUrl,postData,options)
   

     .subscribe(data => {
   
       if(data['success']==true)
   {

    localStorage.removeItem('token');
     localStorage.removeItem('user_name');
     localStorage.removeItem('user_mobile');
     localStorage.removeItem('user_email');
     localStorage.removeItem('user_address');
   	
   this.storageservice.publishSomeData({
    
         status_get: false
       });
    localStorage.clear();
   this.router.navigate(['/login']);
       }
     
   });
 
    
 	
 } */
/*****************hardwar backbtn*********************/
/* backButtonEvent() {
this.platform.backButton.subscribeWithPriority(0, () => {
  if (this.routerOutlet && this.routerOutlet.canGoBack()) {
	
    this.routerOutlet.pop();
  } 
else if (this.router.url === '/DashboardPage') {
	
    this.platform.exitApp(); 

    // or if that doesn't work, try
    navigator['app'].exitApp();
  } 
else {
    this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
  }
});
} */
/*backButtonEvent() {
	
 this.platform.backButton.subscribeWithPriority(0, () => {
     alert('ddd');
  this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
    if (this.router.url != 'DashboardPage') {
      await this.router.navigate(['/tabs/tab1']);
	
    } 
  else if (this.router.url === ForumPage) {
    this.nav.navigateRoot('/DashboardPage');
   
      if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
        this.lastTimeBackPress = new Date().getTime();
        this.presentAlertConfirm();
      } else {
        navigator['app'].exitApp();
      }
    }
  });
});
}

async presentAlertConfirm() {
const alert = await this.alertCtrl.create({
  // header: 'Confirm!',
  message: 'Are you sure you want to exit the app?',
  buttons: [{
    text: 'Cancel',
    role: 'cancel',
    cssClass: 'secondary',
    handler: (blah) => {}
  }, {
    text: 'Close App',
    handler: () => {
      navigator['app'].exitApp();
    }
  }]
});

await alert.present();
 
 }*/

