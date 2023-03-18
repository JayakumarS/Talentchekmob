import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AwesomePage } from './awesome.page';

describe('AwesomePage', () => {
  let component: AwesomePage;
  let fixture: ComponentFixture<AwesomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwesomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AwesomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
