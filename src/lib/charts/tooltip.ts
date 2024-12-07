import * as d3 from "d3";

export const createTooltip = () => {
  return d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "rgba(255,255,255,0.95)")
    .style("color", "#333")
    .style("padding", "clamp(8px, 2vw, 12px)")
    .style("border-radius", "clamp(4px, 1vw, 8px)")
    .style("font-size", "clamp(12px, 1.5vw, 16px)")
    .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
    .style("pointer-events", "none")
    .style("opacity", 0);
};
