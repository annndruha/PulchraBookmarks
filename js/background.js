chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
    chrome.tabs.create({'url': 'chrome://newtab/'})
    chrome.storage.local.get(['cols'], function (res) {
        if (res['cols'] !== Object){chrome.storage.local.set({['cols']: 5},() => {
            console.log("cols set to:", 5)
        })}
    })
    chrome.storage.local.get(['rows'], function (res) {
        if (res['rows'] !== Object){chrome.storage.local.set({['rows']: 3}, () => {
            console.log("rows set to:", 3)
        })}
    })
    chrome.storage.local.get(['new-tab'], function (res) {
        if (res['new-tab'] !== Object){chrome.storage.local.set({['new-tab']: false}, () => {
            console.log("new-tab set to:", false)
        })}
    })
    chrome.storage.local.get(['show-quick'], function (res) {
        if (res['show-quick'] !== Object){chrome.storage.local.set({['show-quick']: true}, () => {
            console.log("show-quick set to:", true)
        })}
    })
})