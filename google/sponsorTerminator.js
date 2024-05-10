// ==UserScript==
// @name         Google Sponsor Terminator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Identify and remove sponsored search results on google.
// @author       Krunk
// @match        https://www.google.com/search*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ChunkyMonkey00/sponsorBlocker/main/util/util.js
// @downloadURL  https://raw.githubusercontent.com/ChunkyMonkey00/sponsorBlocker/main/util/util.js
// ==/UserScript==
function waitForPageLoad(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

waitForPageLoad(function() {
    (function() {
    'use strict';

    // Function to identify and print sponsored results
    function identifySponsoredResults() {
        const sponsoredResultSelectors = [
            '.adsAd',
            '.adsWrapper',
            '.sponsored-link',
            '#atvcap',
            '#taw',
        ];

        sponsoredResultSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`Found ${elements.length} sponsored result(s) using selector "${selector}"`);
                elements.forEach((el) => {el.remove();});
            }
        });
    }

    // Call the function to start identifying sponsored results
    identifySponsoredResults();
})();

});
