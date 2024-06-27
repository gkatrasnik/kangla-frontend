import { TestBed } from '@angular/core/testing';

import { WateringDeviceService } from './watering-device.service';

describe('WateringDeviceService', () => {
  let service: WateringDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WateringDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
