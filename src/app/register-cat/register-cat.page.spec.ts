import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterCatPage } from './register-cat.page';

describe('RegisterCatPage', () => {
  let component: RegisterCatPage;
  let fixture: ComponentFixture<RegisterCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
