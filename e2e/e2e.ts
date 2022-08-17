/// <reference types="cypress" />

import { After, Before } from '@badeball/cypress-cucumber-preprocessor';

export const Vars = {
  skip: false,
  isGood: false,
};

Before(() => {
  Vars.skip = false;
  Vars.isGood = false;
  cy.clearCookies();
});

After(() => {
  cy.clearLocalStorage();
});
