'use strict';

/* https://docs.angularjs.org/guide/e2e-testing */

describe('hakase app', function() {

  describe('Frequent word list view', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });

    var wordList = element.all(by.repeater('word in frequentWords'));
    var query = element(by.model('query'));

    it('should filter the word list as a user types into the search box', function() {

        expect(wordList.count()).toBe(20);

        query.sendKeys('nexus');
        expect(wordList.count()).toBe(1);

        query.clear();
        query.sendKeys('motorola');
        expect(wordList.count()).toBe(8);
    });

//    it('should display the current filter value in the title bar', function() {
//        query.clear();
//        expect(browser.getTitle()).toMatch(/Frequent Word List:\s*$/);
//
//        query.sendKeys('nexus');
//        expect(browser.getTitle()).toMatch(/Frequent Word List: nexus$/);
//    });

    it('should be possible to control word order via the drop down select box', function() {
        var wordNameColumn = element.all(by.repeater('word in frequentWords').column('word.name'));
        var query = element(by.model('query'));

        function getNames() {
            return wordNameColumn.map(function(elm) {
                return elm.getText();
            })
        }

        query.sendKeys('tablet');

        expect(getNames()).toEqual([
            "Motorola XOOM\u2122 with Wi-Fi",
            "MOTOROLA XOOM\u2122",
        ]);
    });

    it('should render word specific links', function() {
        var query = element(by.model('query'));
        query.sendKeys('nexus');
        element.all(by.css('.words li a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/words/nexus-s');
        });
    });

    it('should redirect index.html to index.html#/words', function() {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/words');
        });
    });

    describe('Word list view', function() {
        beforeEach(function() {
            browser.get('app/index.html#/words');
        });
    });

    describe('Word detail view', function() {

        beforeEach(function() {
            browser.get('app/index.html#words/nexus-s');
        });

        it('should display placeholder page with phoneId', function() {
            expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
        });

        it('should display the first phone image as main phone image', function() {
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });

        it('should swap main image if a thumbnail image is clicked on', function() {
            element(by.css('.phone-thumbs li:nth-child(3) img')).click();
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

            element(by.css('.phone-thumbs li:nth-child(1) img')).click();
            expect(element(by.css('img.phone')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
    });
    // Add here
  });
});
