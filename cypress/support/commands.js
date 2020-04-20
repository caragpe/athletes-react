/* eslint-disable no-undef */
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

Cypress.Commands.add("waitForMainPageToLoad", () => {
  cy.wait("@getGamesPage").its("status").should("be", 200)
})

Cypress.Commands.add("waitForAthleteResultRequestToComplete", () => {
  cy.wait("@getAthleteResult").its("status").should("be", 200)
})

Cypress.Commands.add("getAllPersonalInfoFromDetailedView", (athlete_id) => {
  cy.get('[data-testid="arrow_back_from_athlete_detailed_card"]')
  cy.get(`[data-testid="thumbnail_athlete_${athlete_id}"]`)
  cy.get('[data-testid="athlete_name_surname"]')
  cy.get('[data-testid="athlete_info_name"]')
  cy.get('[data-testid="athlete_info_dob"]')
  cy.get('[data-testid="athlete_info_weight"]')
  cy.get('[data-testid="athlete_info_height"]')
})

Cypress.Commands.add("clickOnAthlete", (athlete_id) => {
  cy.get(`[data-testid="container_athlete_thumbnail_${athlete_id}"]`).click()
})

Cypress.Commands.add("clickOnAthleteOnSelectedGame", (game_id, athlete_id) => {
  cy.get(`[data-testid="${game_id}"]`).within(() => {
    cy.clickOnAthlete(athlete_id)
  })
})

Cypress.Commands.add("verifyGameTitleIsPresent", (city, year) => {
  const game_title = `${city} ${year}`;
  cy.contains(game_title)
})

//
// New methods to load know information when testing the frontend
// with the backend app in TEST mode
//
Cypress.Commands.add("getAthletesInDevelopementEnv", () => {
  return [
    { "athlete_id": 1, "name": "Athlete_1_name", "surname": "Athlete_1_surname", "bio":"Bio_1 Bio here", "date_of_birth":	"01/01/1991", "weight":	61, "height":	161, "photo_id":	1 },
    { "athlete_id": 2, "name": "Athlete_2_name", "surname": "Athlete_2_surname", "bio":"Bio_2 Bio here", "date_of_birth":	"02/02/1992", "weight":	62, "height":	162, "photo_id":	2 },
    { "athlete_id": 3, "name": "Athlete_3 name", "surname": "Athlete_3 surname", "bio":"Bio_3 Bio here", "date_of_birth":	"03/03/1993", "weight":	63, "height":	163, "photo_id":	3 },
    { "athlete_id": 4, "name": "Athlete 4 name", "surname": "Athlete 4 surname", "bio":"Bio_4 Bio here", "date_of_birth":	"04/04/1994", "weight":	64, "height":	164, "photo_id":	4 }
  ]
})
Cypress.Commands.add("getAthleteResultsInDevelopementEnv", () => {
  return [
    { "athlete_id": 1,	"game_id": 4,	"gold": 1,	"silver": 1,	"bronze": 1 },
    { "athlete_id": 1,	"game_id": 5,	"gold": 0,	"silver": 1,	"bronze": 2 },
    { "athlete_id": 1,	"game_id": 2,	"gold": 0,	"silver": 0,	"bronze": 1 },
    { "athlete_id": 1,	"game_id": 3,	"gold": 0,	"silver": 0,	"bronze": 1 },
    { "athlete_id": 2,	"game_id": 1,	"gold": 0,	"silver": 1,	"bronze": 0 },
    { "athlete_id": 2,	"game_id": 3,	"gold": 1,	"silver": 0,	"bronze": 0 },
    { "athlete_id": 2,	"game_id": 2,	"gold": 0,	"silver": 0,	"bronze": 1 },
    { "athlete_id": 3,	"game_id": 2,	"gold": 0,	"silver": 1,	"bronze": 0 },
    { "athlete_id": 4,	"game_id": 3,	"gold": 1,	"silver": 1,	"bronze": 0 },
    { "athlete_id": 4,	"game_id": 2,	"gold": 1,	"silver": 0,	"bronze": 0 }
  ]
})
Cypress.Commands.add("getGamesInDevelopementEnv", () => {
  return [
    { "game_id": 1,	"city": "City_1",	"year": 2020 },
    { "game_id": 2,	"city": "City_2",	"year": 2018 },
    { "game_id": 3,	"city": "City_3",	"year": 2016 },
    { "game_id": 4,	"city": "City_4",	"year": 2012 },
    { "game_id": 5,	"city": "City_5",	"year": 2010 }
  ]
})

//
// The following command allows simulates a response from the server
// by loading a fixture in case Cypress.env("ci_pipeline") is set
Cypress.Commands.add("setAthleteResultRouteById", (athlete_id) => {
  if(Cypress.env("ci_pipeline")) {
    cy.route(
      "GET",
      `athletes/${athlete_id}/results`,
      `fixture:athlete_result/${athlete_id}.json`
    ).as("getAthleteResult")
  } else {
    cy.route("GET",`athletes/${athlete_id}/results`).as("getAthleteResult")
  }
})

//
// setAppRoutes is automatically setup for every test in support/index.js
// Also, it allows simulating a response from the server
// by loading a fixture in case Cypress.env("ci_pipeline") is set
Cypress.Commands.add("setAppRoutes", () => {
  cy.server()
  if(Cypress.env("ci_pipeline")) {
    cy.route(
      "GET",
      "/games", 
      "fixture:games_response.json"
    ).as("getGamesPage")
  } else {
    cy.route("GET", "/games").as("getGamesPage")
  }
})

//
// In case we are just testing the backend API, some
// endpoints are defined by aliases to be DRY and concise
Cypress.Commands.add("setBackendEnpointAliases", () => {
  cy.request(
    Cypress.env('backendUrl') + '/athletes',
    'GET'
    ).as('getAtheletes')
  cy.request(
    Cypress.env('backendUrl') + '/athletes/' + Cypress.env('backendTest_athlete_id'),
    'GET'
    ).as('getAtheleteById')
})

//
// Just for informative purposes. It displays some information
// at the top of the test run if we are launching Cypress UI
Cypress.Commands.add("runningInLocalOrCI", () => {
  const current_env =
    Cypress.env("ci_pipeline") === true
      ? "Running cypress in ENV: CI pipeline"
      : "Running cypress in ENV: LOCAL"
  cy.log(current_env)
  cy.log('To use the CI pipeline mode, add the following param:')
  cy.log('--env ci_pipeline=true')
})