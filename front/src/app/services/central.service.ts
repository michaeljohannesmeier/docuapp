import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CentralService {

  constructor(private http: HttpClient ) {}

  private categories: any = new BehaviorSubject([]);
  private changeOnlyManageCategoriesSub = new BehaviorSubject(false)
  private articleId = new BehaviorSubject(null);

  categories$: Observable<any> = this.categories.asObservable();
  changeOnlyManageCategories$: Observable<boolean> = this.changeOnlyManageCategoriesSub.asObservable();
  articleId$:Observable<number> = this.articleId.asObservable();

  getCategories() {
    this.http.get(`${environment.apiEndpoint}/categories`).subscribe(response => {
      this.categories.next(response);
    });
  }

  addOrUpdate(reqBody) {
    return this.http.post(`${environment.apiEndpoint}/article`, reqBody);
  }

  removeArticle(id) {
    return this.http.delete(`${environment.apiEndpoint}/article/${id}`, {});
  }

  getAllArticles() {
    return this.http.get(`${environment.apiEndpoint}/articles`);
  }

  getArticle(id: number) {
    return this.http.get(`${environment.apiEndpoint}/article/${id}`);
  }

  addOrUpdateCategory1(reqBody) {
    return this.http.post(`${environment.apiEndpoint}/category1`, reqBody);
  }

  addOrUpdateCategory2(reqBody) {
    return this.http.post(`${environment.apiEndpoint}/category2`, reqBody);
  }

  removeCategory1(id) {
    return this.http.delete(`${environment.apiEndpoint}/category1/${id}`);
  }

  removeCategory2(id) {
    return this.http.delete(`${environment.apiEndpoint}/category2/${id}`);
  }

  changeOnlyManageCategories(isOnlyManage) {
    this.changeOnlyManageCategoriesSub.next(isOnlyManage);
  }

  setArticleId(id: number) {
    console.log(id);
    this.articleId.next(id);
  }


}
