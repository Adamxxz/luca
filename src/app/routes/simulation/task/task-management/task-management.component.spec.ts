import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationTaskManagementComponent } from './task-management.component';

describe('SimulationTaskManagementComponent', () => {
  let component: SimulationTaskManagementComponent;
  let fixture: ComponentFixture<SimulationTaskManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationTaskManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
