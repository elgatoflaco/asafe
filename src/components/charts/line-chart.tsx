"use client"

import { useRef, useEffect, memo } from 'react'
import * as d3 from 'd3'
import { PieChartProps } from '@/types/charts'
import { createTooltip } from '@/lib/charts/tooltip'
import { useChartDimensions } from '@/hooks/use-chart-dimensions'
import { ChartContainer } from '@/components/ui/chart-container'
const LineChart = memo(function LineChart({
    data,
    width: initialWidth = 600,
    height: initialHeight = 400,
    colors = d3.schemeCategory10
}: PieChartProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const dimensions = useChartDimensions(containerRef, initialWidth, initialHeight)

    useEffect(() => {
        if (!svgRef.current || !data || data.length === 0) return

        const margin = { top: 20, right: 30, bottom: 30, left: 60 }
        const width = dimensions.width - margin.left - margin.right
        const height = dimensions.height - margin.top - margin.bottom

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)


        const x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width])

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 0])
            .range([height, 0])


        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(data.length))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")

        g.append("g")
            .call(d3.axisLeft(y))


        const line = d3.line<{ name: string; value: number }>()
            .x((d, i) => x(i))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX)


        const path = g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colors[0])
            .attr("stroke-width", 2)
            .attr("d", line)


        const totalLength = path.node()?.getTotalLength() || 0


        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)

        const dots = g.selectAll(".dot")
            .data(data)
            .join("circle")
            .attr("class", "dot")
            .attr("cx", (d, i) => x(i))
            .attr("cy", d => y(d.value))
            .attr("r", 0)
            .attr("fill", colors[0])


        dots.transition()
            .delay((d, i) => i * (2000 / data.length))
            .duration(300)
            .attr("r", 4)


        const tooltip = createTooltip()

        dots.on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 6)
                .style("fill", d3.color(colors[0])!.darker().toString())

            tooltip.transition()
                .duration(200)
                .style("opacity", .9)

            tooltip.html(`${d.name}: ${d.value}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px")
        })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 4)
                    .style("fill", colors[0])

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0)
            })

        return () => {
            tooltip.remove()
        }

    }, [data, dimensions, colors])

    return (
        <ChartContainer dimensions={dimensions}>
            <svg
                ref={svgRef}
                width="100%"
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
            />
        </ChartContainer>
    )
})

export { LineChart }