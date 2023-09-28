import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { HttpClient } from '@angular/common/http';
import { FileTransferObject,FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-profile-vcard',
  templateUrl: './profile-vcard.page.html',
  styleUrls: ['./profile-vcard.page.scss'],
})
export class ProfileVcardPage implements OnInit {
  expId: any;
  vcardList: any;
  profileimg: any;
  uploadBrochure: any;
  filePath: any;
  testdata: any;
  generatedUrl: string;

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  talentId : string;
  currendUserId: string;
  basicProfileDetails = [];
  educationList = [];
  certificationsList =[];
  clubsList = [];
  experienceList =[];
  secretKey = 7061737323313244;
  constructor( private http :HttpClient,public storageservice: StorageService,public router: Router,private activatedRoute: ActivatedRoute,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public platform: Platform) { 

    this.expId = this.activatedRoute.snapshot.paramMap.get('param1');
    this.talentId = "TFIN100000010004";
  }

  ngOnInit() {

  //  this.talentId = localStorage.getItem("userId");
    console.log(this.talentId);
    this.currendUserId = localStorage.getItem("userId")  ; 
    this.expId =this.decryptAesformString(decodeURIComponent(this.expId), this.secretKey);


    var profileViewUrl = "api/auth/app/IndividualProfileDetails/viewmatchesprofile"+"?talentId=" +this.talentId;

    this.storageservice.getrequest(profileViewUrl).subscribe(result => {
    this.basicProfileDetails = result['profileViewList'];
    this.experienceList = result['profileViewList'][0]["experienceList"];
    this.educationList = result['profileViewList'][0]["educationList"];
    this.certificationsList = result['profileViewList'][0]["certificationsList"];
    this.clubsList = result['profileViewList'][0]["clubsList"];
      console.log(result["profileViewList"]); 
       
   });


   var profileViewUrl2 = "api/auth/app/VisitingCard/viewVcardDetails"+"?expId=" +this.expId;

   this.storageservice.getrequest(profileViewUrl2).subscribe(result => {
   this.vcardList=result['vcarddetails'][0];
   this.uploadBrochure = this.vcardList.uploadBrochure;
     //  this.headercolor = this.vcardList['headercolor'];
     //  this.bottomcolor = this.vcardList['bottomcolor'];
     //  this.fontcolor = this.vcardList['fontcolor'];
     //  this.logo2path=this.serverUrl.apiServerAddress+result['vcarddetails'][0].logo2path;
     //  this.logo1path = this.serverUrl.apiServerAddress+result['vcarddetails'][0].logo1path;
     this.profileimg = this.storageservice.mobileserverurl+result['vcarddetails'][0].profileimg;
      
  });

  this.filePath = this.storageservice.mobileserverurl;

  this.getimageUrlToDataUrl();


  }

  decryptAesformString(value, keys): string {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 16,
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getimageUrlToDataUrl(){

    this.http.get(this.profileimg,
        {
          responseType: 'blob',
        }
      )
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (event: any) => {
          this.testdata = event.target.result.replace(
            /^data:image\/[a-z]+;base64,/,
            ''
          );
        };
        reader.onerror = (event: any) => {
          console.log('File could not be read: ' + event.target.error.code);
        };
      });
  }

  downLoadFile(){
    let vCardData =`BEGIN:VCARD
    VERSION:3.0
    PRODID:-//Apple Inc.//iPhone OS 12.3.1//EN
    N:`+this.vcardList['firstname']+`
    FN:`+this.vcardList['firstname']+`
    ORG:`+this.vcardList['company']+`
    ADR:`+this.vcardList['address']+`
    PHOTO;ENCODING=b:`+this.testdata+`
    TEL;CELL;VOICE:`+this.vcardList['mobileno']+`
    EMAIL:`+this.vcardList['emailid']+`
    TITLE:`+this.vcardList['designation']+`
    END:VCARD`;
    
        var blob = new window.Blob([vCardData], {
          type: 'text/vcard;charset=utf-8;',
        });
        window.URL = window.URL || window.webkitURL;
        var url = window.URL.createObjectURL(blob);
        this.generatedUrl=url;
        saveAs(url, this.vcardList['firstname'].replace(/\s/g, "")+'.vcf');
  }

  downloadVCard() {
    const vCardData = `BEGIN:VCARD
    VERSION:3.0
    PRODID:-//Apple Inc.//iPhone OS 12.3.1//EN
    N:${this.vcardList['firstname']}
    FN:${this.vcardList['firstname']}
    ORG:${this.vcardList['company']}
    ADR:${this.vcardList['address']}
    PHOTO;ENCODING=b:${this.testdata}
    TEL;CELL;VOICE:${this.vcardList['mobileno']}
    EMAIL:${this.vcardList['emailid']}
    TITLE:${this.vcardList['designation']}
    END:VCARD`;
    
      const fileName = `${this.vcardList['firstname'].replace(/\s/g, '')}.vcf`;
    
  
          // Create or overwrite the file with vCard data
          this.file.writeFile(this.file.dataDirectory, fileName, vCardData, { replace: true })
            .then(fileEntry => {
              // Get the file's URL
              const fileUrl = fileEntry.toURL();
    
              // Use the File Opener plugin to open the file
              this.fileOpener.open(fileUrl, 'text/vcard')
                .then(() => {
                  console.log('File opened successfully');
                })
                .catch(error => {
                  console.error('Error opening file:', error);
                });
            })
            .catch(error => {
              console.error('Error writing file:', error);
            });
       
  }

  fileDownload1() {

    let vCardData =`BEGIN:VCARD
    VERSION:3.0
    PRODID:-//Apple Inc.//iPhone OS 12.3.1//EN
    N:`+this.vcardList['firstname']+`
    FN:`+this.vcardList['firstname']+`
    ORG:`+this.vcardList['company']+`
    ADR:`+this.vcardList['address']+`
    PHOTO;ENCODING=b:`+this.testdata+`
    TEL;CELL;VOICE:`+this.vcardList['mobileno']+`
    EMAIL:`+this.vcardList['emailid']+`
    TITLE:`+this.vcardList['designation']+`
    END:VCARD`;

    const blob = new Blob([vCardData], {
      type: 'text/vcard;charset=utf-8'
    });

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);
    this.storageservice.warningToast('URL: '+url);


    
        // var blob = new window.Blob([vCardData], {
        //   type: 'text/vcard;charset=utf-8;',
        // });
        // window.URL = window.URL || window.webkitURL;
        // var url = window.URL.createObjectURL(blob);
        this.generatedUrl=url;

    var externalDir = "";
    if(this.generatedUrl!=null && this.generatedUrl!=undefined && this.generatedUrl!=''){

    if (this.platform.is('android')) {
    //   this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, , this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
    //   externalDir = this.file.externalRootDirectory;
    // }


    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
    ]).then(() => {
      //externalDir = '/storage/emulated/0/Download/';
      var Name=this.vcardList['firstname'];
      externalDir=this.file.externalRootDirectory+ 'Download/'+Name+'.vcf';
      //this.storageservice.warningToast('Extt: '+externalDir);
      //const url = filePath;
      // const url = this.storageservice.baseURL + filePath;
      const url=this.generatedUrl;
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

      // let fileMIMEType = this.getMIMEtype(fileType);
      // this.fileOpener.showOpenWithDialog(imgPath, fileMIMEType)
      //   .then(() => 
      //   console.log('File is opened')
      //   )
      //   .catch(e => console.log('Error opening file', e));
      
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

  dismiss() {
    this.router.navigate(['/home']);
  }

}
