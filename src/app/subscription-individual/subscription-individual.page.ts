import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from '../language.service';

//For using Razorpay
declare var RazorpayCheckout: any;

function _window(): any {
  return window;
}

@Component({
  selector: 'app-subscription-individual',
  templateUrl: './subscription-individual.page.html',
  styleUrls: ['./subscription-individual.page.scss'],
})
export class SubscriptionIndividualPage implements OnInit {

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

  currencyVal: string;
  amountVal: number;
  currencySymbolVal: string;

  userId: string;
  empId: string;
  usercountry: string;

  isdiscount: boolean = false;
  disCountstandardAmount :any;
  standardcountAmt :any;  
  standardDiscPer :any; 
  standardDiscount :boolean = false; 
  standardcountAmt1 :any; 
  selectedLang: string;

  constructor(private http: HttpClient,private location: Location,private languageService: LanguageService,
    public router:Router, public storageservice: StorageService, private translate: TranslateService) {

    this.userId = localStorage.getItem("userId");
    this.currencyVal = "USD";
    this.amountVal = 10;
    this.currencySymbolVal = "$";

    this.BindDefaultCurrencyAsPerCurrentUser();
   }

  ngOnInit() {
    this.previousUrl = this.location.path();

    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
  }


 

  CurrencyChangeEvent(event) {

    console.log("SelectedValue: " + event.target.value);

    this.currencyVal = event.target.value;
    if (this.currencyVal == 'INR') {
      this.amountVal = 100;
      this.currencySymbolVal = "₹";
    }
    else if (this.currencyVal == 'USD') {
      this.amountVal = 10;
      this.currencySymbolVal = "$";
    }
    else if (this.currencyVal == 'AED') {
      this.amountVal = 10;
      this.currencySymbolVal = "د.إ";
    }
    else if (this.currencyVal == 'MYR') {
      this.amountVal = 10;
      this.currencySymbolVal = "RM";
    }
    else if (this.currencyVal == 'SGD') {
      this.amountVal = 10;
      this.currencySymbolVal = "S$";
    }
    else {
      this.amountVal = 100;
      this.currencyVal = "INR";
      this.currencySymbolVal = "₹";
    }

    this.checkDiscount();

  }

  //discount code

