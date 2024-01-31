import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BannerService } from 'src/app/services/banner.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';
import { EventService } from 'src/app/services/events.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import { IBanner, IBannerVideo } from 'src/app/_model/banner';
import {
  DropdownCommonDisplay,
  fileUploadRes,
} from 'src/app/_model/commondisplay';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';
import { saveAs } from 'file-saver/dist/FileSaver';
import * as uuid from 'uuid';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css'],
})
export class BannerFormComponent implements OnInit {
  bannerForm?: FormGroup;
  submitted = false;
  isUpdate = false;
  bannerData: IBanner;
  dropdown: Observable<DropdownCommonDisplay>;
  $subscription: Subscription;
  normalDropdown: DropdownCommonDisplay;
  uploadSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService
  ) {}

  ngOnInit(): void {
    this.bannerForm = this.formBuilder.group({
      BannerId: ['', Validators.required],
      EndDate: ['', Validators.required],
      StartDate: ['', Validators.required],
      TermsAndCondition: [''],
      IsActive: [true],
      location: this.formBuilder.array([]),
      bannervideo: this.formBuilder.array([]),
      DirectoryId: [uuid.v4()],
    });

    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.dropdown) {
          this.normalDropdown = data.dropdown;
        }
        if (data.details) {
          this.isUpdate = true;
          this.bannerData = data.details;
          this.updateFormData(data.details);
        }
      }
    });
  }

  get f() {
    return this.bannerForm?.controls;
  }

  get location() {
    return this.bannerForm.controls['location'] as FormArray;
  }

  get bannerVideo() {
    return this.bannerForm.controls['bannervideo'] as FormArray;
  }

  updateFormData(tempBannerData: IBanner) {
    tempBannerData.StartDate = this.dateFormatterService.convertDate(
      tempBannerData.StartDate
    );
    tempBannerData.EndDate = this.dateFormatterService.convertDate(
      tempBannerData.EndDate
    );
    this.bannerForm.patchValue(tempBannerData);
    tempBannerData.location.forEach((loc, i) => {
      this.addLocation();
      this.location.at(i).patchValue(loc);
    });

    tempBannerData.bannervideo.forEach((adfile, i) => {
      adfile.StartDate = this.dateFormatterService.convertDate(
        tempBannerData.StartDate
      );
      adfile.EndDate = this.dateFormatterService.convertDate(
        tempBannerData.EndDate
      );
      this.addBannerVideo(null, adfile);
      this.bannerVideo.at(i).patchValue(adfile);
    });
  }

  addLocation($event = null) {
    const locationForm = this.formBuilder.group({
      DisplayFor: ['', Validators.required],
      Value: ['', Validators.required],
    });

    this.location.push(locationForm);
  }

  deleteLocation(index) {
    this.location.removeAt(index);
  }

  deleteAdFile(index) {
    this.bannerVideo.removeAt(index);
  }

  addBannerVideo($event = null, videoLevelData = null) {
    const fileForm = this.formBuilder.group({
      id: [''],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      ThumbnailFileName: ['', Validators.required],
      ThumbnailURL: ['', Validators.required],
      VideoFileName: ['', Validators.required],
      VideoURL: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      RequiredView: ['', Validators.required],
      BoosterValue: ['', Validators.required],
      IsActive: [true],
    });

    this.bannerVideo.push(fileForm);
  }

  onSubmit() {
    this.submitted = true;

    if (this.bannerForm.invalid) {
      return;
    }

    let payload = this.bannerForm.value;

    if (this.isUpdate) {
      this.bannerService.update(this.bannerData.id, payload).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Events Updated successfully!!',
            'Success'
          );

          return;
        },
        (err) => {
          alert('Banner creation errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
    } else {
      this.bannerService.create(payload).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Events Created successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/banner/update/' + res.id]);
        },
        (err: ErrorResponse) => {
          alert('Banner update errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
    }
  }

  fileUpload($event, index, type: 'ThumbNail' | 'VideoFile') {
    let files: File[] = $event.target.files;
    let formData = new FormData();

    Array.from(files).forEach((f) => {
      formData.append('files', f);
      formData.append('pathId', this.bannerForm.get('DirectoryId').value);
      formData.append('path', 'event');
    });

    this.bannerService.uploadFile(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let fileRes: fileUploadRes[] = event.body;
          if (type == 'ThumbNail') {
            this.bannerVideo.controls[index].patchValue({
              ThumbnailURL: fileRes[0].fileURL,
              ThumbnailFileName: fileRes[0].fileName,
            });
          } else if (type == 'VideoFile') {
            this.bannerVideo.controls[index].patchValue({
              VideoURL: fileRes[0].fileURL,
              VideoFileName: fileRes[0].fileName,
            });
          }
        }
      },
      (err) => {
        this.uploadSuccess = false;
        alert('File upload failed!');
      }
    );
  }

  downloadAdFile(fileURL: string, fileName: string) {
    this.bannerService.downloadFile(fileURL).subscribe((blob) => {
      let url = window.URL.createObjectURL(blob);
      saveAs(blob, fileName);
    });
  }

  patchAdFile(index) {
    let formValue: IBannerVideo = this.bannerVideo.at(index).value;
    this.bannerService
      .patchBannerVideo(formValue.id, this.bannerData.id, formValue)
      .subscribe((res) => {
        this.notificationService.showSuccess(
          'Video file updated successfully!!',
          'Success'
        );
      });
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }
}
