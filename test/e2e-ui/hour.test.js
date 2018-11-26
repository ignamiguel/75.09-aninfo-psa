const EC = require('protractor').ExpectedConditions;
const baseURL = "http://localhost:8080/";

const sleepTime = 2000;
const timeout = 10000;
const headerLabel = element(by.xpath('//*[@id="root"]/div/main/div/h3'));
const addButton = element(by.xpath('//*[@id="root"]/div/main/div/button'));
const modal = $('#form-dialog-title');


jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;

describe('E2E UI Test: Add hour', function() {
  describe('when the home is loaded', () => {
    beforeAll(async () => {
      await browser.get(baseURL);
      await browser.wait(EC.visibilityOf(headerLabel), timeout, "the header is not visible");
    });
    
    it('should have a header', async () => {
      const isPresent = await headerLabel.isPresent();
      expect(isPresent).toBe(true);
    });
  });

  describe('when the add button is clicked', () => {
    beforeAll(async () => {
      await browser.wait(EC.elementToBeClickable(addButton), timeout, "the addButton is not clickeable");
      await addButton.click();
    });
    
    it('should open the "Add Hour" modal', async () => {
      await browser.wait(EC.visibilityOf(modal), timeout, "the modal is not visible");
      const isPresent = await modal.isPresent();
      expect(isPresent).toBe(true);
    });
  });
});
