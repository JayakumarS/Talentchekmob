import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.page.html',
  styleUrls: ['./visibility.page.scss'],
})
export class VisibilityPage implements OnInit {
  uls:any =[];
  selectedLang: string;
  delete: any;
  constructor(public router:Router,public languageService:LanguageService) { }

  ngOnInit() {

    this.selectedLang  = localStorage.getItem('selectedLang');
    const storedId = localStorage.getItem('itemKey');
    if (storedId !== null) {
      this.delete = parseInt(storedId, 10);
      console.log(this.delete); 
    }
    this.languageService.setLanguage(this.selectedLang);

    this.uls = document.querySelectorAll("ul");

    this.uls.forEach((ul) => {
      const resetClass = ul.parentNode.getAttribute("class");
      const lis = ul.querySelectorAll("li");

      lis.forEach((li) => {
        li.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.currentTarget;
    
          if (
            target.classList.contains("active") ||
            target.classList.contains("follow")
          ) {
            return;
          }
    
          ul.parentNode.setAttribute(
            "class",
            `${resetClass} ${target.getAttribute("data-where")}-style`
          );
    
          lis.forEach((item) => this.clearClass(item, "active"));
    
          this.setClass(target, "active");
        });
    });
    });
  }

  selectedTab: string = 'menu';

  setSelectedTab(tabName: string) {
    this.selectedTab = tabName;
  }

  clearClass(node, className) {
    node.classList.remove(className);
  }
  
  setClass(node, className) {
    node.classList.add(className);
  }

  profile_vis(){
    this.router.navigate(['/profile-visibility'])
  }

  email_vis(){
    this.router.navigate(['/email-visibility'])
  }

  phone_vis(){
    this.router.navigate(['/phone-visibility'])
  }

  goto_settings(){
    localStorage.removeItem('itemKey');
    this.router.navigate(['/settings']) 

  }

  goto_DeleteAccount(){
    this.router.navigate(['/delete-my-account'])
  }
 
}
