import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './admin/article-detail/article-detail.component';
import { ArticleListComponent } from './admin/article-list/article-list.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin/articledetail', component: ArticleDetailComponent, canDeactivate: [UnsavedChangesGuard]},
  { path: 'admin/articles', component: ArticleListComponent},
  { path: 'article/:id', component: DetailArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
