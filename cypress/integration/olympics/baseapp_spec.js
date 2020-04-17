describe('Open Cypress', () => {
    it('should loads the main page of the app', () => {
        cy.visit('http://localhost:8000')
        cy.contains('Olympic Athletes')
    })
    it('should contain the list of games', () => {
        const games = [
            { city: 'Tokyo', year: 2020 },
            { city: 'London', year: 2012 },
            { city: 'Pyeongchang', year: 2018 },
            { city: 'Vancouver', year: 2010 },
            { city: 'Beijing', year: 2008 },
            { city: 'Salt Lake City', year: 2002 },
            { city: 'Sydney', year: 2000 },
            { city: 'Nagano', year: 1998 },
            { city: 'Atlanta', year: 1996 },
            { city: 'Barcelona', year: 1992 },
            { city: 'Seoul', year: 1988 },
            { city: 'Los Angeles', year: 1984 }
        ]

        cy.visit('http://localhost:8000')

        games.forEach(function(game) {
            const game_title = `${game.city} ${game.year}`;
            cy.contains(game_title)
        })
    })
})