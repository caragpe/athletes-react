describe('Testing backend services', () => {
    describe('/athletes endpoint', () => {
        beforeEach(() => {
            cy.log('These test should be have backend app running in TEST mode')
        })

        it('should verify the response',() => {
            const athletes = Cypress.env('athletes_in_test_mode')
            const athlete_results = Cypress.env('athlete_results_in_test_mode')
            const athlete = athletes[0]

            cy.get('@getAtheletes').should((response) => {
                const athlete_response = response.body[0]

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
    })
})