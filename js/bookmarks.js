function getName(link){
    if (link !== "undefined" && link !== "null" && link !== null && link !== undefined) { // && link !== ""
        if (link.includes("://")) {
            let name = link.split("/")
            return name[2].replace("www.", "")
        } else if (link.includes(":\\\\")) {
            let name = link.split("\\")
            return name[2].replace("www.", "")
        } else return link;
    }
    else return "";
}

function makeSubMenu(id){
    let subMenu = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "images/icons/edit_black_24dp.svg")
    //img.setAttribute("edit-id", "edit-"+id)
    img.id = "img-"+id
    subMenu.appendChild(img).className = "grid-item-inside-menu-img"
    return subMenu
}

function makeTextDiv(text, id){
    let text_div = document.createElement("div");
    // text_div.setAttribute("text-id", "text-"+id)
    text_div.textContent = text
    text_div.id = "text-"+id
    return text_div
}

function makeMark(c, r) {
    // Create one bookmark
    let itemInside = document.createElement("div");
    itemInside.id = r.toString() + c.toString();
    chrome.storage.local.get([itemInside.id], function (result) {
        let link = result[itemInside.id]

        // SubMenu
        let subMenu = makeSubMenu(itemInside.id)

        // Bookmark name
        itemInside.setAttribute("link", link)
        textDiv = makeTextDiv(getName(link), itemInside.id)

        itemInside.appendChild(subMenu).className = "grid-item-inside-menu"
        itemInside.appendChild(textDiv).className = "grid-item-inside-text"
    });
    return itemInside
}


function editBookmark(editId){
    let bmId = editId.replace("img-", "")
    let bookmark = document.getElementById(bmId);
    let link = bookmark.getAttribute("link");
    console.log("Edit id:" + editId + " with link:" + link)

    let newLink = prompt("Enter new link:", link)
    bookmark.setAttribute("link", newLink)

    document.getElementById("text-"+bmId).textContent = getName(newLink)

    chrome.storage.local.set({[bmId]: newLink}, function () {
        console.log('storage.local.value with id=' + bmId + ' is set to ' + newLink);
    })
}


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