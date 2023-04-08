import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EduVerificationPage } from './edu-verification.page';

describe('EduVerificationPage', () => {
  let component: EduVerificationPage;
  let fixture: ComponentFixture<EduVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EduVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
