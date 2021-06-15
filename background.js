// When the little extension icon is clicked open the main page
chrome.browserAction.onClicked.addListener(() => {
    var newURL = chrome.runtime.getURL('main/index.html');
    chrome.tabs.create({ url: newURL });
});