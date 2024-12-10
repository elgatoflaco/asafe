import { render, fireEvent, screen } from '@testing-library/react'
import { ThemeToggle } from '@/components/ui/theme-toggle'


// Configurar el mock del hook useTheme
const mockUseTheme = jest.fn()

jest.mock('next-themes', () => ({
    useTheme: () => mockUseTheme()
}))

describe('ThemeToggle', () => {
    beforeEach(() => {
        mockUseTheme.mockReturnValue({
            theme: 'light',
            setTheme: jest.fn()
        })
    })

    test('renderiza el botón de cambio de tema', () => {
        render(<ThemeToggle />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    test('cambia el tema al hacer clic', () => {
        const setTheme = jest.fn()
        mockUseTheme.mockReturnValue({
            theme: 'light',
            setTheme
        })

        render(<ThemeToggle />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(setTheme).toHaveBeenCalledWith('dark')
    })
})