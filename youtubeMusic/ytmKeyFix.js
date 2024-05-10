// ==UserScript==
// @name         YTM Key Fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix for YouTube Music key functionality
// @author       Krunk
// @match        *://music.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /* This script is intended to fix the pause button issue where sometimes the space key triggers the last clicked element and doesnt pause
    or play the song. This sets a different key, and forces it to always pause/play the song (along with error handling/logging)
    */
    window.addEventListener('load', async (event) => {
        console.log('YTM Key Fix: Page fully loaded\nLoading scripts...');

        async function loadScript(url) {
            try {
                const response = await fetch(url);
                const scriptContent = await response.text();
                const script = document.createElement('script');
                script.textContent = scriptContent;
                document.head.appendChild(script);
                document.head.removeChild(script);
            } catch (error) {
                console.error("Error loading script: ", error);
            }
        }

        // Load the cookies.js script
        await loadScript('https://raw.githubusercontent.com/ChunkyMonkey00/tamperScripts/main/utils/cookies.js');

        console.log("YTM Key Fix: Util scripts loaded\nStarting YTM key fix...");

        _checkCookiesForKey();

        var _playButton__ = document.querySelector("#play-pause-button");
        var _configKey__ = "`";

        document.addEventListener("keydown", _checkForKey);

        function _checkForKey(event) {
            if (event.key == _configKey__) {
                if (_playButton__) _playButton__.click(); else console.log("YTM Key Fix: No Play/Pause button found");
            }
        }

        function _checkCookiesForKey() {
            _configKey__ = getCookie("YTMKFconfigKey");

            if (!cookieExists(_configKey__)) {
                console.log("YTM Key Fix: No config key found... setting to key: `");
                setCookie("YTMKFconfigKey", "`");
            }
        }
    });
})();
