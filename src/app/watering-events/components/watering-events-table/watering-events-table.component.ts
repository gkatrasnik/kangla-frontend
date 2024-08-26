import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { WateringEvent } from '../../watering-event';

@Component({
  selector: 'app-watering-events-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './watering-events-table.component.html',
  styleUrl: './watering-events-table.component.scss'
})
export class WateringEventsTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['createdAt'];
  dataSource = new MatTableDataSource<WateringEvent>([]);
  @Input() wateringEvents: WateringEvent[] = [];

  constructor() { }  

  ngOnInit(): void {
    this.dataSource.data = this.wateringEvents;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wateringEvents']) {
      this.dataSource.data = this.wateringEvents;
    }
  }
}