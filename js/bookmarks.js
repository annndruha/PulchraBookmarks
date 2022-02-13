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
    if (isNumeric(text[text.length - 1])) {
        text_div.textContent = textCopy
    } else {
        text_div.textContent = textCopy.replace("." + text[text.length - 1], "")
    }
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
    addBootomMenu(parent, cols, rows)
}

function beautyfyView(cols, rows) {
    let windowHeight = $(document).height();
    let windowWidth = $(document).width();
    const states = [cols * 130, cols * 113, cols * 92, cols * 40]
    let key = 0
    const keys = {
        0: {"pb": "50px", "pi": "10px"},
        1: {"pb": "10px", "pi": "10px"},
        2: {"pb": "5px", "pi": "5px"},
        3: {"pb": "1px", "pi": "1px"},
        4: {"pb": "0px", "pi": "1px"}
    }
    if (windowWidth >= states[0]) {key = 0}
    else if (states[0] >= windowWidth && windowWidth > states[1]) {key = 1}
    else if (states[1] >= windowWidth && windowWidth > states[2]) {key = 2}
    else if (states[2] >= windowWidth && windowWidth > states[3]) {key = 3}
    else if (states[3] >= windowWidth) {key = 4}
    document.body.style.paddingRight = keys[key]["pb"]
    document.body.style.paddingLeft = keys[key]["pb"]
    $(".grid-item").css("padding-right", keys[key]["pi"]).css("padding-left", keys[key]["pi"])
    $(".pseudo-grid-item").css("padding-right", keys[key]["pi"]).css("padding-left", keys[key]["pi"])
}