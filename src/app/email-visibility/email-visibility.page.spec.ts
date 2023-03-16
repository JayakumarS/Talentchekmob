import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailVisibilityPage } from './email-visibility.page';

describe('EmailVisibilityPage', () => {
  let component: EmailVisibilityPage;
  let fixture: ComponentFixture<EmailVisibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVisibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVisibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
