import { Component, HostBinding, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vcard-new',
  templateUrl: './vcard-new.page.html',
  styleUrls: ['./vcard-new.page.css'],
})
export class VcardNewPage implements OnInit {

  decryptRequestId: any;
  decryptRequestId2: any;
  vcardList:any;
  talentId: string;
  logo2path:string;
  logo1path:string;
  profileimg:string;
  socials2Link:boolean = false;
  socials1Link:boolean = false;
  socials3Link:boolean = false;
  @HostBinding("style.--headercolor") headercolor: any = '';
  @HostBinding("style.--bottomcolor") bottomcolor: any = '';
  @HostBinding("style.--fontcolor") fontcolor: any = '';

  expId:number;
  imagePath:string;

  expIdstr:String;


  card: any;
  vCardData : "";

  replacementencodedURl:string;
  replacementDetails:any;
  replacementList:any[];

  isReplacement:boolean = false;
  isValid:boolean;
  uploadBrochure:any;
  filePath:any;

  testdata:any;
  vcardViewtype: String;
  viewvcardId : number;

  firstTime:Boolean = false;

  constructor(public storageservice: StorageService, public route: ActivatedRoute) {


    if (this.route && this.route.queryParams) {
      this.route.paramMap.subscribe(params => {
      //  this.param1 = params.get('param1');
        console.log('param1:', params);
        this.talentId = params.get('param1');
        this.expId = parseInt(params.get('param2'));
        this.getVcarddetails();
       
      });
    }

   }

  ngOnInit() {

  //  this.expId = 144;

   // this.getVcarddetails();

    this.filePath = this.storageservice.mobileserverurl;
    this.imagePath = this.storageservice.mobileserverurl;

  }


  getVcarddetails(){


    var countryURL = "api/auth/app/VisitingCard/viewVcardDetails";
    const vcardView = this.storageservice.getrequest(countryURL + "?expId=" + this.expId).subscribe(result => {
      console.log(result);
      this.vcardList=result['visitingCardBean'];
      this.uploadBrochure = this.vcardList.uploadBrochure;
      this.headercolor = this.vcardList['headercolor'];
      this.bottomcolor = this.vcardList['bottomcolor'];
      this.fontcolor = this.vcardList['fontcolor'];

      this.logo2path=this.storageservice.mobileserverurl+result['visitingCardBean'].logo2path;
      this.logo1path = this.storageservice.mobileserverurl+result['visitingCardBean'].logo1path;
      this.profileimg = this.storageservice.mobileserverurl+result['visitingCardBean'].profileimg;
  
      console.log(this.vcardList);
      console.log(this.vcardList['firstname'].replace(/\s/g, ""));

      if(!this.vcardList.websiteLink.startsWith("https://")){

      this.vcardList.websiteLink = "https://"+this.vcardList.websiteLink

      }




    });


 }

}
