import { Component, OnInit, ElementRef, HostListener, ViewChild, NgZone, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { NavigationEnd } from '@angular/router';
import { LanguageService } from '../language.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {

 // @ViewChild('popover') popover;
  showDropdownFlag: number;
  isOpen = false;
  userId: string;
  educationcard: boolean = false;
  clubscard: boolean = false;
  experiencecard: boolean = false;
  skillscard: boolean = false;
  connectioncard: boolean = false;
  certificationcard: boolean = false;
  username: any;
  category: any;
  hobbies: any;
  about: any;
  location: any;
  mobile: any;
  email: any;
  language: any;
  skillName: any;
  expertise: any;
  skillList = [];
  education: any;
  experience: any;
  club: any;
  img: any;
  certifications: any;
  prof: boolean = false;
  profAvatar: boolean = false;
  connectionList: any;
  fromAddPage: any;
  talentId: any;
  imagePath:string;
  public myValue: string;
  expertiseFull: boolean = false;
  isTooltipVisible = false;
  opp: boolean;
  isPopupOpen: boolean = false;
  currentIndex: any;
  constructor(private renderer: Renderer2,public router: Router, private ngZone: NgZone, public route: ActivatedRoute, public storageservice: StorageService, private elementRef: ElementRef,
    public modalController: ModalController, public alertController: AlertController, public languageService: LanguageService,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) {

    interface MyCustomEventInit extends CustomEventInit {
      target?: HTMLElement;
    }

    if (this.storageservice && this.storageservice.refreshDataObservable) {
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
    }

    if (this.route && this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params) {
          this.fromAddPage = params;
          if (this.fromAddPage != null && this.fromAddPage.refreshPage != null) {
            console.log("hello");
            this.listFunction();
          }
        }
      });
    }
  }

  doRefresh(event) {
    this.ngOnInit();
    event.target.complete();
  }

  @ViewChild('popover') popover;

  //isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  @ViewChild('picker', { static: false })
  pickerInst: any;

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/profile-view') {
        this.setSelectedTab('profile');
      }
    });

    this.imagePath = this.storageservice.mobileserverurl;

    this.userId = localStorage.getItem("userId");
    //this.img = localStorage.getItem("profilePic");

    if (this.img != "null" && this.img != "") {
      this.prof = true
    } else {
      this.prof = false

    }

    var indiProfileViewURL = "api/auth/app/IndividualProfileDetails/viewmatchesprofile?talentId=" + this.userId;
    this.storageservice.getrequest(indiProfileViewURL).subscribe(result => {
      console.log(result);
      this.storageservice.showLoading();

      if (result['profileViewList'][0].educationList.length != 0 && result['profileViewList'] != null) {
        this.educationcard = true;
      }
      if (result['profileViewList'][0].clubsList.length != 0 && result['profileViewList'] != null) {
        this.clubscard = true;
      }
      if (result['profileViewList'][0].experienceList.length != 0 && result['profileViewList'] != null) {
        this.experiencecard = true;
      }
      if (result['profileViewList'][0].skillList.length != 0 && result['profileViewList'] != null) {
        this.skillscard = true;
      }
      if (result['profileViewList'][0].connectionList.length != 0 && result['profileViewList'] != null) {
        this.connectioncard = true;
      }
      if (result['profileViewList'][0].certificationsList.length != 0 && result['profileViewList'] != null) {
        this.certificationcard = true;
      }


      //card false
      if (result['profileViewList'][0].educationList.length == 0) {
        this.educationcard = false;
      }
      if (result['profileViewList'][0].clubsList.length == 0) {
        this.clubscard = false;
      }
      if (result['profileViewList'][0].experienceList.length == 0) {
        this.experiencecard = false;
      }
      if (result['profileViewList'][0].skillList.length == 0) {
        this.skillscard = false;
      }
      if (result['profileViewList'][0].connectionList.length == 0) {
        this.connectioncard = false;
      }
      if (result['profileViewList'][0].certificationsList.length == 0) {
        this.certificationcard = false;
      }

      //profileview 
      this.location = result['profileViewList'][0]['userlocation'];
      this.username = result['profileViewList'][0]['username'];
      this.category = result['profileViewList'][0]['category'];
      this.hobbies = result['profileViewList'][0]['hobbies'];
      this.about = result['profileViewList'][0]['about'];
      this.mobile = result['profileViewList'][0]['phone'];
      this.email = result['profileViewList'][0]['email'];
      this.language = result['profileViewList'][0]['languages'];
      this.talentId = result['profileViewList'][0]['talentId'];
      if(result['profileViewList'][0]['profilepic'].includes('data:image')){
        this.img = result['profileViewList'][0]['profilepic'];
      } else {
        this.img = this.imagePath+result['profileViewList'][0]['profilepic'];
      }
      
      
      console.log(this.talentId)
      this.myValue = this.talentId;
      console.log(this.myValue)

      //skills
      this.skillList = result['profileViewList'][0].skillList;

      for (var i = 0; i < this.skillList.length; i++) {
        this.skillList[i].expertise = this.skillList[i].expertise / 100;
      }

      //educations
      this.education = result['profileViewList'][0].educationList;
      //experience
      this.experience = result['profileViewList'][0].experienceList;
      //Extracurricular
      this.club = result['profileViewList'][0].clubsList;
      //certifications
      this.certifications = result['profileViewList'][0].certificationsList;
      //connection
      this.connectionList = result['profileViewList'][0].connectionList
      this.storageservice.dismissLoading()
    });
    this.storageservice.dismissLoading()
  }

  toggleTooltip() {
    this.opp=true;
  }

  togglePopup(index) {
    this.isPopupOpen = !this.isPopupOpen;
    this.currentIndex=index;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.isPopupOpen = false;
    }
  }
  

  //list function
  listFunction() {
    this.storageservice.showLoading();
    var indiProfileViewURL = "api/auth/app/IndividualProfileDetails/viewmatchesprofile?talentId=" + this.userId;
    this.storageservice.getrequest(indiProfileViewURL).subscribe(result => {
      console.log(result);


      // if (result['profileViewList'][0].educationList.length != 0 && result['profileViewList'] != null) {
      //   this.educationcard = true;
      // }
      if (result['profileViewList'][0].clubsList.length != 0 && result['profileViewList'] != null) {
        this.clubscard = true;
      }
      if (result['profileViewList'][0].experienceList.length != 0 && result['profileViewList'] != null) {
        this.experiencecard = true;
      }
      if (result['profileViewList'][0].skillList.length != 0 && result['profileViewList'] != null) {
        this.skillscard = true;
      }
      if (result['profileViewList'][0].connectionList.length != 0 && result['profileViewList'] != null) {
        this.connectioncard = true;
      }
      if (result['profileViewList'][0].certificationsList.length != 0 && result['profileViewList'] != null) {
        this.certificationcard = true;
      }

      //card false
      if (result['profileViewList'][0].educationList.length == 0) {
        this.educationcard = false;
      }
      if (result['profileViewList'][0].clubsList.length == 0) {
        this.clubscard = false;
      }
      if (result['profileViewList'][0].experienceList.length == 0) {
        this.experiencecard = false;
      }
      if (result['profileViewList'][0].skillList.length == 0) {
        this.skillscard = false;
      }
      if (result['profileViewList'][0].connectionList.length == 0) {
        this.connectioncard = false;
      }
      if (result['profileViewList'][0].certificationsList.length == 0) {
        this.certificationcard = false;
      }

      //profileview 
      this.location = result['profileViewList'][0]['userlocation'];
      this.username = result['profileViewList'][0]['username'];
      this.category = result['profileViewList'][0]['category'];
      this.hobbies = result['profileViewList'][0]['hobbies'];
      this.mobile = result['profileViewList'][0]['phone'];
      this.email = result['profileViewList'][0]['email'];
      this.language = result['profileViewList'][0]['languages'];




      //skills
      this.skillList = result['profileViewList'][0].skillList;
      for (var i = 0; i < this.skillList.length; i++) {
        this.skillList[i].expertise = this.skillList[i].expertise / 100;
      }



      //educations
      this.education = result['profileViewList'][0].educationList;
      //experience
      this.experience = result['profileViewList'][0].experienceList;
      //Extracurricular
      this.club = result['profileViewList'][0].clubsList;
      //certifications
      this.certifications = result['profileViewList'][0].certificationsList;
      //connection
      this.connectionList = result['profileViewList'][0].connectionList
      this.storageservice.dismissLoading()
    });
    this.storageservice.dismissLoading()
  }


  fileDownload1(filePath: string, fileName: string, fileType: string) {
    //filePath='http://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png';
    var externalDir = "";
    if(filePath!=null && filePath!=undefined && filePath!=''){

    if (this.platform.is('android')) {
    //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, , this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
    //   externalDir = this.file.externalRootDirectory;
    // }


    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
    ]).then(() => {
      //externalDir = '/storage/emulated/0/Download/';
      
      externalDir=this.file.externalRootDirectory+ 'Download/TalentChekLogo.png';
      //this.storageservice.warningToast('Extt: '+externalDir);
      //const url = filePath;
      const url = this.storageservice.baseURL + filePath;
      var fileNameFull = 'fileName' + "." + 'png';
    // var externalDir = this.file.externalRootDirectory;
      var imgPath = externalDir;
    // this.storageservice.warningToast('Path New: '+externalDir);
      const fileTransfer: FileTransferObject = this.transfer.create();

   // this.showLoadingIndicator();
   //this.storageservice.warningToast('Entered');
    fileTransfer.download(url, imgPath, true, {}).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.storageservice.warningToast('QR Downloaded Successfully');
     // this.hideLoadingIndicator()
      let fileMIMEType = this.getMIMEtype(fileType);
      this.fileOpener.showOpenWithDialog(imgPath, fileMIMEType)
        .then(() => 
        console.log('File is opened')
        //this.storageservice.warningToast('Entered In')
        )
        .catch(e => console.log('Error opening file', e));
      
    }, (error) => {
      //this.hideLoadingIndicator()
      console.log('Error download file :', error)
      this.storageservice.warningToast('Error in download');
    });
     // downloadImage(externalDir);
    }).catch(error => {
      // Handle permission request error
      this.storageservice.warningToast('Error in download');
    });

  }

    if (this.platform.is('ios')) {
      externalDir = this.file.documentsDirectory;
    }
    console.log("Inside  the download created");

  } else {
    this.storageservice.warningToast('Error in download');
  }
    // const url = filePath;
    // var fileNameFull = fileName + "." + fileType;
    // var imgPath = externalDir + fileNameFull;

    // const fileTransfer: FileTransferObject = this.transfer.create();
    // fileTransfer.download(url, imgPath, true, {}).then((entry) => {
    // console.log('download complete: ' + entry.toURL());

    //   let fileMIMEType = this.getMIMEtype(fileType);
    //   this.fileOpener.showOpenWithDialog(imgPath, fileMIMEType)
    //     .then(() => console.log('File is opened'))
    //     .catch(e => console.log('Error opening file', e));
      
    // }, (error) => {
    //   console.log('Error download file :', error)
    // });
  }

