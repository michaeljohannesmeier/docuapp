import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CentralService } from './services/central.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  adminSection: boolean;
  categories$: Observable<any>;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  categoryNumber = 1;
  categories: any;
  category2s: any;
  articles: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private cService: CentralService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.cService.getCategories();
    this.categories$ = this.cService.categories$;
    this.categories$.subscribe(cats => {
      this.categories = cats;
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        if (event.url.includes('/admin/')) {
          if(!this.adminSection) {
            this.categoryNumber = 1;
            this.adminSection = true;
          }
        } else {
          if(this.adminSection) {
            this.categoryNumber = 1;
            this.adminSection = false;
          }
        }
      }
    })

  }

  changeOnlyManageCategories(isOnlyManage) {
    this.cService.changeOnlyManageCategories(isOnlyManage);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }






  // SIDENAV MENU


  onClickCategory(categoryNumber: number, name: string) {
    this.categoryNumber = categoryNumber;
    if(categoryNumber == 2) {
      this.category2s = this.categories.find(cat => cat.name == name).category2;
    }
    if(categoryNumber == 3) {
      this.articles = this.category2s.find(art => art.name == name).article

    }
  }

  onClickCategoryAdmin(categoryNumber:number, name: string = null) {
    this.categoryNumber = categoryNumber;
    if(categoryNumber == 4) {
      this.category2s = this.categories.find(cat => cat.name == name).category2;
    }
  }

  menuBackTo(categoryNumber:number) {
    this.categoryNumber = categoryNumber;
  }

}




