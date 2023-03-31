import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { timer } from 'rxjs/internal/observable/timer';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  /* 	public BeforeLogin = [
      
      {
        title: 'Login',
        url: '/login',
        icon: 'person-circle-outline'
      },
     {
        title: 'Register',
        url: '/signup',
        icon: 'people-circle-outline'
      },
            
      
    ]; */
  public AfterLogin = [
    {
      title: 'Profile update',
      icon: 'person-outline',
      children: [{ title: 'Profile', url: '/profile-individual' },
      { title: 'Personal information', url: '/personal-info' },
      { title: 'Contact info', url: '/contact-info' },
      { title: 'Academic info', url: '/academic-information' },
      { title: 'Trainings and certifications', url: '/certifications' },
      { title: 'Category', url: '/user-type-chooser' },
      { title: 'Professional experience', url: '/professional-experience' },
      { title: 'Special skills / talents', url: '/skills' },
      { title: 'Family', url: '/family-information' },
      { title: 'Refer a friend & earn credits', url: '/refer-a-friend' },
      { title: 'Subscription', url: '/subscription-individual' },
      { title: 'Delete my account', url: '/delete-my-account' }
      ]
    },
    {
      title: 'Job search',
      url: '/job-search-individual-list',
      icon: 'search'
    },
    {
      title: 'Profile search',
      url: '/profile-search',
      icon: 'search'
    },
    // {
    //   title: 'Services',
    //   icon: 'server-outline',
    //   children: [{ title: 'Reference', url: '/yettostart-frommenu' },
    //   { title: 'Career plan', url: '/yettostart-frommenu' },
    //   { title: 'Mentoring', url: '/yettostart-frommenu' },
    //   { title: 'Alumni connect', url: '/yettostart-frommenu' },
    //   { title: 'Domestic', url: '/yettostart-frommenu' },
    //   { title: 'Quiz / Poll', url: '/yettostart-frommenu' },
    //   { title: 'Training', url: '/yettostart-frommenu' }]
    // },
    {
      title: 'Services',
      icon: 'server-outline',
      children: [
        { title: 'Seeking service', url: '/seeking-services' }
      ]
    },
    {
      title: 'Credits',
      icon: 'basket-outline',
      children: [
        // { title: 'Manage credits - Buy / Park', url: '/yettostart-frommenu' },
        { title: 'Transfer credits', url: '/credit-transfer' },
        { title: 'Credit report', url: '/credit-report' }]
    },
    {
      title: 'Alumni',
      icon: 'school-outline',
      children: [{ title: 'Alumni details', url: '/alumni-details' }]
    },
    {
      title: 'DMS',
      icon: 'layers-outline',
      children: [
        { title: 'Knowledge bank', url: '/km-portal' }]
    },
    {
      title: 'Support',
      icon: 'headset-outline',
      children: [
        { title: 'Help desk', url: '/support-list' }]
    }
    // {
    //   title: 'Support',
    //   icon: 'headset-outline',
    //   children: [
    //   { title: 'IT support', url: '' },
    //   { title: 'Dispute', url: '/dispute' }]
    // }
    // {
    //   title: 'Features',
    //   icon: 'logo-buffer',
    //   children: [{ title: 'Events', url: '/yettostart-frommenu' },
    //   { title: 'Alumni', url: '/yettostart-frommenu' },
    //   { title: 'Seek a mentor', url: '/yettostart-frommenu' },
    //   { title: 'Contribute/Giving back', url: '/yettostart-frommenu' }]
    // },
    // {
    //   title: 'Messages',    
    //   //url: '/launages',
    //   url: '/yettostart-frommenu',
    //   icon: 'mail-open-outline'
    // },
    // {
    //   title: 'Calendar',    
    //   //url: '/services',
    //   url: '/yettostart-frommenu',
    //   icon: 'calendar-outline'
    // },
    // {
    //   title: 'Notifications',    
    //   //url: '/yettostart',
    //   url: '/yettostart-frommenu',
    //   icon: 'notifications-outline'
    // }
  ];

  public AfterLoginCorporate = [
    {
      title: 'My profile',
      icon: 'person-outline',
      children: [
        { title: 'Profile', url: '/profile-corporate' },
        { title: 'Person in charge', url: '/person-in-charge' },
        { title: 'Bank details', url: '/org-bank-details' },
        { title: 'Configuration', url: '/add-org-configuration' },
        { title: 'Generate referral code', url: '/add-org-referralcode' },
        { title: 'Subscription', url: '/subscription-insorg' },
        { title: 'Delete my account', url: '/delete-my-account' }
      ]
    },
    {
      title: 'Job post',
      url: '/job-post-organization-list',
      icon: 'paper-plane-outline'
    },
    {
      title: 'Profile search',
      url: '/profile-search',
      icon: 'search'
    },
    {
      title: 'Services',
      icon: 'server-outline',
      children: [
        { title: 'Seeking service', url: '/seeking-services' }
      ]
    },
    {
      title: 'Credits',
      icon: 'basket-outline',
      children: [
        //{ title: 'Manage credits - Buy / Park', url: '/yettostart-frommenu' },
        { title: 'Transfer credits', url: '/credit-transfer' },
        { title: 'Credit report', url: '/credit-report' }]
    },
    {
      title: 'Alumni',
      icon: 'school-outline',
      children: [{ title: 'Alumni details', url: '/alumni-details' }]
    },
    {
      title: 'DMS',
      icon: 'layers-outline',
      children: [
        { title: 'Knowledge bank', url: '/km-portal' }]
    },
    {
      title: 'Support',
      icon: 'headset-outline',
      children: [
        { title: 'Help desk', url: '/support-list' }]
    }
  ];

  public AfterLoginInstitution = [
    {
      title: 'My profile',
      icon: 'person-outline',
      children: [
        { title: 'Profile', url: '/profile-institution' },
        { title: 'Person in charge', url: '/person-in-charge' },
        { title: 'Courses', url: '/course-list' },
        { title: 'Generate referral code', url: '/add-org-referralcode' },
        { title: 'Subscription', url: '/subscription-insorg' },
        { title: 'Delete my account', url: '/delete-my-account' }
      ]
    },
    {
      title: 'Job post',
      url: '/job-post-organization-list',
      icon: 'paper-plane-outline'
    },
    {
      title: 'Profile search',
      url: '/profile-search',
      icon: 'search'
    },
    {
      title: 'Services',
      icon: 'server-outline',
      children: [
        { title: 'Seeking service', url: '/seeking-services' }
      ]
    },
    {
      title: 'Credits',
      icon: 'basket-outline',
      children: [
        { title: 'Transfer credits', url: '/credit-transfer' },
        { title: 'Credit report', url: '/credit-report' }]
    },
    {
      title: 'Alumni',
      icon: 'school-outline',
      children: [{ title: 'Alumni details', url: '/alumni-details' }]
    },
    {
      title: 'DMS',
      icon: 'layers-outline',
      children: [
        { title: 'Knowledge bank', url: '/km-portal' }]
    },
    {
      title: 'Support',
      icon: 'headset-outline',
      children: [
        { title: 'Help desk', url: '/support-list' }]
    }
  ];

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
    public router: Router,
    public storageservice: StorageService,
    public nativeStorage: NativeStorage,
    private translate: TranslateService,
    private languageService: LanguageService
    //private push: Push
  ) {
    this.initializeApp();

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
    console.log("OnInit: Test language")
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
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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

    if (this.IsIndividual) {

      //#region Profile update
      this.translate.get('Menu.profileUpdate').subscribe(value => {
        this.AfterLogin[0].title = value;
      });
      this.translate.get('Menu.profile').subscribe(value => {
        this.AfterLogin[0].children[0].title = value;
      });
      this.translate.get('Menu.personalInformation').subscribe(value => {
        this.AfterLogin[0].children[1].title = value;
      });
      this.translate.get('Menu.contactInfo').subscribe(value => {
        this.AfterLogin[0].children[2].title = value;
      });
      this.translate.get('Menu.academicInfo').subscribe(value => {
        this.AfterLogin[0].children[3].title = value;
      });
      this.translate.get('Menu.trainingsAndCertifications').subscribe(value => {
        this.AfterLogin[0].children[4].title = value;
      });
      this.translate.get('Menu.category').subscribe(value => {
        this.AfterLogin[0].children[5].title = value;
      });
      this.translate.get('Menu.professionalExperience').subscribe(value => {
        this.AfterLogin[0].children[6].title = value;
      });
      this.translate.get('Menu.specialSkillsTalents').subscribe(value => {
        this.AfterLogin[0].children[7].title = value;
      });
      this.translate.get('Menu.family').subscribe(value => {
        this.AfterLogin[0].children[8].title = value;
      });
      this.translate.get('Menu.referAFriend').subscribe(value => {
        this.AfterLogin[0].children[9].title = value;
      });
      this.translate.get('Menu.subscription').subscribe(value => {
        this.AfterLogin[0].children[10].title = value;
      });
      this.translate.get('DeleteMyAccount.deleteMyAcc').subscribe(value => {
        this.AfterLogin[0].children[11].title = value;
      });
      //#endregion

      //#region Others
      //Job search
      this.translate.get('Menu.jobSearch').subscribe(value => {
        this.AfterLogin[1].title = value;
      });

      //Profile search
      this.translate.get('Menu.profileSearch').subscribe(value => {
        this.AfterLogin[2].title = value;
      });

      //Services
      this.translate.get('Menu.services').subscribe(value => {
        this.AfterLogin[3].title = value;
      });
      this.translate.get('Menu.seekingService').subscribe(value => {
        this.AfterLogin[3].children[0].title = value;
      });

      //Credits
      this.translate.get('Menu.credits').subscribe(value => {
        this.AfterLogin[4].title = value;
      });
      this.translate.get('Menu.transCredits').subscribe(value => {
        this.AfterLogin[4].children[0].title = value;
      });
      this.translate.get('Menu.creditReport').subscribe(value => {
        this.AfterLogin[4].children[1].title = value;
      });

      //Alumni
      this.translate.get('Menu.alumni').subscribe(value => {
        this.AfterLogin[5].title = value;
      });
      this.translate.get('Menu.alumniDetails').subscribe(value => {
        this.AfterLogin[5].children[0].title = value;
      });

      //DMS
      this.translate.get('Menu.dms').subscribe(value => {
        this.AfterLogin[6].title = value;
      });
      this.translate.get('Menu.knowBank').subscribe(value => {
        this.AfterLogin[6].children[0].title = value;
      });

      //Support
      this.translate.get('Menu.support').subscribe(value => {
        this.AfterLogin[7].title = value;
      });
      this.translate.get('Menu.helpDesk').subscribe(value => {
        this.AfterLogin[7].children[0].title = value;
      });
      //#endregion
    }
    else if (this.IsInstitution) {

      //#region My profile
      this.translate.get('Menu.myProfile').subscribe(value => {
        this.AfterLoginInstitution[0].title = value;
      });

      this.translate.get('Menu.profile').subscribe(value => {
        this.AfterLoginInstitution[0].children[0].title = value;
      });
      this.translate.get('Menu.personIncharge').subscribe(value => {
        this.AfterLoginInstitution[0].children[1].title = value;
      });
      this.translate.get('Menu.courses').subscribe(value => {
        this.AfterLoginInstitution[0].children[2].title = value;
      });
      this.translate.get('Menu.genRefCode').subscribe(value => {
        this.AfterLoginInstitution[0].children[3].title = value;
      });
      this.translate.get('Menu.subscription').subscribe(value => {
        this.AfterLoginInstitution[0].children[4].title = value;
      });
      this.translate.get('DeleteMyAccount.deleteMyAcc').subscribe(value => {
        this.AfterLoginInstitution[0].children[5].title = value;
      });
      //#endregion

      //Job search
      this.translate.get('Menu.jobSearch').subscribe(value => {
        this.AfterLoginInstitution[1].title = value;
      });

      //Profile search
      this.translate.get('Menu.profileSearch').subscribe(value => {
        this.AfterLoginInstitution[2].title = value;
      });

      //Services
      this.translate.get('Menu.services').subscribe(value => {
        this.AfterLoginInstitution[3].title = value;
      });
      this.translate.get('Menu.seekingService').subscribe(value => {
        this.AfterLoginInstitution[3].children[0].title = value;
      });

      //Credits
      this.translate.get('Menu.credits').subscribe(value => {
        this.AfterLoginInstitution[4].title = value;
      });
      this.translate.get('Menu.transCredits').subscribe(value => {
        this.AfterLoginInstitution[4].children[0].title = value;
      });
      this.translate.get('Menu.creditReport').subscribe(value => {
        this.AfterLoginInstitution[4].children[1].title = value;
      });

      //Alumni
      this.translate.get('Menu.alumni').subscribe(value => {
        this.AfterLoginInstitution[5].title = value;
      });
      this.translate.get('Menu.alumniDetails').subscribe(value => {
        this.AfterLoginInstitution[5].children[0].title = value;
      });

      //DMS
      this.translate.get('Menu.dms').subscribe(value => {
        this.AfterLoginInstitution[6].title = value;
      });
      this.translate.get('Menu.knowBank').subscribe(value => {
        this.AfterLoginInstitution[6].children[0].title = value;
      });

      //Support
      this.translate.get('Menu.support').subscribe(value => {
        this.AfterLoginInstitution[7].title = value;
      });
      this.translate.get('Menu.helpDesk').subscribe(value => {
        this.AfterLoginInstitution[7].children[0].title = value;
      });

    }
    else {

      //#region My profile
      this.translate.get('Menu.myProfile').subscribe(value => {
        this.AfterLoginCorporate[0].title = value;
      });

      this.translate.get('Menu.profile').subscribe(value => {
        this.AfterLoginCorporate[0].children[0].title = value;
      });
      this.translate.get('Menu.personIncharge').subscribe(value => {
        this.AfterLoginCorporate[0].children[1].title = value;
      });
      this.translate.get('Menu.bankDetails').subscribe(value => {
        this.AfterLoginCorporate[0].children[2].title = value;
      });
      this.translate.get('Menu.configuration').subscribe(value => {
        this.AfterLoginCorporate[0].children[3].title = value;
      });
      this.translate.get('Menu.genRefCode').subscribe(value => {
        this.AfterLoginCorporate[0].children[4].title = value;
      });
      this.translate.get('Menu.subscription').subscribe(value => {
        this.AfterLoginCorporate[0].children[5].title = value;
      });
      this.translate.get('DeleteMyAccount.deleteMyAcc').subscribe(value => {
        this.AfterLoginCorporate[0].children[6].title = value;
      });
      //#endregion

      //Job search
      this.translate.get('Menu.jobSearch').subscribe(value => {
        this.AfterLoginCorporate[1].title = value;
      });

      //Profile search
      this.translate.get('Menu.profileSearch').subscribe(value => {
        this.AfterLoginCorporate[2].title = value;
      });

      //Services
      this.translate.get('Menu.services').subscribe(value => {
        this.AfterLoginCorporate[3].title = value;
      });
      this.translate.get('Menu.seekingService').subscribe(value => {
        this.AfterLoginCorporate[3].children[0].title = value;
      });

      //Credits
      this.translate.get('Menu.credits').subscribe(value => {
        this.AfterLoginCorporate[4].title = value;
      });
      this.translate.get('Menu.transCredits').subscribe(value => {
        this.AfterLoginCorporate[4].children[0].title = value;
      });
      this.translate.get('Menu.creditReport').subscribe(value => {
        this.AfterLoginCorporate[4].children[1].title = value;
      });

      //Alumni
      this.translate.get('Menu.alumni').subscribe(value => {
        this.AfterLoginCorporate[5].title = value;
      });
      this.translate.get('Menu.alumniDetails').subscribe(value => {
        this.AfterLoginCorporate[5].children[0].title = value;
      });

      //DMS
      this.translate.get('Menu.dms').subscribe(value => {
        this.AfterLoginCorporate[6].title = value;
      });
      this.translate.get('Menu.knowBank').subscribe(value => {
        this.AfterLoginCorporate[6].children[0].title = value;
      });

      //Support
      this.translate.get('Menu.support').subscribe(value => {
        this.AfterLoginCorporate[7].title = value;
      });
      this.translate.get('Menu.helpDesk').subscribe(value => {
        this.AfterLoginCorporate[7].children[0].title = value;
      });

    }
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

