import { Component, OnInit } from '@angular/core';
// import { d3 } from 'd3'
import * as d3 from '../../../../../node_modules/d3';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit {
  results: any[];
  homeResults: any[];

  constructor(private dataService: DataService) {  }

  ngOnInit() {
    this.results = new Array();
    this.dataService.wipe();
    let query = this.dataService.populate(`SELECT * FROM dataTable GROUP BY FundedProgram`);
    query.then((result) => {
      if (Array.isArray(result)) {
        this.results = result;
        setTimeout(() => this.generateBarChart(), 200); 
        // Need to wait until the correct svg height is loaded -> if we don't wait then the first graph gets created really big
      }
    });
  }

  generatePieChart() {
    // Pie chart
    const data = this.results.filter((program) => {
      return program.Obligations > 0;
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
                  .value((d) => d.Obligations)
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
          .html('Obligation Amount: $' + d.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','))
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
    
    arcs.append('text')
      .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return 'translate(' + arc.centroid(d) + ')';
      })
      .attr('text-anchor', 'middle')
      .text(function(d, i) {
        return data[i].FundedProgram;
      });
  }

  generateBarChart() {
    // Horizontal bar chart
    const data = this.results.filter((program) => {
      return program.Obligations > 0;
    });

    data.sort(function(b, a) {
      return a.Obligations - b.Obligations;
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
      .domain(data.map(function(d) { return d.FundedProgram; }))
      .padding(0.2);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // Y axis
    const y = d3.scaleLinear()
      .domain([0, data[0].Obligations])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    //Bars
    svg.selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d) { return x(d.FundedProgram); } )
      .attr('y', function(d) { return y(d.Obligations); })
      .attr('width', x.bandwidth())
      .attr('height', function(d) { return height - y(d.Obligations); })
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
          .html('Obligation Amount: $' + d.Obligations.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','))
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
}