  checkDiscount() {

    var getCurrencyURL = "api/auth/app/PaymentInfo/getDiscount?talentId=" + this.userId;
    this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
    console.log(result);
    let discount = {
      packagetype:'',
      discountPercentage:0,
      referalCode:'',
      amount:0,
        receipt:'TALENTCHEK',
        standardexAmount: 0,
        ProfessionalexAmount:0,
        UltimateexAmount:0,
        EnterpriceexAmount:0,
        standardAmount:'',
        ProfessionalAmount:'',  
        UltimateAmount:'',
        EnterpriceAmount:''
     }

     if(result['success'] == true){

      this.isdiscount = true ;

      for( var i=0 ; i < result['discountList'].length ; i++){

        discount.packagetype = result['discountList'][i].packageType ;
        discount.discountPercentage = result['discountList'][i].discountPercentage ;
        discount.referalCode = result['discountList'].referalCode ;
      

        if( this.currencyVal  == 'INR'){

          if(discount.packagetype =='Standard'){
            this.disCountstandardAmount = 10000;
           }
         }
         else if (this.currencyVal  == 'USD'){
          if(discount.packagetype =='Standard'){
            this.disCountstandardAmount = 1000;
            }
         }
        else if(this.currencyVal  == 'AED'){
        if(discount.packagetype  =='Standard'){
        this.disCountstandardAmount = 1000;
        }

        
      }
      else if (this.currencyVal  == 'MYR' ){
   
        if(discount.packagetype  =='Standard'){
          this.disCountstandardAmount = 1000;
        }

      }


      
  if(discount.packagetype =='Standard'){
    if(this.currencyVal =='INR'){
      this.disCountstandardAmount = 100 *100;
       discount.standardexAmount = 100;
     }else if (this.currencyVal =='USD'){
      this.disCountstandardAmount = 1000;
       discount.standardexAmount =10;
     }else if (this.currencyVal == 'AED'){
      this.disCountstandardAmount = 1000;
       discount.standardexAmount = 10;
     }else if (this.currencyVal == 'MYR'){
      this.disCountstandardAmount = 1000;
      discount.standardexAmount = 10;
     }else if (this.currencyVal == 'SGD'){
      this.disCountstandardAmount = 1000;
         discount.standardexAmount = 10;
     }
  }

  if (discount.packagetype == 'Standard'){
   
    this.standardcountAmt =  Math.floor(discount.standardexAmount - ( discount.standardexAmount * discount.discountPercentage/100 )); 
    this.standardDiscPer = discount.discountPercentage;
    this.standardDiscount = true;
    this.standardcountAmt1 = this.standardcountAmt;
  
    if(this.currencyVal =='INR'){
      this.standardcountAmt 
      this.currencySymbolVal = "₹"; 
      }else if (this.currencyVal =='USD'){
        this.standardcountAmt ;
        this.currencySymbolVal = "$";
      }else if (this.currencyVal == 'AED'){
        this.standardcountAmt ;
        this.currencySymbolVal ='د.إ';
      }else if (this.currencyVal == 'MYR'){
        this.standardcountAmt ;
        this.currencySymbolVal ='RM';
      }else if (this.currencyVal == 'SGD'){
        this.standardcountAmt ;
        this.currencySymbolVal = 'S$';
     }
      
    } }
    }


    }); 
  }




  BindDefaultCurrencyAsPerCurrentUser() {
    var getCurrencyURL = "api/auth/app/mobile/getCurrenyCodeOfCurrentUser?currentUserId=" + this.userId;
    this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
      var currencyResponse = result[0];
      this.usercountry = result[0]['country'];
      console.log("currencyResponse: " + currencyResponse);
      if (currencyResponse != null) {
        var currency = currencyResponse["currency"];
        console.log("In currency: " + currency);

        this.currencyVal = currency;
        if (this.currencyVal == 'INR') {
          this.amountVal = 100;
          this.currencySymbolVal = "₹";
        }
        else if (this.currencyVal == 'USD') {
          this.amountVal = 10;
          this.currencySymbolVal = "$";
        }
        else if (this.currencyVal == 'AED') {
          this.amountVal = 10;
          this.currencySymbolVal = "د.إ";
        }
        else if (this.currencyVal == 'MYR') {
          this.amountVal = 10;
          this.currencySymbolVal = "RM";
        }
        else if (this.currencyVal == 'SGD') {
          this.amountVal = 10;
          this.currencySymbolVal = "S$";
        }
        else {
          this.currencyVal = "USD";
          this.amountVal = 10;
          this.currencySymbolVal = "$";
        }
      }
      else {
        this.currencyVal = "USD";
        this.amountVal = 10;
        this.currencySymbolVal = "$";
      }

      this.checkDiscount();
    });
  }

  payWithRazorStandard() {

    if(this.isdiscount == true){
      this.amountVal = this.standardcountAmt;
    }

    var subscripamt = (this.amountVal * 100); //To conver to paisa/units
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
          var paymentStoreURL = this.storageservice.mobileserverurl +"api/auth/app/subscription/payments/paymentHistory";
          var subscriptype = "Standard";
          this.payWithRazorOne(paymentStoreURL, orderId, this.userId, subscriptype, subscripamt);
        }
        else {
          this.storageservice.generalAlertToast("Order Id is empty. Please contact support.");
        }
      }

    );
  }

  payWithRazorOne(paymentStoreURL: string, orderId: string, userId: string, subscriptype: string, subscripamt: number) {
    var options = {
      description: 'Talent Chek Payment Transaction',
      image: 'https://talentchek.com/wp-content/uploads/2021/02/TalentChekLogo_v1.png',
      order_id: orderId,
      currency: this.currencyVal,
      key: 'rzp_live_ABLgrHfsy2Fhkb', //For Test
      // key: 'rzp_live_ABLgrHfsy2Fhkb', //For Live
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
    console.log(localStorage.getItem("currency"));
    console.log("paymentStore URL: " + paymentStoreURL);
    console.log(`Main Options: ${JSON.stringify(options)}`);

    var successCallback = function (success) {
      alert('Payment success');
      console.log(`Payment success Storing data: ${JSON.stringify(success)}`);
      console.log('payment_id: ' + success.razorpay_payment_id);
      console.log('order_id: ' + success.razorpay_order_id);
      console.log('signature: ' + success.razorpay_signature);

      var payhistory = {
        "orderid":success.razorpay_order_id,
        "paymentid":success.razorpay_payment_id,
        "signature":success.razorpay_signature,
        "subscriptype":subscriptype,
        "subscripamt":subscripamt,
        "userId":localStorage.getItem("userId"),
        "country":localStorage.getItem("countryCode"),
        "currency":localStorage.getItem("currency"),
        "userName":localStorage.getItem("userName"),
        "email":localStorage.getItem("email")
      }
      console.log(`myJSONObject payment data: ${JSON.stringify(payhistory)}`);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", paymentStoreURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(payhistory));
      xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        console.log(`Completed payment response data: ${JSON.stringify(data)}`);
      };

    };
    this.router.navigate(['/home']);
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

   // footer
   goto_profileSearch(){
    this.router.navigate(['/job-search']);
  }
  goto_jobs(){
    this.router.navigate(['/job']);
  }
  goto_home(){
    this.router.navigate(['/home']);
  }
  goto_profile(){
    this.router.navigate(['/profile-view']);
  }
  goto_more(){
    this.router.navigate(['/settings']);
  }

}