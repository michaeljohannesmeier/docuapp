import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/services/central.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles$: Observable<any>;

  constructor(private cS: CentralService) { }

  ngOnInit() {
    this.articles$ = this.cS.getAllArticles();
  }

}
