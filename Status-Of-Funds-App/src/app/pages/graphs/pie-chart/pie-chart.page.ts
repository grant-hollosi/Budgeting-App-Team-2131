import { Component, OnInit } from '@angular/core';

import * as d3 from '../../../../../node_modules/d3';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit {
  results: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.results = new Array();
    this.dataService.wipe();
    let query = this.dataService.populate(`SELECT * FROM dataTable GROUP BY FundedProgram`);
    query.then((result) => {
      if (Array.isArray(result)) {
        this.results = result;
        console.log(this.results);
        this.generatePieChart();
      }
    });
  }

  generatePieChart() {
    // Pie chart
    const data = this.results.filter((program) => {
      return program.Obligations > 0;
    });


    d3.selectAll('element').remove();
    d3.select('body').selectAll('div.tooltip').remove();

    // const width = Math.min(screen.width, screen.height);
    // const height = width;
    const width = 450;
    const height = 450;
    const margin = 40;

    console.log(width, height);

    const radius = Math.min(width, height) / 2 - margin

    const svgContainer = d3.select('#myPlot');
    const svg = svgContainer
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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

    console.log(data_ready);
    
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
        console.log(d);
        tooltip
          .html('Obligation Amount: $' + d.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
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
      })
  }
}