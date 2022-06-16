import { AfterContentInit, Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Poi } from 'src/types';
import { PoiService } from './poi.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';

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
  cols: Subject<any> = new Subject();
  error = '';
  apiURL = environment.apiURL;

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

  delete(event: any) {
    const id = event.currentTarget?.id;
    this.poiService.deletePoi(id)
    .subscribe({
      next: () => {
        console.log('id of post to delete', id);

        this.pois = this.pois.filter(
          poi => poi.id !== id
        );

        this.ngOnInit();
      },
      error: (error) => {
        this.error = error;
      }
    })
  } 
}
