import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelloDearPage } from './hello-dear.page';

describe('HelloDearPage', () => {
  let component: HelloDearPage;
  let fixture: ComponentFixture<HelloDearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloDearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloDearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
