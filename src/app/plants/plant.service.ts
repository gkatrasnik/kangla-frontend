import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantResponseDto } from './dto/plant-response-dto';
import { PagedResponse } from '../shared/interfaces/paged-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PlantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPlants(): Observable<PagedResponse<Plant>> {
    return this.http.get<PagedResponse<PlantResponseDto>>(`${this.apiUrl}/Plants`)
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

  getPlantById(id: number): Observable<Plant> {
    return this.http.get<PlantResponseDto>(`${this.apiUrl}/Plants/${id}`)
    .pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  addPlant(plantData: FormData) :Observable<Plant> {
    return this.http.post<PlantResponseDto>(`${this.apiUrl}/Plants`, plantData).pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  removePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Plants/${id}`)
  }

  updatePlant(id: number, plantData: FormData): Observable<Plant> {
    return this.http.put<PlantResponseDto>(`${this.apiUrl}/Plants/${id}`, plantData).pipe(
      map(this.mapResponseDtoToModel)
    );
  }

  private mapResponseDtoToModel(dto: PlantResponseDto): Plant {
    return {
        id: dto.id,
        name: dto.name,
        scientificName: dto.scientificName,
        description: dto.description,
        location: dto.location,
        notes: dto.notes,
        wateringInterval: dto.wateringInterval,
        wateringInstructions: dto.wateringInstructions,
        wateringDeviceId: dto.wateringDeviceId,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        imageId: dto.imageId
    };
  }
}
