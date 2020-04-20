/* eslint-disable no-undef */
describe("Testing App Locally", () => {
  it("should load the main page of the app", () => {
    cy.visit("/")
    cy.contains("Olympic Athletes")
  })

  it("should contain the list of games", () => {
    const games = Cypress.env('games_in_test_mode')

    cy.visit("/")
    cy.waitForMainPageToLoad()
    
    games.forEach(function (game) {
      cy.verifyGameTitleIsPresent(game.city, game.year)
    })
  })

  it("should navigate to the detailed view of an athlete", () => {
    const athletes = Cypress.env('athletes_in_test_mode')
    const athlete_results = Cypress.env('athlete_results_in_test_mode')

    const athlete = athletes[2];
    //{ "athlete_id": 3, "name": "Athlete_3 name", "surname": "Athlete_3 surname", "bio":"Bio_3 Bio here", "date_of_birth": "03/03/1993", "weight": 63, "height": 163, "photo_id": 3 },
    const athlete_id = athlete.athlete_id;
    const games_with_medals = athlete_results.reduce((acc, current) => {
      return current.athlete_id === athlete_id ? [...acc, current.game_year] : acc
    }, [])
    // [2018]
    const game_id = `games_${games_with_medals[0]}`
    // "games_2018"
    
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

  it("should be able to navigate back to the main page", () => {
    const athletes = Cypress.env('athletes_in_test_mode')
    const athlete_results = Cypress.env('athlete_results_in_test_mode')

    const athlete = athletes[1];
    //{ "athlete_id": 2, "name": "Athlete_2_name", "surname": "Athlete_2_surname", "bio":"Bio_2 Bio here", "date_of_birth":	"02/02/1992", "weight":	62, "height":	162, "photo_id":	2 },
    const athlete_id = athlete.athlete_id;
    const games_with_medals = athlete_results.reduce((acc, current) => {
      return current.athlete_id === athlete_id ? [...acc, current.game_year] : acc
    }, [])
    // [2020, 2016, 2018]
    const game_id = `games_${games_with_medals[0]}`
    // "games_2020"
    
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
