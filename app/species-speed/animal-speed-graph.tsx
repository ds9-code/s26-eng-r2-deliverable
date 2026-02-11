/* eslint-disable */
"use client";
import { useRef, useEffect, useState  } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis"; // D3 is a JavaScript library for data visualization: https://d3js.org/
import { csv } from "d3-fetch";

// Example data: Only the first three rows are provided as an example
// Add more animals or change up the style as you desire

interface AnimalDatum {
  name: string;
  speed: number;
  diet: "carnivore" | "herbivore" | "omnivore";
}


export default function AnimalSpeedGraph() {
  // useRef creates a reference to the div where D3 will draw the chart.
  // https://react.dev/reference/react/useRef
  const graphRef = useRef<HTMLDivElement>(null);

  const [animalData, setAnimalData] = useState<AnimalDatum[]>([]);

  // TODO: Load CSV data
  useEffect(() => {
    csv("/sample_animals.csv").then((data) => {
      const cleaned = data
        .map((row: any) => ({
          name: row.name?.trim() ?? "",
          speed: parseFloat(row.speed) || 0,
          diet: (row.diet?.trim().toLowerCase() ?? "") as "carnivore" | "herbivore" | "omnivore",
        }))
        .filter((d) => d.name && d.speed > 0 && ["carnivore", "herbivore", "omnivore"].includes(d.diet));
      setAnimalData(cleaned);
    });
  }, []);

  useEffect(() => {
    // Clear any previous SVG to avoid duplicates when React hot-reloads
    if (graphRef.current) {
      graphRef.current.innerHTML = "";
    }

    if (animalData.length === 0) return;

    // Get top 20 fastest animals
    const topAnimals = animalData
      .sort((a, b) => b.speed - a.speed)
      .slice(0, 20);

    // Set up chart dimensions and margins
    const containerWidth = graphRef.current?.clientWidth ?? 800;
    const containerHeight = graphRef.current?.clientHeight ?? 500;

    // Set up chart dimensions and margins
    const width = Math.max(containerWidth, 600); // Minimum width of 600px
    const height = Math.max(containerHeight, 400); // Minimum height of 400px
    const margin = { top: 70, right: 60, bottom: 80, left: 150 };

    // Create the SVG element where D3 will draw the chart
    // https://github.com/d3/d3-selection
    const svg  = select(graphRef.current!)
      .append<SVGSVGElement>("svg")
      .attr("width", width)
      .attr("height", height)

    // Create scales
    const xScale = scaleBand()
      .domain(topAnimals.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const yScale = scaleLinear()
      .domain([0, max(topAnimals, d => d.speed) ?? 0])
      .range([height - margin.bottom, margin.top]);

    const colorScale = scaleOrdinal<string, string>()
      .domain(["carnivore", "herbivore", "omnivore"])
      .range(["#ff6b6b", "#4ecdc4", "#ffe66d"]);

    // Add bars
    svg.selectAll("rect")
      .data(topAnimals)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.name) ?? 0)
      .attr("y", d => yScale(d.speed))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.speed))
      .attr("fill", d => colorScale(d.diet));

    // Add x-axis with rotated labels
    const xAxis = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(axisBottom(xScale));

    xAxis.selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("font-size", "12px")
      .attr("dy", "0.5em")
      .attr("dx", "-0.5em");

    // Add x-axis label
    xAxis.append("text")
      .attr("x", width / 2)
      .attr("y", 80)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Animal");

    // Add y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -60)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Speed (km/h)");

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .text("Top 20 Fastest Animals");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150},${margin.top})`);

    const legendData = ["carnivore", "herbivore", "omnivore"];
    const legendLabels = ["Carnivore", "Herbivore", "Omnivore"];

    legendData.forEach((diet, i) => {
      legend.append("rect")
        .attr("x", 0)
        .attr("y", i * 25)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(diet as any));

      legend.append("text")
        .attr("x", 20)
        .attr("y", i * 25 + 12)
        .attr("font-size", "12px")
        .text(legendLabels[i]);
    });
  }, [animalData]);

  return (
    <div 
      ref={graphRef} 
      style={{ width: "100%", height: "600px" }}
    />
  );
}
