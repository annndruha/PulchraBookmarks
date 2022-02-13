function makeSubMenu(id) {
    let subMenu = document.createElement("div")
    let img = document.createElement("img")
    img.setAttribute("src", "images/icons/edit.svg")
    img.id = "img-" + id
    subMenu.appendChild(img).className = "grid-item-inside-menu-img"
    return subMenu
}

function makeText(text, id) {
    let text_div = document.createElement("div")
    let textCopy = text
    text = text.split(".")
    text_div.textContent = textCopy.replace("." + text[text.length - 1], "")
    text_div.id = "text-" + id
    return text_div
}

function makeIconTemplate(id) {
    let icon_div = document.createElement("div")
    let icon = document.createElement("img")
    icon.setAttribute("src", "images/icons/autorenew.svg")
    icon.id = "icon-" + id
    icon_div.appendChild(icon).className = "icon"
    return icon_div
}


function makeMark(r, c) {
    let itemInside = document.createElement("div")
    itemInside.id = r.toString() + c.toString()
    chrome.storage.local.get([itemInside.id], function (result) {
        let link = result[itemInside.id]
        itemInside.setAttribute("link", link)

        let subMenu = makeSubMenu(itemInside.id)
        itemInside.appendChild(subMenu).className = "grid-item-inside-menu"

        let textDiv = makeText(getDomain(link), itemInside.id)
        itemInside.appendChild(textDiv).className = "grid-item-inside-text"

        if (link !== "") {
            let iconDiv = makeIconTemplate(itemInside.id)
            itemInside.appendChild(iconDiv).className = "grid-item-inside-icon"
        }
    })
    return itemInside
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
