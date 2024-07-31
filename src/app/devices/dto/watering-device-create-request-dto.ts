export interface WateringDeviceCreateRequestDto {
    name: string;
    description?: string;
    location?: string;
    notes?: string;
    minimumSoilHumidity: number;
    wateringIntervalSetting: number;
    wateringDurationSetting: number;
    deviceToken: string;
}
