import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, Input, OnChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Poi, Trip } from 'src/app/models';
import { DetailsPoisComponent } from "./details-pois/details-pois.component";

@Component({
  selector: 'app-details-trip',
  templateUrl: './details-trip.component.html',
  styleUrls: ['./details-trip.component.css']
})
export class DetailsTripComponent implements OnChanges {

  @Input() trips: Trip[];
  pois: Poi[] | undefined = [];
  displayedColumns: string[] = ['position', 'name', 'origin', 'destination'];
  dataSource: MatTableDataSource<Trip>;
  expandedRow: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren("tableRow", { read: ViewContainerRef }) rowContainers: { toArray: () => any[]; };

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnChanges() {
    this.trips.forEach(trip => console.log(trip))
    this.dataSource = new MatTableDataSource<Trip>(this.trips)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  insertComponent(index: number, tripId: number) {
    if (this.expandedRow != null) {
      // clear old content
      this.rowContainers.toArray()[this.expandedRow].clear();
    }

    if (this.expandedRow === index) {
      this.expandedRow = null;
    } else {
        this.pois = this.trips.find(trip => trip.id === tripId)?.pois
        const container = this.rowContainers.toArray()[index];
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DetailsPoisComponent);
        const inlineComponent = container.createComponent(factory);

        inlineComponent.instance.data = this.pois;
        this.expandedRow = index;
    }
  }
}
