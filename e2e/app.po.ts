import { browser, element, by } from 'protractor';

export class NgAppPage {
  navigateTo() {
    return browser.get('/');
  }
}
