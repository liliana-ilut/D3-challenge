// @TODO: YOUR CODE HERE!

let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
let file= "assets/data/data.csv"
d3.csv(file).then(successHandle, errorHandle);
    // console.log(healthData);

function errorHandle(error){
    throw error;
}

function successHandle(healthData){
    healthData.map(function(data) {
        data.age= +data.age;
        data.smokes= +data.smokes;
    });
    // Step 2: Create scale functions

    let xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.age)])
      .range([0, width]);

    let yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.smokes)])
      .range([height, 0]);


    // Step 3: Create axis functions

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // / Step 4: Append Axes to the chart
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    
    let circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");

    // Append text to circles 

    // let circlesGroup = chartGroup.selectAll()
    //     .data(healthData)
    //     .enter()
    //     .append("text")
    //     .attr("x", d => xLinearScale(d.age))
    //     .attr("y", d => yLinearScale(d.smokes))
    //     .style("font-size", "13px")
    //     .style("text-anchor", "middle")
    //     .style('fill', 'white')
    //     .text(d => (d.abbr));


    // Step 6: Initialize tool tip
   
    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (`${d.state}<br>Age: ${d.age}<br>Smokes: ${d.smokes}`);
        });

    // Step 7: Create tooltip in the chart

    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
   
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
        })
      // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");
  };


    


   