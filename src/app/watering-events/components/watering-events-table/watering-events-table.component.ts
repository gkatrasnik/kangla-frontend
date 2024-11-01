import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { WateringEvent } from '../../watering-event';
import { WateringEventService } from '../../watering-event.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../core/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from '../../../shared/interfaces/dialog-data';


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
  @Output() eventDeleted = new EventEmitter<void>();

  constructor(
    private wateringEventService: WateringEventService,
    private notificationService: NotificationService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Watering Event',
        message: 'Are you sure you want to delete this watering event?'
      } as DialogData
    });         

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Watering event deleted:', result);
        this.doDeleteWateringEvent(eventId);        
      }
    });
  }
  
  doDeleteWateringEvent(eventId: number): void {
    this.wateringEventService.deleteWateringEvent(eventId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(event => event.id !== eventId);
        this.eventDeleted.emit();
        this.notificationService.showNonErrorSnackBar('Watering event deleted');
      },
      error: (err) => {
        console.error('Error deleting event:', err);
      }
    });
  }
}