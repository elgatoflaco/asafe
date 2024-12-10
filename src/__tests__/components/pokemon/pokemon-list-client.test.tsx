import { render, screen, fireEvent } from '@testing-library/react'
import { PokemonListClient } from '@/components/dashboard/pokemon/pokemon-list-client'

const mockPokemonData = {
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

describe('PokemonListClient', () => {
    beforeEach(() => {
        render(<PokemonListClient {...mockPokemonData} />)
    })

    test('renderiza la lista de Pokémon correctamente', () => {
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('Ivysaur')).toBeInTheDocument()
    })

    test('muestra la información de paginación correctamente', () => {
        const paginationInfo = screen.getByRole('status')
        expect(paginationInfo).toHaveTextContent('Mostrando 1 - 10 de 100 Pokémon')
    })

    test('permite cambiar el tamaño de página', () => {
        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: '20' } })
        expect(select).toHaveValue('20')
    })
}) 