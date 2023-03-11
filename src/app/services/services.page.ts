import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  //#region Declaration
  response: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  //#endregion

  //#region Constructor
  constructor(public router: Router, public storageservice: StorageService, private http: HttpClient) { }
  //#endregion

  //#region OnInit
  ngOnInit() {

    var apiurl = "http://192.168.5.100:7080/#/parahrms/accountandfinance/List"
    console.log(apiurl);

    this.http.get(apiurl)
      .subscribe(result => {
        this.response = result;
        console.log(this.response);

        let message = result['message'];
        console.log(message);

        if (result["success"] == true) {

          this.storageservice.successToast(message);
          this.router.navigate(['/talensearch'])
        }
        else (result["success"] == false)
        {
          this.storageservice.warningToast(message)
        }


      });
    /* this.storageservice.getrequestservice('accountandfinance/List').subscribe(result => {
      
      this.response=result;
      console.log(this.response);
  
  if (result["success"] == true) {
       // this.storageservce.successToast(message); 
        this.router.navigate(['/profile'])
  }
  else (result["success"] == false)
  {
     // this.storageservce.warningToast(message)
  }  
  });  */
  }
  //#endregion

  //#region Button events
  goto_seriveslist() {
    /*  this.router.navigate(['/seriveslist']) */
    this.router.navigate(['/sub-services'])
  }
  //#endregion

}
