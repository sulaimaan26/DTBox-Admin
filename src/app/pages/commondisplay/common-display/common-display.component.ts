import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {HttpErrorResponse, HttpEventType, HttpResponse} from "@angular/common/http";
import {CommonDiplayService} from "../../../services/commondisplay.service";
import * as uuid from 'uuid';
import {NotificationService} from "../../../services/NotificationService/notification-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {pluck, tap} from "rxjs/operators";
import {CommonDisplay, DropdownCommonDisplay, fileUploadRes} from "../../../_model/commondisplay";
import {saveAs} from 'file-saver/dist/FileSaver'
import {Observable} from "rxjs";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-common-display',
  templateUrl: './common-display.component.html',
  styleUrls: ['./common-display.component.css']
})
export class CommonDisplayComponent implements OnInit, OnDestroy {
  commonDisplayForm?: FormGroup;
  submitted = false;
  isUpdate = false
  commonDisplayData: CommonDisplay
  percentDone
  uploadSuccess = false
  fileData: fileUploadRes[] = []
  valueOption:string[]
  dropdown: Observable<DropdownCommonDisplay>
  $subscription

  constructor(
    private formBuilder: FormBuilder,
    private commonDiplayService: CommonDiplayService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
    if (this.$subscription) this.$subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.commonDisplayForm = this.formBuilder.group({
      messages: ['', Validators.required],
      messageDuration: [''],
      adDuration: [''],
      termsAndCondition: [''],
      directoryId: [uuid.v4()],
      isActive: [true],
      location: this.formBuilder.array([])
    })

    this.location.valueChanges.subscribe((d)=>{
      console.log(d)
    })

    this.dropdown = this.activatedRoute.data.pipe(pluck('dropdown'),tap(console.table))

    this.$subscription = this.activatedRoute.data.subscribe((data) => {
      if (data) {
        if (data.dropdown) {
         // this.dropdown = data.dropdown
        }
        if (data.details) {
          let requiredData = data.details as CommonDisplay
          this.isUpdate = true
          this.commonDisplayForm.patchValue(requiredData)
          requiredData.location.forEach((loc, i) => {
            this.addLocation()

            this.location.at(i).patchValue(loc)
          })
          this.commonDisplayData = requiredData
          this.fileData = requiredData.file
        }
      }
    })


  }

  get f() {
    return this.commonDisplayForm?.controls;
  }

  get location() {
    return this.commonDisplayForm.controls["location"] as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    if (this.commonDisplayForm.invalid) {
      return;
    }

    let payload = this.commonDisplayForm.value
    if (this.fileData.length > 0) payload.file = this.fileData

    if (this.isUpdate) {
      this.commonDiplayService.update(this.commonDisplayData.id, payload).subscribe((res) => {
        this.notificationService.showSuccess("Common Display Updated successfully!!", "Success")
        this.router.navigate(['/admin/list/commondisplay'])
        return
      }, (err) => {
        this.notificationService.showError("Common Display Updation failed!!", "Failed")
        return
      })
    } else {
      this.commonDiplayService.create(payload).subscribe((res) => {
        this.notificationService.showSuccess("Common Display Created successfully!!", "Success")
        this.router.navigate(['/admin/list/commondisplay'])
      }, (err) => {
        this.notificationService.showError("Common Display Creation failed!!", "Failed")
      })
    }


  }


  uploadAndProgress($event) {
    let files: File[] = $event.target.files
    let formData = new FormData();
    Array.from(files).forEach((f) => {
      if (this.fileData.filter(fs => fs.fileName == f.name).length > 0) {
        alert('Same file uploaded!!!')
        return
      }
      formData.append('files', f)
      formData.append('pathId', this.commonDisplayForm.get('directoryId').value)
    });

    this.commonDiplayService.uploadFile(formData).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round((100 * event.loaded) / event.total);
      } else if (event instanceof HttpResponse) {
        let fileRes: fileUploadRes[] = event.body
        console.log(fileRes)
        fileRes.forEach(f => this.fileData.push(f))
        console.table(this.fileData)
        setTimeout(() => {
          this.percentDone = ''
        }, 5000)
        this.uploadSuccess = true;
      }
    }, (err) => {
      this.uploadSuccess = false;
    })


  }

  downLoadFile(files: fileUploadRes) {
    this.commonDiplayService.downloadFile(files.fileURL).subscribe(blob => {
      let url = window.URL.createObjectURL(blob)
      saveAs(blob, files.fileName)
    })
  }

  deleteFile(files: fileUploadRes) {
    this.fileData = this.fileData.filter((f) => f.fileName !== files.fileName)
  }

  addLocation($event = null) {

    const locationForm = this.formBuilder.group({
      displayFor: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.location.push(locationForm);
  }

  deleteLocation(index) {
    this.location.removeAt(index)
  }


}
