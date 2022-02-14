chrome.storage.local.get(["cols", "rows"], function (res) {
    makeGrid(parseInt(res["cols"]), parseInt(res["rows"]))
})
// chrome.storage.sync.get(null, function(res) {
//     // let allKeys = Object.keys(items);
//     console.log(res);
// });

beautyfyView()

function pasteSettingsValues() {
    chrome.storage.local.get(["cols"], function (result) {
        document.getElementById("cols").innerText = result["cols"]
    })
    chrome.storage.local.get(["rows"], function (result) {
        document.getElementById("rows").innerText = result["rows"]
    })
}

$(window).on("load change", function () {
    $('.grid-item-inside').on("click", function () {
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
    $('.grid-item-inside-menu-img').on("click", function (e) {
        e.stopPropagation()
        editBookmark(this.id)
    })
    $('#chrome-downloads').on("click", function () {
        chrome.tabs.create({"url": "chrome://downloads/"})
    })
    $('#chrome-bookmarks').on("click", function () {
        chrome.tabs.create({"url": "chrome://bookmarks/"})
    })
    $('#chrome-history').on("click", function () {
        chrome.tabs.create({"url": "chrome://history/"})
    })
    $('#chrome-settings').on("click", function () {
        chrome.tabs.create({"url": "chrome://settings/"})
    })
    $('#settings-open-button').on("click", function (e) {
        e.stopPropagation()
        openSettings()
        console.log("Open Settings")
    })
    $('#close-settings-button').on("click", function (e) {
        e.stopPropagation()
        closeSettings()
        console.log("Close Settings")
    })
    pasteSettingsValues()
    loadAllIcons()
    openSettings()
})

$(window).on("resize", function () {
    beautyfyView()
})

$(".settings").on("transitionend", function (){
    beautyfyView()
})
