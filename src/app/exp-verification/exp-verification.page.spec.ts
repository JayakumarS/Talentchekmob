import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpVerificationPage } from './exp-verification.page';

describe('ExpVerificationPage', () => {
  let component: ExpVerificationPage;
  let fixture: ComponentFixture<ExpVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
