import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMapPage } from './view-map.page';

describe('ViewMapPage', () => {
  let component: ViewMapPage;
  let fixture: ComponentFixture<ViewMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
