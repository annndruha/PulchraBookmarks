$(document).ready(function () {
    $('#bm-downloads').click(function () {
        chrome.tabs.create({"url": "chrome://downloads/"})
    })
    $('#bm-bookmarks').click(function () {
        chrome.tabs.create({"url": "chrome://bookmarks/"})
    })
    $('#bm-history').click(function () {
        chrome.tabs.create({"url": "chrome://history/"})
    })
    $('#bm-settings').click(function () {
        chrome.tabs.create({"url": "chrome://settings/"})
    })
})