import { render } from '@testing-library/react'
import { BarChart } from '@/components/charts/bar-chart'

// Mock de los hooks y funciones auxiliares
jest.mock('@/hooks/use-chart-dimensions', () => ({
    useChartDimensions: () => ({
        width: 600,
        height: 400,
        margin: { top: 20, right: 20, bottom: 50, left: 40 }
    })
}))

// Datos de prueba
const mockData = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 15 }
]

describe('BarChart', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('renderiza el componente correctamente', () => {
        render(<BarChart data={mockData} />)
        const svgElement = document.querySelector('svg')
        expect(svgElement).toBeInTheDocument()
    })

    it('renderiza las barras correctamente', () => {
        render(<BarChart data={mockData} />)
        const bars = document.querySelectorAll('.bars rect')
        expect(bars).toHaveLength(mockData.length)
    })

    it('renderiza las etiquetas de los valores', () => {
        render(<BarChart data={mockData} />)
        const labels = document.querySelectorAll('.labels text')
        expect(labels).toHaveLength(mockData.length)
        expect(labels[0].textContent).toBe('10')
    })

    it('maneja correctamente datos vacíos', () => {
        render(<BarChart data={[]} />)
        const bars = document.querySelectorAll('.bars rect')
        expect(bars).toHaveLength(0)
    })

    it('aplica los colores correctamente', () => {
        const customColors = ['#ff0000', '#00ff00', '#0000ff']
        render(<BarChart data={mockData} colors={customColors} />)

        const bars = document.querySelectorAll('.bars rect')
        const firstBar = bars[0] as SVGRectElement

        expect(firstBar.getAttribute('fill')).toBe(customColors[0])
    })
}) 