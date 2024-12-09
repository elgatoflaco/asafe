import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PokemonListClient } from '@/components/dashboard/pokemon/pokemon-list-client'
import { PokemonListClientProps } from '@/types/pokemon'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt} />
}))

const defaultProps: PokemonListClientProps = {
    initialPage: 1,
    initialPageSize: 10,
    pokemonList: [
        {
            id: 1,
            name: 'Bulbasaur',
            types: ['grass', 'poison'],
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        },
        {
            id: 2,
            name: 'Ivysaur',
            types: ['grass', 'poison'],
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
        }
    ],
    totalCount: 100,
    totalPages: 10
}

describe('PokemonListClient Component', () => {
    test('renderiza la lista de Pokémon correctamente', () => {
        render(<PokemonListClient {...defaultProps} />)

        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('Ivysaur')).toBeInTheDocument()

        const rows = screen.getAllByRole('row')
        expect(rows).toHaveLength(3) // Header + 2 Pokémon

        const pageSelector = screen.getByRole('combobox')
        expect(pageSelector).toHaveTextContent('10 por página')
    })

    test('muestra el mensaje correcto de cantidad de Pokémon', () => {
        render(<PokemonListClient {...defaultProps} />)

        // Verificar el texto de paginación usando el contenedor con aria-live
        const paginationInfo = screen.getByRole('status', { hidden: true }) || screen.getByLabelText('Información de paginación')
        expect(paginationInfo).toHaveTextContent('Mostrando')
        expect(paginationInfo).toHaveTextContent('1')
        expect(paginationInfo).toHaveTextContent('10')
        expect(paginationInfo).toHaveTextContent('100')
        expect(paginationInfo).toHaveTextContent('Pokémon')
    })
}) 