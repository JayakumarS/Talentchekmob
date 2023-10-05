import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedContactPage } from './shared-contact.page';

describe('SharedContactPage', () => {
  let component: SharedContactPage;
  let fixture: ComponentFixture<SharedContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
