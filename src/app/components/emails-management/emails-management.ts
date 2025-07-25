import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {EmailsService} from "../../services/emails.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RemoveEmailDialog} from "../dialogs/remove-email-dialog/remove-email-dialog";

@Component({
  selector: 'app-emails-management',
    imports: [
        FormsModule,
        MatCard,
        ReactiveFormsModule,
        AsyncPipe,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './emails-management.html',
  styleUrl: './emails-management.css'
})
export class EmailsManagement implements OnInit {

    emails$ = new BehaviorSubject<string[]>([]);

    constructor(
        private emailsService: EmailsService,
        private dialog: MatDialog
    ) {
    }
    ngOnInit(): void {
        this.updateEmailsList();
    }

    updateEmailsList(){
        this.emailsService.get$().subscribe({
            next: data => this.emails$.next(data),
            error: error => console.error(error),
        });
    }

    deleteEmail(email: string) {
        const dialogConfig = new MatDialogConfig<string>();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = email;

        this.dialog
            .open(RemoveEmailDialog, dialogConfig)
            .afterClosed()
            .subscribe({
                next: () => this.updateEmailsList(),
            });
    }

}
