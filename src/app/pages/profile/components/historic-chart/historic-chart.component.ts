import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Progression} from '@shared-modules/store/game/game.state';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-historic-chart',
  templateUrl: './historic-chart.component.html',
  styleUrls: ['./historic-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() historic: Progression[];
  chart: any;
  gradientFill: any;

  get slicedHistoric() {
    const length = this.historic.length;
    return this.historic.slice(Math.max(0, length - 10), length);
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({changes});
    requestAnimationFrame(() => {
      this.chart.data.labels = this.slicedHistoric.map(() => '');
      this.chart.data.datasets = [{
        data: this.slicedHistoric.map(prog => prog.score),
        borderColor: '#80c559',
        pointBackgroundColor: '#80c559',
        pointBorderColor: '#80c559',
        pointRadius: 3,
        pointHoverRadius: 3,
        fill: true,
        backgroundColor: this.gradientFill,
      }];
      this.chart.update();
    });
  }

  draw() {
    const x = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
    this.gradientFill = x.createLinearGradient(0, 0, 0, 160);
    this.gradientFill.addColorStop(0, 'rgba(128, 197, 89, 0.5)');
    this.gradientFill.addColorStop(1, 'transparent');
    this.chart = new Chart(x, {
      type: 'line',
      data: {
        labels: this.slicedHistoric.map(() => ''),
        datasets: [{
          data: this.slicedHistoric.map(prog => prog.score),
          borderColor: '#80c559',
          pointBackgroundColor: '#80c559',
          pointBorderColor: '#80c559',
          pointRadius: 3,
          pointHoverRadius: 3,
          fill: true,
          backgroundColor: this.gradientFill,
        }],
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,.1)'
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,0)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
