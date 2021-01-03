import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OtaCalibrationComponent } from './calibration.component';

describe('OtaCalibrationComponent', () => {
  let component: OtaCalibrationComponent;
  let fixture: ComponentFixture<OtaCalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtaCalibrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtaCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
