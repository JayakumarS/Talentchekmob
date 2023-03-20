import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  certifications()
  {
    this.router.navigate(['/profile/addCertifications']) 
  }
  connections()
  {
    this.router.navigate(['/profile/addConnections']) 
  }
}
