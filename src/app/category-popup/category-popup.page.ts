import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.page.html',
  styleUrls: ['./category-popup.page.scss'],
})
export class CategoryPopupPage implements OnInit {
  categoryList: any;
  productArr=[];
  CategoryForm: FormGroup;
  product:any;
  categoryupdate: any;
  checkedList: any[];
  userId: string;
  constructor(public storageservice:StorageService,private fb: FormBuilder,public router:Router,private toastController: ToastController,) {

    this.CategoryForm = this.fb.group({
      category: [""],
      currentUserId:[""],
      })
   }
checked = false;
  ngOnInit() {

    this.userId = localStorage.getItem("userId");
    this.getIndustry();

  }


   //categorylist
   getIndustry(){
    var getcategoryListUrl= "api/auth/app/CommonUtility/categoryList";
       
    this.storageservice.getrequest(getcategoryListUrl).subscribe(result => {
     if (result["success"] == true) {
      this.categoryList = result["categoryList"]; 
     }
   });
  }


  getProoduct(e, product){
 
    if(e.isTrusted)
    {
      if(this.productArr.length == 0){
        this.productArr.push(product.id);
        console.log(this.productArr);
        return;
      }else{
        const matches = this.productArr.filter(item => item == product.id);
        if(matches.length > 0){
          this.productArr.splice(this.productArr.indexOf(product.id), 1);
          console.log(this.productArr);
        }else{
          this.productArr.push(product.id);
          console.log(this.productArr);
        }
      }
    }
    else
    {
       this.productArr.splice(this.productArr.indexOf(product.id), 1);  
    }
 }

 savecategory(){
  this.checkedList = this.productArr;
  this.CategoryForm.value.category = this.checkedList.toString();
  this.CategoryForm.value.currentUserId = this.userId;
 this.categoryupdate= this.CategoryForm.value;
 
 var updateCategory = "api/auth/app/registration/updatecategory";

 this.storageservice.postrequest(updateCategory, this.categoryupdate).subscribe(async result => {
   if (result["success"] == true) {
    localStorage.setItem('categoryType', this.categoryupdate.category);
       this.presentToast()
     }else{  

     }
  
 
 });
}


async presentToast() {
  const toast = await this.toastController.create({
    message: 'Saved Successfully',
    duration: 100,
    cssClass: 'custom-toast'
  });
  this.router.navigate(['/home']);  
 await toast.present();
}
}
