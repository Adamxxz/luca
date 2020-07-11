import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationSceneAnalysisComponent } from './scene-analysis.component';

describe('SimulationSceneAnalysisComponent', () => {
  let component: SimulationSceneAnalysisComponent;
  let fixture: ComponentFixture<SimulationSceneAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationSceneAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationSceneAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
