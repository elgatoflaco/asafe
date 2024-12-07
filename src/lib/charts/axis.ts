import * as d3 from "d3";

export const styleAxis = {
  x: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    g.selectAll(".tick text")
      .attr("dy", "0.5em")
      .attr("dx", "-0.5em")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end")
      .style("fill", "#666")
      .style("font-size", "12px");
  },
  y: (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    g.selectAll(".tick text").style("fill", "#666").style("font-size", "12px");
    g.selectAll(".tick line").attr("stroke", "#eee");
    g.select(".domain").remove();
  },
};
