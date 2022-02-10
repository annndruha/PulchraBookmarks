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
makeGrid(container, 3, 4);

function makeMark(c,r){
    let itemInside = document.createElement("div");
    itemInside.innerText = r.toString() + c.toString();
    console.log(itemInside.innerText)
    return itemInside
}


//value = 5;
//chrome.storage.local.set({key: value}, function() {
//  console.log('Value is set to ' + value);
//});
//chrome.storage.local.get(['key'], function(result) {
//  console.log('Value currently is ' + result.key);
//});