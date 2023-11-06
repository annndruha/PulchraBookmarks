// noinspection JSDeprecatedSymbols

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')

    function varDefined(v) {
        return v !== 'undefined' && v !== 'null' && v !== null && v !== undefined && v !== ''
    }

    chrome.storage.sync.get(null, (json) => {
        if (varDefined(json['rows'])) {
            console.log('Load bookmarks from cloud...')
            chrome.storage.local.clear(() => {
                chrome.storage.local.set(json, () => {
                    console.log('Cloud bookmarks set to local storage.')
                    chrome.tabs.create({'url': 'chrome://newtab/'})
                })
            })
        } else {
            console.log('Cloud hasn\'t any data')
            chrome.tabs.create({'url': 'chrome://newtab/'})
        }
    })
})