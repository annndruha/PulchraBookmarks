chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
    chrome.tabs.create({"url": "chrome://newtab/"})
    chrome.storage.local.set({["cols"]: 5}, function () {
    })
    chrome.storage.local.set({["rows"]: 5}, function () {
    })
    chrome.storage.local.set({["new-tab"]: false}, function () {
    })
})