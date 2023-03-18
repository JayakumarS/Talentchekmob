import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
