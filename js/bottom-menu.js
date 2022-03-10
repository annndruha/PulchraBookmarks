function updateBottomMenuBinds() {
    $('#chrome-downloads').off('click').on('click', () => {openLink('chrome://downloads/')})
    $('#chrome-bookmarks').off('click').on('click', () => {openLink('chrome://bookmarks/')})
    $('#chrome-history').off('click').on('click', () => {openLink('chrome://history/')})
    $('#chrome-settings').off('click').on('click', () => {openLink('chrome://settings/')})
    $('#settings-open-button').off('click').on('click', () => {openSettings()})
}

function addBootomMenu(cols) {
    let grid = document.getElementById('grid')
    let grid_row = document.createElement('div')
    let item = document.createElement('div')
    item.id = 'grid-item-settings'
    chrome.storage.local.get(['show-quick'], function (res) {
        if (res['show-quick']) {
            item = makeBottonMenuLeft(item)
        }
        grid_row.id = 'grid-row'
        grid_row.appendChild(item).className = 'grid-item'
        grid_row.id = 'row-settings'
        grid.appendChild(grid_row).className = 'grid-row'
        $('#grid-item-settings').css("width", (220 * cols - 20).toString() + "px")
        updateBottomMenuBinds()
    })
}

function makeBottonMenuLeft(parent) {
    let bottom_menu = document.createElement('div')

    let span_downloads = document.createElement('span')
    span_downloads.id = 'chrome-downloads'
    span_downloads.textContent = 'Downloads'
    bottom_menu.appendChild(span_downloads).className = 'bm-item left'

    let span_bookmarks = document.createElement('span')
    span_bookmarks.id = 'chrome-bookmarks'
    span_bookmarks.textContent = 'Bookmarks'
    bottom_menu.appendChild(span_bookmarks).className = 'bm-item left'

    let span_history = document.createElement('span')
    span_history.id = 'chrome-history'
    span_history.textContent = 'History'
    bottom_menu.appendChild(span_history).className = 'bm-item left'

    let span_settings = document.createElement('span')
    span_settings.id = 'chrome-settings'
    span_settings.textContent = 'Settings'
    bottom_menu.appendChild(span_settings).className = 'bm-item left'
    parent.appendChild(bottom_menu).className = 'bottom-menu-left'
    return parent
}

function deleteBottomMenu() {
    if (document.getElementById('row-settings')) {
        document.getElementById('row-settings').remove()
    }
}

function updateBottomMenu(cols) {
    deleteBottomMenu()
    addBootomMenu(cols)
}
