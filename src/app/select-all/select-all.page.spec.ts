import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAllPage } from './select-all.page';

describe('SelectAllPage', () => {
  let component: SelectAllPage;
  let fixture: ComponentFixture<SelectAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
