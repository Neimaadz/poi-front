import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models';
import { TripService } from 'src/app/trip/trip.service';

@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.css']
})
export class SearchTripComponent implements OnInit {

  trips: Trip[] = [];
  searchTripForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private tripService: TripService, private router: Router) {
    this.searchTripForm = this.fb.group({
      origin: '',
      destination: '',
    })
  }

  ngOnInit(): void {
    this.searchTripForm.setValue({
      origin:"",
      destination: ""
    });
  }

  searchTrip() {
    const tripData = this.searchTripForm.value;
    this.tripService.getTripOriginDestination(tripData)
    .subscribe({
      next: trip => {
        this.trips = trip;
        console.log(this.trips);
      },
      error: error => {
        this.error = error;
      }
    });
  }
}
