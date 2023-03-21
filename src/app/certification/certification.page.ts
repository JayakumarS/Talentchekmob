import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {

  certificationForm: FormGroup;

  constructor(public router:Router,public modalController: ModalController,public fb: FormBuilder, public storageservice: StorageService) { }

  ngOnInit() {

    this.certificationForm = this.fb.group({
      certificationName:['', Validators.required],
      issuedBy:['', Validators.required],
      issuedDateObj:['', Validators.required],
      issuedDate:['', Validators.required],
      expiryDateObj:[''],
      expiryDate:[""],
      certificationId:[""],
      uploadCertification:['', Validators.required],
      certId:[""],
      currentUserId:[""]
    })
  }
  clubs()
  {
    this.router.navigate(['/profile/addClubs']) 
  }

  experience()
  {
    this.router.navigate(['/profile/addExperience']) 
  }


  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: SkillsPopupComponent,
  //     event: ev,
  //     translucent: true,
  //     // styles: { height: '200px', width: '300px' },
  //     cssClass: 'my-popup'
  //   });
  //   return await popover.present();
  // }


  async presentModal() {
   const modal = await this.modalController.create({
      component: SkillPopupPage,
      cssClass: 'my-custom-class1'
    });
    return await modal.present();
  }
}
