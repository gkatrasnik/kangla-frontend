import { Injectable } from '@angular/core';
import { WateringDevice } from './watering-device';

@Injectable({
  providedIn: 'root'
})
export class WateringDeviceService {

  constructor() { }

  wateringDevicesList: WateringDevice[] = [
    {    
      id: 1,
      name: 'My device',
      description: 'My device description',
      location: 'My location',
      notes: 'My notes',
      active: true,
      deleted: false,
      soilHumidity: 0.5,
      lastWatering: new Date(),
      wateringInterval: 300,
      wateringDuration: 3,
      waterNow: false
    },
    {    
      id: 2,
      name: 'My device 2',
      description: 'My device description 2',
      location: 'My location 2',
      notes: 'My notes 2',
      active: true,
      deleted: false,
      soilHumidity: 0.5,
      lastWatering: new Date(),
      wateringInterval: 300,
      wateringDuration: 3,
      waterNow: false
    },
    {    
      id: 3,
      name: 'My device 3',
      description: 'My device description 3',
      location: 'My location 3',
      notes: 'My notes 3',
      active: true,
      deleted: false,
      soilHumidity: 0.5,
      lastWatering: new Date(),
      wateringInterval: 300,
      wateringDuration: 3,
      waterNow: false
    }];

    getAllWateringDevices(): WateringDevice[] {
      return this.wateringDevicesList;
    }

    getWateringDeviceById(id: number): WateringDevice|undefined {
      return this.wateringDevicesList.find(x => x.id === id);
    }
}
