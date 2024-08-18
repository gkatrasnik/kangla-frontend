export interface WateringDeviceResponseDto {
    id: number;
    name: string;
    description?: string;
    location?: string;
    notes?: string;
    active: boolean;
    deleted: boolean;
    waterNow: boolean;
    minimumSoilHumidity: number;
    wateringIntervalSetting: number;
    wateringDurationSetting: number;
    createdAt: Date;
    updatedAt: Date;
    imageId?: number;
}
