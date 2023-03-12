import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.page.html',
  styleUrls: ['./job-search.page.scss'],
})

export class JobSearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

}
