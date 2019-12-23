import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentralService } from 'src/app/services/central.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
    category1: String;
    category2: String;
    category1_id: number;
    category2_id: number;
}

@Component({
    selector: 'remove-category2-dialog',
    templateUrl: 'remove-category2.dialog.html',
    styles: [`.highlight {
        color: orange;
    }`]
})
export class RemoveCategory2 {

    constructor(
        public dialogRef: MatDialogRef<RemoveCategory2>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private cS: CentralService,
        private _snackBar: MatSnackBar) {}

    onCancel(): void {
        this.dialogRef.close();
    }
    onRemove() {
        this.cS.removeCategory2(this.data.category2_id).subscribe(response => {
            this.cS.getCategories();
            this.dialogRef.close();
            this._snackBar.open(`Category2 ${this.data.category2} deleted`, 'OK', {
                duration: 8000,
            });
        },
        err => {
            if(['c2notfound', 'c1nffc2', 'c2stillhasa'].indexOf(err.error.errorCode) > -1 ) {
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