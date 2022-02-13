function loadAllIcons(cols, rows) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let id = r.toString() + c.toString()
            loadIcon(id)
        }
    }
}

function loadIcon(id) {
    let link = document.getElementById(id).getAttribute("link")
    let google_img = new Image()
    let fav_link = getOpenLink(getDomain(link)) + "/favicon.ico"
    google_img.src = "https://s2.googleusercontent.com/s2/favicons?domain=" + getOpenLink(link) + "&sz=128"
    google_img.onload = () => waitToLoadFavicon(google_img, fav_link, id)
    google_img.onerror = () => waitToLoadFavicon(google_img, fav_link, id)
}

function waitToLoadFavicon(google_img, fav_link, id) {
    let fav_img = new Image()
    fav_img.src = fav_link
    fav_img.onload = () => remakeIcon(google_img, fav_img, id)
    fav_img.onerror = () => remakeIcon(google_img, fav_img, id)
}

function remakeIcon(google_img, fav_img, id) {
    let imgOld = document.getElementById("icon-" + id)
    if (google_img.naturalWidth >= fav_img.naturalWidth) {
        imgOld.src = google_img.src
    } else {
        imgOld.src = fav_img.src
    }
}