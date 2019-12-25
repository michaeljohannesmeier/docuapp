import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Material
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ArticleDetailComponent } from './admin/article-detail/article-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './admin/article-list/article-list.component';
import { AddCategory1 } from './admin/article-detail/dialogs/add-category1.dialog';
import { RemoveCategory1 } from './admin/article-detail/dialogs/remove-category1.dialog';
import { AddCategory2 } from './admin/article-detail/dialogs/add-category2.dialog';
import { RemoveCategory2 } from './admin/article-detail/dialogs/remove-category2.dialog';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RemoveArticle } from './admin/article-detail/dialogs/remove-article.dialog';
import { DetailArticleComponent } from './detail-article/detail-article.component';

import { HighlightModule } from 'ngx-highlightjs';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    AddCategory1,
    RemoveCategory1,
    AddCategory2,
    RemoveCategory2,
    RemoveArticle,
    DetailArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    HighlightModule
  ],
  entryComponents: [
    AddCategory1,
    RemoveCategory1,
    AddCategory2,
    RemoveCategory2,
    RemoveArticle
  ],
  providers: [UnsavedChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
