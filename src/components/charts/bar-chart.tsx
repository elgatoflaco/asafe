"use client"

import { useRef, useEffect, memo, useCallback } from 'react'
import * as d3 from 'd3'
import { BarChartProps, BarData } from '@/types/charts'
import { createTooltip } from '@/lib/charts/tooltip'
import { styleAxis } from '@/lib/charts/axis'
import { useChartDimensions } from '@/hooks/use-chart-dimensions'
import { ChartContainer } from '@/components/ui/chart-container'
// Funciones auxiliares memoizadas
const createScales = (data: { name: string; value: number }[], width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) => {
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.3)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .nice()
        .range([height - margin.bottom, margin.top])

    return { x, y }
}

const BarChart = memo(function BarChart({
    data,
    width: initialWidth = 600,
    height: initialHeight = 400,
    margin = { top: 20, right: 20, bottom: 50, left: 40 },
    colors = d3.schemeSet3
}: BarChartProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const dimensions = useChartDimensions(containerRef, initialWidth, initialHeight)


    const getScales = useCallback(() => createScales(data, dimensions.width, dimensions.height, margin), [data, dimensions, margin])
    const colorScale = useCallback(() => d3.scaleOrdinal(colors), [colors])

    useEffect(() => {
        if (!svgRef.current || !data || data.length === 0) return

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const { x, y } = getScales()
        const color = colorScale()


        const mainGroup = svg.append("g")
            .attr("class", "main-group")


        mainGroup.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${margin.left},0)`)
            .style("stroke-dasharray", "3,3")
            .call(d3.axisLeft(y)
                .ticks(5)
                .tickSize(-(dimensions.width - margin.left - margin.right))
                .tickFormat(() => ""))
            .call(g => {
                g.selectAll(".tick line")
                    .attr("stroke", "#f0f0f0")
                g.select(".domain").remove()
            })


        mainGroup.append("g")
            .attr("transform", `translate(0,${dimensions.height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .call(styleAxis.x)

        mainGroup.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(5))
            .call(g => {
                g.select(".domain").remove()
                g.selectAll(".tick line")
                    .attr("stroke", "#eee")
                    .attr("x2", dimensions.width - margin.left - margin.right)
                g.selectAll(".tick text")
                    .style("fill", "#666")
                    .style("font-size", `${Math.min(dimensions.width * 0.03, 12)}px`)
            })

        const tooltip = createTooltip()


        const barsGroup = mainGroup.append("g")
            .attr("class", "bars")


        const bars = barsGroup.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.name) || 0)
            .attr("width", x.bandwidth())
            .attr("y", dimensions.height - margin.bottom)
            .attr("height", 0)
            .attr("fill", (_, i) => color(i.toString()))
            .attr("rx", Math.min(dimensions.width * 0.01, 6))
            .style("opacity", 0.85)


        const handleMouseOver = (event: MouseEvent, d: BarData) => {
            const bar = d3.select(event.currentTarget as Element)
            bar.style("opacity", 1)
                .style("filter", "brightness(1.1)")

            tooltip.transition()
                .duration(200)
                .style("opacity", 1)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px")

            tooltip.html(`
                <strong>${d.name}</strong><br/>
                Valor: ${d.value}
            `)
        }

        const handleMouseOut = (event: MouseEvent) => {
            d3.select(event.currentTarget as Element)
                .style("opacity", 0.85)
                .style("filter", "none")

            tooltip.transition()
                .duration(200)
                .style("opacity", 0)
        }

        bars.on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)


        bars.transition()
            .duration(800)
            .ease(d3.easeCubicOut)
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))


        const labels = mainGroup.append("g")
            .attr("class", "labels")
            .style("font-family", "system-ui, -apple-system, sans-serif")
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
            .attr("y", d => y(d.value) - 8)
            .attr("text-anchor", "middle")
            .attr("font-size", `${Math.min(dimensions.width * 0.03, 12)}px`)
            .attr("fill", "#666")
            .attr("font-weight", "600")
            .text(d => d.value)
            .style("opacity", 0)

        labels.transition()
            .delay(600)
            .duration(300)
            .style("opacity", 1)

        return () => {
            tooltip.remove()
        }
    }, [data, dimensions, margin, colors, getScales, colorScale])

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

export { BarChart }