import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BotViewService } from 'src/app/services/bot-view.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { BotInactiveSearchResponse } from 'src/app/_model/bot-view';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';

@Component({
  selector: 'app-bot-view-generate',
  templateUrl: './bot-view-generate.component.html',
  styleUrls: ['./bot-view-generate.component.css'],
})
export class BotViewGenerateComponent implements OnInit {
  @Input() inActiveUsers: Subject<BotInactiveSearchResponse[]>;
  tableData: BotInactiveSearchResponse[];
  columns: TableColumn<Partial<BotInactiveSearchResponse>>[] = [];
  $subscription: Subscription;
  @Input() eventId: number;
  @Input() videoId: number[];
  $tableEditActive = new Subject<any>();
  ignoredCustomer: number[];
  processing = false;
  requiredViews = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public botViewService: BotViewService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.columns = this.botViewService.getColumn();

    this.inActiveUsers.subscribe((data) => {
      this.tableData = data;
    });
  }

  onTableDataChange($event) {
    let rr = $event;
  }

  async onSubmit() {
    this.processing = true;
    let generateUser = this.tableData.filter((e) => e.isSelected == true);
    if (!generateUser || generateUser.length == 0) {
      alert('select atleast one customer');
      this.processing = false;
      return;
    }

    let participantCount = generateUser.filter((e) => e.IsParticipated);

    let message = 'Are you sure to proceed?';
    message += `\n Total Users: ${generateUser.length}`;
    message += `\n View Count: ${this.requiredViews}`;
    message += `\n Already Participated Count: ${participantCount.length}`;
    message += `\n Video Count: ${this.videoId.length}`;
    message += `\n Total Views which will be genrated: ${
      generateUser.length * this.requiredViews
    }`;

    let status = confirm(message);
    if (!status) {
      alert('View generation canceled');
      return;
    }

    for await (const user of generateUser) {
      await this.generateView(user);
    }

    this.processing = false;
  }

  generateView(user: BotInactiveSearchResponse) {
    return new Promise((resolve, reject) => {
      let payload = {
        EventId: this.eventId,
        VideoId: this.videoId,
        VideoIds: this.videoId,
        UserId: user.id,
        Views: this.requiredViews,
      };
      this.botViewService
        .generateView(payload, 5)
        .pipe(switchMap((value) => this.botViewService.create(payload)))
        .subscribe(
          (res) => {
            this.tableData.some((c) => {
              if (c.id == user.id) {
                c.IsGenerated = true;
                return true;
              }
              return false;
            });

            this.inActiveUsers.next(this.tableData);
            resolve(this.tableData);
          },
          (err) => reject
        );
    });
  }
}
