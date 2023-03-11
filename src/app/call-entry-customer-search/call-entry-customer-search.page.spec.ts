import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallEntryCustomerSearchPage } from './call-entry-customer-search.page';

describe('CallEntryCustomerSearchPage', () => {
  let component: CallEntryCustomerSearchPage;
  let fixture: ComponentFixture<CallEntryCustomerSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntryCustomerSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallEntryCustomerSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
