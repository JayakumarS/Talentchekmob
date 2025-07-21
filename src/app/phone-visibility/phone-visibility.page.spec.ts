import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneVisibilityPage } from './phone-visibility.page';

describe('PhoneVisibilityPage', () => {
  let component: PhoneVisibilityPage;
  let fixture: ComponentFixture<PhoneVisibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVisibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneVisibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
