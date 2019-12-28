import { Component, OnInit } from '@angular/core';
import { CentralService } from '../services/central.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  constructor(private cS: CentralService,
              private route: ActivatedRoute) { }

  article: any;

  ngOnInit() {

    this.route.params.subscribe( params =>  {
      this.cS.getArticle(params['id']).subscribe((article:any) => {
        this.article = article;
        this.cS.setArticleId(article.id);
      });
      })
    

  }

}
