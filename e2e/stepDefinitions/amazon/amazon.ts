import { Given } from "@badeball/cypress-cucumber-preprocessor"

Given('Amazon is opened', () => {
  cy.visit('https://amazon.com')
})