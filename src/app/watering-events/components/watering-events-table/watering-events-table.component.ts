import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { WateringEvent } from '../../watering-event';
import { WateringEventService } from '../../watering-event.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'app-watering-events-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './watering-events-table.component.html',
  styleUrl: './watering-events-table.component.scss'
})
export class WateringEventsTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['createdAt', 'delete'];
  dataSource = new MatTableDataSource<WateringEvent>([]);
  @Input() wateringEvents: WateringEvent[] = [];

  constructor(
    private wateringEventService: WateringEventService,
    private notificationService: NotificationService
  ) { }  

  ngOnInit(): void {
    this.dataSource.data = this.wateringEvents;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wateringEvents']) {
      this.dataSource.data = this.wateringEvents;
    }
  }

  deleteWateringEvent(eventId: number): void {
    this.wateringEventService.deleteWateringEvent(eventId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(event => event.id !== eventId);
        this.notificationService.showNonErrorSnackBar('Watering event deleted');
      },
      error: (err) => {
        console.error('Error deleting event:', err);
      }
    });
  }
}