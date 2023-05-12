import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

//For using Razorpay
declare var RazorpayCheckout: any;

function _window(): any {
  return window;
}

@Component({
  selector: 'app-subscription-insorg',
  templateUrl: './subscription-insorg.page.html',
  styleUrls: ['./subscription-insorg.page.scss'],
})
export class SubscriptionInsorgPage implements OnInit {

  doRefresh(event) {
    this.BindDefaultCurrencyAsPerCurrentUser();
    setTimeout(() => {
     event.target.complete();
    }, 2000);
 }

  previousUrl: string;

  get nativeWindow(): any {
    return _window();
  }

  userId: string;
  empId: string;

  currencyVal: string;
  currencySymbolVal: string;

  amtProfessionalVal: number;
  amtEnterpriseVal: number;
  amtUltimateVal: number;
  exchangeAmount:any;
  usercountry: string;

  roleId: any;
  RoleID: any;

  constructor(private http: HttpClient,private location: Location,public router:Router, public storageservice: StorageService,private translate: TranslateService) {

    this.userId = localStorage.getItem("userId");

    this.currencyVal = "INR";
    this.amtProfessionalVal = 100;
    this.amtEnterpriseVal = 200;
    this.amtUltimateVal = 1000;
    this.currencySymbolVal = "₹";
    this.BindDefaultCurrencyAsPerCurrentUser();

  }

  ngOnInit() {

   
    this.roleId = localStorage.getItem("roleId");
    this.RoleID =  this.roleId.split(",", 3);

    this.previousUrl = this.location.path();
  }

