import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeriveslistPage } from './seriveslist.page';

describe('SeriveslistPage', () => {
  let component: SeriveslistPage;
  let fixture: ComponentFixture<SeriveslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriveslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriveslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
