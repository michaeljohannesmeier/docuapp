import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentralService } from 'src/app/services/central.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
    category1: string;
    category1_id: number;
}

@Component({
    selector: 'remove-category1-dialog',
    templateUrl: 'remove-category1.dialog.html',
})
export class RemoveCategory1 {

    constructor(
        public dialogRef: MatDialogRef<RemoveCategory1>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private cS: CentralService,
        private _snackBar: MatSnackBar) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onRemove() {
        this.cS.removeCategory1(this.data.category1_id).subscribe(response => {
            this.cS.getCategories();
            this.dialogRef.close();
            this._snackBar.open(`Category ${this.data.category1} deleted`, 'OK', {
                duration: 8000,
            });
        },
        err => {
            if(['c1notfound', 'c1stillhasc2'].indexOf(err.error.errorCode) > -1 ) {
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