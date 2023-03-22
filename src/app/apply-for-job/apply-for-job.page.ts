import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.page.html',
  styleUrls: ['./apply-for-job.page.scss'],
})
export class ApplyForJobPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
