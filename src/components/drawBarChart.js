
import * as d3 from "d3";

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // 绘制条形图
  barChartLayer.selectAll('.bar')  // 选择所有类名为 'bar' 的元素
  .data(data)  // 将数据绑定到条形元素
  .enter()  // 为每个数据点创建占位符
  .append('rect')  // 为每个数据点添加一个矩形元素（条形）
  .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)  // 设置类名，包含 'bar' 和站点名
  .attr('x', d => xScale(d.station))  // 设置 x 坐标
  .attr('y', d => yScale(d.tripdurationS))  // 设置 y 坐标
  .attr('width', xScale.bandwidth())  // 设置条形的宽度
  .attr('height', d => barChartHeight - yScale(d.tripdurationS))  // 设置条形的高度
  .style('fill', 'steelblue')  // 设置初始填充颜色为钢蓝色
  .style('stroke', 'black')  // 设置边框颜色为黑色
  .style('stroke-width', 2)  // 设置边框宽度为 2
  .on('mouseover', (event, d) => {
      // 鼠标悬停事件
      // 高亮当前条形，并突出显示对应的散点图点
      d3.select(event.target)
          .style('fill', 'red');  // 将当前条形的颜色改为红色

      // 高亮对应的散点图点
      d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
          .style('fill', 'red');  // 将对应的散点图点改为红色
  })
  .on('mouseout', (event, d) => {
      // 鼠标移出事件
      // 恢复条形的颜色
      d3.select(event.target)
          .style('fill', 'steelblue');  // 恢复为钢蓝色

      // 恢复对应的散点图点的颜色
      d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
          .style('fill', 'steelblue');  // 恢复为钢蓝色
  });
    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function 

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot

  };