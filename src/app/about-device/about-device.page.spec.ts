import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutDevicePage } from './about-device.page';

describe('AboutDevicePage', () => {
  let component: AboutDevicePage;
  let fixture: ComponentFixture<AboutDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
