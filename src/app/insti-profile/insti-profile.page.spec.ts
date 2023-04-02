import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstiProfilePage } from './insti-profile.page';

describe('InstiProfilePage', () => {
  let component: InstiProfilePage;
  let fixture: ComponentFixture<InstiProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstiProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstiProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
