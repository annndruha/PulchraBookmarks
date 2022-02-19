function makeSubMenu(id) {
    let subMenu = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', 'images/icons/edit.svg')
    img.id = 'img-' + id
    subMenu.appendChild(img).className = 'grid-item-inside-menu-img'
    return subMenu
}

function makeAddBookmark(id){
    let subMenu = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', 'images/icons/add_circle_outline.svg')
    img.id = 'img-' + id
    subMenu.appendChild(img).className = 'grid-item-inside-add-img'
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
    itemInside.innerHTML = ''
    chrome.storage.local.get([itemInside.id], function (res) {
        try{
            let link = res[itemInside.id][0]["link"]
            itemInside.setAttribute('link', link)

            let textDiv = makeText(getDomain(link), itemInside.id)
            itemInside.appendChild(textDiv).className = 'grid-item-inside-text'

            let iconDiv = makeIconTemplate(itemInside.id)
            itemInside.appendChild(iconDiv).className = 'grid-item-inside-icon'

            let subMenu = makeSubMenu(itemInside.id)
            itemInside.appendChild(subMenu).className = 'grid-item-inside-menu'
            $('#img-'+itemInside.id).off('click').on('click', function (e) {
                e.stopPropagation()
                editBookmark(this.id)
            })
            $('#'+itemInside.id).off('click').on('click', function (e) {
                e.stopPropagation()
                let link = this.getAttribute('link')
                let open_link = getOpenLink(link)
                openLink(open_link)
            })
            itemInside.className = 'grid-item-inside'
        }
        catch (e) {
            let iconDiv = makeAddBookmark(itemInside.id)
            itemInside.setAttribute('link', "")
            itemInside.appendChild(iconDiv).className = 'grid-item-inside-add'
            // $('#'+itemInside.id).css("background-color", "transparent")
            $('#'+itemInside.id).off('click').on('click', function (e) {
                e.stopPropagation()
                editBookmark(this.id)
            }).css("background-color", "transparent")
            itemInside.className = 'grid-item-inside empty-icon'
        }
    })


}

function makeMark(id) {
    let item = document.createElement('div')
    let itemInside = document.createElement('div')
    itemInside.id = id
    fillMark(itemInside)
    item.appendChild(itemInside)
    return item
}

function getExistedColsRows(grid) {
    let rows = grid.childElementCount
    try {
        let cols = grid.children[0].childElementCount
        return [rows, cols]
    }
    catch (e){
        let cols = 0
        return [rows, cols]
    }
}

function makeGrid(cols, rows, fromfile=false) {
        // Переписать логику
        // Сейчас строка/столбец добавляется как только готова вся
        // Нужно сначала создать сетку нужного размера
        // А потом асинхронно добавлять туда детей (заполнять закладки)
        //
        // console.log('MakeGrid')

        // Remove bottom menu
        deleteBottomMenu()
        let grid = document.getElementById('grid')

        if (fromfile){
            let Rows = getExistedColsRows(grid)[0]
            console.log("Rows", Rows)
            for (let r = Rows-1; r >= 0; r--) {
                grid.children[r].remove()
                console.log("Remove row:", r)
            }
        }

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
        // console.log("existedCols", existedCols)
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
                    console.log("Create mark:", id)
                    item = makeMark(id)
                    item.className = 'grid-item'
                    grid.children[r].appendChild(item)
                }
            }
        }

        beautyfyView()
        addBootomMenu(cols)
        loadAllIcons()
}

function beautyfyView() {
    chrome.storage.local.get(['cols', 'rows'], function (res) {
        let cols = res['cols']
        let app_container = document.getElementById('app-container')
        let style = app_container.currentStyle || window.getComputedStyle(app_container)
        let margin = style.marginRight
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