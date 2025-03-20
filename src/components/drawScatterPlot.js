import * as d3 from "d3";
export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {
  // 自定义tooltip
  let the_tooltip = d3.select(".tooltip");

  scatterPlotLayer.selectAll('.point')  // select all the circle elements with the class 'point'
    .data(data)  // bind the data to the circle elements
    .enter()  // create placeholder for each data point
    .append('circle')  // append a circle element for each data point
    .attr('class', d => `point ${d.station.replace(/[^a-zAZ]/g, "")}`)  // set the class names of the circle element to 'point' and the station name
    .attr('cx', d => xScale(d.tripdurationS))
    .attr('cy', d => yScale(d.tripdurationE))
    .attr('r', "5")
    .style("fill", 'steelblue')
    .style("stroke", "black")
    .style("stroke-width", 2)
    .on("mouseover", (event, d) => {
      // 鼠标悬停事件
      the_tooltip.style("opacity", 1)
        .html(`${d.station}`)
        .style("top", (event.pageY + 5) + "px")
        .style("left", (event.pageX + 5) + "px");

      // 在散点图上添加覆盖矩形（rect）元素
      scatterPlotLayer.append("rect")
        .attr("class", "cover")
        .attr("width", scatterPlotWidth)
        .attr("height", scatterPlotHeight)
        .attr("fill", "yellow")
        .attr("opacity", 0.5);

      // 鼠标悬停时，选中的圆形变为红色，增大半径
      d3.select(event.currentTarget)
        .attr('r', '10')
        .style('fill', 'red')
        .raise();

      // 鼠标悬停时，突出显示同一类的所有圆点
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'red')
        .raise();
    })
    .on('mouseout', (event, d) => {
      // 鼠标移出事件
      the_tooltip.style("opacity", 0);  // 隐藏tooltip
      d3.select(".cover").remove();  // 移除覆盖矩形

      // 恢复圆点的样式
      d3.select(event.currentTarget)
        .attr('r', '5')
        .style('fill', 'steelblue');

      // 鼠标移出时，恢复所有圆点的颜色
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'steelblue')
        .lower();
    });
};


