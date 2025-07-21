import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tc-form',
  templateUrl: './tc-form.page.html',
  styleUrls: ['./tc-form.page.scss'],
})
export class TcFormPage implements OnInit {

  constructor(public modalController: ModalController, private translate: TranslateService) { }

  ngOnInit() {
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async AgreeAndCloseModal() {
    const onClosedData: any = {
      "IsAgree": "Yes"
    };
    await this.modalController.dismiss(onClosedData);
  }

  async DisAgreeAndCloseModal() {
    const onClosedData: any = {
      "IsAgree": "No"
    };
    await this.modalController.dismiss(onClosedData);
  }

}
