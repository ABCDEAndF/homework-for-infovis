
import * as d3 from "d3";

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function 

    barChatLayer.selectAll('.bar') //select all the bar elements with the class 'point'
      .data(data) //bind the data to the bar elements
      .enter() //create placeholder for each data point
      .append('rect') //append a circle element for each data point
      .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the bar element to 'point' and the station name
      .attr('x', d => xScale(d.station))                                //这样方便日后处理
      .attr('y', d => yScale(d.start))
      .attr('width', xScale.bandwidth()) // 老师说了，要用bandwidth
      .attr('height', d => barChartHeight - yScale(d.start))
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)

      .on("mouseover", (event, d) => {
              console.log(event.currentTarget)

      
              // d3.select(event.currentTarget)
              // .style('fill','red');
              d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill','red');
              d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .filter("circle")
              .each(function() {
                let parent = d3.select(this.parentNode)
                // console.log(parent)
                parent.append("rect")
                .attr("class", "cover")
                .attr("width", 580)
                .attr("height", 360)
                .attr("fill", "yellow")
                .attr("opacity", 0.5);
              })
              d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .filter("circle")
              .attr('r','10')
              .raise();

            })
      .on("mouseout", (event, d) => {
              d3.select(".cover").remove()
              d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .style('fill','steelblue');
              d3.selectAll(`.${event.currentTarget.classList[1]}`)
              .filter("circle")
              .attr('r','5')
              .lower();
              // d3.select(event.currentTarget)
              // .style('fill','steelblue');
            })

    console.log(data.start)

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
    

  }