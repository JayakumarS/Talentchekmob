import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from '../language.service';

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
  selectedLang: string;


  isdiscount: boolean = false;

disCountstandardAmount :any;
disCountProfessionalAmount :any;
disCountEnterpriceAmount :any;
disCountUltimateAmount :any;

UltimatecountAmt :any;  
UltimateDiscPer :any; 
UltimateDiscount :boolean = false; 
EnterpricecountAmt :any;  
EnterpriceDiscPer :any; 
EnterpriceDiscount :boolean =false; 
ProfessionalcountAmt :any;  
ProfessionalDiscPer :any; 
ProfessionalDiscount :boolean = false; 
standardcountAmt :any;  
standardDiscPer :any; 
standardDiscount :boolean = false;

UltimatecountAmt1 :any;  
EnterpricecountAmt1 :any;  
ProfessionalcountAmt1 :any; 
standardcountAmt1 :any; 

  roleId: any;
  RoleID: any;

  constructor(private http: HttpClient,private location: Location,public router:Router,private languageService: LanguageService,
     public storageservice: StorageService,private translate: TranslateService) {

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
    this.selectedLang  = localStorage.getItem('selectedLang');
    this.languageService.setLanguage(this.selectedLang);
  }

  BindDefaultCurrencyAsPerCurrentUser() {
    var getCurrencyURL = "api/auth/app/mobile/getCurrenyCodeOfCurrentUser?currentUserId=" + this.userId;
    this.storageservice.getrequest(getCurrencyURL).subscribe(result => {
      var currencyResponse = result[0];
      this.usercountry = result[0]['country'];
      console.log("currencyResponse: " + currencyResponse);
      if (currencyResponse != null) {
        var currency = this.usercountry;
        console.log("In currency: " + currency);

        this.currencyVal = currency;
        if (this.currencyVal == 'INR') {
          this.amtProfessionalVal = 4999;
          this.amtEnterpriseVal = 9999;
          this.amtUltimateVal = 74999;
          this.currencySymbolVal = "₹";
        }
        else if (this.currencyVal == 'USD') {
          // this.amtProfessionalVal = 100;
          // this.amtEnterpriseVal = 200;
          // this.amtUltimateVal = 1000;
          this.amtProfessionalVal = 200;
          this.amtEnterpriseVal = 800;
          this.amtUltimateVal = 2000;
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
          // this.amtProfessionalVal = 100;
          // this.amtEnterpriseVal = 200;
          // this.amtUltimateVal = 1000;
          this.amtProfessionalVal = 200;
          this.amtEnterpriseVal = 800;
          this.amtUltimateVal = 2000;
          this.currencySymbolVal = "$";
        }
      }
      else {
        this.currencyVal = "USD";
        // this.amtProfessionalVal = 100;
        // this.amtEnterpriseVal = 200;
        // this.amtUltimateVal = 1000;
        this.amtProfessionalVal = 200;
        this.amtEnterpriseVal = 800;
        this.amtUltimateVal = 2000;
        this.currencySymbolVal = "$";
      }

      this.checkDiscount();
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
      // this.amtProfessionalVal = 100;
      // this.amtEnterpriseVal = 200;
      // this.amtUltimateVal = 1000;
      this.amtProfessionalVal = 200;
      this.amtEnterpriseVal = 800;
      this.amtUltimateVal = 2000;
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

    this.checkDiscount();

  }


  checkDiscount(){


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
		  						
  if(discount.packagetype =='Professional'){
       this.disCountProfessionalAmount = 499900;
     }
     else if(discount.packagetype =='Enterprise'){
       this.disCountEnterpriceAmount = 999900;
     }
     else if(discount.packagetype =='Ultimate'){
       this.disCountUltimateAmount = 7499900;
     }
   
 }
 else if (this.currencyVal  == 'USD'){
   
   if(discount.packagetype =='Professional'){
         this.disCountProfessionalAmount = 10000;
       }
       else if(discount.packagetype =='Enterprise'){
         this.disCountEnterpriceAmount = 20000;
       }
       else if(discount.packagetype =='Ultimate'){
         this.disCountUltimateAmount = 100000;
       }		  						
 }
 
 else if(this.currencyVal  == 'AED'){
   
if(discount.packagetype =='Professional'){
       this.disCountProfessionalAmount = 40000;
     }
     else if(discount.packagetype =='Enterprise'){
       this.disCountEnterpriceAmount = 80000;
     }
     else if(discount.packagetype =='Ultimate'){
       this.disCountUltimateAmount = 380000;
     }	
   
 }
 
 else if (this.currencyVal  == 'MYR' ){
  if(discount.packagetype =='Professional'){
       this.disCountProfessionalAmount = 40000;
     }
     else if(discount.packagetype =='Enterprise'){
      this.disCountEnterpriceAmount = 80000;
     }
     else if(discount.packagetype =='Ultimate'){
       this.disCountUltimateAmount = 380000;
     }
 }
 
 
 if(discount.packagetype =='Professional'){
    if(this.currencyVal =='INR'){
    this.disCountProfessionalAmount = 4999*100;
    discount.ProfessionalexAmount=  4999;
   }else if (this.currencyVal =='USD'){
     this.disCountProfessionalAmount = 100*100;
      discount.ProfessionalexAmount=  200;
   }else if (this.currencyVal == 'AED'){
     this.disCountProfessionalAmount = 40000;
     discount.ProfessionalexAmount=  400;
   }else if (this.currencyVal == 'MYR'){
     this.disCountProfessionalAmount = 40000;
    discount.ProfessionalexAmount=  400;
   }else if (this.currencyVal == 'SGD'){
     this.disCountProfessionalAmount = 12000;
     discount.ProfessionalexAmount=  120;
   }
  }
  else if(discount.packagetype =='Enterprise'){
    if(this.currencyVal =='INR'){
    this.disCountEnterpriceAmount = 9999*100;
    discount.EnterpriceexAmount=9999;
   }else if (this.currencyVal =='USD'){
     this.disCountEnterpriceAmount = 20000;
     discount.EnterpriceexAmount= 800;
   }else if (this.currencyVal == 'AED'){
     this.disCountEnterpriceAmount = 80000;
     discount.EnterpriceexAmount=  800;
   }else if (this.currencyVal == 'MYR'){
     this.disCountEnterpriceAmount = 80000;
      discount.EnterpriceexAmount= 800;
   }else if (this.currencyVal == 'SGD'){
     this.disCountEnterpriceAmount =  24000;
     discount.EnterpriceexAmount= 240;
   }
  }
  else if(discount.packagetype =='Ultimate'){
    if(this.currencyVal =='INR'){
    this.disCountUltimateAmount = 74999*100;
    discount.UltimateexAmount= 74999;
   }else if (this.currencyVal =='USD'){
     this.disCountUltimateAmount =  100000;
     discount.UltimateexAmount= 2000;
   }else if (this.currencyVal == 'AED'){
     this.disCountUltimateAmount = 380000;
     discount.UltimateexAmount= 3800;
   }else if (this.currencyVal == 'MYR'){
     this.disCountUltimateAmount = 380000;
     discount.UltimateexAmount=3800;
   }else if (this.currencyVal == 'SGD'){
     this.disCountUltimateAmount = 120000;
     discount.UltimateexAmount= 1200;
   }
  }
  
  if(discount.packagetype == 'Ultimate'){
    
   this.UltimatecountAmt =  Math.floor(discount.UltimateexAmount - ( discount.UltimateexAmount * discount.discountPercentage/100 ));
   this.UltimateDiscPer = discount.discountPercentage;
   this.UltimateDiscount = true;
   this.UltimatecountAmt1 = this.UltimatecountAmt;

   if(this.currencyVal =='INR'){
    this.UltimatecountAmt ;
    this.currencySymbolVal = '₹';
    }else if (this.currencyVal =='USD'){
      this.UltimatecountAmt ;
      this.currencySymbolVal = '$';
    }else if (this.currencyVal == 'AED'){
      this.UltimatecountAmt ;
      this.currencySymbolVal ='د.إ';
    }else if (this.currencyVal == 'MYR'){
      this.UltimatecountAmt ;
      this.currencySymbolVal = 'RM';
    }else if (this.currencyVal == 'SGD'){
      this.UltimatecountAmt ;
      this.currencySymbolVal = 'S$';
   }
   
  }
  else if (discount.packagetype == 'Enterprise'){
    
    this.EnterpricecountAmt =  Math.floor(discount.EnterpriceexAmount - ( discount.EnterpriceexAmount *discount.discountPercentage/100 ));
    this.EnterpriceDiscPer = discount.discountPercentage;
    this.EnterpriceDiscount = true;

    this.EnterpricecountAmt1 = this.EnterpricecountAmt;

    if(this.currencyVal =='INR'){
      this.EnterpricecountAmt ;
      this.currencySymbolVal = '₹';
      }else if (this.currencyVal =='USD'){
        this.EnterpricecountAmt ;
        this.currencySymbolVal = '$';
      }else if (this.currencyVal == 'AED'){
        this.EnterpricecountAmt ;
        this.currencySymbolVal ='د.إ';
      }else if (this.currencyVal == 'MYR'){
        this.EnterpricecountAmt ;
        this.currencySymbolVal = 'RM';
      }else if (this.currencyVal == 'SGD'){
        this.EnterpricecountAmt ;
        this.currencySymbolVal = 'S$';
     }
  }
  else if (discount.packagetype == 'Professional'){
 
  this.ProfessionalcountAmt =  Math.floor(discount.ProfessionalexAmount - ( discount.ProfessionalexAmount *discount.discountPercentage/100 )); 
  this.ProfessionalDiscPer = discount.discountPercentage;
  this.ProfessionalDiscount = true;
  this.ProfessionalcountAmt1 =  this.ProfessionalcountAmt;

  if(this.currencyVal =='INR'){
    this.ProfessionalcountAmt ;
    this.currencySymbolVal = '₹';
    }else if (this.currencyVal =='USD'){
      this.ProfessionalcountAmt ;
      this.currencySymbolVal = '$';
    }else if (this.currencyVal == 'AED'){
      this.ProfessionalcountAmt ;
      this.currencySymbolVal ='د.إ';
    }else if (this.currencyVal == 'MYR'){
      this.ProfessionalcountAmt ;
      this.currencySymbolVal ='RM';
    }else if (this.currencyVal == 'SGD'){
      this.ProfessionalcountAmt ;
      this.currencySymbolVal = 'S$';
   }

    
  }
           


}

      }
    });

  }

  payWithRazor(subscriptionType: string) {
    var amountVal = 0;
    var subscriptype = subscriptionType;

if(this.isdiscount == true){
  if (subscriptype == "Professional" && this.ProfessionalDiscount == true) {
    amountVal = this.ProfessionalcountAmt;
  }
  else if(subscriptype == "Professional" && this.ProfessionalDiscount == false){
    amountVal = this.amtProfessionalVal;
  }
  else if (subscriptype == "Enterprise" && this.EnterpriceDiscount == true) {
    amountVal = this.EnterpricecountAmt;
  }
  else if(subscriptype == "Enterprise" && this.EnterpriceDiscount == false){
    amountVal = this.amtEnterpriseVal;
  }
  else if (subscriptype == "Ultimate" && this.UltimateDiscount == true) {
    amountVal = this.UltimatecountAmt;
  }
  else if(subscriptype == "Ultimate" && this.UltimateDiscount == false){
    amountVal = this.amtUltimateVal;
  }

}
else{

  if (subscriptype == "Professional") {
    amountVal = this.amtProfessionalVal;
  }
  else if (subscriptype == "Enterprise") {
    amountVal = this.amtEnterpriseVal;
  }
  else if (subscriptype == "Ultimate") {
    amountVal = this.amtUltimateVal;
  }

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
      key: 'rzp_live_ABLgrHfsy2Fhkb',
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
