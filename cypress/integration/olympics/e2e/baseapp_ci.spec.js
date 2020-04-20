/* eslint-disable no-undef */
describe("Testing App with CI config", () => {
  it("should load the main page of the app", () => {
    cy.visit("/")
    cy.contains("Olympic Athletes")
  })

  it("should contain the list of games", () => {
    const games = Cypress.env('games')

    cy.visit("/")
    cy.waitForMainPageToLoad()
    
    games.forEach(function (game) {
      cy.verifyGameTitleIsPresent(game.city, game.year)
    })
  })

  xit("should navigate to the detailed view of an athlete", () => {
    const athlete_id = 4
    const game_id = "games_2016"
    const games_with_medals = ["2016", "2012"]
    
    cy.route("GET", `athletes/${athlete_id}/results`).as("getAthleteResult")
    
    cy.visit("/")
    cy.waitForMainPageToLoad()
    
    cy.clickOnAthleteOnSelectedGame(game_id, athlete_id)

    cy.wait("@getAthleteResult")
      .then(() => {
        cy.url().should("include", `/athlete/${athlete_id}`)
      })
      .then(() => {
        cy.getAllPersonalInfoFromDetailedView(athlete_id)
      })
      .then(() => {
        cy.get('[data-testid="medals_container"]')
        games_with_medals.map((year) => {
          cy.get(`[data-testid="medal_container_${year}"]`)
        })
      })
  })

  xit("should be able to navigate back to the main page", () => {
    const athlete_id = 4
    const game_id = "games_2016"
    
    cy.route("GET", `athletes/${athlete_id}/results`).as("getAthleteResult")
    
    cy.visit("/")
    cy.waitForMainPageToLoad()
    
    cy.clickOnAthleteOnSelectedGame(game_id, athlete_id)

    cy.waitForAthleteResultRequestToComplete()
      .then(() => {
        cy.url().should("include", `/athlete/${athlete_id}`)
      })
      .then(() => {
        cy.get('[data-testid="arrow_back_from_athlete_detailed_card"]').click()
      })
      .then(() => {
        cy.waitForMainPageToLoad()
          .then(() => {
            cy.url().should("eq", `${Cypress.env('baseUrl')}/`)
        })
      })
  })
})
