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
  adFile,
} from 'src/app/_model/commondisplay';
import { ErrorResponse } from 'src/app/_model/response/ErrorResponse';
import * as uuid from 'uuid';
import { saveAs } from 'file-saver/dist/FileSaver';
import { Adfile, IEvents } from 'src/app/_model/events';
import { EventService } from 'src/app/services/events.service';
import { DateFormatterService } from 'src/app/services/dateformatter.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  eventsForm?: FormGroup;
  submitted = false;
  isUpdate = false;
  eventsData: IEvents;
  percentDone;
  uploadSuccess = false;
  fileData: fileUploadRes[] = [];
  thumNailDileData: fileUploadRes;
  adFileData: fileUploadRes;
  adFiles: adFile[];
  valueOption: string[];
  dropdown: Observable<DropdownCommonDisplay>;
  $subscription;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dateFormatterService:DateFormatterService
  ) {}

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.eventsForm = this.formBuilder.group({
      EventId: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Points: [0, Validators.required],
      TopScorerCount: [10, Validators.required],
      IsActive: [true],
      IsCompleted: [false],
      TermsAndCondition: [''],
      DirectoryId: [uuid.v4()],
      ThumbNail: [''],
      AdStartDate: ['', Validators.required],
      AdCompletionDate: ['', Validators.required],
      AdEndDate: ['', Validators.required],
      AdFile: [''],
      location: this.formBuilder.array([]),
      file: this.formBuilder.array([]),
      peakhours: this.formBuilder.array([]),
    });

    this.location.valueChanges.subscribe((d) => {
      console.log(d);
    });

    this.dropdown = this.activatedRoute.data.pipe(pluck('dropdown'));
    this.dataSubscription();
  }

  dataSubscription() {
    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.details) {
          let requiredData = data.details as IEvents;
          requiredData.AdStartDate = this.dateFormatterService.convertDate(requiredData.AdStartDate);
          requiredData.AdEndDate = this.dateFormatterService.convertDate(requiredData.AdEndDate);
          requiredData.AdCompletionDate = this.dateFormatterService.convertDate(
            requiredData.AdCompletionDate
          );

          this.isUpdate = true;
          this.eventsForm.patchValue(requiredData);
          this.setThubmnailFile();
          this.setAdFile();
          requiredData.location.forEach((loc, i) => {
            this.addLocation();
            this.location.at(i).patchValue(loc);
          });

          requiredData.file.forEach((adfile, i) => {
            this.addFile();
            this.files.at(i).patchValue(adfile);
          });

          requiredData.peakHours.forEach((timeslot, i) => {
            timeslot.StartDateTime = this.dateFormatterService.convertDate(timeslot.StartDateTime);
            timeslot.EndDateTime = this.dateFormatterService.convertDate(timeslot.EndDateTime);

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

  get files() {
    return this.eventsForm.controls['file'] as FormArray;
  }

  onSubmit() {
    this.submitted = true;

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

          return;
        },
        (err) => {
          alert('Events creation errror!!\n Data: \n' + JSON.stringify(err));
          return;
        }
      );
    } else {
      this.eventService.create(payload).subscribe(
        (res) => {
          this.notificationService.showSuccess(
            'Events Created successfully!!',
            'Success'
          );
          this.router.navigate(['/admin/events/update/' + res.id]);
        },
        (err: ErrorResponse) => {
          alert('Events update errror!!\n Data: \n' + JSON.stringify(err));
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
      formData.append('pathId', this.eventsForm.get('DirectoryId').value);
      formData.append('path', 'event');
    });

    this.eventService.uploadFile(formData).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let fileRes: fileUploadRes[] = event.body;
          if (type == 'ThumbNail') {
            this.files.controls[index].patchValue({
              ThumbNail: fileRes[0].fileURL,
              ThumbNailFileName: fileRes[0].fileName,
            });
          } else if (type == 'VideoFile') {
            this.files.controls[index].patchValue({
              VideoFile: fileRes[0].fileURL,
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
    if (!fileURL) return;
    let splittedFileURL = fileURL.split('/');
    this.thumNailDileData = {
      fileName: splittedFileURL[splittedFileURL.length - 1],
      fileURL,
    };
  }

  setAdFile() {
    let fileURL = this.eventsForm.get('AdFile').value;
    if (!fileURL) return;
    let splittedFileURL = fileURL.split('/');
    this.adFileData = {
      Title: 'Hello',
      Description: 'THis is for testing',
      fileName: splittedFileURL[splittedFileURL.length - 1],
      fileURL,
    };
  }

  downLoadFile(files: fileUploadRes) {
    this.eventService.downloadFile(files.fileURL).subscribe((blob) => {
      saveAs(blob, files.fileName);
    });
  }

  downloadAdFile(fileURL: string, fileName: string) {
    this.eventService.downloadFile(fileURL).subscribe((blob) => {
      let url = window.URL.createObjectURL(blob);
      saveAs(blob, fileName);
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

  addFile($event = null) {
    const fileForm = this.formBuilder.group({
      id: [''],
      ThumbNailFileName: ['', Validators.required],
      ThumbNail: ['', Validators.required],
      VideoFile: ['', Validators.required],
      VideoFileName: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      eventId: [''],
      active: [true],
    });

    this.files.push(fileForm);
  }

  deleteAdFile(index) {
    this.files.removeAt(index);
  }

  patchAdFile(index) {
    let formValue: Adfile = this.files.at(index).value;
    this.eventService
      .patchAdFile(formValue.id, this.eventsData.id, formValue)
      .subscribe((res) => {
        this.notificationService.showSuccess(
          'Video file updated successfully!!',
          'Success'
        );
      });
  }

  addTimeSlot() {
    const timeSlotForm = this.formBuilder.group({
      StartDateTime: ['', Validators.required],
      EndDateTime: ['', Validators.required],
      Points: ['', Validators.required],
    });

    this.peakhours.push(timeSlotForm);
  }

  deleteTimeSlot(index) {
    this.peakhours.removeAt(index);
  }

}
