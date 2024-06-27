import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringDeviceCardComponent } from './watering-device-card.component';

describe('WateringDeviceCardComponent', () => {
  let component: WateringDeviceCardComponent;
  let fixture: ComponentFixture<WateringDeviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringDeviceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
