function linkDefined(link) {
    return link !== "undefined" && link !== "null" && link !== null && link !== undefined && link !== ""
}

function getDomain(link) {
    if (linkDefined(link)) {
        if (link.includes("://")) {
            let name = link.split("/")
            return name[2].replace("www.", "")
        } else if (link.includes(":\\\\")) {
            let name = link.split("\\")
            return name[2].replace("www.", "")
        } else return link
    } else return ""
}

function getOpenLink(link) {
    let openlink = ""
    if (linkDefined(link)) {
        if (!(link.startsWith("https://")) && !(link.startsWith("http://"))) {
            openlink = "https://" + link
        } else {
            openlink = link
        }
    }
    return openlink
}

function makeSubMenu(id) {
    let subMenu = document.createElement("div")
    let img = document.createElement("img")
    img.setAttribute("src", "images/icons/edit_black_24dp.svg")
    img.id = "img-" + id
    subMenu.appendChild(img).className = "grid-item-inside-menu-img"
    return subMenu
}

function makeTextDiv(text, id) {
    let text_div = document.createElement("div")
    let textCopy = text
    text = text.split(".")
    text_div.textContent = textCopy.replace("."+text[text.length - 1], "")
    text_div.id = "text-" + id
    return text_div
}

function iconAvaidable(link) {
    let url = linkDefined(getOpenLink(getDomain(link))) // Link set in bookmark
    return !!url;
}

function makeIcon(link, id) {
    let icon_div = document.createElement("div")
    // let fav_link = getOpenLink(getDomain(link)) + "/favicon.ico"
    //https://s2.googleusercontent.com/s2/favicons?domain=https://ximc.ru/&sz=128
    let fav_link = "https://s2.googleusercontent.com/s2/favicons?domain=" + getOpenLink(link) + "&sz=128"
    let icon_icon = document.createElement("img")
    icon_icon.setAttribute("src", fav_link)
    icon_icon.id = "icon-" + id

    // console.log(icon_icon.clientWidth)
    icon_div.appendChild(icon_icon).className = "icon"
    return icon_div
}

function makeMark(r, c) {
    // Create one bookmark
    let itemInside = document.createElement("div")
    itemInside.id = r.toString() + c.toString()
    chrome.storage.local.get([itemInside.id], function (result) {
        let link = result[itemInside.id]
        itemInside.setAttribute("link", link)

        let subMenu = makeSubMenu(itemInside.id)
        itemInside.appendChild(subMenu).className = "grid-item-inside-menu"

        let textDiv = makeTextDiv(getDomain(link), itemInside.id)
        itemInside.appendChild(textDiv).className = "grid-item-inside-text"

        if (iconAvaidable(link)) {
            let iconDiv = makeIcon(link, itemInside.id)
            itemInside.appendChild(iconDiv).className = "grid-item-inside-icon"
        }
    })
    return itemInside
}


function editBookmark(editId) {
    let bmId = editId.replace("img-", "")
    let bookmark = document.getElementById(bmId)
    let link = bookmark.getAttribute("link")
    let placeholder = linkDefined(link) ? link : ""

    console.log("Edit id: " + editId + " with stored link:" + link)
    let newLink = prompt("Enter new link:", placeholder)
    if (newLink === null) {
        return
    }

    bookmark.setAttribute("link", newLink)
    chrome.storage.local.set({[bmId]: newLink}, function () {
    })

    if (document.getElementById("icon-" + bmId)) {
        document.getElementById("icon-" + bmId).remove()
    }
    document.getElementById("text-" + bmId).textContent = getDomain(newLink)
    if (iconAvaidable(newLink)) {
        let iconDiv = makeIcon(newLink, bmId)
        bookmark.appendChild(iconDiv).className = "grid-item-inside-icon"
    }
}


function makeGrid(parent, cols, rows) {
    for (let r = 0; r < rows; r++) {
        let gridRow = document.createElement("div")
        for (let c = 0; c < cols; c++) {
            let item = document.createElement("div")
            let itemInside = makeMark(r, c)
            item.appendChild(itemInside).className = "grid-item-inside"
            gridRow.appendChild(item).className = "grid-item"
        }
        parent.appendChild(gridRow).className = "grid-row"
    }
}

function getMeta(url) {
    let img = new Image();
    img.src = url;
    img.onload = function () {return this}
    return img
}

function writeWH(cols, rows){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let img = document.getElementById("icon-" + r + c)
            if (img === null)
            {
                // img = getMeta(document.getElementById(r.toString() + c).getAttribute("link"))
                // console.log(img)
            }
            $("<img>").attr("src", $(img).attr("src")).load(function () {
                img.setAttribute("w", this.width)
                img.setAttribute("h", this.height)
                //console.log("id=" + r+c + " size=" + img.getAttribute("w") + "x" + img.getAttribute("h"))
            })
            // console.log(img)
            // console.log("id=" + r+c + " size=" + img.getAttribute("w") + "x" + img.getAttribute("h"))
            // remakeIcon(document.getElementById(r.toString() + c).getAttribute("link"), "icon-" + r + c)
        }
    }
}

// function remakeIcon(link, id) {
//     // let icon_div = document.createElement("div")
//     console.log(link)
//     let fav_link = getOpenLink(getDomain(link)) + "/favicon.ico"
//     // let icon_icon = document.createElement("img")
//     // icon_icon.setAttribute("src", fav_link)
//     // icon_icon.id = "icon-" + id
//     let img = getMeta(fav_link)
//     // console.log(link)
//
//     // console.log(icon_icon.clientWidth)
//     // icon_div.appendChild(icon_icon).className = "icon"
//     return fav_link
// }
