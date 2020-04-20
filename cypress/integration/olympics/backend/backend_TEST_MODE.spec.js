describe('Testing backend services', () => {
    beforeEach(() => {
        cy.log('These test should be have backend app running in TEST mode')
    })
    describe('/athletes endpoint', () => {
        it('should get all the available atheletes',() => {
            const athletes = Cypress.env('athletes_in_test_mode')
            const athlete_results = Cypress.env('athlete_results_in_test_mode')
            const athlete = athletes[0]

            cy.request({
                url: Cypress.env('backendUrl') + '/athletes',
                method: 'GET'
            }).should((response) => {
                const athlete_response = response.body[0]
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(4)
                expect(athlete_response).to.have.property('athlete_id', athlete.athlete_id.toString())
                expect(athlete_response).to.have.property('name', athlete.name)
                expect(athlete_response).to.have.property('surname', athlete.surname)
                expect(athlete_response).to.have.property('dateOfBirth', athlete.date_of_birth)
                expect(athlete_response).to.have.property('height', athlete.height)
                expect(athlete_response).to.have.property('weight', athlete.weight)
                expect(athlete_response).to.have.property('photo_id', athlete.photo_id)
                expect(athlete_response.bio).not.to.be.empty
            })
        })

        it('should retrieve the response for athlete_id 3 (backendTest_athlete_id)', () => {
            cy.request({
                url: Cypress.env('backendUrl') + '/athletes/' + Cypress.env('backendTest_athlete_id'),
                method: 'GET'
            }).should((response) => {
                const athlete = Cypress.env('athletes_in_test_mode').find(athlete => {
                    return athlete.athlete_id === Cypress.env('backendTest_athlete_id')
                })
                
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('athlete_id', athlete.athlete_id.toString())
                expect(response.body).to.have.property('name', athlete.name)
                expect(response.body).to.have.property('surname', athlete.surname)
                expect(response.body).to.have.property('dateOfBirth', athlete.date_of_birth)
                expect(response.body).to.have.property('height', athlete.height)
                expect(response.body).to.have.property('weight', athlete.weight)
                expect(response.body).to.have.property('photo_id', athlete.photo_id)
                expect(response.body.bio).not.to.be.empty
            })
        })

        it('should retrieve the photo details for athlete_id 3 (backendTest_athlete_id', () => {
            cy.request({
                url: Cypress.env('backendUrl') + '/athletes/' + Cypress.env('backendTest_athlete_id') + '/photo',
                method: 'GET'
            }).should((response) => {
                const athlete = Cypress.env('athletes_in_test_mode').find(athlete => {
                    return athlete.athlete_id === Cypress.env('backendTest_athlete_id')
                })
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.empty
            })
        })

        it('should return empty response if non valid athlete_id', () => {
            cy.request({
                url: Cypress.env('backendUrl') + '/athletes/100' + Cypress.env('backendTest_athlete_id'),
                method: 'GET'
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
        })

        it('should error when retrieving the photo details for invalid athlete', () => {
            cy.request({
                url: Cypress.env('backendUrl') + '/athletes/100/photo',
                method: 'GET',
                failOnStatusCode: false
            }).should((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.have.key('error')
            })
        })

        it('should get athlete results for athlete id 3 (backendTest_athlete_id)', () => {
            const athlete_results = Cypress.env('athlete_results_in_test_mode')
            const results_in_games = athlete_results.filter((athlete) => {
                return athlete.athlete_id === Cypress.env('backendTest_athlete_id')
            })
    
            cy.request({
                url: Cypress.env('backendUrl') + `/athletes/${Cypress.env('backendTest_athlete_id')}/results`,
                method: 'GET'
            }).should((response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(results_in_games.length)
                expect(response.body[0]).to.have.property('city', results_in_games[0].game_id)
                expect(response.body[0]).to.have.property('year',results_in_games[0].game_year)
                expect(response.body[0]).to.have.property('gold', results_in_games[0].gold)
                expect(response.body[0]).to.have.property('silver', results_in_games[0].silver)
                expect(response.body[0]).to.have.property('bronze', results_in_games[0].bronze)
                expect(response.body[0]).to.have.property('fourths', results_in_games[0].fourths)
            })
        })


        it('should get empty body response when querying results for invalid athlete', () => {
            //What's the difference between an inexistant athlete and one
            //without results?
            cy.request({
                url: Cypress.env('backendUrl') + '/athletes/100/results',
                method: 'GET'
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
        })
    })

    describe('/games endpoint', () => {
        it('should return all available games in arbitrary order',() => {
            cy.request({
                url: Cypress.env('backendUrl') + '/games',
                method: 'GET'
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(5)
            })
        })

        it('should return all available athletes for a particular game',() => {
            const athletes = Cypress.env('athlete_results_in_test_mode')
            const game_id = 2
            const athletes_in_games = athletes.filter((athlete) => {
                return athlete.game_id === game_id
            })
            
            cy.request({
                url: Cypress.env('backendUrl') + `/games/${game_id}/athletes`,
                method: 'GET',
                failOnStatusCode: false
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(athletes_in_games.length)
                expected_athlete_ids = athletes_in_games.reduce(
                    (acc, current) => { 
                        return acc = [...acc, current.athlete_id]
                    },[]
                )
                athlete_ids_in_response = response.body.reduce(
                    (acc, current) => { 
                        return acc = [...acc, parseInt(current.athlete_id)]
                    },[]
                )
                expected_athlete_ids.sort()
                athlete_ids_in_response.sort()
                const areEqual = JSON.stringify(expected_athlete_ids)===JSON.stringify(athlete_ids_in_response)
                expect(areEqual).to.be.true
            })
        })

        it('should return empty array if game does not exist',() => {
            // Maybe we should get a different response. What's the difference if for a
            // certain game there are no athletes?
            cy.request({
                url: Cypress.env('backendUrl') + `/games/20/athletes`,
                method: 'GET',
                failOnStatusCode: false
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
        })
    })
})