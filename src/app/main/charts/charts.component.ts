import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  // 1. Line Chart
  lineChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'blue',
        tension: 0.3
      }
    ] //dfdwee
  };
  lineChartOptions: ChartConfiguration['options'] = { responsive: true };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  // 2. Bar Chart
  barChartData: ChartData<'bar'> = {
    labels: ['2017', '2018', '2019', '2020', '2021'],
    datasets: [
      { label: 'Revenue', data: [65, 59, 80, 81, 56], backgroundColor: '#3e95cd' },
      { label: 'Expenses', data: [28, 48, 40, 19, 86], backgroundColor: '#8e5ea2' }
    ]
  };
  barChartOptions: ChartConfiguration['options'] = { responsive: true };
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  // 3. Radar Chart
  radarChartData: ChartData<'radar'> = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'Person A',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)'
      },
      {
        label: 'Person B',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)'
      }
    ]
  };
  radarChartOptions: ChartConfiguration['options'] = { responsive: true };
  radarChartLegend = true;
  radarChartType: ChartType = 'radar';

  // 4. Polar Area Chart
  polarAreaChartData: ChartData<'polarArea'> = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [{
      data: [11, 16, 7, 3, 14],
      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
    }]
  };
  polarAreaChartOptions: ChartConfiguration['options'] = { responsive: true };
  polarAreaChartLegend = true;
  polarAreaChartType: ChartType = 'polarArea';

  // 5. Pie Chart
  pieChartData: ChartData<'pie'> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  pieChartOptions: ChartConfiguration['options'] = { responsive: true };
  pieChartLegend = true;
  pieChartType: ChartType = 'pie';

  // 6. Doughnut Chart
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
    datasets: [{
      data: [350, 450, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  doughnutChartOptions: ChartConfiguration['options'] = { responsive: true };
  doughnutChartLegend = true;
  doughnutChartType: ChartType = 'doughnut';

  // 7. Bubble Chart
  bubbleChartData: ChartData<'bubble'> = {
    datasets: [{
      label: 'Bubble Dataset',
      data: [
        { x: 10, y: 20, r: 15 },
        { x: 15, y: 10, r: 10 },
        { x: 26, y: 12, r: 14 },
        { x: 7, y: 26, r: 8 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }]
  };
  bubbleChartOptions: ChartConfiguration['options'] = { responsive: true };
  bubbleChartLegend = true;
  bubbleChartType: ChartType = 'bubble';

  // 8. Scatter Chart
  scatterChartData: ChartData<'scatter'> = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 }
      ],
      backgroundColor: 'rgba(75,192,192,1)'
    }]
  };
  scatterChartOptions: ChartConfiguration['options'] = { responsive: true };
  scatterChartLegend = true;
  scatterChartType: ChartType = 'scatter';
}
