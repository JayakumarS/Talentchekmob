import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VcardNewPage } from './vcard-new.page';

describe('VcardNewPage', () => {
  let component: VcardNewPage;
  let fixture: ComponentFixture<VcardNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcardNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VcardNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
