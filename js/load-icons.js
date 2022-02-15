function loadAllIcons() {
    chrome.storage.local.get(['cols', 'rows'], function (res) {
        let cols = res['cols']
        let rows = res['rows']
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let id = r.toString() + c.toString()
                loadIcon(id)
            }
        }
    })
}

function loadIcon(id) {
    let link = document.getElementById(id).getAttribute('link')
    // console.log(id, link)
    let google_img = new Image()
    if (linkDefined(link)) {
        let fav_link = getOpenLink(getDomain(link)) + '/favicon.ico'
        google_img.src = 'https://s2.googleusercontent.com/s2/favicons?domain=' + getOpenLink(link) + '&sz=128'
        google_img.onload = () => waitToLoadFavicon(google_img, fav_link, id, true)
        google_img.onerror = () => waitToLoadFavicon(google_img, fav_link, id, false)
    } else {
        if (document.getElementById('icon-' + id)) {
            document.getElementById('icon-' + id).remove()
        }
    }
}

function waitToLoadFavicon(google_img, fav_link, id, loaded1) {
    let fav_img = new Image()
    fav_img.src = fav_link
    fav_img.onload = () => remakeIcon(google_img, fav_img, id, loaded1, true)
    fav_img.onerror = () => remakeIcon(google_img, fav_img, id, loaded1, false)
}

function remakeIcon(google_img, fav_img, id, loaded1, loaded2) {
    let imgOld = document.getElementById('icon-' + id)
    if (loaded1 && loaded2) {
        if (google_img.naturalWidth >= fav_img.naturalWidth) {
            imgOld.src = google_img.src
        } else {
            imgOld.src = fav_img.src
        }
    } else if (loaded1) {
        imgOld.src = google_img.src
    } else if (loaded2) {
        imgOld.src = fav_img.src
    } else {
        imgOld.src = '../images/icons/language.svg'
    }
}