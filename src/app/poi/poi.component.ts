import { AfterContentInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Poi } from 'src/types';
import { PoiService } from './poi.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';

type plotOptions = {
  [key: string]: number
}

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent implements OnInit {
  pois: Poi[] = [];
  @ViewChild('grid', { static: true })
  grid!: MatGridList;
  cols:Subject<any> = new Subject();

  gridByBreakpoint : plotOptions = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(private poiService: PoiService, private MediaObserver: MediaObserver) {
    this.cols.next(4);
  }

  ngOnInit() {
    this.MediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.cols.next(this.gridByBreakpoint[change[0].mqAlias]);
    });
    this.poiService.getAllPoi()
      .subscribe(pois => {
        this.pois = pois;
      });
  }
}
