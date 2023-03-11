import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { exit } from 'process';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-academic-information',
  templateUrl: './add-academic-information.page.html',
  styleUrls: ['./add-academic-information.page.scss'],
})
export class AddAcademicInformationPage implements OnInit {

  //#region Declaration
  userId: string;
  userName: string;
  creditPoints: any;
  empId: string;
  public cardCount: any;

  talentform: FormGroup;
  isSubmitted = false;
  response: any;
  datePipe: DatePipe;

  empEduId: number;
  IsEditMode = false;
  IsFromProfilePage = false;

  qualificationVal: string;
  percentageVal: string;
  specializationVal: string;
  institutionVal: string;
  yearOfPassingVal: string;
  institutionName: string;

  insListResponse: any;
  rollNoVal: string;
  currentStudentVal: string;
  yearClassGradeVal: string;

  IsSearchListShow: boolean = false;
  public InsList: any;
  public InsListBackup: any;
  splCharRegex: string = "^[^<>{}\"/|;:,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+]*$";
  splCharNumRegex: string = "^[^<>{}\"/|;:,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$";

  insLocVal: string;
  uniRankVal: string;
  sem1Val: string; sem2Val: string; sem3Val: string; sem4Val: string; sem5Val: string; sem6Val: string;
  sem7Val: string; sem8Val: string; sem9Val: string; sem10Val: string; sem11Val: string; sem12Val: string;
  MentorshipVal: string;
  HrsPerMonthVal: string;

  IsStudent: boolean;
  IsEmployed: boolean;
  IsJobseeker: boolean;
  IsLandlord: boolean;
  IsTenant: boolean;
  IsDomesticHelp: boolean;
  IsOthers: boolean;
  IsBusinessOwner: boolean;

  base64img1: string = '';
  imgFileNameWithPath: string;
  //#endregion

