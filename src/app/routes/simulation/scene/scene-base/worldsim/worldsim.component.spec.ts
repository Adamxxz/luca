import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationWorldsimComponent } from './worldsim.component';

describe('SimulationWorldsimComponent', () => {
  let component: SimulationWorldsimComponent;
  let fixture: ComponentFixture<SimulationWorldsimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationWorldsimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationWorldsimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
