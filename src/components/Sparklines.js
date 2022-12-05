import React from 'react';
import * as d3 from 'd3'
// import '../styles/Hero.css'

const Sparklines = props => {
    const data = "https://raw.githubusercontent.com/aadittambe/portfolio/main/gh-contribs/contribs.json"
    d3.json(data).then(function (json) {
        // console.log(json);
        var content = json.data.user.contributionsCollection.contributionCalendar.weeks
        // console.log(content);
        let data = {}
        content.map(d => {
            const startDate = d.firstDay
            const l1 = d.contributionDays
            // console.log(l1);
            let weekList = 0;
            l1.map(l => {
                weekList = weekList + l.contributionCount
                return weekList
            })
            data[startDate] = weekList
            return data
        })
        data = Object.values(data).map(d => +d);
        // console.log(data);
        const width = 100;
        const height = 20;
        const margin = { top: 2, right: 2, bottom: 2, left: 2 };
        const boundedwidth = width - margin.left - margin.right;
        const boundedheight = height - margin.top - margin.bottom;

        const xScale = d3
            .scaleLinear()
            .domain([0, data.length])
            .range([0, boundedwidth]);
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data)])
            .range([boundedheight, 0]);

        const svg = d3
            .select("#sparklines")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d));

        svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#f6f4e6")
            .attr("stroke-width", 1)
            .attr("d", line);

        svg
            .append("circle")
            .attr("r", 2)
            .attr("cx", xScale(0))
            .attr("cy", yScale(data[0]))
            .attr("fill", "#f6f4e6");

        svg
            .append("circle")
            .attr("r", 2)
            .attr("cx", xScale(data.length - 1))
            .attr("cy", yScale(data[data.length - 1]))
            .attr("fill", "#edcf2e");
        return json
    })
    return (<span id='sparklines'></span>)
}

export default Sparklines;