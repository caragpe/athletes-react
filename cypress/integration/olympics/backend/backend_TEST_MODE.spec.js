describe('Testing backend services', () => {
    beforeEach(() => {
        cy.log('These test should be have backend app running in TEST mode')
    })
    describe('/athletes endpoint', () => {
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

        it('should retrieve the response for athlete_id 3 (backendTest_athlete_id)', () => {
            cy.get('@getAthleteById').should((response) => {
                const athlete = Cypress.env('athletes_in_test_mode').find(athlete => {
                    return athlete.athlete_id === Cypress.env('backendTest_athlete_id')
                })
                
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
            cy.get('@getAthletePhotoByAthleteId').should((response) => {
                const athlete = Cypress.env('athletes_in_test_mode').find(athlete => {
                    return athlete.athlete_id === Cypress.env('backendTest_athlete_id')
                })
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.empty
            })
        })
    })

    describe('', () => {
        xit('',() => {

        })
    })
})