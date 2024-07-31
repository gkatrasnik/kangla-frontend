export interface WateringDeviceUpdateRequestDto {
    name: string;
    description?: string;
    location?: string;
    notes?: string;
    waterNow: boolean;
    minimumSoilHumidity: number;
    wateringIntervalSetting: number;
    wateringDurationSetting: number;
}
