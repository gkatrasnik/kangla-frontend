import { Component, inject } from '@angular/core';
import { PlantService } from '../../plant.service';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../../plant';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditPlantDialogComponent } from '../../components/edit-plant-dialog/edit-plant-dialog.component';
import { ConfirmDialogComponent } from  '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from '../../../shared/interfaces/dialog-data';
import { ImagesService } from '../../../shared/services/images.service';
import { ImageSrcDirective } from '../../../core/directives/imagesrc.directive';
import { WateringEventService } from '../../../watering-events/watering-event.service';
import { WateringEvent } from '../../../watering-events/watering-event';
import { PagedResponse } from '../../../shared/interfaces/paged-response';
import { WateringEventsTableComponent } from '../../../watering-events/components/watering-events-table/watering-events-table.component';
import { MatCardModule } from '@angular/material/card';
import { WateringEventCreateRequestDto } from '../../../watering-events/dto/watering-event-create-request-dto';
import { NotificationService } from '../../../core/notifications/notification.service';
import { WateringOverdueIndicatorComponent } from '../../../shared/components/watering-overdue-indicator/watering-overdue-indicator.component';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ 
    MatButtonModule, 
    MatIconModule, 
    ImageSrcDirective, 
    WateringEventsTableComponent, 
    MatCardModule, 
    MatBadgeModule,
    WateringOverdueIndicatorComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  plantId = -1;
  plant: Plant | undefined;
  wateringEvents: WateringEvent[] = [];
  wateringButtonDisabled = false;

  constructor(
    private router: Router, 
    private location: Location,
    public plantService: PlantService,
    public imagesService: ImagesService,
    private wateringEventService: WateringEventService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    this.plantId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.loadPlantAndWateringEvents();
  }

  loadPlantAndWateringEvents(): void {
    this.loadPlant();
    this.loadWateringEvents();
  }

  loadPlant(): void {
    this.plantService.getPlantById(this.plantId).subscribe((data: Plant) => {
      this.plant = data;
    });
  }

  loadWateringEvents(): void {
    this.wateringEventService.getAllWateringEventsByPlantId(this.plantId, 1, 10).subscribe((pagedResponse: PagedResponse<WateringEvent>) => {
      this.wateringEvents = pagedResponse.data;
    });
  }

  removePlant(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Plant',
        message: 'Are you sure you want to remove this plant?'
      } as DialogData
    });         

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Plant removed:', result);
        this.plantService.removePlant(this.plantId).subscribe(() => {
          this.router.navigate(['/home'], { replaceUrl: true });          
        });        
      }
    });
  }

  editPlant(): void {
    const dialogRef = this.dialog.open(EditPlantDialogComponent, {      
      data: this.plant
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.plantService.updatePlant(this.plantId, result).subscribe((updatedPlant: Plant) => {
          this.plant = updatedPlant;
        });
      }
    });
  }

  goBack() {
    this.location.back();
  } 

  triggerWatering() {
    const start = new Date();
    const end = new Date(start.getTime() + 10000); // End time 10 seconds after start

    if (!this.plant) {
      return;
    }

    const wateringEvent: WateringEventCreateRequestDto = {
      plantId: this.plant.id,
      start: start,
      end: end
    };

    this.wateringEventService.addWateringEvent(wateringEvent).subscribe({
      next: (response) => {
        console.log('Watering event created:', response);
        this.loadWateringEvents();
        this.notificationService.showNonErrorSnackBar('Watering event added');
        this.plant!.lastWateringDateTime = new Date();
        this.wateringButtonDisabled = true;
      },
      error: (error) => {
        console.error('Error creating watering event', error);
      }
    });
  }

  isWateringOverdue(): boolean {
    if (!this.plant) {
      return true;
    }
    return this.plantService.isWateringOverdue(this.plant);
  }

}
