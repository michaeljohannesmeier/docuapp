import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentralService } from 'src/app/services/central.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface DialogData {
    id: number;
}

@Component({
    selector: 'remove-article-dialog',
    templateUrl: 'remove-article.dialog.html',
    styles: [`.highlight {
        color: orange;
    }`]
})
export class RemoveArticle {

    constructor(
        public dialogRef: MatDialogRef<RemoveArticle>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private cS: CentralService,
        private _snackBar: MatSnackBar,
        private router: Router) {}

    onCancel(): void {
        this.dialogRef.close();
    }
    onRemove() {
        this.cS.removeArticle(this.data.id).subscribe(response => {
            this.dialogRef.close();
            this.router.navigate(['/admin/articles']);
            this._snackBar.open(`Article deleted`, 'OK', {
                duration: 8000,
            });
            
        },
        err => {
            if(['anf'].indexOf(err.error.errorCode) > -1 ) {
                this._snackBar.open(err.error.message, 'OK', {
                    duration: 8000,
                });
            } else {
                this._snackBar.open('Something went wrong', 'OK', {
                    duration: 8000,
                });
            }
        });
    }

}