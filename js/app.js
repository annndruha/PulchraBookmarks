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

$(window).on("load", function () {
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
    pasteSettingsValues()
    loadAllIcons()
})

$(window).on("resize", function (event){
    beautyfyView()
})
