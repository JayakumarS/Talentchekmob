import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileePage } from './profilee.page';

describe('ProfileePage', () => {
  let component: ProfileePage;
  let fixture: ComponentFixture<ProfileePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
