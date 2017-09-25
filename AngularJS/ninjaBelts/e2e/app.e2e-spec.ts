import { NinjaBeltsPage } from './app.po';

describe('ninja-belts App', function() {
  let page: NinjaBeltsPage;

  beforeEach(() => {
    page = new NinjaBeltsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
