import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillPopupPage } from './skill-popup.page';

describe('SkillPopupPage', () => {
  let component: SkillPopupPage;
  let fixture: ComponentFixture<SkillPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
