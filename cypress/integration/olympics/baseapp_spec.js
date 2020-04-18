describe("Open Cypress", () => {
  it("should load the main page of the app", () => {
    cy.visit("/")
    cy.contains("Olympic Athletes")
  })
  it("should contain the list of games", () => {
    cy.server()

    const games = [
      { city: "Tokyo", year: 2020 },
      { city: "London", year: 2012 },
      { city: "Pyeongchang", year: 2018 },
      { city: "Vancouver", year: 2010 },
      { city: "Beijing", year: 2008 },
      { city: "Salt Lake City", year: 2002 },
      { city: "Sydney", year: 2000 },
      { city: "Nagano", year: 1998 },
      { city: "Atlanta", year: 1996 },
      { city: "Barcelona", year: 1992 },
      { city: "Seoul", year: 1988 },
      { city: "Los Angeles", year: 1984 },
    ];

    cy.visit("/")

    games.forEach(function (game) {
      const game_title = `${game.city} ${game.year}`;
      cy.contains(game_title)
    })
  })
  it("should navigate to the detailed view of an athlete", () => {
    const athlete_id = 4;
    const games = "games_2016";
    const games_with_medals = ["2016", "2012"];
    cy.server()
    cy.route("GET", `athletes/${athlete_id}/results`).as("getAthleteResult")
    cy.visit("/")
    cy.get(`[data-testid="${games}"]`).within(() => {
      cy.get(
        `[data-testid="container_athlete_thumbnail_${athlete_id}"]`
      ).click()
    })
    cy.wait("@getAthleteResult")
      .then(() => {
        cy.url().should("include", `/athlete/${athlete_id}`)
      })
      .then(() => {
        cy.get('[data-testid="arrow_back_from_athlete_detailed_card"]')
        cy.get(`[data-testid="thumbnail_athlete_${athlete_id}"]`)
        cy.get('[data-testid="athlete_name_surname"]')
        cy.get('[data-testid="athlete_info_name"]');
        cy.get('[data-testid="athlete_info_dob"]')
        cy.get('[data-testid="athlete_info_weight"]')
        cy.get('[data-testid="athlete_info_height"]')
      })
      .then(() => {
        cy.get('[data-testid="medals_container"]')
        games_with_medals.map((year) => {
          cy.get(`[data-testid="medal_container_${year}"]`)
        })
      })
  })
  it("should be able to navigate back to the main page", () => {
    const athlete_id = 4
    const games = "games_2016"
    cy.server()
    cy.route("GET", `athletes/${athlete_id}/results`).as("getAthleteResult")
    cy.route("GET", '/games').as("getGamesPage")
    cy.visit("/")
    cy.get(`[data-testid="${games}"]`).within(() => {
      cy.get(
        `[data-testid="container_athlete_thumbnail_${athlete_id}"]`
      ).click()
    })
    cy.wait("@getAthleteResult")
      .its('status')
      .should('be', 200)
      .then(() => {
        cy.url().should("include", `/athlete/${athlete_id}`)
      })
      .then(() => {
        cy.get('[data-testid="arrow_back_from_athlete_detailed_card"]').click()
      })
      .then(() => {
        cy.wait("@getGamesPage")
          .its('status')
          .should('be', 200)
          .then(() => {
            cy.url().should("eq", `${Cypress.env('baseUrl')}/`)
        })
      })
  })
})
