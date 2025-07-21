import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingExtraPopupPage } from './rating-extra-popup.page';

describe('RatingExtraPopupPage', () => {
  let component: RatingExtraPopupPage;
  let fixture: ComponentFixture<RatingExtraPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingExtraPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingExtraPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
