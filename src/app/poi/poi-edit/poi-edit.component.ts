import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Poi } from 'src/types';
import { PoiService } from '../poi.service';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit {
  poiForm: FormGroup;
  poi?: Poi;
  error = '';

  constructor(
    private poiService: PoiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.poiForm = this.fb.group({
      name: '',
      comment: '',
      imagePath: '',
      lat: '',
      lng:''
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.poiService.getPoi(id).subscribe({
      next: (poi: Poi) => {
        this.poiForm.setValue({
          name: poi?.name,
          comment: poi?.comment,
          imagePath: poi?.imagePath,
          lat: poi?.lat,
          lng: poi?.lng
    });
      },
      error: (error: string) => {
        console.error(error);
      }
    });
  }

  editPoi() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let poiData = this.poiForm.value;
    poiData["id"] = id;
    this.poiService.editPoi(poiData,id)
    .subscribe({
      next: poi => {
        console.log(`poi edited with id ${id}`);
        this.router.navigate(['poi']);
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
