import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Poi, Trip } from 'src/app/models';

@Component({
  selector: 'app-details-pois',
  templateUrl: './details-pois.component.html',
  styleUrls: ['./details-pois.component.css']
})
export class DetailsPoisComponent implements OnChanges {

  @Input() data: Poi[];

  displayedColumns: string[] = ["id", "name", "comment", "lat", "lng"];
  dataSource: MatTableDataSource<Poi>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<Poi>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.data);
  }

}
