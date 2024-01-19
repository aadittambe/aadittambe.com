import React, { useEffect } from "react";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { line } from "d3-shape";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useGetData = () => {
  const url =
    "https://raw.githubusercontent.com/aadittambe/github-contributions/main/contribs.json";
  const { data, error } = useSWR(url, fetcher, {});

  return {
    d: data,
    loading: !data,
    error,
  };
};

const Sparklines = (props) => {
  const { d, loading, error } = useGetData();
  useEffect(() => {
    if (!loading) {
      const content =
        d.data.user.contributionsCollection.contributionCalendar.weeks;
      let data = {};
      content.map((d) => {
        const startDate = d.firstDay;
        const l1 = d.contributionDays;
        // console.log(l1);
        let weekList = 0;
        l1.map((l) => {
          weekList = weekList + l.contributionCount;
          return weekList;
        });
        data[startDate] = weekList;
        return data;
      });
      data = Object.values(data).map((d) => +d);
      const width = 100;
      const height = 20;
      const margin = { top: 2, right: 2, bottom: 2, left: 2 };
      const boundedwidth = width - margin.left - margin.right;
      const boundedheight = height - margin.top - margin.bottom;

      const xScale = scaleLinear()
        .domain([0, data.length])
        .range([0, boundedwidth]);
      const yScale = scaleLinear()
        .domain([0, max(data)])
        .range([boundedheight, 0]);

      const svg = select("#sparklines")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const chartLine = line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(d));

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("d", chartLine);

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
      return d;
    }
  }, [d, loading]);

  return <span id="sparklines"></span>;
};

export default Sparklines;
