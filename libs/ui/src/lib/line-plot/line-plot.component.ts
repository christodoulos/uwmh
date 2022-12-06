import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'uwmh-line-plot',
  templateUrl: './line-plot.component.html',
  styleUrls: ['./line-plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinePlotComponent implements OnChanges {
  @Input() series = '0';
  @Input() xvalues: Date[] = [];
  @Input() yvalues: number[][] = [];
  data: any[] = [];
  chartOption: EChartsOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] && this.data.length) {
      this.chartOption = {
        title: {
          text: this.title(),
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          name: 'Date',
        },
        yAxis: {},
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: this.data.map((item) => [
              item[0],
              item[1][parseInt(this.series)],
            ]),
          },
        ],
      };
    }
    if (changes['xvalues'] && changes['yvalues']) {
      // zip x/y values
      this.data = this.xvalues.map((item, i) => [item, this.yvalues[i]]);
      // console.log(this.data);
    }
  }

  title(): string {
    switch (this.series) {
      case '0':
        return 'Temperature membrane tank 5';
      case '1':
        return 'LT1 (pH membrane tank 5)';
      case '2':
        return 'DO ppm LDO aeriation tank 4A';
      case '3':
        return 'DO ppm anoxic tank3';
      case '4':
        return 'MLSS SOLID mg/l membrane tank 5';
      case '5':
        return 'MLSS SOLID mg/l membrane tank 4A';
      case '6':
        return 'LDO DO ppm anoxic';
      case '7':
        return 'Temperature anoxic tank';
      case '8':
        return 'Turbidity NTU tank 10';
      default:
        return '';
    }
  }
}
