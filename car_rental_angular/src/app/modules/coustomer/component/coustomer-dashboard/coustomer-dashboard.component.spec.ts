import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomerDashboardComponent } from './coustomer-dashboard.component';

describe('CoustomerDashboardComponent', () => {
  let component: CoustomerDashboardComponent;
  let fixture: ComponentFixture<CoustomerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoustomerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
