import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileName = '';
  @Output() newFileEvent = new EventEmitter<File>();
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
  }

  onFileSelected(event : any) {

    const file: File = event.target.files[0] ? event.target.files[0] : null;
    if (file) this.fileName = file.name;
    
    this.newFileEvent.emit(file);

  }

}
