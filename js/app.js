const container = document.getElementById("grid");
let cols = 5
let rows = 3
makeGrid(container, cols, rows);

debug = true

$(document).ready(function(){
    $('.grid-item-inside').click(function () {
        let link = this.getAttribute("link");
        if (link !== "undefined" && link !== "null" && link !== "") {
            //chrome.tabs.create({"url": "https://" + link});
            chrome.tabs.update({active: true, url: link});
            console.log(typeof link + " : " + link)
        }
        else {
            alert("Empty link")
        }
    });
    $('.grid-item-inside-menu-img').click(function (e) {
        e.stopPropagation();
        editBookmark(this.id)
    });
});