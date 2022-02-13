const container = document.getElementById("grid")
let cols = 10
let rows = 10
makeGrid(container, cols, rows)
beautyfyView(cols, rows)

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
    loadAllIcons(cols, rows)
})

window.onresize = function(event) {
    beautyfyView(cols, rows)
};
