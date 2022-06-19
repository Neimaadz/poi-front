import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.css']
})
export class PoiCreateComponent implements OnInit {

  poiForm: FormGroup;
  file!: File;
  error = '';

  constructor(private fb: FormBuilder, private poiService: PoiService, private router: Router) {
    this.poiForm = this.fb.group({
      name: '',
      comment: '',
      lat: '',
      lng:''
    })
  }

  ngOnInit(): void {
    this.poiForm.setValue({
      name:"",
      comment: "",
      lat: 0,
      lng: 0
    });
  }

  addPoi() {
    const poiData = this.poiForm.value;
    console.log(this.poiForm.value);
    this.poiService.createPoi(poiData, this.file)
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

  onNewFile(file: File) {
    this.file = file;
  }
}
