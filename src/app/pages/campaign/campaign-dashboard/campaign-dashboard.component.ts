import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { IBanner } from 'src/app/_model/banner';
import { ICampaign } from 'src/app/_model/campaign';
import { TableColumn, EditableTable } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css'],
})
export class CampaignDashboardComponent implements OnInit {
  campaignList: ICampaign[];
  columns: TableColumn<Partial<ICampaign>>[] = [];
  $tableEditActive = new Subject<any>();
  $updateTable = new Subject<EditableTable[]>();
  tempTableRow: IBanner;
  $subscription:Subscription;

  constructor(
    private campaignService: CampaignService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.paramMap.subscribe(() => {
      // this.tempTableRow = { ...this.tableRow };

      this.columns = this.campaignService.getColumn();
      this.campaignService.getAll().subscribe((res) => {
        console.log(res);

        this.campaignList = res;
      });
    });
  }

  addRow() {
    this.router.navigate(['/admin/campaign/create/']);
  }

  onRowClicked($event) {
    this.router.navigate(['/admin/campaign/update/' + $event.id]);
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
