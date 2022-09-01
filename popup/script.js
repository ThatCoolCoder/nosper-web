import { spnr } from "../common/spnr.mjs";

function openFullscreenCalculator() {
    var newURL = chrome.runtime.getURL('fullscreen/index.html');
    chrome.tabs.create({ url: newURL });
}

spnr.dom.id('openFullscreenButton').addEventListener('click', openFullscreenCalculator);