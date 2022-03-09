// noinspection JSDeprecatedSymbols

function varDefined(link) {
    return link !== 'undefined' && link !== 'null' && link !== null && link !== undefined && link !== ''
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed')
    chrome.tabs.create({'url': 'chrome://newtab/'})
    chrome.storage.sync.get(null, (res)=> {
        if (varDefined(res['rows'])){
            console.log('Load start bookmarks from cloud')
            chrome.storage.local.clear()
            chrome.storage.local.set(res, () => {})
            initSettingsValues(true)
        }
        else {
            const json = JSON.parse("{\"10\":{\"0\":{\"link\":\"https://drive.google.com/drive/u/0/my-drive\"}},\"11\":{\"0\":{\"link\":\"https://twitter.com/\"}},\"12\":{\"0\":{\"link\":\"https://youtube.com/\"}},\"13\":{\"0\":{\"link\":\"https://www.instagram.com/\"}},\"14\":{\"0\":{\"link\":\"https://www.spotify.com/\"}},\"15\":{\"0\":{\"link\":\"https://mail.yandex.ru/touch\"}},\"20\":{\"0\":{\"link\":\"https://www.facebook.com/\"}},\"21\":{\"0\":{\"link\":\"https://www.amazon.com/\"}},\"22\":{\"0\":{\"link\":\"https://www.pinterest.com/\"}},\"23\":{\"0\":{\"link\":\"https://www.imdb.com/\"}},\"24\":{\"0\":{\"link\":\"https://github.com/Annndruha/pulchra-bookmarks\"}},\"25\":{\"0\":{\"link\":\"mail.ximc.ru\"}},\"00\":{\"0\":{\"link\":\"http://www.google.com/\"}},\"01\":{\"0\":{\"link\":\"https://wikipedia.org/\"}},\"02\":{\"0\":{\"link\":\"https://translate.google.com/\"}},\"03\":{\"0\":{\"link\":\"https://netflix.com\"}},\"04\":{\"0\":{\"link\":\"https://www.reddit.com/\"}},\"05\":{\"0\":{\"link\":\"https://mail.google.com/mail\"}},\"cols\":5,\"new-tab\":false,\"rows\":3,\"show-header\":true,\"show-quick\":true,\"version\":\"0.6.0\"}")
            chrome.storage.local.clear()
            chrome.storage.local.set(json, () => {})
        }
    })
})