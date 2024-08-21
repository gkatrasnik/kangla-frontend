import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PlantCardComponent } from '../../components/plant-card/plant-card.component';
import { PlantService } from '../../plant.service';
import { Plant } from '../../plant';
import { MatDialog } from '@angular/material/dialog';
import { AddPlantDialogComponent } from '../../components/add-plant-dialog/add-plant-dialog.component';
import { PagedResponse } from '../../../shared/interfaces/paged-response';
import { ImagesService } from '../../../shared/services/images.service';
import { MatIconModule } from '@angular/material/icon';
import { PlantRecognizeResponseDto } from '../../dto/plant-recognize-response-dto';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    PlantCardComponent,
    MatButtonModule,    
    MatIconModule,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  plantsList: Plant[] = [];

  constructor(
    private plantService: PlantService,
    public imagesService: ImagesService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe((response: PagedResponse<Plant>) => {
      this.plantsList = response.data;
    });
  }

  async onImageSelected(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const resizedFile = await this.imagesService.resizeImage(file, 512, 512);
      const formData = new FormData();
      formData.append('image', resizedFile);

      this.plantService.recognizePlant(formData).subscribe({
        next: (recognizedPlant: PlantRecognizeResponseDto) => {
          console.log('Plant recognized:', recognizedPlant);
          if (recognizedPlant.error) {
            this.notificationService.showServerError('Oops', recognizedPlant.error);
            return;
          }
          this.openAddPlantDialog(recognizedPlant);
        },
        error: (err) => {
          //Todo throw error
          console.error('Plant recognition failed:', err);
          this.openAddPlantDialog();
          throw new Error('Plant recognition failed');
        }
      });
    }
  }

  openAddPlantDialog(plantData?: PlantRecognizeResponseDto): void {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      width: '400px',
      data: plantData || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Plant added:', result);
        this.plantService.addPlant(result).subscribe((newPlant: Plant) => {
          this.plantsList.push(newPlant);
        });
      }
    });
  }
}
