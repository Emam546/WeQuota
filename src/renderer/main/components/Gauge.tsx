import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface GaugeProps {
  value: number // Used
  total: number // Total Limit
  size?: number
}

export default function Gauge({ value, total, size = 200 }: GaugeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const percentage = Math.min(Math.max(value / total, 0), 1)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = 10
    const radius = size / 2 - margin
    const strokeWidth = 14

    // Arc setup: Start at -135 degrees, end at 135 degrees
    // In radians: -3/4 * PI to 3/4 * PI
    const startAngle = -0.75 * Math.PI
    const endAngle = 0.75 * Math.PI
    const currentAngle = startAngle + (endAngle - startAngle) * percentage

    const g = svg.append('g').attr('transform', `translate(${size / 2}, ${size / 2})`)

    // Background track
    const arcGenerator = d3
      .arc()
      .innerRadius(radius - strokeWidth)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .cornerRadius(strokeWidth / 2)

    g.append('path')
      .attr('d', arcGenerator as any)
      .attr('fill', '#E5E7EB') // Gray-200

    // Foreground track (Usage)
    const usageArcGenerator = d3
      .arc()
      .innerRadius(radius - strokeWidth)
      .outerRadius(radius)
      .startAngle(startAngle)
      .endAngle(currentAngle)
      .cornerRadius(strokeWidth / 2)

    g.append('path')
      .attr('d', usageArcGenerator as any)
      .attr('fill', '#2563EB') // Professional Blue
  }, [value, total, size, percentage])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg ref={svgRef} width={size} height={size} className="overflow-visible" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
        <div className="text-[#2563EB] mb-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Home Internet
        </span>
      </div>
    </div>
  )
}
