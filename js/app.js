const container = document.getElementById("grid")
let cols = 5
let rows = 3
makeGrid(container, cols, rows)

debug = true

$(document).ready(function () {
    $('.grid-item-inside').click(function () {
        let link = this.getAttribute("link")
        let openLink = getOpenLink(link)

        if (!(openLink === "")) {
            //chrome.tabs.update({active: true, url: openLink})
            chrome.tabs.create({"url": openLink})
            console.log("User open: " + openLink)
        } else {
            alert("Empty link")
        }
    })
    $('.grid-item-inside-menu-img').click(function (e) {
        e.stopPropagation()
        editBookmark(this.id)
    })
})