import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-investment-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-investment-dialog.component.html',
  styleUrl: './confirm-investment-dialog.component.css'
})
export class ConfirmInvestmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmInvestmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fundName: string }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
