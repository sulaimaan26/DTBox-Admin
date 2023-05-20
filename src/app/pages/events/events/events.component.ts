import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { CommonDiplayService } from 'src/app/services/commondisplay.service';
import { NotificationService } from 'src/app/services/NotificationService/notification-service.service';
import {
  CommonDisplay,
  fileUploadRes,
  DropdownCommonDisplay,
} from 'src/app/_model/commondisplay';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';
import * as uuid from 'uuid';
import { saveAs } from 'file-saver/dist/FileSaver';
import { IEvents } from 'src/app/_model/events';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventsForm?: FormGroup;
  submitted = false;
  isUpdate = false;
  eventsData: IEvents;
  percentDone;
  uploadSuccess = false;
  fileData: fileUploadRes[] = [];
  thumNailDileData: fileUploadRes;
  adFileData: fileUploadRes;
  valueOption: string[];
  dropdown: Observable<DropdownCommonDisplay>;
  $subscription;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.eventsForm = this.formBuilder.group({
      EventId: [{ value: '' }, Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Points: [0, Validators.required],
      IsActive: [true],
      TermsAndCondition: [''],
      DirectoryId: [uuid.v4()],
      ThumbNail: [''],
      AdStartDate: ['', Validators.required],
      AdEndDate: ['', Validators.required],
      AdFile: [''],
      location: this.formBuilder.array([]),
      peakhours: this.formBuilder.array([]),
    });

    this.location.valueChanges.subscribe((d) => {
      console.log(d);
    });

    this.dropdown = this.activatedRoute.data.pipe(
      pluck('dropdown'),
      tap(console.table)
    );

    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.dropdown) {
          // this.dropdown = data.dropdown
        }
        if (data.details) {
          let requiredData = data.details as IEvents;
          this.isUpdate = true;
          this.eventsForm.patchValue(requiredData);
          this.setThubmnailFile();
          this.setAdFile();
          requiredData.location.forEach((loc, i) => {
            this.addLocation();

            this.location.at(i).patchValue(loc);
          });

          requiredData.peakHours.forEach((timeslot, i) => {
            this.addTimeSlot();

            this.peakhours.at(i).patchValue(timeslot);
          });
          this.eventsData = requiredData;
          // this.fileData = requiredData.file
        }
      }
    });
  }

  get f() {
    return this.eventsForm?.controls;
  }

  get location() {
    return this.eventsForm.controls['location'] as FormArray;
  }

  get peakhours() {
    return this.eventsForm.controls['peakhours'] as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    // if(this.timeslot.invalid){
    //   alert('Timeslot is required');
    //   return;
    // }

    if (this.eventsForm.invalid) {
      return;
    }

    let payload = this.eventsForm.value;

    if (this.isUpdate) {
      this.eventService.update(this.eventsData.id, payload).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Events Updated successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/list/events']);
          return;
        },
        (err) => {
          alert('Events creation errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
    } else {
      console.log(payload);

      this.eventService.create(payload).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Events Created successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/list/events']);
        },
        (err: ErrorResponse) => {
          alert('Events update errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
    }
  }

  uploadAndProgress($event) {
    let files: File[] = $event.target.files;
    let formData = new FormData();

    Array.from(files).forEach((f) => {
      formData.append('files', f);
      formData.append('pathId', this.eventsForm.get('DirectoryId').value);
      formData.append('path', 'event');
    });

    this.eventService.uploadFile(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let fileRes: fileUploadRes[] = event.body;
          console.log(fileRes);
          this.adFileData = fileRes[0];
          console.table(this.fileData);
          this.eventsForm.patchValue({ AdFile: this.adFileData.fileURL });
        }
      },
      (err) => {
        this.uploadSuccess = false;
        alert('File upload failed!');
      }
    );
  }

  uploadThumbnail($event) {
    let files: File[] = $event.target.files;
    let formData = new FormData();
    Array.from(files).forEach((f) => {
      formData.append('files', f);
      formData.append('pathId', this.eventsForm.get('DirectoryId').value);
      formData.append('path', 'event/thumbnail');
    });

    this.eventService.uploadFile(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let fileRes: fileUploadRes[] = event.body;
          console.log(fileRes);
          this.thumNailDileData = fileRes[0];
          this.eventsForm.patchValue({
            ThumbNail: this.thumNailDileData.fileURL,
          });
          this.uploadSuccess = true;
        }
      },
      (err) => {
        this.uploadSuccess = false;
        alert('File upload failed!');
      }
    );
  }

  setThubmnailFile() {
    let fileURL = this.eventsForm.get('ThumbNail').value;
    this.thumNailDileData = {
      fileName: fileURL.split('/')[fileURL.split('/').length - 1],
      fileURL,
    };
  }

  setAdFile() {
    let fileURL = this.eventsForm.get('AdFile').value;
    this.adFileData = {
      fileName: fileURL.split('/')[fileURL.split('/').length - 1],
      fileURL,
    };
  }

  downLoadFile(files: fileUploadRes) {
    this.eventService.downloadFile(files.fileURL).subscribe((blob) => {
      let url = window.URL.createObjectURL(blob);
      saveAs(blob, files.fileName);
    });
  }

  deleteFile() {
    this.adFileData = undefined;
    this.eventsForm.patchValue({ AdFile: '' });
  }

  deleteThumbnail() {
    this.thumNailDileData = undefined;
    this.eventsForm.patchValue({ ThumbNail: '' });
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

  addTimeSlot() {
    const timeSlotForm = this.formBuilder.group({
      StartHour: ['', Validators.required],
      EndHour: ['', Validators.required],
      Points: ['', Validators.required],
      Date: ['', Validators.required],
    });

    this.peakhours.push(timeSlotForm);
  }

  deleteTimeSlot(index) {
    this.peakhours.removeAt(index);
  }
}
