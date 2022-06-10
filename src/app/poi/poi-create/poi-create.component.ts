import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.css']
})
export class PoiCreateComponent implements OnInit {

  poiForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private poiService: PoiService, private router: Router) {
    this.poiForm = this.fb.group({
      name: '',
      comment: '',
      imagePath: '',
      lat: '',
      lng:''
    })
  }

  ngOnInit(): void {
  }

  addPoi() {
    const poiData = this.poiForm.value;
    this.poiService.createPoi(poiData)
    .subscribe({
      next: poi => {
        console.log(`poi created with id ${poi.id}`);
        this.router.navigate(['poi']);
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
