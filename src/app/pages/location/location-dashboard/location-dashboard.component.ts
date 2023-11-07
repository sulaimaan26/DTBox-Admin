import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { ILocation } from 'src/app/_model/location';
import { TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.css'],
})
export class LocationDashboardComponent implements OnInit {
  $tableEditActive = new Subject<any>();
  columns: TableColumn<Partial<ILocation>>[] = [];
  eventReport
  constructor(public locationService: LocationService) {}

  ngOnInit(): void {}

  getModifiedReport($event) {}
}
