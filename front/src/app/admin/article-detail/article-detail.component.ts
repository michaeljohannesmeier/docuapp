import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { Observable, combineLatest } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { MatDialog } from '@angular/material/dialog';
import { AddCategory1 } from './dialogs/add-category1.dialog';
import { RemoveCategory1 } from './dialogs/remove-category1.dialog';
import { AddCategory2 } from './dialogs/add-category2.dialog';
import { RemoveCategory2 } from './dialogs/remove-category2.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RemoveArticle } from './dialogs/remove-article.dialog';
import { ComponentCanDeactivate } from 'src/app/guards/unsaved-changes.guard';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, ComponentCanDeactivate {

  categories$: Observable<any>;
  category2s: any = [];
  categories: any = {};
  articleFormGroup: FormGroup;
  loaded: boolean = false;
  editModus: boolean = false;
  onlyManageCategories: boolean = false;
  public Editor = ClassicEditor;
  id: number;
  widthDialogs = '600px';


  constructor(private cS: CentralService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {

    // subscribe to changes from menu when changing from manage categories to add article
    this.cS.changeOnlyManageCategories$.subscribe(isOnlyManage => {
        this.onlyManageCategories = isOnlyManage;
    
        // if on page article detail with id (edit article) and click on add new article
        if(isOnlyManage || this.id) {
          this.initDefaultFormGroup();
        }
    })

    this.categories$ = this.cS.categories$;
    combineLatest(this.categories$, this.route.queryParams).subscribe(([cats, params]) => {
      this.categories = cats;
      this.id = params['id'];

      if(!this.loaded) {
        this.onlyManageCategories = <boolean>params['manage']
      }
      
      if (this.onlyManageCategories) {
        this.onlyManageCategories = true;
        this.initDefaultFormGroup();
        this.loaded = true;
      } else {
        if(this.id) {
          this.cS.getArticle(this.id).subscribe(article => {
            this.editModus = true

            if(!this.articleFormGroup) {

              this.articleFormGroup = this.fb.group({
                category1_id: [article['category1_id'], [Validators.required]],
                category2_id: [article['category2_id'], [Validators.required]],
                title: [article['title'], [Validators.required]],
                examples: this.fb.array([])
              });

              for(let i=0; i<article['example'].length; i++) {
                (<FormArray>this.articleFormGroup.controls['examples']).push(
                  this.fb.group({
                    text: [article['example'][i].text, [Validators.required]],
                    code: [article['example'][i].code, []]
                  })
                )
              }
            }

            // update category2s depending on selection of category1
            let category1 = this.categories.find(cat => cat.id == this.articleFormGroup.value.category1_id);
            if(category1) {
              this.category2s = category1.category2;
            }

            this.loaded = true;
          },
          err => {
            this.initDefaultFormGroup();
            this.loaded = true;
          })
        } else {
          if(!this.articleFormGroup) {
            this.initDefaultFormGroup();
          }
          this.loaded = true;
          this.setCategory2s();
        }
      }
    })
  }

  initDefaultFormGroup() {

    this.articleFormGroup = this.fb.group({
      category1_id: ['', [Validators.required]],
      category2_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      examples: this.fb.array([
        this.fb.group({
          text: ['', [Validators.required]],
          code: ['', []]
        })
      ])
    });
    
  }

  // update category2s depending on selection of category1 and set ategory2_id to undefined
  setCategory2s() {
    if(this.articleFormGroup.value.category1_id) {
      let category1 = this.categories.find(cat => cat.id == this.articleFormGroup.value.category1_id);
      if(category1) {
        this.category2s = category1.category2
        this.articleFormGroup.patchValue({category2_id: undefined})
      }
    }
  }


  addExample() {
    (<FormArray>this.articleFormGroup.controls['examples']).push(
      this.fb.group({
        text: ['', [Validators.required]],
        code: ['', []]
      })
    )

  }
  deleteExample(index) {
    (<FormArray>this.articleFormGroup.controls['examples']).removeAt(index);
  }

  onSubmit() {
    let category1 = this.articleFormGroup.value['category1'];
    let category2_id = this.articleFormGroup.value['category2_id'];
    let title = this.articleFormGroup.value['title'];
    let example = this.articleFormGroup.value['examples'];
    let reqBody:any;
    if(this.editModus) {
      let id = this.id
      reqBody = {id, category1, category2_id, title, example};
    } else {
      reqBody = {category1, category2_id, title, example};
    }
    this.cS.addOrUpdate(reqBody).subscribe(response => {
        this.initDefaultFormGroup();  // to set touched of form to false
        this.router.navigate(['/admin/articles']);
        this._snackBar.open(`Article ${this.editModus ? 'updated' : 'saved'}`, 'OK', {
            duration: 8000,
        });
      },
      err => {
          if(['c1nf', 'c2nf', 'c1c1dismatch', 'anf'].indexOf(err.error.errorCode) > -1 ) {
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


  @HostListener("window:beforeunload")  
  componentCanDeactivate() {
    return !this.articleFormGroup.touched;
  }


  // TODO: only workaround here
  get examplesFormData() { 
    return <FormArray>this.articleFormGroup.controls.examples;
  }


  // DIALOGS
  // *******************

  onDeleteArticle(): void {
    this.dialog.open(RemoveArticle, {
      width: this.widthDialogs,
      data: {id: this.id}
    });
  }

  addOrUpdateCategory1Dialog(isUpdate): void {
    let data = {}
    let dialogOpen = true;
    let dialogRef;
    if(isUpdate) {
      if(this.articleFormGroup.value.category1_id) {
        let category1 = this.categories.find(cat => cat.id == this.articleFormGroup.value.category1_id);
        data['category1_id'] = category1.id
        data['name'] = category1.name
        data['description'] = category1.description
        dialogRef = this.dialog.open(AddCategory1, {
          width: this.widthDialogs,
          data: data
        });
      } else {
        dialogOpen = false;
        this._snackBar.open(`Please select a category1`, 'OK', {
          duration: 8000,
        });
      }
    } else {
      dialogRef = this.dialog.open(AddCategory1, {
        width: this.widthDialogs,
        data: data
      });
    }
    if(dialogOpen) {
      dialogRef.afterClosed().subscribe((response)  => {
        if(response) {
          this.articleFormGroup.patchValue({category1_id: response['category1_id']})
          this.category2s = this.categories.find(cat => cat.id == response['category1_id']).category2;
          this.cS.getCategories();
        }
      });
    }
  }

  addOrUpdateCategory2Dialog(isUpdate): void {
    let data = {}
    let dialogRef;
    let dialogOpen = true;
    if(isUpdate) {
      if(this.articleFormGroup.value.category2_id) {
        let category1 = this.categories.find(cat => cat.id == this.articleFormGroup.value.category1_id);
        let category2 = category1.category2.find(cat => cat.id == this.articleFormGroup.value.category2_id);
        data['category1_id'] = category1.id;
        data['category2_id'] = category2.id;
        data['name'] = category2.name;
        data['description'] = category2.description;
        data['categories'] = this.categories;
        dialogRef = this.dialog.open(AddCategory2, {
          width: this.widthDialogs,
          data: data
        });
      } else {
        dialogOpen = false;
        this._snackBar.open(`Please select a category2`, 'OK', {
          duration: 8000,
        });
      }
    } else {
      data['categories'] = this.categories;
      data['category1_id'] = this.articleFormGroup.value.category1_id
      dialogRef = this.dialog.open(AddCategory2, {
        width: this.widthDialogs,
        data: data
      });
    }

    if(dialogOpen) {
      dialogRef.afterClosed().subscribe((response)  => {
        if(response) {
          this.articleFormGroup.patchValue({category1_id: response['category1_id'], category2_id: response['category2_id']})
          this.category2s = this.categories.find(cat => cat.id == response['category1_id']).category2;
          this.cS.getCategories();
        }
      });
    }

  }

  removeCategory1Dialog(): void {
    let category1_id = this.articleFormGroup.value.category1_id;
    if(this.articleFormGroup.value.category1_id) {;
      let dialogRef = this.dialog.open(RemoveCategory1, {
        width: this.widthDialogs,
        data: {category1_id, category1: this.categories.find(cat => cat.id == category1_id).name}
      });

      dialogRef.afterClosed().subscribe(response => {
        this.setCategory2s();
      })

    } else {
      this._snackBar.open(`Please select a category1`, 'OK', {
        duration: 8000,
      });
    }
}

  removeCategory2Dialog(cat2): void {
    let category1_id = this.articleFormGroup.value.category1_id;
    let category2_id = this.articleFormGroup.value.category2_id;
    if(cat2.options.length > 0 && category2_id) {
      const dialogRef = this.dialog.open(RemoveCategory2, {
        width: this.widthDialogs,
        data: {
          category1_id,
          category2_id,
          category1: this.categories.find(cat => cat.id == category1_id).name,
          category2: this.category2s.find(cat => cat.id == category2_id).name
          }
      });
      dialogRef.afterClosed().subscribe((response)  => {
        this.setCategory2s();
      });
    } else {
      this._snackBar.open(`Please select a category2`, 'OK', {
        duration: 8000,
    });
    }
  }



  

}