import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationSceneManagementComponent } from './scene-management.component';

describe('SimulationSceneManagementComponent', () => {
  let component: SimulationSceneManagementComponent;
  let fixture: ComponentFixture<SimulationSceneManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationSceneManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationSceneManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
