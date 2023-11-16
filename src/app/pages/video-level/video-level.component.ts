import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { VideoLevelService } from 'src/app/services/videolevel.service';
import { EditableTable, TableColumn } from 'src/app/_model/TableColumn';
import { IVideoLevel } from 'src/app/_model/videolevel';

@Component({
  selector: 'app-video-level',
  templateUrl: './video-level.component.html',
  styleUrls: ['./video-level.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class VideoLevelComponent implements OnInit {
  videoLevelList: IVideoLevel[];
  columns: TableColumn<Partial<IVideoLevel>>[] = [];
  $tableEditActive = new Subject<any>();
  tableRow: IVideoLevel = {
    ViewCount: '',
    TimeOut: '',
    _id: '',
    isEdit: true,
  };
  tempTableRow: IVideoLevel;
  $updateTable = new Subject<EditableTable[]>();
  $subscription;
  constructor(
    private videoLevelService: VideoLevelService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.$subscription = this.activatedRoute.queryParams.subscribe(() => {
      this.tempTableRow = { ...this.tableRow };

      this.columns = this.videoLevelService.getColumn();
      this.videoLevelService.getAll().subscribe((res) => {
        this.videoLevelList = res;
      });
    });
  }

  getModifiedReport($event: any) {
    let changedVideoLevel = { ...$event } as IVideoLevel;
    let id = changedVideoLevel.id;
    console.log(id);
    if (!id) {
      //create
      this.$subscription = this.videoLevelService
        .create(changedVideoLevel)
        .subscribe(
          (res) => {
            this.$updateTable.next(res);
            this.notificationService.showSuccess(
              'Created Successfully',
              'Success'
            );
            this.$tableEditActive.next(true);
          },
          (err) => {
            this.notificationService.showError(err, 'Failed');
          }
        );
      return;
    }

    this.$subscription = this.videoLevelService
      .update(id, changedVideoLevel)
      .subscribe(
        (res) => {
          this.$updateTable.next(res);
          this.notificationService.showSuccess(
            'Updated Successfully',
            'Success'
          );
          this.$tableEditActive.next(true);
        },
        (err) => {
          this.notificationService.showError(err, 'Failed');
        }
      );
  }

  deleteVideoLevel($event: any) {
    let changedVideoLevel = $event as IVideoLevel;
    this.$subscription = this.videoLevelService
      .delete(changedVideoLevel.id)
      .subscribe(
        (res) => {
          this.$updateTable.next(res);
          this.notificationService.showSuccess(
            'Deleted Successfully',
            'Success'
          );
          this.$tableEditActive.next(true);
        },
        (err) => {
          this.notificationService.showError(err, 'Failed');
        }
      );
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
