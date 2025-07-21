import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { HttpClient } from '@angular/common/http';
import { FileTransferObject,FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import * as FileSaver from 'file-saver';
import { Camera } from '@capacitor/camera';

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
    // private androidPermissions: AndroidPermissions,
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

 async downloadVCard() {
  try {
    // STEP A: First, ask for permissions using the Capacitor Camera plugin.
    const permissions = await Camera.requestPermissions({ permissions: ['photos'] });

    if (permissions.photos !== 'granted') {
      this.storageservice.warningToast('Permission is required to save the file.');
      return; // Stop if permission is not granted
    }

    // STEP B: If permission is granted, run your EXISTING File and FileOpener code.
    // This code has not been changed.
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
  
    this.file.writeFile(this.file.dataDirectory, fileName, vCardData, { replace: true })
      .then(fileEntry => {
        const fileUrl = fileEntry.toURL();
        this.fileOpener.open(fileUrl, 'text/vcard')
          .then(() => console.log('File opened successfully'))
          .catch(error => console.error('Error opening file:', error));
      })
      .catch(error => console.error('Error writing file:', error));

  } catch (e) {
    console.error('Permission request failed', e);
    this.storageservice.warningToast('Error requesting permissions.');
  }
}


async fileDownload1() {

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

    const url = URL.createObjectURL(blob);
    this.storageservice.warningToast('URL: '+url);
    this.generatedUrl = url;

    if (this.generatedUrl != null && this.generatedUrl != undefined && this.generatedUrl != '') {

        if (this.platform.is('android')) {
            try {
                // STEP A: Ask for permissions using the Capacitor Camera plugin.
                const permissions = await Camera.requestPermissions({ permissions: ['photos'] });

                if (permissions.photos !== 'granted') {
                    this.storageservice.warningToast('Permission is required to save the file.');
                    return; // Stop if permission is not granted
                }

                // STEP B: If permission is granted, run your EXISTING FileTransfer code.
                var Name = this.vcardList['firstname'];
                var externalDir = this.file.externalRootDirectory + 'Download/' + Name + '.vcf';
                const fileTransfer: FileTransferObject = this.transfer.create();

                fileTransfer.download(this.generatedUrl, externalDir, true, {}).then((entry) => {
                    console.log('download complete: ' + entry.toURL());
                    this.storageservice.warningToast('QR Downloaded Successfully');
                }, (error) => {
                    console.log('Error download file :', error);
                    this.storageservice.warningToast('Error in download');
                });

            } catch (e) {
                console.error('Permission request failed', e);
                this.storageservice.warningToast('Error requesting permissions.');
            }
        }

        if (this.platform.is('ios')) {
            // Your existing iOS logic can go here if needed
        }
        console.log("Inside the download created");

    } else {
        this.storageservice.warningToast('Error in download');
    }
}

  dismiss() {
    this.router.navigate(['/home']);
  }

}
