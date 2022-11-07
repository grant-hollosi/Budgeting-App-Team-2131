import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.page.html',
  styleUrls: ['./pie-chart.page.scss'],
})
export class PieChartPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generateGraph() {
    // Pie chart

    d3.selectAll('element').remove();
    d3.select('body').selectAll('div.tooltip').remove();

    const width = 450
    const height = 450
    const margin = 40

    const radius = Math.min(width, height) / 2 - margin

    const svgContainer = d3.select('#myPlot');
    const svg = svgContainer
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    // var data = {a: 9, b: 20, c:30, d:8, e:12}
    // const data = [9, 20, 30, 8, 12];

    // // set the color scale
    // var color = d3.scaleOrdinal(d3.schemeSet2);

    // // Compute the position of each group on the pie:
    // var pie = d3.pie()
    // var data_ready = pie(data);
    // // Now I know that group A goes from 0 degrees to x degrees and so on.

    // // shape helper to build arcs:
    // var arcGenerator = d3.arc()
    //   .innerRadius(0)
    //   .outerRadius(radius)

    // console.log(color);
    // console.log(pie);
    // console.log(data_ready);
    // console.log(arcGenerator);

    // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    // svg
    //   .selectAll('mySlices')
    //   .data(data_ready)
    //   .enter()
    //   .append('path')
    //     .attr('d', arcGenerator)
    //     .attr('fill', function(d){ return(color(d.data.key)) })
    //     .attr("stroke", "black")
    //     .style("stroke-width", "2px")
    //     .style("opacity", 0.7)

    // // Now add the annotation. Use the centroid method to get the best coordinates
    // svg
    //   .selectAll('mySlices')
    //   .data(data_ready)
    //   .enter()
    //   .append('text')
    //   .text(function(d){ return "grp " + d.data.key})
    //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    //   .style("text-anchor", "middle")
    //   .style("font-size", 17)


    d3.json('../../../../assets/data/fund-list.json').then((data) => {
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
                    .value((d) => d.amount)
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
          tooltip
            .html('Fund Amount: $' + d.value)
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
          return data[i].name;
        })
    });
  }
}


// Scatter Plot
    // Set Dimensions
    // const xSize = 500;
    // const ySize = 500;
    // const margin = 40;
    // const xMax = xSize - margin*2;
    // const yMax = ySize - margin*2;

    // // Create Random Points
    // const numPoints = 100;
    // const data = [];
    // for (let i = 0; i < numPoints; i++) {
    // data.push([Math.random() * xMax, Math.random() * yMax]);
    // }

    // d3.select('#myPlot').selectAll('*').remove();

    // // Append SVG Object to the Page
    // const svg = d3.select('#myPlot')
    // .append('svg')
    // .append('g')
    // .attr('transform','translate(' + margin + ',' + margin + ')');

    // // X Axis
    // const x = d3.scaleLinear()
    // .domain([0, 500])
    // .range([0, xMax]);

    // svg.append('g')
    // .attr('transform', 'translate(0,' + yMax + ')')
    // .call(d3.axisBottom(x));

    // // Y Axis
    // const y = d3.scaleLinear()
    // .domain([0, 500])
    // .range([ yMax, 0]);

    // svg.append('g')
    // .call(d3.axisLeft(y));

    // const Tooltip = d3.select('#myPlot')
    // .append('div')
    // .style('opacity', 1)
    // .attr('class', 'tooltip')
    // .style('background-color', 'white')
    // .style('border', 'solid')
    // .style('border-width', '2px')
    // .style('border-radius', '5px')
    // .style('padding', '5px');

    // const mouseover = (d) => {
    //   Tooltip
    //   .style('opacity', 1);
    // d3.select(this)
    //   .style('stroke', 'black')
    //   .style('opacity', 1);
    // };

    // const mousemove = (d) => {
    //   Tooltip
    //   .html('The exact value of<br>this cell is: ')
    //   .style('left', (70) + 'px')
    //   .style('top', (70) + 'px');
    // };

    // const mouseleave = (d) => {
    //   Tooltip
    //   .style('opacity', 1);
    // d3.select(this)
    //   .style('stroke', 'none')
    //   .style('opacity', 0.8);
    // };

    // // Dots
    // svg.append('g')
    // .selectAll('dot')
    // .data(data).enter()
    // .append('rect')
    // .attr('x', (d) => d[0] )
    // .attr('y', (d) => d[1])
    // .attr('rx', 3)
    // .attr('ry', 3)
    // .attr('width', x.bandwidth() )
    //   .attr('height', y.bandwidth() )
    //   .style('fill', 'Red')
    //   .style('stroke-width', 4)
    //   .style('stroke', 'none')
    //   .style('opacity', 0.8)
    // .on('mouseover', mouseover)
    // .on('mousemove', mousemove)
    // .on('mouseleave', mouseleave);
