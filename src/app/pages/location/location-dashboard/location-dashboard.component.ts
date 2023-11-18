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
  tableRow: ILocation = {
    city: '',
    country: '',
    id: 0,
    pincode: '',
    state: '',
    _id: '',
    isEdit: true,
  };
  $tableEditActive = new Subject<any>();
  columns: TableColumn<Partial<ILocation>>[] = [];
  locationList: ILocation[];
  constructor(public locationService: LocationService) {}

  ngOnInit(): void {
    this.columns = this.locationService.getColumn();
    this.locationService.getAll().subscribe((res)=>{
      this.locationList = res
    })
  }

  getModifiedReport($event) {}
}
