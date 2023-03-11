import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  register(value: any) {
    throw new Error('Method not implemented.');
  }

  baseurl: any;
  serverurl: any;
mobileserverurl:string ="http://localhost:8095/Givven";
baseURL:string ="http://localhost:8095/";
//mobileserverurl:string ="https://givven.a-bits.com/Givven";
//baseURL:string ="https://givven.a-bits.com/";
  mobileserverserive: any;
  
  constructor(private http: HttpClient, public toastController: ToastController, public alertController: AlertController) {


  }

  getbaseusrl() {
  

    return this.mobileserverurl;
  }
  postrequest(url, data) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Bearer ' + user_token

    });

    return this.http.post(this.mobileserverurl + url, data, { headers: headers });

  }

  postrequest_WithBaseURL(url, data) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Bearer ' + user_token

    });

    return this.http.post(this.baseURL + url, data, { headers: headers });

  }

  postrequest_AsText(url, data) {

    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      //'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Bearer ' + user_token

    });

    return this.http.post(this.mobileserverurl + url, data, { headers: headers });

  }

  postrequest_GetOrderIdFromRazorPay(url, data) {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',      
      'Authorization': 'Basic ' + 'rzp_test_eqSEPuyDod17Tm:cUf2GhGSxta1Jmnh4IwvMwof'
    });

    return this.http.post(url, data, { headers: headers });
  }

  getrequest_WaitProcess(url): Promise<any> {
    console.log(this.http.get(this.mobileserverurl + url))
    return this.http.get(this.mobileserverurl + url).toPromise();

  }

  //Existing.
  getrequest(url) {
    console.log(this.http.get(this.mobileserverurl + url))
    return this.http.get(this.mobileserverurl + url);

  }

  getrequest_WithBaseURL(url) {
    console.log(this.http.get(this.baseURL + url))
    return this.http.get(this.baseURL + url);

  }

  getrequestservice(url) {
    console.log(this.http.get(this.mobileserverurl + url))
    return this.http.get(this.mobileserverurl + url);

  }
  public async successToast(msg) {
    const toast = await this.toastController.create({
      header: 'Congratulations!',
      color: 'success',
      cssClass: "toast-success",
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public async successToastCustom(header, msg) {
    const toast = await this.toastController.create({
      header: header,
      color: 'success',
      cssClass: "toast-success",
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public async warningToast(msg) {
    const toast = await this.toastController.create({
      header: 'Oops!',
      color: 'warning',
      cssClass: "toast-success",
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public async warningToastCustom(header, msg) {
    const toast = await this.toastController.create({
      header: header,
      color: 'warning',
      cssClass: "toast-success",
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public async generalAlertToast(msg) {
    const toast = await this.toastController.create({
      header: 'Alert!',
      color: 'warning',
      cssClass: "toast-success",
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  public async generalAlertToastGreen(msg) {
    const toast = await this.toastController.create({
      header: 'Alert!',
      color: 'success',
      cssClass: "toast-success",
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  public async generalAlertToastCustom(msg, duration) {
    const toast = await this.toastController.create({
      header: 'Alert!',
      color: 'warning',
      cssClass: "toast-success",
      message: msg,
      duration: duration
    });
    toast.present();
  }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }


  //Common methods
  getProperImageUrl(imageUrl) {
    if (imageUrl.includes(this.baseURL)) {
      return imageUrl;
    }
    else {
      var profileImageURL = this.baseURL + imageUrl;
      return profileImageURL;
    }

  }

  async GeneralAlert(headerText: string, messageText: string) {
    let alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      cssClass: 'alertclass',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async GeneralAlertCus(headerText: string, messageText: string, ok: string, cancel: string) {
    let alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      cssClass: 'alertclass',
      buttons: [
        {
          text: ok,
          role: cancel,
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async GeneralAlertCustom(headerText: string, messageText: string, yesBtnText: string, cancelBtnText: string) {
    let alert = await this.alertController.create({
      header: headerText,
      message: messageText,
      cssClass: 'alertclass',
      buttons: [
        {
          text: cancelBtnText,
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: yesBtnText,
          //cssClass: 'btncss',
          handler: () => {
            console.log('Confirm Okay');
            window.open('market://details?id=com.paragondynamcis.talentcheck', '_system');
          }
        }
      ]
    });

    await alert.present();
  }

}
