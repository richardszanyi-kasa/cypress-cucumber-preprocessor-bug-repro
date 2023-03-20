import { Vars } from "../../e2e/e2e";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { utils } from "../../support/helpers/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

describe('some scenario', () => {
  before(() => {

    if(Vars.isGood && Vars.skip) {
      utils.openAnotherWebpage('https://gitlab.com')
    }

    if(utils.isBoolean('true')){
      utils.openAnotherWebpage('https://github.com');
      };
  })
  it('scenario1', () => {
    cy.visit('https://google.com');
    cy.visit('https://amazon.com');
    utils.openAnotherWebpage('https://github.com');
    
    if(utils.isBoolean('true')){
    utils.openAnotherWebpage('https://google.com');
    utils.getProvider();
    };
  })
})