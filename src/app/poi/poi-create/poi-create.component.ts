import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoiService } from '../poi.service';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.css']
})
export class PoiCreateComponent implements OnInit {

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private poiService: PoiService) {
    this.postForm = this.fb.group({
      name: '',
      comment: '',
      imagePath: '',
      lat: '',
      lng:''
    })
  }
  error = '';

  ngOnInit(): void {
  }

  addPoi() {
    const postData = this.postForm.value;
    // console.log et console.error sont juste temporaires
    // idéalement, on afficherait une notification de succès
    this.poiService.createPoi(postData)
    .subscribe({
      next: poi => {
        console.log(`post created with id ${poi.id}`);
      },
      error: error => {
        this.error = error;
      }
    });
  }

}
