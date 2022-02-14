makeGrid()
beautyfyView()
function pasteSettingsValues(){
    chrome.storage.local.get(["cols"], function (result) {
        document.getElementById("cols").innerText = result["cols"]
    })
    chrome.storage.local.get(["rows"], function (result) {
        document.getElementById("rows").innerText = result["rows"]
    })
}

$(window).on("load change", function () {
    $('.grid-item-inside').click(function () {
        let link = this.getAttribute("link")
        let openLink = getOpenLink(link)

        if (!(openLink === "")) {
            chrome.tabs.update({active: true, url: openLink})
            //chrome.tabs.create({"url": openLink})
            console.log("User open: " + openLink)
        } else {
            alert("Empty link")
        }
    })
    $('.grid-item-inside-menu-img').click(function (e) {
        e.stopPropagation()
        editBookmark(this.id)
    })
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
    pasteSettingsValues()
    loadAllIcons()
})

$(window).on("resize", function (event){
    beautyfyView()
})
