import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardIndividualPage } from './dashboard-individual.page';

describe('DashboardIndividualPage', () => {
  let component: DashboardIndividualPage;
  let fixture: ComponentFixture<DashboardIndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardIndividualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
