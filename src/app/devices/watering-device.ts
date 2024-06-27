export interface WateringDevice {
    id: number;
    name: string;
    description: string;
    location: string;
    notes: string;
    active: boolean;
    deleted: boolean;
    soilHumidity: number;
    lastWatering: Date;
    waterNow: Boolean;
    wateringInterval: number;
    wateringDuration: number;
}
