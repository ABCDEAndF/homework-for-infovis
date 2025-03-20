import * as d3 from "d3";


export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {
  
  //从demo里偷的，自定义一个div(tooltip)，然后藏起来。
    // let the_tooltip = d3.select("body").append("div")
    // .attr("id", "tooltip")
    // .style("visibility", "hidden")
    // .style("background", "rgba(0,0,0,0.7)")
    // .style("color", "white")
    // .style("padding", "5px")
    // .style("border-radius", "5px")
    // .style("pointer-events", "none")
    // .style("position", "absolute"); //为啥缺了这条就只会显示在下面呢？？？

    let the_tooltip = d3.select(".tooltip")

    scatterPlotLayer.selectAll('.point') //select all the circle elements with the class 'point'
      .data(data) //bind the data to the circle elements
      .enter() //create placeholder for each data point
      .append('circle') //append a circle element for each data point
      .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the circle element to 'point' and the station name
      .attr('cx', d => xScale(d.tripdurationS))
      .attr('cy', d => yScale(d.tripdurationE))
      .attr('r', "5")
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
        //Task 4: Complete the code for the mouseover event
        //Hint:
        //1. set the radius of the circle to 10 and the color to red
        //2. add a tooltip to show the detailed information of the selected point
        //   1. set the opacity of the tooltip to 0.9
        //   2. set the text of the tooltip to the station name
        //   3. set the position of the tooltip to the mouse position
        //3. append a rect element to isolate the selected point out of the scatter plot
        //   1. set the fill color of the rect element to yellow
        //   2. set the opacity of the rect element to 0.5
        //   3. set the width and height of the rect element to the scatter plot width and height
        console.log(event.currentTarget.classList.value)
        the_tooltip.style("opacity", 1)
        .html(`${d.station}`)
        .style("top", (event.pageY + 5) + "px")
        .style("left", (event.pageX + 5) + "px");


        // the_tooltip.style("visibility", "visible")
        // .html(`${d.station}`)


        scatterPlotLayer.append("rect")
        .attr("class", "cover")
        .attr("width", scatterPlotWidth)
        .attr("height", scatterPlotHeight)
        .attr("fill", "yellow")
        .attr("opacity", 0.5);


        d3.select(event.currentTarget)
        .attr('r','10')
        .style('fill','red')
        .raise()

        // console.log(d) 
        // d就是数据点，是一个object，长这样：{station: "some station name", *other attributs}

        //Task 8 part 1: Complete the code for interactive highlighting
        //Hint:
        //1. select all the circle and bar with the same class as the current circle; you may use .arrt("class") to get the class names of the current circle
        //2. set the fill color of the selected the circle and bar to red
        //3. raise the selected circle to the top using .raise()
        //4. remember to use console.log() to debug the code
        d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'red')
        .raise()

      })
      .on('mouseout',(event, d)=>{
        //Task 5: Complete the code for the mouseout event
        //Hint:
        //1. set the text of the tooltip to "" and the opacity to 0
        //2. remove the rect element
        //3. set the radius of the circle to 5 and color to steelblue
        the_tooltip.style("opacity", 0);
        d3.select(".cover").remove()
        d3.select(event.currentTarget)
        .attr('r','5')
        .style('fill','steelblue')
        //Task 8 part 2: Complete the code for interactive highlighting
        //Hint:
        //1. select the circle and bar with the same class as the current circle; you may use .arrt("class") to get the class names of the current circle
        //2. set the fill color of the selected circles to steelblue
        //3. lower the selected circles to the bottom
        d3.selectAll(`.${event.currentTarget.classList[1]}`)
        .style('fill', 'steelblue')
        .lower()
        
      });

}


