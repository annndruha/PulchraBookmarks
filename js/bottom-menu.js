function addBootomMenu(parent, cols, rows) {
    let gridRow = document.createElement("div")
    for (let c = 0; c < cols; c++) {
        let item = document.createElement("div")
        let itemInside = document.createElement("div")
        if (c === 0) {
            itemInside.id = "bottom-left"
            item.appendChild(itemInside).className = "pseudo-grid-item-inside"
        } else if (c === cols - 1) {
            itemInside.id = "bottom-right"
            item.appendChild(itemInside).className = "pseudo-grid-item-inside"
        } else {
            // itemInside.id = "bottom-disable"
            item.appendChild(itemInside).className = "pseudo-grid-item-inside bottom-disable"
        }

        gridRow.appendChild(item).className = "pseudo-grid-item"
    }
    parent.appendChild(gridRow).className = "pseudo-grid-row"
    makeBottonMenuLeft()
    makeSettingsButton()
}

function makeBottonMenuLeft() {
    let bottom_menu = document.createElement("div")

    let span_downloads = document.createElement("span")
    span_downloads.id = "chrome-downloads"
    span_downloads.textContent = "Downloads"
    bottom_menu.appendChild(span_downloads).className = "bm-item left"

    let span_bookmarks = document.createElement("span")
    span_bookmarks.id = "chrome-bookmarks"
    span_bookmarks.textContent = "Bookmarks"
    bottom_menu.appendChild(span_bookmarks).className = "bm-item left"

    let span_history = document.createElement("span")
    span_history.id = "chrome-history"
    span_history.textContent = "History"
    bottom_menu.appendChild(span_history).className = "bm-item left"

    let span_settings = document.createElement("span")
    span_settings.id = "chrome-settings"
    span_settings.textContent = "Settings"
    bottom_menu.appendChild(span_settings).className = "bm-item left"

    let left_container = document.getElementById("bottom-left")
    left_container.appendChild(bottom_menu).className = "bottom-menu-left"
}

function makeSettingsButton() {
    let left_container = document.getElementById("bottom-right")
    let bottom_menu = document.createElement("div")
    let settings = document.createElement("img")
    settings.id = "settings-open-button"
    settings.src = "images/icons/settings.svg"
    bottom_menu.appendChild(settings).className = "bm-item right"
    left_container.appendChild(bottom_menu).className = "bottom-menu-right"
}

$(window).on("load", function () {
    $('#chrome-downloads').click(function () {
        chrome.tabs.create({"url": "chrome://downloads/"})
    })
    $('#chrome-bookmarks').click(function () {
        chrome.tabs.create({"url": "chrome://bookmarks/"})
    })
    $('#chrome-history').click(function () {
        chrome.tabs.create({"url": "chrome://history/"})
    })
    $('#chrome-settings').click(function () {
        chrome.tabs.create({"url": "chrome://settings/"})
    })
    $('#settings-open-button').click(function (e) {
        e.stopPropagation()
        openSettings()
        console.log("Open Settings")
    })
    $('#close-settings-button').click(function (e) {
        e.stopPropagation()
        closeSettings()
        console.log("Close Settings")
    })
    openSettings()
})