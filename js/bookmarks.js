function makeAddBookmark(id) {
    let subMenu = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('draggable', 'false')
    img.setAttribute('src', 'images/icons/add_circle_outline.svg')
    img.id = 'icon-' + id
    subMenu.appendChild(img).className = 'grid-item-inside-add-img'
    return subMenu
}

function makeText(id, link, title = '') {
    let text_div = document.createElement('div')
    text_div.textContent = (varDefined(title)) ? title : textFromLink(link)
    text_div.id = 'text-' + id
    return text_div
}

function makeKeyBindText(id) {
    let text_div = document.createElement('div')
    if (varDefined(getKeyByValue(keybinds, '#' + id))) {
        text_div.textContent = getKeyByValue(keybinds, '#' + id)
    }
    return text_div
}

function makeIconTemplate(itemInside) {
    let id = itemInside.id
    let icon_div = document.createElement('div')
    let icon = document.createElement('img')
    icon.setAttribute('draggable', 'false')
    if (itemInside.hasAttribute('cache-icon')) {
        if (varDefined(itemInside.getAttribute('cache-icon'))) {
            icon.setAttribute('src', itemInside.getAttribute('cache-icon'))
        } else {
            icon.setAttribute('src', 'images/icons/autorenew.svg')
        }
    } else if (itemInside.hasAttribute('icon-link')) {
        if (varDefined(itemInside.getAttribute('icon-link'))) {
            icon.setAttribute('src', itemInside.getAttribute('icon-link'))
        } else {
            icon.setAttribute('src', 'images/icons/autorenew.svg')
        }
    } else {
        icon.setAttribute('src', 'images/icons/autorenew.svg')
    }
    icon.id = 'icon-' + id
    icon_div.appendChild(icon).className = 'icon'
    return icon_div
}

function createTemplate(itemInside) {
    let iconDiv = makeAddBookmark(itemInside.id)
    itemInside.setAttribute('link', '')
    itemInside.appendChild(iconDiv).className = 'grid-item-inside-add empty-icon'
    $('#' + itemInside.id).off('click').on('click', function (e) {
        e.stopPropagation()
        editBookmark(this.id)
    })
    itemInside.className = 'grid-item-inside empty-icon-bm empty-icon'
}

function createMark(itemInside, link, title) {
    itemInside.setAttribute('link', link)

    let iconDiv = makeIconTemplate(itemInside)
    itemInside.appendChild(iconDiv).className = 'grid-item-inside-icon'

    let textDiv = makeText(itemInside.id, link, title)
    itemInside.appendChild(textDiv).className = 'grid-item-inside-text'

    let keyDiv = makeKeyBindText(itemInside.id)
    itemInside.appendChild(keyDiv).className = 'grid-item-inside-key'

    $('#' + itemInside.id).off('click').on('click', function (e) {
        e.stopPropagation()
        let link = this.getAttribute('link')
        let open_link = getOpenLink(link)
        openLink(open_link)
    })
    itemInside.className = 'grid-item-inside'
}

function recreateMark(itemInside) {
    itemInside.innerHTML = ''
    chrome.storage.local.get([itemInside.id], function (res) {
        try {
            let link = res[itemInside.id][0]['link']
            let title = res[itemInside.id][0]['title']
            let iconLink = res[itemInside.id][0]['icon-link']
            let cachedIcon = res[itemInside.id][0]['cache-icon']
            if (varDefined(iconLink)) {
                itemInside.setAttribute('icon-link', iconLink)
            } else {
                itemInside.removeAttribute('icon-link')
            }
            if (varDefined(cachedIcon)) {
                itemInside.setAttribute('cache-icon', cachedIcon)
            } else {
                itemInside.removeAttribute('cache-icon')
            }
            if (varDefined(link)) {
                createMark(itemInside, link, title)
            } else {
                createTemplate(itemInside)
            }
        } catch (e) {
            if (e instanceof TypeError) {
                createTemplate(itemInside)
            } else {
                console.log(e)
            }
        }
    })
}

function makeMark(id) {
    let item = document.createElement('div')
    let itemInside = document.createElement('div')
    itemInside.id = id
    recreateMark(itemInside)
    item.appendChild(itemInside)
    return item
}

function deleteMark(id) {
    chrome.storage.local.set({[id]: {0: {'link': ''}}}, () => {
        let bookmark = document.getElementById(id)
        recreateMark(bookmark)
    })
}

function getExistedColsRows(grid) {
    let rows = grid.childElementCount
    try {
        let cols = grid.children[0].childElementCount
        return [rows, cols]
    } catch (e) {
        if (e instanceof TypeError) {
            let cols = 0
            return [rows, cols]
        } else {
            console.log(e)
        }
    }
}

function makeGrid(cols, rows, fromfile = false) {
    // Remove bottom menu
    deleteBottomMenu()
    let grid = document.getElementById('grid')

    if (fromfile) {
        let Rows = getExistedColsRows(grid)[0]
        for (let r = Rows - 1; r >= 0; r--) {
            grid.children[r].remove()
        }
    }

    // Removing and add rows
    let existedRows = getExistedColsRows(grid)[0]
    if (rows < existedRows) {
        for (let r = existedRows - 1; r >= rows; r--) {
            grid.children[r].remove()
        }
    } else {
        for (let r = existedRows; r < rows; r++) {
            let gridRow = document.createElement('div')
            for (let c = 0; c < cols; c++) {
                let id = r.toString() + c.toString()
                let item = makeMark(id)
                gridRow.appendChild(item).className = 'grid-item'
            }
            grid.appendChild(gridRow).className = 'grid-row'
        }
    }
    // Removing and add cols
    let existedCols = getExistedColsRows(grid)[1]
    if (cols < existedCols) {
        for (let r = 0; r < rows; r++) {
            for (let c = existedCols - 1; c >= cols; c--) {
                grid.children[r].children[c].remove()
            }
        }
    } else {
        for (let r = 0; r < rows; r++) {
            let item = ''
            let id = ''
            for (let c = existedCols; c < cols; c++) {
                id = r.toString() + c.toString()
                item = makeMark(id)
                item.className = 'grid-item'
                grid.children[r].appendChild(item)
            }
        }
    }

    updateBottomMenu(cols)
    updateHeaderMenu()
    gridItemRightClick()
    initKeybinds()
}