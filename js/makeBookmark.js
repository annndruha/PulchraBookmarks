function getName(link){
    if (link !== undefined && link !== "" && link !== null) {
        if (link.includes("://")) {
            let name = link.split("/")
            return name[2].replace("www.", "")
        } else if (link.includes(":\\\\")) {
            let name = link.split("\\")
            return name[2].replace("www.", "")
        } else return undefined;
    }
    else return undefined;
}


function makeMark(c, r) {
    // Create one bookmark
    let itemInside = document.createElement("div");
    itemInside.id = r.toString() + c.toString();
    chrome.storage.local.get([itemInside.id], function (result) {
        let link = result[itemInside.id]

        // SubMenu
        let subMenu = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", "icons/edit_black_24dp.svg")
        img.setAttribute("alt", "Edit")
        img.setAttribute("par-id", itemInside.id)
        subMenu.appendChild(img).className = "grid-item-inside-menu"

        // Bookmark name
        itemInside.setAttribute("link", link)
        itemInside.innerHTML = getName(link) !== undefined ? getName(link) : ""
        itemInside.appendChild(subMenu).className = "grid-item-inside-menu"
    });
    return itemInside
}


$(document).ready(function () {
    $('.grid-item-inside-menu').click(function (e) {
        e.stopPropagation();
        let id = this.getAttribute("par-id")
        let bookmark = document.getElementById(id);
        let link = bookmark.getAttribute("link");
        console.log("Edit id:" + this.id + " with link:" + link)

        let newLink = prompt("Enter new link:", link)
        bookmark.setAttribute("link", newLink)
        bookmark.innerHTML = getName(newLink) !== undefined ? getName(newLink) : ""

        let textId = id.toString()
        chrome.storage.local.set({[textId]: newLink}, function () {
            console.log('storage.local.value with id=' + textId + ' is set to ' + newLink);
        })
    });
});