import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, PopoverController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx'

import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';





declare var google;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  @ViewChild('slider', { static: true }) private slider: IonSlides;


  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  //#region Declaration
  loginform: FormGroup;
  global_baseurl: any;
  response: any;
  emailPattern: any;
  selectedIndex: boolean = true;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  googletrans: any;
  empDetailsFrmWelcomePage: any;
  empId: any;
  loaderToShow: any;
  empIdVal: string;
  pwdVal: string;
  //#endregion

  //#region Constructor
  constructor(public formbuilder: FormBuilder, public router: Router, public storageservice: StorageService,
    private http: HttpClient, private route: ActivatedRoute, public loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage, private uniqueDeviceID: UniqueDeviceID,
   private popoverController: PopoverController, private languageService: LanguageService,
    private translate: TranslateService, private platform: Platform) {

      
    if (!this.languageService.selectedLang) {
      this.languageService.setInitialAppLanguage();
    }


    

    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        
      }
  });

    this.loginform = formbuilder.group({
      password: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      empId: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
    });
    console.log("inise");
    this.nativeStorage.getItem('FCMToken')
      .then(
        data => {
          console.log("inside fcm storage", data);
        });


    //#region Call native storage to get existing values
    var IsNativeStorageCalled: boolean = false;

    //#region Load employee id from the welcome page.
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.empDetailsFrmWelcomePage = params;

        if (this.empDetailsFrmWelcomePage != null && this.empDetailsFrmWelcomePage.empId != null) {
          this.empIdVal = this.empDetailsFrmWelcomePage.empId;
          this.pwdVal = "";
        }
        else {
          if (!IsNativeStorageCalled) {
            IsNativeStorageCalled = true;
            this.GetNativeStorageValues();
          }
        }
      }
      else {
        if (!IsNativeStorageCalled) {
          IsNativeStorageCalled = true;
          this.GetNativeStorageValues();
        }
      }
    });
    //#endregion

    if (!IsNativeStorageCalled) {
      IsNativeStorageCalled = true;
      this.GetNativeStorageValues();
    }
    //#endregion

  }
  //#endregion
  public async ionSlideDidChange(): Promise<void> {
    const index = await this.slider.getActiveIndex();

  }

  ngOnInit() {
    this.slider.startAutoplay().then(()=>{})
  }

  signUp(){
    this.router.navigate(['/hello-dear']) 
  }

  //#region Click Events
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  login_click() {


    this.global_baseurl = this.storageservice.getbaseusrl();
    let email_get = this.loginform.controls['empId'].value;
    let password_get = this.loginform.controls['password'].value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    var logInServiceUrl = "/api/mobileApp/mobilelogin";
    var postData = {
      'username': email_get,
      'password': password_get
    }

    this.storageservice.postrequest(logInServiceUrl, postData).subscribe(result => {
      //this.http.post('http://213.42.28.16:8081/parahrms/app/mobileApp/mobilelogin', postData, { 'headers': headers }).subscribe(result => {
      //this.http.post('http://192.168.5.31:8085/parahrms/app/mobileApp/mobilelogin', postData, { 'headers': headers }).subscribe(result => {
      this.response = result;
      console.log(this.response);

      let message = result['message'];
      console.log(message);

      // this.hideLoadingIndicator()

      if (result["success"] == true) {
        // this.hideLoadingIndicator() //Hide loading indicator

        this.storageservice.successToast(message)

        //userDetail
        var data = result["userDetail"];

        //#region To store in local storage
        var userIdStr = data["userId"];

        //localStorage.clear();
        localStorage.setItem('userId', data["userId"]);
        localStorage.setItem('userName', data["username"]);
        localStorage.setItem('email', data["email"]);
        localStorage.setItem('isloggedIn', "true");

        localStorage.setItem('isloggedIn', "true");
        console.log("userName: " + data["username"])
        console.log("userId: " + data["userId"])
        //#endregion

        //#region NativeStorage
        localStorage.setItem('Id', email_get);
        localStorage.setItem('Pwd', password_get);
        var postDataLD = {
          "Id": email_get,
          "Pwd": password_get
        }
        this.nativeStorage.setItem('LoginDetails', postDataLD)
          .then(
            () => {
              console.log(`Storing data: ${JSON.stringify(postDataLD)}`);
              // this.hideLoadingIndicator() //Hide loading indicator
            },
            error => console.error('Error storing item', error)
          );


        let navigationExtras: NavigationExtras = {
          queryParams: {
            IsFromLoginForm: true
          }
        };
        // this.hideLoadingIndicator() //Hide loading indicator

        console.log("CategoryFlag: " + data["categoryflag"])
        if (data != null && data["categoryflag"] && data["userRefFlag"] == "IU") {
          this.router.navigate(['/user-type-chooser'], navigationExtras)
        }
        else {
          //this.router.navigate(['/profile'])
          if (data["userRefFlag"] == "IU") {
            //this.router.navigate(['/profile-individual'])
            this.router.navigate(['/dashboard-individual'])
          }
          else if (data["userRefFlag"] == "OU") {
            // this.router.navigate(['/profile-corporate'])
            this.router.navigate(['/dashboard-corporate'])
          }
          else if (data["userRefFlag"] == "GU") {
            // this.router.navigate(['/profile-institution'])
            this.router.navigate(['/dashboard-institution'])
          }
          else if (data["userRefFlag"] == "GU"){
            this.router.navigate(['yettostart'])
          }
          else {
            this.router.navigate(['/dashboard-individual'])
          }
        }

        //#region Hold for 3 second and save FCMToken & UUID
        console.log("Before hold 3sec");
        this.showLoadingIndicator();
        let hideFooterTimeout = setTimeout(() => {

          console.log("Inside timeout");
          this.hideLoadingIndicator()
          console.log("SaveFCMTokenAndUUID 1");

          var locfcmToken = localStorage.getItem("FCMToken");
          console.log("locfcmToken: " + locfcmToken);
          if (locfcmToken == null) {
        
          }

          // Save UUID

        }, 3000);
        console.log("After hold 3sec");
       

      }
      else {
      

        this.storageservice.warningToast(message)
      }
    },
      error => {
        console.log(`Error data: ${JSON.stringify(error)}`);
        if (error.name == "HttpErrorResponse") {
          this.storageservice.warningToast('Internet connection problem, Pls check your internet.');
          this.storageservice.GeneralAlert('HttpErrorResponse', 'Internet connection problem, Pls check your internet.');
        }
        else {
          this.storageservice.warningToast('Error: ' + error.message);
        }
      },
      () => {

        this.checkLatestMobileAppVersionAndGiveAlert();
        //#endregion
      }

    );

  }

 

  GetNativeStorageValues() {
    console.log("OnInit1");
    var IsNativeStorage: boolean = false;
    this.nativeStorage.getItem('LoginDetails')
      .then(
        data => {
          console.log(`Getting NS data: ${JSON.stringify(data)}`);
          console.log("Before IF");
          if (data["Id"] != null) {
            console.log("Inside IF, Id: " + data["Id"]);
            var employeeIdVal = data["Id"];
            var passwordVal = data["Pwd"];
            IsNativeStorage = true;

            this.ByPassLogin(employeeIdVal, passwordVal); //To login user automatically.
          }
        },
        error => console.error("My item error: " + error)
      );

    var idobj = localStorage.getItem("Id");
    var pwdObj = localStorage.getItem("Pwd");
    if (idobj != null && pwdObj != null && !IsNativeStorage) {
      localStorage.setItem('Id', idobj);
      localStorage.setItem('Pwd', pwdObj);

      this.ByPassLogin(idobj, pwdObj); //To login user automatically.
    }

    console.log("OnInit2");
  }

  ByPassLogin(empIdValue: string, pwdValue: string) {

    // Show Loading indicator
    // this.showLoadingIndicator()

    var logInServiceUrl = "/app/mobileApp/mobilelogin";
    var postData = {
      'username': empIdValue,
      'password': pwdValue,
    }

    this.storageservice.postrequest(logInServiceUrl, postData).subscribe(result => {
      this.response = result;
      console.log(this.response);

      let message = result['message'];
      console.log(message);

      // this.hideLoadingIndicator() //Hide loading indicator

      if (result["success"] == true) {
        // this.hideLoadingIndicator() //Hide loading indicator

        // this.storageservice.successToast(message);

        //userDetail
        var data = result["userDetail"];
        //To store in local storage
        //localStorage.clear();
        localStorage.setItem('userId', data["userId"]);
        localStorage.setItem('userName', data["username"]);
        localStorage.setItem('empId', data["empId"]);
        localStorage.setItem('email', data["email"]);

        localStorage.setItem('userRefFlag', data["userRefFlag"]);


        console.log("userName: " + data["username"])
        console.log("userId: " + data["userId"])
        //End

        //#region NativeStorage
        localStorage.setItem('Id', empIdValue);
        localStorage.setItem('Pwd', pwdValue);
        var postDataLD = {
          "Id": empIdValue,
          "Pwd": pwdValue
        }
        this.nativeStorage.setItem('LoginDetails', postDataLD)
          .then(
            () => {
              console.log(`Storing data: ${JSON.stringify(postDataLD)}`);
              // this.hideLoadingIndicator() //Hide loading indicator
            },
            error => console.error('Error storing item', error)
          );
        //#endregion



        let navigationExtras: NavigationExtras = {
          queryParams: {
            IsFromLoginForm: true
          }
        };
        console.log("CategoryFlag: " + data["categoryflag"])
        if (data != null && data["categoryflag"] && data["userRefFlag"] == "IU") {
          this.router.navigate(['/user-type-chooser'], navigationExtras)
        }
        else {
          if (data["userRefFlag"] == "IU") {
            //this.router.navigate(['/profile-individual'])
            this.router.navigate(['/dashboard-individual'])
          }
          else if (data["userRefFlag"] == "OU") {
            //this.router.navigate(['/profile-corporate'])
            this.router.navigate(['/dashboard-corporate'])
          }
          else if (data["userRefFlag"] == "GU") {
            //this.router.navigate(['/profile-institution'])
            this.router.navigate(['/dashboard-institution'])
          }
          else if (data["userRefFlag"] == "GU"){
            this.router.navigate(['yettostart'])
          }
          else {
            this.router.navigate(['/dashboard-individual'])
          }
        }
      }
      else {
        // this.hideLoadingIndicator() //Hide loading indicator

        this.storageservice.warningToast(message)
      }
    },
     
      () => {

        console.log("dfsdfs");
        this.checkLatestMobileAppVersionAndGiveAlert();
        //#endregion
      }
    );

    // this.hideLoadingIndicator() //Hide loading indicator
  }

  openforgot() {
    //this.router.navigate(['/yettostart'])
    this.router.navigate(['/forget-password'])
  }

  OpenRegistrationForm() {
    this.router.navigate(['/register'])
    //this.router.navigate(['/truck-registration'])
  }

  Get_IsStudentOnly_Details() {
    let empId = localStorage.getItem("empId");
    var empUrl = "/hrms/master/employeeAdminMaster/edit?empId=" + empId;
    var postData = {
      'empid': empId
    }

    console.log("URL: " + empUrl);
    this.storageservice.postrequest(empUrl, postData).subscribe(result => {
      var response = result['category'];
      console.log("Category list: " + response);
      if (response != null) {
        var student = response.isStudent;
        var employed = response.isEmployeed;
        var jobseeker = response.isProfessional;
        var landlord = response.isOrganization;
        var tenant = response.isTenant;
        var domesticHelp = response.isHelp;
        var others = response.isOther;
        var businessOwner = response.isBusinessOrEnt;

        //#region To check "Is only student concept" and store the value in the local.
        if (student && !employed && !jobseeker && !landlord && !tenant && !domesticHelp && !others && !businessOwner) {
          this.storageservice.publishSomeData({ IsStudentOnly: true });
          console.log("IsStudentOnly from login page: true");
        }
        else {
          this.storageservice.publishSomeData({ IsStudentOnly: false });
          console.log("IsStudentOnly from login page: false");
        }
        //#endregion
      }
      else {

      }
    });

  }

//   signUp(){
//     this.router.navigate(['/hello-dear'])
// }
  //#endregion

  //#region Functions
  showLoadingIndicator() {
    this.loadingCtrl.create({
      message: 'Processing...',
      spinner: 'bubbles',
      cssClass: 'loadingIndicatorCustom'
    }).then((loading) => {
      loading.present();
    });
  }
  hideLoadingIndicator() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    });
  }

  checkLatestMobileAppVersionAndGiveAlert() {
    
    var getMobileAppVersionUrl = "/hrms/master/employeeAdminMaster/getLatestMobileAppVersionMob";
    this.storageservice.getrequest(getMobileAppVersionUrl).subscribe(resultVersion => {
      var responseVersion = resultVersion;
      console.log("responseVersion: " + responseVersion);

      let latestMobileAppVersion = resultVersion['latestMobileAppVersion'];
      console.log(latestMobileAppVersion);

      if (latestMobileAppVersion != "2.9.6") {
        this.storageservice.GeneralAlertCustom('Discover new version ' + latestMobileAppVersion, 
        'Latest version ' + latestMobileAppVersion + ' is available in play store now, Would you like to update?',
        'Update now', 'Not now');
      }
    },

      () => {

      });
    //#endregion
  }


  //#endregion  

}
