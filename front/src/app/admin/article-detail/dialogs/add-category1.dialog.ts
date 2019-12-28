import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentralService } from 'src/app/services/central.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export interface DialogData {
    category1_id: number;
    name: string;
    description: string;
}


@Component({
    selector: 'add-category1-dialog',
    templateUrl: 'add-category1.dialog.html',
    styles: [`
    form {
        display: flex;
        flex-direction: column;
    }`]
})
export class AddCategory1 implements OnInit {

    public Editor = ClassicEditor;
    modus: string;

    addCategoryForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddCategory1>,
        private cS: CentralService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

    ngOnInit() {
        if(this.data.category1_id) {
            this.modus = 'Update'
            this.addCategoryForm = new FormGroup({
                name: new FormControl(this.data.name, Validators.required),
                description: new FormControl(this.data.description, Validators.required)
            });
        } else {
            this.modus = 'Add'
            this.addCategoryForm = new FormGroup({
                name: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required)
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
    onAdd() {
        let reqBody = {name: this.addCategoryForm.value.name, description: this.addCategoryForm.value.description};
        if(this.data.category1_id) {
            reqBody['id'] = this.data.category1_id
        }
        this.cS.addOrUpdateCategory1(reqBody).subscribe(response => {
            this.cS.getCategories();
            this.dialogRef.close({category1_id: (<any>response).id});
            this._snackBar.open(`Category1 ${this.modus == 'Update' ? 'Updated' : 'added'}`, 'OK', {
                duration: 8000,
            });
        },
        err => {
            if(err.error.errorCode == 'c1duplicate') {
                this._snackBar.open('Category1 already exists', 'OK', {
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