import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BidsAndAplicationsRecivedPopupPage } from './bids-and-aplications-recived-popup.page';

describe('BidsAndAplicationsRecivedPopupPage', () => {
  let component: BidsAndAplicationsRecivedPopupPage;
  let fixture: ComponentFixture<BidsAndAplicationsRecivedPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidsAndAplicationsRecivedPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BidsAndAplicationsRecivedPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
