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
            const json = JSON.parse("{\"10\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://drive.google.com/drive/u/0/my-drive&sz=128\",\"link\":\"https://drive.google.com/drive/u/0/my-drive\"}},\"11\":{\"0\":{\"icon-link\":\"https://about.twitter.com/etc/designs/about2-twitter/public/img/favicon.ico\",\"link\":\"https://twitter.com/\"}},\"12\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://youtube.com/&sz=128\",\"link\":\"https://youtube.com/\"}},\"13\":{\"0\":{\"icon-link\":\"https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png\",\"link\":\"https://www.instagram.com/\"}},\"14\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://www.spotify.com/&sz=128\",\"link\":\"https://www.spotify.com/\"}},\"20\":{\"0\":{\"icon-link\":\"https://www.facebook.com/images/fb_icon_325x325.png\",\"link\":\"https://www.facebook.com/\"}},\"21\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://www.amazon.com/&sz=128\",\"link\":\"https://www.amazon.com/\"}},\"22\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://www.pinterest.com/&sz=128\",\"link\":\"https://www.pinterest.com/\"}},\"23\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://www.imdb.com/&sz=128\",\"link\":\"https://www.imdb.com/\"}},\"24\":{\"0\":{\"icon-link\":\"https://github.githubassets.com/pinned-octocat.svg\",\"link\":\"https://github.com/dev-team-msu/pulchra-bookmarks\"}},\"00\":{\"0\":{\"icon-link\":\"https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png\",\"link\":\"http://www.google.com/\"}},\"01\":{\"0\":{\"icon-link\":\"https://www.wikipedia.org/static/favicon/wikipedia.ico\",\"link\":\"https://wikipedia.org/\"}},\"02\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://translate.google.com/&sz=128\",\"link\":\"https://translate.google.com/\"}},\"03\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://netflix.com&sz=128\",\"link\":\"https://netflix.com\"}},\"04\":{\"0\":{\"cache-icon-link\":\"https://s2.googleusercontent.com/s2/favicons?domain=https://www.reddit.com/&sz=128\",\"link\":\"https://www.reddit.com/\"}},\"cols\":5,\"new-tab\":false,\"rows\":3,\"show-header\":true,\"show-quick\":true,\"version\":\"0.6.1\"}")
            chrome.storage.local.clear()
            chrome.storage.local.set(json, () => {})
        }
    })
})