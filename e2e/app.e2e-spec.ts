import { TransportPage } from './app.po';

describe('transport App', function() {
  let page: TransportPage;

  beforeEach(() => {
    page = new TransportPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
