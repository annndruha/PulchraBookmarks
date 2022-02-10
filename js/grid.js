function makeGrid(parent, cols, rows) {
    for (let r = 0; r < rows; r++) {
        let gridRow = document.createElement("div");
        for (let c = 0; c < cols; c++) {
            let item = document.createElement("div");
            let itemInside = makeMark(r, c)
            item.appendChild(itemInside).className = "grid-item-inside"
            gridRow.appendChild(item).className = "grid-item"
        }
        parent.appendChild(gridRow).className = "grid-row"
    }
}

const container = document.getElementById("grid");
let cols = 5
let rows = 5
makeGrid(container, cols, rows);

$(document).ready(function(){
    $('.grid-item-inside').click(function () {
        let link = this.getAttribute("link");
        chrome.tabs.create({"url": "https://" + link});
        // chrome.tabs.update({active: true, url: link});
        console.log("Open:" + link)
    });
});