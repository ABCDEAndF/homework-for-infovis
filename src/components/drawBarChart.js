import * as d3 from "d3";

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // 绘制柱状图
  barChatLayer.selectAll('.bar') // select all the bar elements with the class 'point'
    .data(data) // bind the data to the bar elements
    .enter() // create placeholder for each data point
    .append('rect') // append a rectangle element for each data point
    .attr('class', d => `point ${d.station.replace(/[^a-zAZ]/g, "")}`) // set the class names of the bar element to 'point' and the station name
    .attr('x', d => xScale(d.station)) // 设置柱状图的 x 位置
    .attr('y', d => yScale(d.start)) // 设置柱状图的 y 位置
    .attr('width', xScale.bandwidth()) // 使用bandwidth来设定宽度
    .attr('height', d => barChartHeight - yScale(d.start)) // 设置柱状图的高度
    .style("fill", 'steelblue') // 设置颜色为steelblue
    .style("stroke", "black") // 设置边框颜色为黑色
    .style("stroke-width", 2) // 设置边框宽度
    .on("mouseover", (event, d) => {
      // 鼠标悬停事件
      console.log(event.currentTarget);

      // 高亮对应的散点图元素
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'red'); // 修改柱状图和散点图的颜色为红色

      // 在散点图中添加覆盖矩形
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .filter("circle")
        .each(function () {
          let parent = d3.select(this.parentNode);
          // 在该点的父节点中插入一个矩形
          parent.append("rect")
            .attr("class", "cover")
            .attr("width", 580)
            .attr("height", 360)
            .attr("fill", "yellow")
            .attr("opacity", 0.5);
        });

      // 修改对应的散点图元素的半径
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .filter("circle")
        .attr('r', '10')
        .raise();
    })
    .on("mouseout", (event, d) => {
      // 鼠标移出事件
      d3.select(".cover").remove(); // 移除覆盖矩形

      // 恢复柱状图和散点图颜色
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'steelblue');

      // 恢复散点图元素的半径
      d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .filter("circle")
        .attr('r', '5')
        .lower();
    });

  console.log(data.start);
};
