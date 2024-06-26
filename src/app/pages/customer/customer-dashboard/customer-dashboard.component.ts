import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/_model/customer';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponCodeService } from 'src/app/services/couponcode.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent implements OnInit {
  customerList: ICustomer[];
  columns: TableColumn<Partial<ICustomer>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: ICustomer;
  $subscription;

  constructor(
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.customerService.getColumn();
      this.customerService.getAll().subscribe((res) => {
        this.customerList = res;
      });
    });
  }

  downloadFile() {
    let data = this.customerList;
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, `customer_${new Date().toLocaleString()}.csv`);
  }

  getModified($event) {
    let customerId: number = $event.id;
    let payload = {
      IsSales: $event.IsSales,
    };

    this.customerService.patchCustomer(customerId, payload).subscribe(
      () => {
        $event.isEdit = false;
        this.$updateTable.next({ ...this.customerList });
        this.notificationService.showSuccess('Updated Successfully', 'Success');
        this.$tableEditActive.next(true);
      },
      (err) => {
        alert(err);
      }
    );
  }
}
