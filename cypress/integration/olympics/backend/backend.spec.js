describe('Testing backend services', () => {
    describe('/athletes endpoint', () => {
        it('should verify the response',() => {
            cy.request('http://127.0.0.1:3000/athletes', 'GET').as('getAtheletes')
            cy.get('@getAtheletes').should((response) => {
                expect(response.body[0]).to.have.property('athlete_id','1')
                expect(response.body[0]).to.have.property('name','Arianna')
                expect(response.body[0]).to.have.property('surname','Fontana')
                expect(response.body[0]).to.have.property('dateOfBirth','14/04/1990')
                expect(response.body[0]).to.have.property('height', 164)
                expect(response.body[0]).to.have.property('weight', 63)
                expect(response.body[0]).to.have.property('photo_id', 1)
                expect(response.body[0].bio).not.to.be.empty
            })
        })
    })
})