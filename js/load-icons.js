function iconDefined(link) {
    let url = linkDefined(getOpenLink(getDomain(link))) // Link set in bookmark
    return !!url;
}

function makeIcon(link, id) {
    let icon_div = document.createElement("div")
    let google_link = "https://s2.googleusercontent.com/s2/favicons?domain=" + getOpenLink(link) + "&sz=128"
    let icon = document.createElement("img")
    icon.setAttribute("src", google_link)
    icon.id = "icon-" + id
    icon_div.appendChild(icon).className = "icon"
    return icon_div
}

function getFaviconReplace(id, w, h) {
    let link = document.getElementById(id).getAttribute("link")
    let fav_link = getOpenLink(getDomain(link)) + "/favicon.ico"
    waitToLoad(fav_link, id, w, h)
}

function waitToLoad(fav_link, id, w, h){
    let img = new Image()
    img.src = fav_link
    img.onload = () => remakeIcon(img, fav_link, id, w, h);
}

function remakeIcon(img, link, id, w, h) {
    if (img.width<= w){
        console.log("No icon change: w=", w, "nw=", img.width, link)
    }
    else
    {
        console.log("Try to change: w=", w, "nw=", img.width, link)
        let imgOld = document.getElementById("icon-" + id)
        imgOld.src = img.src
    }
}


function loadAllIcons(cols, rows){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let id = r.toString()+c.toString()
            let img = document.getElementById("icon-" + id)
            // console.log("id=" + id + " size=" + img.naturalHeight + "x" + img.naturalWidth)
            getFaviconReplace(id, img.naturalHeight, img.naturalWidth)
        }
    }
}