import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CentralService } from '../services/central.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories$: Observable<any>;

  constructor(private cService: CentralService) { }

  ngOnInit() {
    this.categories$ = this.cService.categories$;
  }

}
