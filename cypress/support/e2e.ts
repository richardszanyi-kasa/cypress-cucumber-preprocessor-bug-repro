/* eslint-disable getter-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-empty-function*/
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
/// <reference types="cypress" />

import './commands';
import 'cypress-plugin-stripe-elements';
import '@percy/cypress';
import 'cypress-real-events/support';

import { beforeEach } from 'mocha';
import dayjs from 'dayjs';

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      typeLocation(value: string): Chainable<Element>
    }
  }
}

require('cypress-terminal-report/src/installLogsCollector')({
  enableExtendedCollector: true,
  collectTypes: [ 'cons:log', 'cons:error', 'cy:log', 'cy:xhr', 'cy:request', 'cy:route', 'cy:command' ],
});

beforeEach(function () {
  cy.log(dayjs().format('DD-MMM-YYYY HH:mm:ss'));
});

Cypress.on('window:before:load', function (window) {
  const original = window.EventTarget.prototype.addEventListener;

  window.EventTarget.prototype.addEventListener = function (...args) {
    if (args && args[0] === 'beforeunload') {
      return;
    }
    return original.apply(this, args);
  };

  /* */
  Object.defineProperty(window, 'onbeforeunload', {
    get: function () { },
    set: function () { }
  });
});

Cypress.on('uncaught:exception', (err) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes('gtag is not defined')) {
    return false;
  }
  if (err.message.includes('Navigation cancelled from')) {
    return false;
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver')) {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  }
  return true;
});
