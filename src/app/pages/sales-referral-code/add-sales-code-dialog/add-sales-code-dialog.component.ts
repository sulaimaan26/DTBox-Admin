import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesReferralCodeService } from 'src/app/services/sales-referral-code.service';
export interface DialogData {
  count: number;
}

@Component({
  selector: 'app-add-sales-code-dialog',
  templateUrl: './add-sales-code-dialog.component.html',
  styleUrls: ['./add-sales-code-dialog.component.css'],
})
export class AddSalesCodeDialogComponent implements OnInit {
  isGenerating = false;

  constructor(
    private salesReferralCodeService: SalesReferralCodeService,
    public dialogRef: MatDialogRef<AddSalesCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  create(count: number) {
    this.isGenerating = true;
    this.salesReferralCodeService.create({ count }).subscribe(
      (res) => {
        this.isGenerating = false;
        this.onNoClick();
      },
      (err) => {
        this.isGenerating = false;
        alert(JSON.stringify(err));
      }
    );
  }
}
