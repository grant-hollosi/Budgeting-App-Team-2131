import { Component, OnInit, ViewChild } from '@angular/core';
// import { d3 } from 'd3'
import * as d3 from 'd3';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import { IonModal, IonSelect, ToastController } from '@ionic/angular';
import { formatMoney } from 'accounting';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {
  @ViewChild('graph_modal') graph_modal: IonModal;
  @ViewChild('results_modal') results_modal: IonModal;
  @ViewChild('graph_type') graph_type: IonSelect;
  @ViewChild('column_group') column_group: IonSelect;
  public results: any[];
  homeResults: any[];
  recids: number[];
  public type: string;
  public group: string;

  constructor(private dataService: DataService, private storage: Storage, private toastCtrl: ToastController) {  }

  ngOnInit() {  }

  ionViewWillEnter() {
    this.results = new Array();
    this.recids = new Array();
    this.dataService.wipe();

    this.storage.get('filtered_results').then((result) => {
      this.recids = []
      for (let r in result) {
        this.recids.push(result[r]['recID']);
      }
      this.setOpen(true, 'graph_modal');
    })
  }

  ionViewWillLeave() {
    d3.selectAll('svg > *').remove();
    d3.select('body').selectAll('div.tooltip').remove();
  }

  updateResults(type: string, column: string) {
    this.type = type;
    this.group = column;
    let query = this.dataService.getQuery(`SELECT ${column}, SUM(Obligations) FROM dataTable WHERE recID in (${this.recids}) GROUP BY ${column}`)
      query.then((result) => {
        if (Array.isArray(result)) {
          this.results = result;
          this.results = this.results.sort(function(b, a) {
            return a['SUM(Obligations)'] - b['SUM(Obligations)'];
          })
          switch (type) {
            case 'bar':
              this.generateBarChart(column);
              break;
            case 'pie':
              this.generatePieChart(column);
              break;
          }
          // Need to wait until the correct svg height is loaded -> if we don't wait then the first graph gets created really big
        }
      });
  }

  setOpen(open: boolean, modal: string) {
    if (modal == 'graph_modal') {
      this.graph_modal.isOpen = open;
    } else if (modal == 'results_modal') {
      this.results_modal.isOpen = open;
    }
  }

  generatePieChart(column: string) {
    // Pie chart
    const data = this.results.filter((program) => {
      return program['SUM(Obligations)'] > 0;
    });

    data.sort(function(b, a) {
      return a['SUM(Obligations)'] - b['SUM(Obligations)'];
    });

    d3.selectAll('svg > *').remove();
    d3.select('body').selectAll('div.tooltip').remove();

    const myPlot = document.getElementById('myPlot');
    const width = myPlot.clientWidth;
    const height = myPlot.clientHeight;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin

    const svgContainer = d3.select('#myPlot');
    const svg = svgContainer
      .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + (height / 2 - 20) + ')');

    // d3.json('../../../../assets/data/fund-list.json').then((data) => {
    const tooltip = d3.select('body')
                    .append('div')
                    .style('opacity', 0)
                    .style('position', 'absolute')
                    .attr('class', 'tooltip')
                    .style('background-color', 'white')
                    .style('color', 'black')
                    .style('font-family', 'Georama, sans-serif')
                    .style('border', 'solid')
                    .style('border-width', '2px')
                    .style('border-radius', '5px')
                    .style('border-color', 'black')
                    .style('padding', '5px');

    const color = d3.scaleOrdinal(d3.schemeSet2);
    
    const pie = d3.pie()
                  .value((d) => d['SUM(Obligations)'])
    const data_ready = pie(data)
    
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);


    const arcs = svg.selectAll('whatever')
      .data(data_ready)
      .enter();

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d))
      .attr('stroke', 'black')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .on('mouseover', function(d) {
        tooltip
          .style('opacity', 1);
        d3.select(this)
          .style('stroke', 'black')
          .style('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        tooltip
          .html(`<b>${column}:</b><br>${d.data[column]}<br><b>Obligation Amount:</b><br>${formatMoney(d.data['SUM(Obligations)'])}`)
          .style('left', event.x + 20 + 'px')
          .style('top', event.y + 'px')
      })
      .on('mouseleave', function(d) {
        tooltip
          .style('opacity', 0);
        d3.select(this)
          .style('stroke', 'none')
          .style('opacity', 0.8)
      });
    
    // arcs.append('text')
    //   .attr('transform', function(d) {
    //     d.innerRadius = 0;
    //     d.outerRadius = radius;
    //     return 'translate(' + arc.centroid(d) + ')';
    //   })
    //   .attr('text-anchor', 'middle')
    //   .text(function(d, i) {
    //     return data[i][column];
    //   });
  }

  generateBarChart(column: string) {
    // Horizontal bar chart
    const data = this.results.filter((program) => {
      return program['SUM(Obligations)'] > 0;
    });

    data.sort(function(b, a) {
      return a['SUM(Obligations)'] - b['SUM(Obligations)'];
    });

    d3.selectAll('svg > *').remove();
    d3.select('body').selectAll('div.tooltip').remove();

    const margin = {top: 40, right: 40, bottom: 100, left: 100};

    const myPlot = document.getElementById('myPlot');
    const width = myPlot.clientWidth - margin.left - margin.right;
    const height = myPlot.clientHeight - margin.top - margin.bottom;

    const svgContainer = d3.select('#myPlot');
    const svg = svgContainer
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const tooltip = d3.select('body')
      .append('div')
      .style('opacity', 0)
      .style('position', 'absolute')
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('color', 'black')
      .style('font-family', 'Georama, sans-serif')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('border-color', 'black')
      .style('padding', '5px');

    // Add X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function(d) { 
        if (d[column].trim())  return d[column];
        else  return "BLANK"
      }))
      .padding(0.2);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, data[0]['SUM(Obligations)']])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    //Bars
    svg.selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d) { 
        if (d[column].trim()) return x(d[column]);
        else  return x("BLANK"); 
      } )
      .attr('y', function(d) { return y(d['SUM(Obligations)']); })
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return height - y(d['SUM(Obligations)']); })
      .attr('fill', '#69b3a2')
      .on('mouseover', function(d) {
        tooltip
          .style('opacity', 1);
        d3.select(this)
          .style('stroke', 'black')
          .style('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        tooltip
          .html(`<b>${column}:</b><br>${d[column]}<br><b>Obligation Amount:</b><br>${formatMoney(d['SUM(Obligations)'])}`)
          .style('left', event.x + 20 + 'px')
          .style('top', event.y + 'px')
      })
      .on('mouseleave', function(d) {
        tooltip
          .style('opacity', 0);
        d3.select(this)
          .style('stroke', 'none')
          .style('opacity', 0.8)
      });

  }

  async submit_settings(type: string, column: string) {
    if (type && column) {
      this.updateResults(type, column);
      this.setOpen(false, 'graph_modal');
    } else {
      let message = '';
      if (!type && !column) {
        message = "Please select a Graph Type and Column Group!"
      } else if (!type) {
        message = "Please select a Graph Type!";
      } else {
        message = "Please select a Column Group!";
      }
      const error = await this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        color: 'danger',
        buttons:
        [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ]
      });
      error.present();
    }
  }

  blankTitle(result) {
    return result[this.group].trim() == '';
  }
}