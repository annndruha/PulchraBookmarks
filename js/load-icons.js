function loadAllIcons() {
    chrome.storage.local.get(['cols', 'rows'], function (res) {
        for (let r = 0; r < res['rows']; r++) {
            for (let c = 0; c < res['cols']; c++) {
                let id = r.toString() + c.toString()
                loadIcon(id)
            }
        }
    })
}


function loadIcon(id) {
    let bm = document.getElementById(id)
    if (bm.hasAttribute('link')) {
        if (varDefined(bm.getAttribute('link'))){
            setPlaseholder(id)
            clearIconCache(id)
            if (bm.hasAttribute('cache-icon')) {
                if (varDefined(bm.getAttribute('cache-icon'))){
                    setIcon(id, bm.getAttribute('cache-icon'))
                }
                else {
                    findBestIcon(id)
                }
            }
            else if (bm.hasAttribute('icon-link')){
                if (varDefined(bm.getAttribute('icon-link'))){
                    cacheIcon(id, bm.getAttribute('icon-link'))
                }
                else {
                    findBestIcon(id)
                }
            }
            else {
                findBestIcon(id)
            }
        }
    }
}

function setPlaseholder(id) {
    let imgOld = document.getElementById('icon-' + id)
    imgOld.src = '' + (id !== 'preview') ? 'images/icons/autorenew.svg' : 'images/icons/language.svg'
}

function setIcon(id, data) {
    let imgOld = document.getElementById('icon-' + id)
    imgOld.src = data
}

function cacheIcon(id, link){
    chrome.storage.local.get([id], function (res) {
        let storage_value = res[id]
        toBase64(link, function (iconBase64) {
            setIcon(id, iconBase64)
            storage_value[0]['cache-icon'] = iconBase64
            chrome.storage.local.set({[id]: storage_value}, () => {})
        })
    })
}

function clearIconCache(id) {
    let bm = document.getElementById(id)
    bm.removeAttribute('cache-icon')
    chrome.storage.local.get([id], function (res) {
        let storage_value = res[id]
        if (varDefined(storage_value)){
            delete storage_value[0]['cache-icon']
            chrome.storage.local.set({[id]: storage_value}, () => {})
        }
    })
}

function findBestIcon(id){
    console.log(id)
    let bm = document.getElementById(id)
    let link = bm.getAttribute('link')
    if (varDefined(link)) {
        loadBestIcon(id, link)
    }
    // else if (id !== 'preview')
    // {
    //     if (document.getElementById('icon-' + id)) {
    //         document.getElementById('icon-' + id).remove()
    //     }
    // }
}

function loadBestIcon(id, link){
    let links = [getOpenLink(getDomain(link)) + '/favicon.ico',
                'https://s2.googleusercontent.com/s2/favicons?domain=' + getOpenLink(link) + '&sz=64']

    let img = new Image()
    img.src = links[1]
    img.onload = () => waitToLoadFavicon(img, links[0], id, true)
    img.onerror = () =>  waitToLoadFavicon(img, links[0], id, false)
}

function waitToLoadFavicon(google_img, fav_link, id, loaded1) {
    let fav_img = new Image()
    fav_img.src = fav_link
    fav_img.onload = () => remakeIcon(google_img, fav_img, id, loaded1, true)
    fav_img.onerror = () => remakeIcon(google_img, fav_img, id, loaded1, false)
}


function remakeIcon(google_img, fav_img, id, loaded1, loaded2) {
    let imgOld = document.getElementById('icon-' + id)
    if (imgOld === null) { // When remake grid so fast
        return
    }
    if (loaded1 && loaded2) {
        if (google_img.naturalWidth >= fav_img.naturalWidth) {
            imgOld.src = google_img.src
        } else {
            imgOld.src = fav_img.src
        }
    } else if (loaded1) {
        if (google_img.naturalWidth !== 16) {
            imgOld.src = google_img.src
        } else {
            imgOld.src = '../images/icons/language.svg'
        }
    } else if (loaded2) {
        imgOld.src = fav_img.src
    } else {
        imgOld.src = '../images/icons/language.svg'
    }

    if (id !== 'preview') {
        cacheIcon(id, imgOld.src)
    }
}

function toBase64(src, callback, outputFormat) {
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function() {
        let canvas = document.createElement('CANVAS')
        let ctx = canvas.getContext('2d')
        canvas.height = this.naturalHeight
        canvas.width = this.naturalWidth
        ctx.drawImage(this, 0, 0)
        let dataURL = canvas.toDataURL(outputFormat)
        callback(dataURL)
    }
    // img.onerror = function(e) {
    //     console.log(e)
    // }
    img.src = src
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        img.src = src
    }
}