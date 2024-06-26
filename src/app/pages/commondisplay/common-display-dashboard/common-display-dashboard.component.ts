import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonDiplayService } from 'src/app/services/commondisplay.service';
import { CommonDisplay } from 'src/app/_model/commondisplay';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-common-display-dashboard',
  templateUrl: './common-display-dashboard.component.html',
  styleUrls: ['./common-display-dashboard.component.css'],
})
export class CommonDisplayDashboardComponent implements OnInit {
  customerList: CommonDisplay[];
  columns: TableColumn<Partial<CommonDisplay>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: CommonDisplay;
  $subscription;

  constructor(
    private commonDiplayService: CommonDiplayService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.commonDiplayService.getColumn();
      this.commonDiplayService.getAll().subscribe((res) => {
        this.customerList = res;
      });
    });
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/commondisplay/update/' + $event.id]);
  }

  addRow() {
    this.router.navigate(['/admin/commondisplay/create/']);
  }
}
