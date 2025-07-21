import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TcFormPage } from './tc-form.page';

describe('TcFormPage', () => {
  let component: TcFormPage;
  let fixture: ComponentFixture<TcFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TcFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
