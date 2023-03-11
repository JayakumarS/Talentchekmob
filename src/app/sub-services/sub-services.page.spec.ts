import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubServicesPage } from './sub-services.page';

describe('SubServicesPage', () => {
  let component: SubServicesPage;
  let fixture: ComponentFixture<SubServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
