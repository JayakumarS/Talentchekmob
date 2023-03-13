import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-about-device',
  templateUrl: './about-device.page.html',
  styleUrls: ['./about-device.page.scss'],
})
export class AboutDevicePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  selectedTab: string = 'search';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goto_settings(){
    this.router.navigate(['/settings']) 
  }
}
