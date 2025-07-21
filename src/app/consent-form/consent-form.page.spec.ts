import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsentFormPage } from './consent-form.page';

describe('ConsentFormPage', () => {
  let component: ConsentFormPage;
  let fixture: ComponentFixture<ConsentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
