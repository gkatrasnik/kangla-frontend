import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Plant } from '../../plant';
import { ImageSrcDirective } from '../../../core/directives/imagesrc.directive';
import { WateringEventCreateRequestDto } from '../../../watering-events/dto/watering-event-create-request-dto';
import { WateringEventService } from '../../../watering-events/watering-event.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, ImageSrcDirective],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss'
})
export class PlantCardComponent {
  @Input() plant!: Plant;
  @Input() imageUrl!: string | undefined;

  wateringButtonDisabled = false;

  constructor ( 
    private wateringEventService: WateringEventService,
    private notificationService: NotificationService
  ) {}

  triggerWatering() {
    const start = new Date();
    const end = new Date(start.getTime() + 10000); // End time 10 seconds after start

    const wateringEvent: WateringEventCreateRequestDto = {
      plantId: this.plant.id,
      start: start,
      end: end
    };

    this.wateringEventService.addWateringEvent(wateringEvent).subscribe({
      next: (response) => {
        console.log('Watering event created:', response);
        this.notificationService.showNonErrorSnackBar('Watering event added');
        this.wateringButtonDisabled = true;
      },
      error: (error) => {
        console.error('Error creating watering event', error);
      }
    });
  }
}
