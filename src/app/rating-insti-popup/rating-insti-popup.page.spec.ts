import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingInstiPopupPage } from './rating-insti-popup.page';

describe('RatingInstiPopupPage', () => {
  let component: RatingInstiPopupPage;
  let fixture: ComponentFixture<RatingInstiPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingInstiPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingInstiPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
