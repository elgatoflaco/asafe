import { render } from '@testing-library/react'
import { BarChart } from '@/components/charts/bar-chart'

jest.mock('@/hooks/use-chart-dimensions', () => ({
    useChartDimensions: () => ({
        width: 600,
        height: 400,
        margin: { top: 20, right: 20, bottom: 50, left: 40 }
    })
}))

const mockData = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 15 }
]

describe('BarChart', () => {
    test('renderiza el gráfico correctamente', () => {
        render(<BarChart data={mockData} />)
        const svgElement = document.querySelector('svg')
        expect(svgElement).toBeInTheDocument()
    })

    test('renderiza las barras correctamente', () => {
        render(<BarChart data={mockData} />)
        const bars = document.querySelectorAll('.bars rect')
        expect(bars).toHaveLength(mockData.length)
    })

    test('maneja datos vacíos', () => {
        render(<BarChart data={[]} />)
        const bars = document.querySelectorAll('.bars rect')
        expect(bars).toHaveLength(0)
    })
}) 