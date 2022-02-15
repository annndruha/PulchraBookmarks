function makeSubMenu(id) {
    let subMenu = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', 'images/icons/edit.svg')
    img.id = 'img-' + id
    subMenu.appendChild(img).className = 'grid-item-inside-menu-img'
    return subMenu
}

function makeText(text, id) {
    let text_div = document.createElement('div')
    let textCopy = text
    text = text.split('.')
    if (isNumeric(text[text.length - 1])) {
        text_div.textContent = textCopy
    } else {
        text_div.textContent = textCopy.replace('.' + text[text.length - 1], '')
    }
    text_div.id = 'text-' + id
    return text_div
}

function makeIconTemplate(id) {
    let icon_div = document.createElement('div')
    let icon = document.createElement('img')
    icon.setAttribute('src', 'images/icons/autorenew.svg')
    icon.id = 'icon-' + id
    icon_div.appendChild(icon).className = 'icon'
    return icon_div
}


function fillMark(itemInside) {
    chrome.storage.local.get([itemInside.id], function (result) {
        let link = result[itemInside.id]
        itemInside.setAttribute('link', link)

        let subMenu = makeSubMenu(itemInside.id)
        itemInside.appendChild(subMenu).className = 'grid-item-inside-menu'

        let textDiv = makeText(getDomain(link), itemInside.id)
        itemInside.appendChild(textDiv).className = 'grid-item-inside-text'

        let iconDiv = makeIconTemplate(itemInside.id)
        itemInside.appendChild(iconDiv).className = 'grid-item-inside-icon'
    })
}

function makeMark(id) {
    let item = document.createElement('div')
    let itemInside = document.createElement('div')
    itemInside.id = id
    fillMark(itemInside)
    item.appendChild(itemInside).className = 'grid-item-inside'
    return item
}

function getExistedColsRows(grid) {
    let rows = grid.childElementCount
    let cols = 0
    try {
        cols = grid.children[0].childElementCount
    }
    catch (e){
        cols = 0
    }
    return [rows, cols]
}

function makeGrid(cols, rows) {
        // Remove bottom menu
        if(document.getElementById('pseudo-grid-row')){
            document.getElementById('pseudo-grid-row').remove()
        }

        let grid = document.getElementById('grid')

        // Removing and add rows
        let existedRows = getExistedColsRows(grid)[0]
        if (rows < existedRows){
            for (let r = existedRows-1; r >= rows; r--) {
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
        if (cols < existedCols){
            for (let r = 0; r < rows; r++) {
                for (let c = existedCols-1; c >= cols; c--) {
                    grid.children[r].children[c].remove()
                }
            }
        } else {
            for (let r = 0; r < rows; r++) {
                let item = ''
                let id =''
                for (let c = existedCols; c < cols; c++) {
                    id = r.toString() + c.toString()
                    item = makeMark(id)
                    item.className = 'grid-item'
                    if (r===0){
                        console.log(id)
                    }
                    grid.children[r].appendChild(item)
                }
            }
        }
        addBootomMenu(cols)
}

function beautyfyView() {
    chrome.storage.local.get(['cols'], function (res) {
        let cols = res['cols']
        let app_container = document.getElementById('app-container')
        let style = app_container.currentStyle || window.getComputedStyle(app_container)
        let margin = style.marginRight //parseFloat(
        let windowWidth = app_container.clientWidth - parseFloat(margin)
        const states = [cols * 150, cols * 130, cols * 113, cols * 92]
        let key = 0
        const keys = {
            0: {'pb': '50px', 'pi': '10px'},
            1: {'pb': '10px', 'pi': '10px'},
            2: {'pb': '5px', 'pi': '5px'},
            3: {'pb': '1px', 'pi': '1px'},
            4: {'pb': '0px', 'pi': '1px'}
        }
        if (windowWidth >= states[0]) {
            key = 0
        } else if (states[0] >= windowWidth && windowWidth > states[1]) {
            key = 1
        } else if (states[1] >= windowWidth && windowWidth > states[2]) {
            key = 2
        } else if (states[2] >= windowWidth && windowWidth > states[3]) {
            key = 3
        } else if (states[3] >= windowWidth) {
            key = 4
        }
        $('.app-container').css('padding-right', keys[key]['pb']).css('padding-left', keys[key]['pb'])
        $('.grid-item').css('padding-right', keys[key]['pi']).css('padding-left', keys[key]['pi'])
        $('.pseudo-grid-item').css('padding-right', keys[key]['pi']).css('padding-left', keys[key]['pi'])
    })
}