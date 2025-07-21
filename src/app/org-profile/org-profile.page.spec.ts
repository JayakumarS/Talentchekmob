import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrgProfilePage } from './org-profile.page';

describe('OrgProfilePage', () => {
  let component: OrgProfilePage;
  let fixture: ComponentFixture<OrgProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrgProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
