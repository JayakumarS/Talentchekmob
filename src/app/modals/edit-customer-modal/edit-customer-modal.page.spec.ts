import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCustomerModalPage } from './edit-customer-modal.page';

describe('EditCustomerModalPage', () => {
  let component: EditCustomerModalPage;
  let fixture: ComponentFixture<EditCustomerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
