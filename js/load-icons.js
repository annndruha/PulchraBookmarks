function loadAllIcons(clear_cache = false) {
    console.log('loadAllIcons')
    chrome.storage.local.get(['cols', 'rows'], function (res) {
        for (let r = 0; r < res['rows']; r++) {
            for (let c = 0; c < res['cols']; c++) {
                let id = r.toString() + c.toString()
                loadIcon(id, clear_cache)
            }
        }
    })
}

function loadIcon(id, clear_cache) {
    let bm = document.getElementById(id)
    if (bm.hasAttribute('link') && varDefined(bm.getAttribute('link'))) {
        if (clear_cache) {
            setPlaceholder(id)
            console.log('Clear cache true')
            clearIconCache(id)
        } else {
            console.log('Clear cache false')
        }
        if (bm.hasAttribute('cache-icon')) {
            if (varDefined(bm.getAttribute('cache-icon'))) {
                setIcon(id, bm.getAttribute('cache-icon'))
                return
            }
        } else if (bm.hasAttribute('icon-link')) {
            if (varDefined(bm.getAttribute('icon-link'))) {
                toBase64(id, bm.getAttribute('icon-link'), onUserIconCallback)
                return
            }
        }
        findBestIcon(id)
    }
}

function setPlaceholder(id) {
    let imgOld = document.getElementById('icon-' + id)
    imgOld.src = '' + (id !== 'preview') ? 'images/icons/autorenew.svg' : 'images/icons/language.svg'
}

function setIcon(id, data) {
    let imgOld = document.getElementById('icon-' + id)
    if (imgOld === null) {
        return
    } // When remake grid so fast
    imgOld.src = data
}

function cacheIcon(id, iconBase64) {
    if (id === 'preview') {
        setIcon(id, iconBase64)
        return
    }
    chrome.storage.local.get([id], function (res) {
        let storage_value = res[id]
        storage_value[0]['cache-icon'] = iconBase64
        chrome.storage.local.set({[id]: storage_value}, () => {
        })
        setIcon(id, iconBase64)
    })
}

function clearIconCache(id) {
    let bm = document.getElementById(id)
    bm.removeAttribute('cache-icon')
    chrome.storage.local.get([id], function (res) {
        let storage_value = res[id]
        if (varDefined(storage_value)) {
            delete storage_value[0]['cache-icon']
            chrome.storage.local.set({[id]: storage_value}, () => {
            })
        }
    })
}

function findBestIcon(id) {
    let bm = document.getElementById(id)
    let link = bm.getAttribute('link')
    if (varDefined(link)) {
        loadBestIcon(id, link)
    }
}

function loadBestIcon(id, link) {
    let link1 = getOpenLink(getDomain(link)) + '/favicon.ico'
    let link2 = 'https://s2.googleusercontent.com/s2/favicons?domain=' + getOpenLink(link) + '&sz=64'

    toBase64(id, link1, onBestCallback)
    toBase64(id, link2, onBestCallback)
}

const google_err_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC"


function onUserIconCallback(id, src, base64img) {
    let imgOld = document.getElementById('icon-' + id)
    if (imgOld === null) {
        return
    } // When remake grid so fast
    let img = new Image()
    img.onload = function () {
        if (this.src !== google_err_img) {
            cacheIcon(id, base64img)
        } else {
            cacheIcon(id, 'images/icons/language.svg')
        }
    }
    img.src = base64img
}


function onBestCallback(id, src, base64img) {
    let imgOld = document.getElementById('icon-' + id)
    if (imgOld === null) {
        return
    } // When remake grid so fast
    let img = new Image()
    img.onload = function () {
        if (this.naturalWidth > imgOld.naturalWidth) {
            if (this.src !== google_err_img) {
                cacheIcon(id, base64img)
            } else {
                cacheIcon(id, 'images/icons/language.svg')
            }
        } else if (this.src === google_err_img && imgOld.naturalWidth === 25) {
            cacheIcon(id, 'images/icons/language.svg')
        }
    }
    img.src = base64img
}

function toBase64(id, src, callback) {
    fetch(src)
        .then((resp) => resp.blob())
        .then(imageBlob => {
            let reader = new FileReader()
            reader.readAsDataURL(imageBlob)
            reader.onloadend = () => callback(id, src, reader.result)
        }).catch(() => {
        callback(id, src, google_err_img)
    })
}