  //#region Constructor
  constructor(public storageservice: StorageService, public alertController: AlertController, public formbuilder: FormBuilder,
    public router: Router, private loadingCtrl: LoadingController, private http: HttpClient, private route: ActivatedRoute,
    public modalController: ModalController, private camera: Camera) {
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.creditPoints = localStorage.getItem("creditPoints");
    this.empId = localStorage.getItem("empId");
    this.cardCount = 1;
    console.log("cardCount: " + this.cardCount)

    this.ClearAllControls();

    this.talentform = formbuilder.group({
      qualification: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.splCharRegex), Validators.required])],
      percentage: ['', Validators.compose([Validators.required])],
      specialization: ['', Validators.compose([Validators.maxLength(60), Validators.pattern(this.splCharNumRegex), Validators.required])],
      rollNo: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-z0-9]*$')])],

      institution: ['', Validators.compose([Validators.required])],
      //yearOfPassing: ['', Validators.compose([Validators.required])],
      yearOfPassing: ['', ''],
      currentStudent: ['', ''],
      yearClassGrade: ['', Validators.pattern(this.splCharRegex)],

      insLoc: ['', ''],
      uniRank: ['', ''],
      sem1: ['', ''],
      sem2: ['', ''],
      sem3: ['', ''],
      sem4: ['', ''],
      sem5: ['', ''],
      sem6: ['', ''],
      sem7: ['', ''],
      sem8: ['', ''],
      sem9: ['', ''],
      sem10: ['', ''],
      sem11: ['', ''],
      sem12: ['', ''],

      Mentorship: ['', ''],
      HrsPerMonth: ['', ''],

    });

    this.currentStudentVal = "No";
    this.MentorshipVal = "No";

    this.BindMentorship();

    //Load empEduId from the family information page.
    this.route.queryParams.subscribe(params => {
      if (params) {
        var dependentIdDetails = params;

        if (dependentIdDetails != null) {
          if (dependentIdDetails.empEduId != null) {
            this.empEduId = dependentIdDetails.empEduId;

            this.IsEditMode = true;

            //Load existing values
            this.BindExistingValues();

          }
          else if (dependentIdDetails.empEduIdFrmProfile != null) {
            this.empEduId = dependentIdDetails.empEduIdFrmProfile;

            this.IsEditMode = true;
            this.IsFromProfilePage = true;

            //Load existing values
            this.BindExistingValues();

          }
          else if (dependentIdDetails.FrmProfile != null
            && dependentIdDetails.FrmProfile == "true") {

            this.IsFromProfilePage = true;

          }
        }
      }
    });

  }
  //#endregion

  //#region OnInit
  async ngOnInit() {
    var listConstant = await this.initializeItems();
  }
  //#endregion

  //#region Functions
  BindExistingValues() {
    var editAcademicServiceUrl = "/hrms/master/employeeAdminMaster/editEmployeeEducation";
    var postData = {
      'empEduId': this.empEduId
    }

    console.log("JSON " + this.empEduId);
    this.storageservice.postrequest(editAcademicServiceUrl, postData).subscribe(result => {
      this.response = result;
      console.log("editAcademicServiceUrl: " + editAcademicServiceUrl);
      console.log(`Posting Data: ${JSON.stringify(postData)}`);
      console.log("result: " + result);

      if (result["success"] == true) {

        console.log("IN");
        //Employee details
        var data = result["objEmployeeEducationBean"];
        console.log("objEmployeeEducationBean:  " + data);

        //To show the values
        this.qualificationVal = data["qualification"];
        this.percentageVal = data["percentage"];
        this.specializationVal = data["specialization"];

        this.institutionVal = data["institution"];
        this.yearOfPassingVal = data["yearPassed"];

        this.rollNoVal = data["userRollNo"];
        this.yearClassGradeVal = data["yearstudy"];
        var objCS = data["currentstudent"];
        if (objCS == true) {
          this.currentStudentVal = "Yes";
          this.IsCurrentStudent = true;
        }
        else {
          this.currentStudentVal = "No";
          this.IsCurrentStudent = false;
        }

        this.insLocVal = data["city"];
        this.uniRankVal = data["classRank"];
        this.sem1Val = data["mark1"];
        this.sem2Val = data["mark2"];
        this.sem3Val = data["mark3"];
        this.sem4Val = data["mark4"];
        this.sem5Val = data["mark5"];
        this.sem6Val = data["mark6"];
        this.sem7Val = data["mark7"];
        this.sem8Val = data["mark8"];
        this.sem9Val = data["mark9"];
        this.sem10Val = data["mark10"];
        this.sem11Val = data["mark11"];
        this.sem12Val = data["mark12"];

        var mentorship = data["mentorship"];
        console.log("Metorship: " + mentorship)
        if (mentorship == true) {
          this.MentorshipVal = "Yes";
          this.IsBusinessOwner = true;
        }
        else {
          this.MentorshipVal = "No";
          this.IsBusinessOwner = false;
        }
        this.HrsPerMonthVal = data["hrspermonth"];

        //To show the values
        if (data["uploadCertificate"] != null) {
          var photoPath = data["uploadCertificate"];

          this.base64img1 = this.storageservice.getProperImageUrl(photoPath);

          console.log("Certificate image: " + this.base64img1);
        }
        //End
        //End

        if (this.IsEditMode) {
          this.BindInstitutionList(this.institutionVal);
        }

      }

    });
  }

  opengallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;

      this.uploadImageToServer(this.base64img1); //Upload to the server

    }), error => {
      console.log(error);
    })

  }
  opencamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData => {
      this.base64img1 = "data:image/jpeg;base64," + ImageData;

      this.uploadImageToServer(this.base64img1); //Upload to the server

    }), error => {
      console.log(error);
    })
  }

  clearProfileImage() {
    this.base64img1 = "assets/img/Verification.png";
  }

  uploadImageToServer(imgSixtyFourData) {

    this.showLoadingIndicator()

    var uploadImgServiceUrl = "/hrms/master/employeeAdminMaster/uploadImageMob";
    var postDataUpload = {
      "file": imgSixtyFourData,
      "firstName": ''
    }

    console.log(`Upload image posting data: ${JSON.stringify(postDataUpload)}`);

    this.storageservice.postrequest(uploadImgServiceUrl, postDataUpload).subscribe(result => {

      this.hideLoadingIndicator()

      this.response = result;
      console.log("Image upload response: " + result)
      if (result["success"] == true) {
        this.imgFileNameWithPath = result["uploadPhoto"];
      }
    });
  }

  IsCurrentStudent: boolean = false;
  radioGroupChange($event) {
    var currentStudentobj = this.talentform.controls['currentStudent'].value;
    console.log("currentStudent: " + currentStudentobj);
    if (currentStudentobj == "Yes") {
      this.IsCurrentStudent = true;
      console.log("IsCurrentStudent: " + this.IsCurrentStudent);
    }
    else {
      this.IsCurrentStudent = false;
      console.log("IsCurrentStudent: " + this.IsCurrentStudent);
    }
  }

  ClearAllControls() {
    this.qualificationVal = "";
    this.percentageVal = "";
    this.specializationVal = "";
    this.rollNoVal = "";
    this.institutionVal = "";
    this.yearOfPassingVal = "";
    this.currentStudentVal = "No";
    this.yearClassGradeVal = "";
  }

  mentorShipChangeEvent($event) {
    var MentorshipObj = this.talentform.controls['Mentorship'].value;
    console.log("Mentorship: " + MentorshipObj);
    if (MentorshipObj == "Yes") {
      this.IsBusinessOwner = true;
      console.log("IsBusinessOwner: " + this.IsBusinessOwner);
    }
    else {
      this.IsBusinessOwner = false;
      console.log("IsBusinessOwner: " + this.IsBusinessOwner);
    }
  }

  BindMentorship() {
    //#region Get Category fields
    var getUserServiceUrl = "/hrms/master/employeeAdminMaster/edit?empId=" + this.empId;

    this.storageservice.getrequest(getUserServiceUrl).subscribe(result => {

      if (result["success"] == true) {

        var data = result["editList"][0]; //Employee details

        if (data != null) {

          //Get category
          if (result['category'] != null) {

            var categoryResponse = result['category'];
            console.log("Category list: " + categoryResponse);

            this.IsStudent = categoryResponse.isStudent;
            this.IsEmployed = categoryResponse.isEmployeed;
            this.IsJobseeker = categoryResponse.isProfessional;
            this.IsLandlord = categoryResponse.isOrganization;
            this.IsTenant = categoryResponse.isTenant;
            this.IsDomesticHelp = categoryResponse.isHelp;
            this.IsOthers = categoryResponse.isOther;
            this.IsBusinessOwner = categoryResponse.isBusinessOrEnt;
          }
          //End
        }
      }
    });
    //#endregion
  }
  //#endregion

  //#region Save and Cancel
  


 
   

  saveCard(postDataForEmail: any, optionFromPopup: string) {
    //this.storageservice.warningToast('Please provide all the required values!');
    this.isSubmitted = true;
    if (!this.talentform.valid) {
      //this.storageservice.warningToast('Please provide all the required values!');
    }
    else {


      try {
        console.log("Save in 1")
        var qualification = this.talentform.controls['qualification'].value;
        console.log("Save in 2")
        var percentage = this.talentform.controls['percentage'].value;
        console.log("Save in 3")
        var specialization = this.talentform.controls['specialization'].value;
        console.log("Save in 4" + this.IsCurrentStudent)
        var yearOfPassing = "";
        console.log("1: " + this.talentform.controls['yearOfPassing']);
        console.log("2: " + this.talentform.controls['yearOfPassing'].value);
        if (!this.IsCurrentStudent && this.talentform.controls['yearOfPassing'] != null && this.talentform.controls['yearOfPassing'].value != null) {
          yearOfPassing = this.yearformDate(this.talentform.controls['yearOfPassing'].value);
        }
        console.log("Save in 5")
        var rollNo = this.talentform.controls['rollNo'].value;

        var institution: string;
        // if (this.IsEditMode) {
        //   institution = this.institutionVal;
        // }
        // else {
        institution = this.talentform.controls['institution'].value;
        // }

        var currStu: Boolean = false;
        var currentStudent = this.talentform.controls['currentStudent'].value;
        var yearClassGrade = this.talentform.controls['yearClassGrade'].value;
        if (currentStudent == "Yes") {
          currStu = true;
        }
        else {
          currStu = false;
        }

        console.log("yearOfPassing:" + yearOfPassing)
        console.log("yearClassGrade:" + yearClassGrade)

        var insLoc = this.talentform.controls['insLoc'].value;
        var uniRank = this.talentform.controls['uniRank'].value;
        var sem1 = this.talentform.controls['sem1'].value;
        var sem2 = this.talentform.controls['sem2'].value;
        var sem3 = this.talentform.controls['sem3'].value;
        var sem4 = this.talentform.controls['sem4'].value;
        var sem5 = this.talentform.controls['sem5'].value;
        var sem6 = this.talentform.controls['sem6'].value;
        var sem7 = this.talentform.controls['sem7'].value;
        var sem8 = this.talentform.controls['sem8'].value;
        var sem9 = this.talentform.controls['sem9'].value;
        var sem10 = this.talentform.controls['sem10'].value;
        var sem11 = this.talentform.controls['sem11'].value;
        var sem12 = this.talentform.controls['sem12'].value;

        var Mentorship = this.talentform.controls['Mentorship'].value;
        var HrsPerMonth = this.talentform.controls['HrsPerMonth'].value;
        var IsMentorShip: Boolean = false;
        if (Mentorship == "Yes") {
          IsMentorShip = true;
        }
        else {
          IsMentorShip = false;
        }

        if ((!currStu && typeof yearOfPassing != 'undefined' && yearOfPassing) || (currStu && typeof yearClassGrade != 'undefined' && yearClassGrade)) {

          var postData = {

            'courseType': '',
            'empEduId': '',
            'empId': this.empId,
            'qualification': qualification,
            'percentage': percentage,
            'specialization': specialization,
            'institution': institution,
            'yearPassed': yearOfPassing,
            'userRollNo': rollNo,
            "currentstudent": currStu,
            "yearstudy": yearClassGrade,

            "city": insLoc,
            "classRank": uniRank,
            "mark1": sem1,
            "mark2": sem2,
            "mark3": sem3,
            "mark4": sem4,
            "mark5": sem5,
            "mark6": sem6,
            "mark7": sem7,
            "mark8": sem8,
            "mark9": sem9,
            "mark10": sem10,
            "mark11": sem11,
            "mark12": sem12,

            "mentorship": IsMentorShip,
            "hrspermonth": HrsPerMonth,
            "uploadCertificate": this.imgFileNameWithPath

          }

          console.log(`Posting Data: ${JSON.stringify(postData)}`);

          var saveExperienceServiceUrl = "/hrms/master/employeeAdminMaster/saveEducationDetailMob";

          this.showLoadingIndicator() // Show Loading indicator

          if (!this.IsEditMode)  //Save
          {
            this.storageservice.postrequest(saveExperienceServiceUrl, postData).subscribe(result => {
              this.response = result;
              console.log(this.response);
              console.log(`this.response: ${JSON.stringify(this.response)}`);

              this.hideLoadingIndicator() // Hide Loading indicator
            },
              error => {
                console.log(`Error data: ${JSON.stringify(error)}`);
                this.hideLoadingIndicator() // Hide Loading indicator

                if (error.name == "HttpErrorResponse") {
                  //this.storageservice.warningToast('Internet connection problem, Pls check your internet.');
                  
                  //this.storageservice.GeneralAlert('HttpErrorResponse', 'Internet connection problem, Pls check your internet.');
                  
                }
                else {
                  this.storageservice.warningToast('Error: ' + error.message);
                }
              },
              () => {
                // 'onCompleted' callback.
                // No errors, route to new page here
                console.log("'onCompleted' callback.")
                var result = this.response;
                this.hideLoadingIndicator() // Hide Loading indicator

                if (result["success"] == true) {
                  //this.storageservice.successToast('Saved successfully');
                 

                  //#region Is current student, should request to the institution to verify the information.
                  if (currStu) {
                    var empEduId = result["empEduId"];
                    this.sendForVerificationCard(empEduId, institution, qualification, specialization, yearOfPassing, percentage, "true");
                  }
                  //#endregion

                  //#region Update Skip_Verifier
                  if (optionFromPopup == "Yes-ButNotVerifierDetails") {
                    var empEduId = result["empEduId"];
                    var updateSkipVerifierServiceUrl = "/hrms/master/employeeAdminMaster/skipVerifierEdu?empEduId=" + empEduId;
                    this.showLoadingIndicator() // Show Loading indicator

                    this.storageservice.getrequest(updateSkipVerifierServiceUrl).subscribe(result => {
                      console.log("Updated skip verifier details for the Id " + empEduId);
                      this.hideLoadingIndicator() // Show Loading indicator
                    },
                      error => {
                        console.log(`Error data: ${JSON.stringify(error)}`);
                        this.storageservice.warningToast('Error: ' + error.message);
                      },
                      () => {
                        // 'onCompleted' callback.
                        // No errors, route to new page here
                        console.log("'onCompleted' callback. updateSkipVerifierServiceUrl")
                        //#region navigate to base page
                        let navigationExtras: NavigationExtras = {
                          queryParams: {
                            refreshPage: 'yes'
                          }
                        };
                        this.hideLoadingIndicator() //Hide loading indicator

                        if (this.IsFromProfilePage == true) {
                          this.router.navigate(['/profile-individual'], navigationExtras)
                        }
                        else {
                          this.router.navigate(['/academic-information'], navigationExtras)
                        }
                        //#endregion

                      });
                  }
                  //#endregion

                  //#region saveNewEduInstMob and send mail
                  else if (optionFromPopup == "Yes") {

                    console.log(`Posting Data: ${JSON.stringify(postDataForEmail)}`);
                    var saveNewOrgnInst = "/hrms/master/employeeAdminMaster/saveNewEduInstMob";
                    this.showLoadingIndicator() // Show Loading indicator

                    this.storageservice.postrequest(saveNewOrgnInst, postDataForEmail).subscribe(result => {

                      console.log("SaveNewOrgnInst Result: " + result);
                      //this.storageservice.successToast('Verifier details are saved successfully and sent email');
                     
                      console.log('Verifier details are saved successfully and sent email');

                      this.hideLoadingIndicator() // Show Loading indicator
                    },
                      error => {
                        console.log(`Error data: ${JSON.stringify(error)}`);
                        this.storageservice.warningToast('Error: ' + error.message);
                      },
                      () => {
                        // 'onCompleted' callback.
                        // No errors, route to new page here
                        console.log("'onCompleted' callback. saveNewOrgnInst")
                        //#region navigate to base page
                        let navigationExtras: NavigationExtras = {
                          queryParams: {
                            refreshPage: 'yes'
                          }
                        };
                        this.hideLoadingIndicator() //Hide loading indicator

                        if (this.IsFromProfilePage == true) {
                          this.router.navigate(['/profile-individual'], navigationExtras)
                        }
                        else {
                          this.router.navigate(['/academic-information'], navigationExtras)
                        }
                        //#endregion

                      });
                  }
                  //#endregion

                  //#region navigate to base page
                  else {
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: 'yes'
                      }
                    };
                    this.hideLoadingIndicator() //Hide loading indicator

                    if (this.IsFromProfilePage == true) {
                      this.router.navigate(['/profile-individual'], navigationExtras)
                    }
                    else {
                      this.router.navigate(['/academic-information'], navigationExtras)
                    }
                  }
                  //#endregion

                }
                else if (result["success"] == false) {
                  var msg = result["message"];
                  if (msg == null) {
                    msg = "Web service does not give proper message";
                  }
                  this.storageservice.warningToast(msg);
                }
              }
            );
          }
          else //Update
          {
            var updateServiceUrl = "/hrms/master/employeeAdminMaster/updateEmployeeEducationMob";

            var postDataUpdate = {

              "empId": this.empId,
              "institution": institution,
              "qualification": qualification,
              "percentage": percentage,
              "currentstudent": currStu,
              "specialization": specialization,
              "yearstudy": yearClassGrade,
              "yearPassed": yearOfPassing,
              "empEduId": this.empEduId,
              "courseType": "",
              "userRollNo": rollNo,

              "city": insLoc,
              "classRank": uniRank,
              "mark1": sem1,
              "mark2": sem2,
              "mark3": sem3,
              "mark4": sem4,
              "mark5": sem5,
              "mark6": sem6,
              "mark7": sem7,
              "mark8": sem8,
              "mark9": sem9,
              "mark10": sem10,
              "mark11": sem11,
              "mark12": sem12,

              "mentorship": IsMentorShip,
              "hrspermonth": HrsPerMonth,
              "uploadCertificate": this.imgFileNameWithPath
            }

            console.log(`Update academic posting data: ${JSON.stringify(postDataUpdate)}`);

            this.storageservice.postrequest(updateServiceUrl, postDataUpdate).subscribe(result => {
              this.response = result;
              console.log(this.response);

              this.hideLoadingIndicator() //Hide loading indicator

              if (result["success"] == true) {
                //this.storageservice.successToast('Updated successfully');
                
                //#region Is current student, should request to the institution to verify the information.
                if (currStu) {
                  this.sendForVerificationCard(this.empEduId, institution, qualification, specialization, yearOfPassing, percentage, "true");
                }
                //#endregion

                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    refreshPage: 'yes'
                  }
                };

                if (this.IsFromProfilePage == true) {
                  this.router.navigate(['/profile-individual'], navigationExtras)
                }
                else {
                  this.router.navigate(['/academic-information'], navigationExtras)
                }

              }
              else if (result["success"] == false) {
                var msg = result["message"];
                if (msg == null) {
                  msg = "Web service does not give proper message";
                }
                this.storageservice.warningToast(msg);
              }
              else {
                //this.storageservice.warningToast("Connection unavailable!");
               
              }
            });
          }

          this.hideLoadingIndicator()

        }
        else {
          if (!currStu) {
            //this.storageservice.warningToast('Please enter year of passing');
           
          }
          else if (currStu) {
            //this.storageservice.warningToast('Please enter year/class/grade');
           
          }
        }
      }
      catch (Exception) {
        //this.storageservice.warningToast('Error in save/update!');
       
        this.hideLoadingIndicator() //Hide loading indicator
      }
    }
  }

  cancel() {
    if (this.IsFromProfilePage == true) {
      this.router.navigate(['/profile-individual'])
    }
    else {
      this.router.navigate(['/academic-information'])
    }
  }
  //#endregion

  //#region Functions
  BindInstitutionList(institutionId: string) {
    var InsURL = "/hrms/studentacademicdetails/getAllInstitueList";

    this.storageservice.getrequest(InsURL).subscribe(result => {
      this.insListResponse = result;
      console.log(`insListResponse: ${JSON.stringify(this.insListResponse)}`);

      for (let objIns of this.insListResponse) {
        if (objIns["id"] == institutionId) {
          this.institutionName = objIns["text"];
          console.log("institutionName: " + this.institutionName);
          break;
        }
      }

    });
  }

  yearformDate(date) {
    var s = String(date);
    console.log("year length: " + s.length)
    if (s.length === 4) {
      return date;
    }
    else {
      return date.substring(0, 4);
    }
  }

  getOnlyYear(date) {
    return date.substring(0, 4);
  }

  sendForVerificationCard(empEduId: number, institution: string, qualification: string,
    specialization: string, yearPassed: string, percentage: string, iscurrentstudent: string) {

    try {
      var postData = {
        "specialization": specialization,
        "empId": this.empId,
        "empEduId": empEduId,
        "qualification": qualification,
        "percentage": percentage,
        "courseType": "",
        "institution": institution,
        "yearPassed": yearPassed,
        "currentstudent": iscurrentstudent,
        "yearstudy": "",
        "verified": "",
        "status": "",
        "alumnimember": "",
        "mentor": "",
        "instituteName": "",
        "courses": ""
      }

      console.log(`Approval education posting data: ${JSON.stringify(postData)}`);

      var reqApprovalUrl = "/hrms/master/employeeAdminMaster/reqApprovalEducationMob";

      this.storageservice.postrequest(reqApprovalUrl, postData).subscribe(result => {
        this.response = result;
        console.log(this.response);


        if (result["success"] == true) {
          //this.storageservice.successToast('Request sent successfully');
         

          // let navigationExtras: NavigationExtras = {
          //   queryParams: {
          //     refreshPage: 'yes'
          //   }
          // };
          // this.router.navigate(['/academic-information'], navigationExtras)

        }
        else if (result["success"] == false) {
          var msg = result["message"];
          if (msg == null) {
            msg = "Web service does not give proper message";
          }
          this.storageservice.warningToast(msg);
        }
        else {
          //this.storageservice.warningToast("Connection unavailable!");
          
        }
      });
    }
    catch (Exception) {
      //this.storageservice.warningToast('Connection unavailable!');
    
    }

  }

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
  //#endregion

  //#region Search functions
  async initializeItems(): Promise<any> {
    var CusURL = "/hrms/studentacademicdetails/getAllInstitueList";

    const InsList = this.storageservice.getrequest(CusURL).subscribe(result => {
      this.InsListBackup = result;
      this.InsList = result;
      console.log(`InsListResponse: ${JSON.stringify(this.InsList)}`);

    });

    return InsList;
  }

  unCheckFocus() {
    // this.ionSearchListShow = false;
  }
  goToSearchSelectedItem(InsName, InsId) {
    console.log("InsName: " + InsName)
    console.log("InsId: " + InsId)

    this.institutionVal = InsName;
    this.IsSearchListShow = false;
  }
  async filterList(evt) {
    if (evt.srcElement.value != null && evt.srcElement.value != '') {
      this.IsSearchListShow = true;
      this.InsList = this.InsListBackup;
      const searchTerm = evt.srcElement.value;
      if (!searchTerm) {
        return;
      }

      var countVal = 0;
      this.InsList = this.InsList.filter(currentFood => {
        countVal++;
        if (currentFood.text && searchTerm && countVal < 100) {
          return (currentFood.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });

      if (this.InsList == 0) {
        this.IsSearchListShow = false;
      }
      else {
        this.IsSearchListShow = true;
      }
    }
    else {
      this.IsSearchListShow = false;
    }
  }
  //#endregion

}
