import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EventService } from 'src/app/services/events.service';
import { IEvents } from 'src/app/_model/events';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css'],
})
export class EventDashboardComponent implements OnInit {
  customerList: IEvents[];
  columns: TableColumn<Partial<IEvents>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: IEvents;
  $subscription;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.eventService.getColumn();
      this.eventService.getAll().subscribe((res) => {
        this.customerList = res;
      });
    });
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/events/update/' + $event.id]);
  }

  addRow() {
    this.router.navigate(['/admin/events/create/']);
  }
}
