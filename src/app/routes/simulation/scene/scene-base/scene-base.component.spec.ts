import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationSceneBaseComponent } from './scene-base.component';

describe('SimulationSceneBaseComponent', () => {
  let component: SimulationSceneBaseComponent;
  let fixture: ComponentFixture<SimulationSceneBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationSceneBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationSceneBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
