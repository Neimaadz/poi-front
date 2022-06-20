import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatGridList } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poi } from '../models';
import { PoiService } from '../poi/poi.service';
import { TripService } from './trip.service';

type plotOptions = {
  [key: string]: number
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @ViewChild('grid', { static: true })
  grid!: MatGridList;
  cols: Subject<any> = new Subject();
  gridByBreakpoint : plotOptions = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  }
  apiURL = environment.apiURL;
  poisWithoutTrip: Poi[] = [];
  poisWithoutTripId: Number[] = [];
  tripForm: FormGroup;
  file!: File;
  error = '';
  
  constructor(
    private fb: FormBuilder,
    private MediaObserver: MediaObserver,
    private tripService: TripService,
    private router: Router, 
    private poiService: PoiService) {
      this.cols.next(4);
      this.tripForm = this.fb.group({
        name:"",
        description: "",
        origin:"",
        destination: "",
        poisId: []
      })
  }

  ngOnInit(): void {
    this.MediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.cols.next(this.gridByBreakpoint[change[0].mqAlias]);
    });
    this.tripForm.setValue({
      name:"",
      description: "",
      origin:"",
      destination: "",
      poisId: []
    });
    
    this.poiService.getAllPoiWithoutTrip()
      .subscribe(poisWithoutTrip => {
        this.poisWithoutTrip = poisWithoutTrip;
        this.poisWithoutTrip.forEach(poi => poi.checked = false);
      });
  }

  onChange(poisId: any, isChecked: boolean) {

    if (!isChecked) {
      this.poisWithoutTripId.push(poisId);
      this.poisWithoutTrip.forEach(poiWithoutTrip => poiWithoutTrip.id == poisId ? poiWithoutTrip.checked = true : false);
    } else {
      this.poisWithoutTrip.forEach(poiWithoutTrip => poiWithoutTrip.id == poisId ? poiWithoutTrip.checked = false : true);
      this.poisWithoutTripId = this.poisWithoutTripId.filter(
        poiId => poiId !== poisId
      );
    }
  }

  addTrip() {
    this.tripForm.controls['poisId'].setValue(this.poisWithoutTripId);
    const tripData = this.tripForm.value;
    this.tripService.createTrip(tripData)
    .subscribe({
      next: trip => {
        console.log(`poi created with id ${trip.id}`);
        this.router.navigate(['poi']);
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
