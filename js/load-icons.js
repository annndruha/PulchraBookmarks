function loadAllIcons(linkchanged = false) {
    chrome.storage.local.get(['cols', 'rows'], function (res) {
        for (let r = 0; r < res['rows']; r++) {
            for (let c = 0; c < res['cols']; c++) {
                let id = r.toString() + c.toString()
                loadIcon(id, linkchanged)
            }
        }
    })
}


function loadIcon(id, linkchanged=false) {
    try {
        let itemInside = document.getElementById(id)
        if (itemInside.hasAttribute('icon-link')){
            let imgOld = document.getElementById('icon-' + id)
            if (varDefined(itemInside.getAttribute('icon-link'))){
                imgOld.src = document.getElementById(id).getAttribute('icon-link')
            }
            else {
                autoIcon(id, linkchanged)
            }
        }
        else {
            if  (linkchanged){
                autoIcon(id, linkchanged)
            }
            else if(!itemInside.hasAttribute('cache-icon')){
                autoIcon(id)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function autoIcon(id, linkchanged=false){
    let bm = document.getElementById(id)
    let link = bm.getAttribute('link')
    let imgOld = document.getElementById('icon-' + id)
    if (linkchanged) { // Placeholders
        if (id !== 'preview') {
            bm.setAttribute('cache-icon', 'images/icons/autorenew.svg')
            imgOld.src = 'images/icons/autorenew.svg'
        }
        else {
            bm.setAttribute('cache-icon', 'images/icons/language.svg')
            imgOld.src = 'images/icons/language.svg'
        }
    }
    if (varDefined(link)) {
        loadBestIcon(link, id)
    } else {
        if (id !== 'preview') {
            if (document.getElementById('icon-' + id)) {
                document.getElementById('icon-' + id).remove()
            }
        }
    }
}

function loadBestIcon(link, id){
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
        chrome.storage.local.get([id], function (res) {
            let storage_value = res[id]
            toDataURL(imgOld.src, function (iconBase64) {
                storage_value[0]['cache-icon'] = iconBase64
                chrome.storage.local.set({[id]: storage_value}, () => {})
            })
        })
    }
}

function toDataURL(src, callback, outputFormat) {
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
    img.onerror = function() {

        callback("PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI2FhYWFhYSI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMS45OSAyQzYuNDcgMiAyIDYuNDggMiAxMnM0LjQ3IDEwIDkuOTkgMTBDMTcuNTIgMjIgMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMS45OSAyem02LjkzIDZoLTIuOTVjLS4zMi0xLjI1LS43OC0yLjQ1LTEuMzgtMy41NiAxLjg0LjYzIDMuMzcgMS45MSA0LjMzIDMuNTZ6TTEyIDQuMDRjLjgzIDEuMiAxLjQ4IDIuNTMgMS45MSAzLjk2aC0zLjgyYy40My0xLjQzIDEuMDgtMi43NiAxLjkxLTMuOTZ6TTQuMjYgMTRDNC4xIDEzLjM2IDQgMTIuNjkgNCAxMnMuMS0xLjM2LjI2LTJoMy4zOGMtLjA4LjY2LS4xNCAxLjMyLS4xNCAyIDAgLjY4LjA2IDEuMzQuMTQgMkg0LjI2em0uODIgMmgyLjk1Yy4zMiAxLjI1Ljc4IDIuNDUgMS4zOCAzLjU2LTEuODQtLjYzLTMuMzctMS45LTQuMzMtMy41NnptMi45NS04SDUuMDhjLjk2LTEuNjYgMi40OS0yLjkzIDQuMzMtMy41NkM4LjgxIDUuNTUgOC4zNSA2Ljc1IDguMDMgOHpNMTIgMTkuOTZjLS44My0xLjItMS40OC0yLjUzLTEuOTEtMy45NmgzLjgyYy0uNDMgMS40My0xLjA4IDIuNzYtMS45MSAzLjk2ek0xNC4zNCAxNEg5LjY2Yy0uMDktLjY2LS4xNi0xLjMyLS4xNi0yIDAtLjY4LjA3LTEuMzUuMTYtMmg0LjY4Yy4wOS42NS4xNiAxLjMyLjE2IDIgMCAuNjgtLjA3IDEuMzQtLjE2IDJ6bS4yNSA1LjU2Yy42LTEuMTEgMS4wNi0yLjMxIDEuMzgtMy41NmgyLjk1Yy0uOTYgMS42NS0yLjQ5IDIuOTMtNC4zMyAzLjU2ek0xNi4zNiAxNGMuMDgtLjY2LjE0LTEuMzIuMTQtMiAwLS42OC0uMDYtMS4zNC0uMTQtMmgzLjM4Yy4xNi42NC4yNiAxLjMxLjI2IDJzLS4xIDEuMzYtLjI2IDJoLTMuMzh6Ii8+PC9zdmc+")
    }
    // img.src = src
    // if (img.complete || img.complete === undefined) {
    //     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    //     img.src = src
    // }
}

// toDataURL('../images/icons/language.svg', function (res) {
//     console.log(res)
// })