  BindDefaultCurrencyAsPerCurrentUser() {
    var getCurrencyURL = "api/auth/app/mobile/getCurrenyCodeOfCurrentUser?currentUserId=" + this.userId;
    this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
      var currencyResponse = result[0];
      this.usercountry = result[0]['country'];
      console.log("currencyResponse: " + currencyResponse);
      if (currencyResponse != null) {
        var currency = "INR";
        console.log("In currency: " + currency);

        this.currencyVal = currency;
        if (this.currencyVal == 'INR') {
          this.amtProfessionalVal = 4999;
          this.amtEnterpriseVal = 9999;
          this.amtUltimateVal = 74999;
          this.currencySymbolVal = "₹";
        }
        else if (this.currencyVal == 'USD') {
          this.amtProfessionalVal = 100;
          this.amtEnterpriseVal = 200;
          this.amtUltimateVal = 1000;
          this.currencySymbolVal = "$";
        }
        else if (this.currencyVal == 'AED') {
          this.amtProfessionalVal = 600;
          this.amtEnterpriseVal = 1200;
          this.amtUltimateVal = 3800;
          this.currencySymbolVal = "د.إ";
        }
        else if (this.currencyVal == 'MYR') {
          this.amtProfessionalVal = 400;
          this.amtEnterpriseVal = 800;
          this.amtUltimateVal = 3800;
          this.currencySymbolVal = "RM";
        }
        else if (this.currencyVal == 'SGD') {
          this.amtProfessionalVal = 120;
          this.amtEnterpriseVal = 240;
          this.amtUltimateVal = 1200;
          this.currencySymbolVal = "S$";
        }
        else {
          this.currencyVal = "USD";
          this.amtProfessionalVal = 100;
          this.amtEnterpriseVal = 200;
          this.amtUltimateVal = 1000;
          this.currencySymbolVal = "$";
        }
      }
      else {
        this.currencyVal = "USD";
        this.amtProfessionalVal = 100;
        this.amtEnterpriseVal = 200;
        this.amtUltimateVal = 1000;
        this.currencySymbolVal = "$";
      }
    });
  }

  CurrencyChangeEvent(event) {

    console.log("SelectedValue: " + event.target.value);

    this.currencyVal = event.target.value;
    if (this.currencyVal == 'INR') {
      this.amtProfessionalVal = 4999;
      this.amtEnterpriseVal = 9999;
      this.amtUltimateVal = 74999;
      this.currencySymbolVal = "₹";
    }
    else if (this.currencyVal == 'USD') {
      this.amtProfessionalVal = 100;
      this.amtEnterpriseVal = 200;
      this.amtUltimateVal = 1000;
      this.currencySymbolVal = "$";
    }
    else if (this.currencyVal == 'AED') {
      this.amtProfessionalVal = 600;
      this.amtEnterpriseVal = 1200;
      this.amtUltimateVal = 3800;
      this.currencySymbolVal = "د.إ";
    }
    else if (this.currencyVal == 'MYR') {
      this.amtProfessionalVal = 400;
      this.amtEnterpriseVal = 800;
      this.amtUltimateVal = 3800;
      this.currencySymbolVal = "RM";
    }
    else if (this.currencyVal == 'SGD') {
      this.amtProfessionalVal = 120;
      this.amtEnterpriseVal = 240;
      this.amtUltimateVal = 1200;
      this.currencySymbolVal = "S$";
    }
    else {
      this.amtProfessionalVal = 2499;
      this.amtEnterpriseVal = 3499;
      this.amtUltimateVal = 74999;
      this.currencySymbolVal = "₹";
    }

  }

  payWithRazor(subscriptionType: string) {
    var amountVal = 0;
    var subscriptype = subscriptionType;
    if (subscriptype == "Professional") {
      amountVal = this.amtProfessionalVal;
    }
    else if (subscriptype == "Enterprise") {
      amountVal = this.amtEnterpriseVal;
    }
    else if (subscriptype == "Ultimate") {
      amountVal = this.amtUltimateVal;
    }

    var subscripamt = (amountVal * 100); //To conver to paisa/units
    this.exchangeAmount = amountVal ; // without paisa coversion to in to the table insertions
    let orderURL = "api/auth/app/subscription/payments/Subscriptionpayment";
    var options = {
      "amount": subscripamt,
      "currency": this.currencyVal,
      "receipt": "TALENTCHEK"
    }
    console.log("Order URL: " + orderURL);
    console.log(`Options: ${JSON.stringify(options)}`);

    var orderId: string;
    this.storageservice.postrequest(orderURL, options).subscribe(result => {

      let orId = result['orderid'];
      console.log("OrderId: " + orId);
      orderId = orId;
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
        // 'onCompleted' callback.
        if (orderId != null && orderId != '') {
          var paymentStoreURL = this.storageservice.mobileserverurl + "/api/company/paymentHistoryLiveMob";
          this.payWithRazorOne(paymentStoreURL, orderId, this.userId, subscriptype, this.exchangeAmount ,this.currencyVal);
        }
        else {
          this.storageservice.generalAlertToast("Order Id is empty. Please contact support.");
        }
      }

    );
  }

  payWithRazorOne(paymentStoreURL: string, orderId: string, userId: string, subscriptype: string, subscripamt: number,currency:string) {
    var options = {
      description: 'Talent Chek Payment Transaction',
      image: 'https://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png',
      order_id: orderId,
      currency: this.currencyVal,
      key: 'rzp_test_VTDYOGZm0Ivt3N',
      amount: subscripamt,
      name: 'Talent Chek',
      theme: {
        color: '#fcc33e'
      },
      modal: {
        ondismiss: function () {
          console.log('dismissed');
        }
      }
    };
    localStorage.setItem('currency', this.currencyVal);
    console.log("paymentStore URL: " + paymentStoreURL);
    console.log(`Main Options: ${JSON.stringify(options)}`);

    var successCallback = function (success) {
      alert('Payment success');
      console.log(`Payment success Storing data: ${JSON.stringify(success)}`);
      console.log('payment_id: ' + success.razorpay_payment_id);
      console.log('order_id: ' + success.razorpay_order_id);
      console.log('signature: ' + success.razorpay_signature);

      var myJSONObject = {
        "orderid": success.razorpay_order_id,
        "paymentid": success.razorpay_payment_id,
        "signature": success.razorpay_signature,
        "userId": userId,
        "subscriptype": subscriptype,
        "subscripamt": subscripamt,
        "currency":currency,
        "country":this.usercountry
      }
      console.log(`myJSONObject payment data: ${JSON.stringify(myJSONObject)}`);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", paymentStoreURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(myJSONObject));
      xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(`Completed payment response data: ${JSON.stringify(data)}`);
      };

      var roleId = localStorage.getItem("roleId");

      if(roleId.includes('2'))
      {
        this.router.navigate(['/organization-dashboard']);
      }
      else if(roleId.includes('3')){

        this.router.navigate(['/institution-dashboard']);
      }


    };

    var cancelCallback = function (error) {
      //alert(error.description + ' (Error ' + error.code + ')');
      console.log(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.on('payment.success', successCallback);
    RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(options);

  }

  goto_settings(){
    if (this.previousUrl) {
      this.location.back();
    }
  }

}
