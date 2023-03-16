import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileVisibilityPage } from './profile-visibility.page';

describe('ProfileVisibilityPage', () => {
  let component: ProfileVisibilityPage;
  let fixture: ComponentFixture<ProfileVisibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVisibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileVisibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
