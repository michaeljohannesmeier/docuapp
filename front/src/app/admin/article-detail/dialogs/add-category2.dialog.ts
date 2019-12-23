import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CentralService } from 'src/app/services/central.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface DialogData {
    category1_id: number;
    category2_id: number;
    categories: String[];
    description: string;
    name: string;
}

@Component({
    selector: 'add-category2-dialog',
    templateUrl: 'add-category2.dialog.html',
    styles: [`
    .name-input {
        margin-left: 30px;
    }
    ckeditor ::ng-deep .ck-editor__editable_inline {
        min-height: 100px;
    }`]
})
export class AddCategory2 implements OnInit {

    public Editor = ClassicEditor;
    addCategoryForm: FormGroup;
    modus: string;

    constructor(
            public dialogRef: MatDialogRef<AddCategory2>,
            @Inject(MAT_DIALOG_DATA) public data: DialogData,
            private cS: CentralService,
            private _snackBar: MatSnackBar) {}

    ngOnInit() {
        if(this.data.category2_id) {
            this.modus = 'Update'
            this.addCategoryForm = new FormGroup({
                category1_id: new FormControl(this.data.category1_id, Validators.required),
                name: new FormControl(this.data.name, Validators.required),
                description: new FormControl(this.data.description, Validators.required)
            });
        } else {
            this.modus = 'Add'
            this.addCategoryForm = new FormGroup({
                category1_id: new FormControl(this.data.category1_id, Validators.required),
                name: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required)
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
    onAdd() {
        let reqBody = {
            category1_id: this.addCategoryForm.value.category1_id,
            name: this.addCategoryForm.value.name,
            description: this.addCategoryForm.value.description
        }
        if(this.data.category2_id) {
            reqBody['id'] = this.data.category2_id;
        }
        this.cS.addOrUpdateCategory2(reqBody).subscribe(response => {
            this.cS.getCategories();
            this.dialogRef.close({category1_id: this.addCategoryForm.value.category1_id, category2_id: (<any>response).id});
            this._snackBar.open(`Category2 ${this.modus == 'Update'? 'updated': 'added'}`, 'OK', {
                duration: 8000,
            });
        },
        err => {
            if(err.error.errorCode == 'cat1cat2duplicate') {
                this._snackBar.open('Combination of category1 and category2 already exists', 'OK', {
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