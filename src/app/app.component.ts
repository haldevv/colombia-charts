import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {MapServiceService} from './map-service.service';
import {tap} from 'rxjs/operators';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private service: MapServiceService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {


        const chart = am4core.create('chartdiv', am4maps.MapChart);

        // chart.geodata = am4geodata_waSchools;

        chart.geodataSource.url = 'assets/coordinates/map.json'

        chart.projection = new am4maps.projections.Projection();

        const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ['CONSULADOS']


        chart.series.push(polygonSeries)

        const polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = '{name}';
        polygonTemplate.fill = am4core.color('#00adca');

        // creo un estado del elemento
        const hs = polygonTemplate.states.create('hover');
        hs.properties.fill = am4core.color('#00424f');

        chart.zoomControl = new am4maps.ZoomControl();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
