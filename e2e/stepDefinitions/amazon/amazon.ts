import { Given } from "@badeball/cypress-cucumber-preprocessor"
import { utils } from "../../../support/helpers/utils";

Given('Amazon is opened', () => {
  cy.visit('https://amazon.com')
  cy.log(utils.getProvider())
})