import {Component, Inject} from '@angular/core';
import {EmailsService} from "../../../services/emails.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-remove-email-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './remove-email-dialog.html',
  styleUrl: './remove-email-dialog.css'
})
export class RemoveEmailDialog {
  constructor(private dialogRef: MatDialogRef<RemoveEmailDialog>,
              private emailService: EmailsService,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  deleteEmail() {
    this.emailService.delete$(this.data).subscribe({
      next: () => this.dialogRef.close(),
      error: err => {
        console.error(err);
        this.dialogRef.close();
      }
    })
  }
}
