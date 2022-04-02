// noinspection JSDeprecatedSymbols

function varDefined(v) {
    return v !== 'undefined' && v !== 'null' && v !== null && v !== undefined && v !== ''
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
    chrome.tabs.create({'url': 'chrome://newtab/'})
    chrome.storage.local.clear()
})