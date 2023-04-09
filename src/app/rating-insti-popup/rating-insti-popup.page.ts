import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rating-insti-popup',
  templateUrl: './rating-insti-popup.page.html',
  styleUrls: ['./rating-insti-popup.page.scss'],
})
export class RatingInstiPopupPage implements OnInit {


  EducationForm: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  
  constructor(public fb: FormBuilder) { }

  ngOnInit() {

    this.EducationForm= this.fb.group({
    
      remarks: [""],
      rating: [""],
      expId: [""],
      currentUserId: [""]
   });
  }


    ///rating  star
    countStar(star) {
      this.selectedValue = star;
      this.EducationForm.patchValue({
        'rating': this.selectedValue,
        }),
      console.log('Value of star', this.selectedValue);
    }
}
