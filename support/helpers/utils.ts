import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

export class Utils {

  openAnotherWebpage(url: string) {
    cy.visit(url);
  }

  isBoolean = (value: string) => value == 'true' ? true : false;
}

export const utils = new Utils();
