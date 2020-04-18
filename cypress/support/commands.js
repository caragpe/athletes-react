// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("setAppRoutes", () => {
    cy.server()
    cy.route("GET", '/games').as("getGamesPage")
})

Cypress.Commands.add("waitForMainPageToLoad", () => {
    cy.wait("@getGamesPage").its('status').should('be', 200)
})

Cypress.Commands.add('waitForAthleteResultRequestToComplete', () => {
    cy.wait("@getAthleteResult").its('status').should('be', 200)
})

Cypress.Commands.add('getAllPersonalInfoFromDetailedView', (athlete_id) => {
    cy.get('[data-testid="arrow_back_from_athlete_detailed_card"]')
    cy.get(`[data-testid="thumbnail_athlete_${athlete_id}"]`)
    cy.get('[data-testid="athlete_name_surname"]')
    cy.get('[data-testid="athlete_info_name"]')
    cy.get('[data-testid="athlete_info_dob"]')
    cy.get('[data-testid="athlete_info_weight"]')
    cy.get('[data-testid="athlete_info_height"]')
})

Cypress.Commands.add('clickOnAthlete', (athlete_id) => {
    cy.get(
        `[data-testid="container_athlete_thumbnail_${athlete_id}"]`
    ).click()
})

Cypress.Commands.add('clickOnAthleteOnSelectedGame', (game_id, athlete_id) => {
    cy.get(`[data-testid="${game_id}"]`).within(() => {
      cy.clickOnAthlete(athlete_id)
    })
})

Cypress.Commands.add('verifyGameTitleIsPresent', (city, year) => {
    const game_title = `${city} ${year}`
    cy.contains(game_title)
})