/////////////////////////// Offline Qr Download ////////////////////////////////////////

fileDownloadOffline(filePath: string, fileName: string, fileType: string) {
  //filePath='http://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png';
  var externalDir = "";
  if(filePath!=null && filePath!=undefined && filePath!=''){

  if (this.platform.is('android')) {

  this.androidPermissions.requestPermissions([
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
  ]).then(() => {
    
    externalDir=this.file.externalRootDirectory+ 'Download/TalentChekLogo.png';

    const url = this.storageservice.baseURL + filePath;
    var fileNameFull = 'fileName' + "." + 'png';
    var imgPath = externalDir;
    const fileTransfer: FileTransferObject = this.transfer.create();

 
  fileTransfer.download(url, imgPath, true, {}).then((entry) => {
    console.log('download complete: ' + entry.toURL());
    this.storageservice.warningToast('QR Downloaded Successfully');
   // this.hideLoadingIndicator()
    let fileMIMEType = this.getMIMEtype(fileType);
    this.fileOpener.showOpenWithDialog(imgPath, fileMIMEType)
      .then(() => 
      console.log('File is opened')
      //this.storageservice.warningToast('Entered In')
      )
      .catch(e => console.log('Error opening file', e));
    
  }, (error) => {
    //this.hideLoadingIndicator()
    console.log('Error download file :', error)
    this.storageservice.warningToast('Error in download');
  });
   // downloadImage(externalDir);
  }).catch(error => {
    // Handle permission request error
    this.storageservice.warningToast('Error in download');
  });

}

  if (this.platform.is('ios')) {
    externalDir = this.file.documentsDirectory;
  }
  console.log("Inside  the download created");

} else {
  this.storageservice.warningToast('Error in download');
}
 
}

  async fileDownload2(filePath: string, fileName: string, fileType: string) {
    try {
      const url ='http://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png';
      const fileNameFull = fileName + "." + fileType;
      var fileDir="";
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
      ]).then(async () => {
         fileDir = this.file.externalRootDirectory+ 'Download/';

       //  this.storageservice.warningToast(fileDir);
         var blob;

          try{
            const response = await fetch(url);
            blob = await response.formData();
          } catch(error){
            this.storageservice.warningToast('Noo '+error);
          }
      
      this.storageservice.warningToast("blob in");

      await this.file.writeFile(fileDir, fileNameFull, blob, {
        replace: true,
      });

      this.storageservice.warningToast("written");
      }).catch(error => {
        // Handle permission request error
        this.storageservice.warningToast('Error in downloading file!');
      });
      

      

      // this.fileOpener
      //   .open(fileDir + fileNameFull, fileType)
      //   .then(() => {
      //     console.log('File opened successfully');
      //   })
      //   .catch((error) => {
      //     console.log('Error opening file', error);
      //   });
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }


  fileDownload(filePath: string, fileName: string, fileType: string) {
    var externalDir = "";
    if (this.platform.is('android')) {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, , this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
      externalDir = this.file.externalRootDirectory;
    }
    if (this.platform.is('ios')) {
      externalDir = this.file.documentsDirectory;
    }

    console.log("Inside  the download created");

    //const url = this.baseURL + filePath;
    const url ='http://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png';
    var fileNameFull = fileName + "." + fileType;
    // var externalDir = this.file.externalRootDirectory;
    var imgPath = externalDir + fileNameFull;

    const fileTransfer: FileTransferObject = this.transfer.create();

    //this.showLoadingIndicator();
    fileTransfer.download(url, imgPath, true, {}).then((entry) => {
      console.log('download complete: ' + entry.toURL());

      //this.hideLoadingIndicator()

      let fileMIMEType = this.getMIMEtype(fileType);
      this.fileOpener.showOpenWithDialog(imgPath, fileMIMEType)
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
      
    }, (error) => {
      //this.hideLoadingIndicator()
      console.log('Error download file :', error)
    });
  }


  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }

  //this is for refresh without load the screen
  updateData() {
    this.storageservice.refreshData();
  }

  // profile(){
  //   this.router.navigate(['/profilee']) 
  // }

  //edit call functions
  educations(id) {
    let edit = {
      id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/educations'], navigationExtras)
  }
  experiences(id) {
    let edit = {
      id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/work-experiences'], navigationExtras)
  }
  Extracurricular(id) {
    let edit = {
      id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/club'], navigationExtras)
  }
  Skill(id) {
    let edit = {
      id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/skill-popup'], navigationExtras);

  }
  certification(id) {
    let edit = {
      id
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/certification'], navigationExtras);
  }

  profile1(one) {
    let edit = {
      id: one
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/profilee'], navigationExtras);

  }
  profile2(two) {
    let edit = {
      id: two
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/profilee'], navigationExtras);

  }
  Connections() {
    this.router.navigate(['/connection']);
  }
  Additional() {
    this.router.navigate(['/additional-infoo']);
  }
  // edit functions end


  //nav bar 
  selectedTab: string = 'profile';
  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  //education verifier
  eduIdverifierCall(eduId, instiId) {
    let edit = {
      instiId: instiId,
      edu: eduId,
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/edu-verification'], navigationExtras)
  }

  //experience verifier
  expIdverifierCall(expId, orgId) {
    let edit = {
      orgId: orgId,
      expId: expId,
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/exp-verification'], navigationExtras)
  }

  //Extracurricular verifier
  clubIdverifierCall(clubId, orgId) {

    let edit = {
      clubId: orgId,
      extId: clubId,
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/activity-verification'], navigationExtras)


  }


  //delete certificate
  async deleteCertificateCard(certId: number) {
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
            console.log("Id: " + certId);
            try {
              var postData = {
                'certId': certId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteCertification";

              this.storageservice.postrequest(deleteExperienceServiceUrl, postData.certId).subscribe(async result => {
                if (result == true) {
                  this.storageservice.successToast('Deleted successfully');
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
                error => {
                  console.log("error")
                },
                () => {
                  console.log("start")
                  this.ngZone.run(() => {
                    const randomString = this.generateRandomString();
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: randomString
                      }
                    };
                    this.router.navigate(['profile-view'], navigationExtras)
                  });
                  console.log("end")
                });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  //random strings
  generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  //delete skills
  async deleteSkills(skillId: number) {
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
            console.log("Id: " + skillId);
            try {
              var postData = {
                'skillId': skillId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteKeyskill";

              this.storageservice.postrequest(deleteExperienceServiceUrl, postData.skillId).subscribe(async result => {
                if (result == true) {
                  this.storageservice.successToast('Deleted successfully');
                  this.listFunction();

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
                error => {
                  console.log("error")
                },
                () => {
                  console.log("start")
                  this.ngZone.run(() => {
                    const randomString = this.generateRandomString();

                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: randomString
                      }
                    };
                    this.router.navigate(['profile-view'], navigationExtras)
                  });
                  console.log("end")
                });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  //delete education
  async deleteeducation(eduId: number) {
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
            console.log("Id: " + eduId);
            try {
              var postData = {
                'eduId': eduId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteEducation";

              this.storageservice.postrequest(deleteExperienceServiceUrl, postData.eduId).subscribe(async result => {
                if (result == true) {
                  this.storageservice.successToast('Deleted successfully');
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
                error => {
                  console.log("error")
                },
                () => {
                  console.log("start")
                  this.ngZone.run(() => {
                    const randomString = this.generateRandomString();

                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: randomString
                      }
                    };
                    this.router.navigate(['profile-view'], navigationExtras)
                  });
                  console.log("end")
                });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
            }

          }
        }
      ]
    });
    await alert.present();
  }

  go_to_list(p) {
    let edit = {
      p
    }
    let navigationExtras: NavigationExtras = {
      queryParams: edit
    };
    this.router.navigate(['/connection-list'], navigationExtras);

  }



  //delete experience
  async deleteExperiences(expId: number) {
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
            console.log("Id: " + expId);
            try {
              var postData = {
                'expId': expId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteExperience";

              this.storageservice.postrequest(deleteExperienceServiceUrl, postData.expId).subscribe(async result => {
                if (result == true) {
                  this.storageservice.successToast('Deleted successfully');
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
                error => {
                  console.log("error")
                },
                () => {
                  console.log("start")
                  this.ngZone.run(() => {
                    const randomString = this.generateRandomString();

                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: randomString
                      }
                    };
                    this.router.navigate(['profile-view'], navigationExtras)
                  });
                  console.log("end")
                });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
            }

          }
        }
      ]
    });
    await alert.present();
  }

  // delete club
  async deleteExtracurricular(expId: number) {
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
            console.log("Id: " + expId);
            try {
              var postData = {
                'expId': expId
              }
              console.log(`Delete family posting data: ${JSON.stringify(postData)}`);

              var deleteExperienceServiceUrl = "api/auth/app/IndividualProfileDetails/deleteExtracurricular";

              this.storageservice.postrequest(deleteExperienceServiceUrl, postData.expId).subscribe(async result => {
                if (result == true) {
                  this.storageservice.successToast('Deleted successfully');
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
                error => {
                  console.log("error")
                },
                () => {
                  console.log("start")
                  this.ngZone.run(() => {
                    const randomString = this.generateRandomString();

                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        refreshPage: randomString
                      }
                    };
                    this.router.navigate(['profile-view'], navigationExtras)
                  });
                  console.log("end")
                });
            }
            catch (Exception) {
              this.storageservice.warningToast('Connection unavailable!');
            }

          }
        }
      ]
    });
    await alert.present();
  }



  ViewPdf(value: string): void {

    const obj = {
      currentUserId: value
    }
    var viewExportPDFUrl = "api/auth/app/mobile/viewExportPdf";
    this.storageservice.postrequest(viewExportPDFUrl, obj).subscribe(async result => {
      if (result == true) {
        this.storageservice.successToast('Deleted successfully');
      }

    });
  }

  // footer
  goto_profileSearch() {
    this.router.navigate(['/job-search']);
  }
  goto_jobs() {
    this.router.navigate(['/job']);
  }
  goto_home() {
    this.router.navigate(['/home']);
  }
  goto_profile() {
    this.router.navigate(['/profile-view']);
  }
  goto_more() {
    this.router.navigate(['/settings']);
  }
}