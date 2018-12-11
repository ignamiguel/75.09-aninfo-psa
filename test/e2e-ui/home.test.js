const EC = require('protractor').ExpectedConditions;
const baseURL = "http://localhost:8080/";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;

describe('E2E UI Test: Home PSA - Time Tracker', function() {
  describe('when the home is loaded', () => {
    beforeAll(async () => {
      await browser.get(baseURL);
      await browser.wait(EC.titleIs('Hours'));
    });
    
    it('should have a title', async () => {
      const title = await browser.getTitle();
      expect(title).toEqual('Hours');
    });
  });
});
