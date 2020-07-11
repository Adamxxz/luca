import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationLogsimComponent } from './logsim.component';

describe('SimulationLogsimComponent', () => {
  let component: SimulationLogsimComponent;
  let fixture: ComponentFixture<SimulationLogsimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationLogsimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationLogsimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
