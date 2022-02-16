chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
    chrome.tabs.create({'url': 'chrome://newtab/'})
    chrome.storage.local.get(['cols'], function (res) {
        if (res['cols'] !== undefined){chrome.storage.local.set({['cols']: 6},() => {})}
    })
    chrome.storage.local.get(['rows'], function (res) {
        if (res['rows'] !== undefined){chrome.storage.local.set({['rows']: 4}, () => {})}
    })
    chrome.storage.local.get(['new-tab'], function (res) {
        if (res['new-tab'] !== undefined){chrome.storage.local.set({['new-tab']: false}, () => {})}
    })
    chrome.storage.local.get(['show-quick'], function (res) {
        if (res['show-quick'] !== undefined){chrome.storage.local.set({['show-quick']: true}, () => {})}
    })
})