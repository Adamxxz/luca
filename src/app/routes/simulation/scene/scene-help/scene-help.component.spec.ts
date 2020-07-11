import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationSceneHelpComponent } from './scene-help.component';

describe('SimulationSceneHelpComponent', () => {
  let component: SimulationSceneHelpComponent;
  let fixture: ComponentFixture<SimulationSceneHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationSceneHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationSceneHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
