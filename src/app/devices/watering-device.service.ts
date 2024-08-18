import { Injectable } from '@angular/core';
import { WateringDevice } from './watering-device';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WateringDeviceResponseDto } from './dto/watering-device-response-dto';
import { PagedResponse } from '../shared/interfaces/paged-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WateringDeviceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllWateringDevices(): Observable<PagedResponse<WateringDevice>> {
    return this.http.get<PagedResponse<WateringDeviceResponseDto>>(`${this.apiUrl}/WateringDevices`)
    .pipe(
      map(response => ({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        data: response.data.map(this.mapResponseDtoToModel)
      }))
    );
  }

  getWateringDeviceById(id: number): Observable<WateringDevice> {
    return this.http.get<WateringDeviceResponseDto>(`${this.apiUrl}/WateringDevices/${id}`)
    .pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  addWateringDevice(wateringDeviceData: FormData) :Observable<WateringDevice> {
    return this.http.post<WateringDeviceResponseDto>(`${this.apiUrl}/WateringDevices`, wateringDeviceData).pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  removeWateringDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/WateringDevices/${id}`)
  }

  updateWateringDevice(id: number, wateringDeviceData: FormData): Observable<WateringDevice> {
    return this.http.put<WateringDeviceResponseDto>(`${this.apiUrl}/WateringDevices/${id}`, wateringDeviceData).pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  private mapResponseDtoToModel(dto: WateringDeviceResponseDto): WateringDevice {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      location: dto.location,
      notes: dto.notes,
      active: dto.active,
      deleted: dto.deleted,
      waterNow: dto.waterNow,
      minimumSoilHumidity: dto.minimumSoilHumidity,
      wateringIntervalSetting: dto.wateringIntervalSetting,
      wateringDurationSetting: dto.wateringDurationSetting,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      imageId: dto.imageId
    };
  }
}
