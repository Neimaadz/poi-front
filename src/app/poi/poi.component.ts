import { AfterContentInit, Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Poi } from '../models';
import { PoiService } from './poi.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { AuthenticationService } from '../authentication/authentication.service'
import { User } from '../models';

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
  currentUser: User | null;

  gridByBreakpoint : plotOptions = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(private poiService: PoiService, private MediaObserver: MediaObserver, private authenticationService :AuthenticationService ) {
    this.cols.next(4);
    this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
        this.currentUser = this.authenticationService.currentUserValue
    });
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
