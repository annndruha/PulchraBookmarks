function makeMark(c, r) {
    // Big bookmark
    let itemInside = document.createElement("div");
    itemInside.id = r.toString() + c.toString();
    console.log(itemInside.id)
    let wtf = itemInside.id.toString()
    chrome.storage.local.get([wtf], function(result) {
        console.log('Value currently is ' + result[wtf]); // 6
        let link = result[wtf]

        // SubMenu
        let subMenu = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", "icons/build_black_24dp.svg")
        img.setAttribute("alt", "Edit")
        img.setAttribute("par-id", itemInside.id)

        subMenu.appendChild(img).className = "grid-item-inside-menu"

        // Bookmark
        itemInside.setAttribute("link", link)
        if (link !== undefined){
            itemInside.innerHTML = link.replace("https://", "").replace("http://", "")
        }
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

        // var myName = prompt("Name Here:","")
        let newLink = prompt("Enter new link:", link).replace("https://", "").replace("http://", "")
        bookmark.setAttribute("link", newLink)
        bookmark.innerHTML = newLink.replace("https://", "").replace("http://", "")

        let textId = id.toString()
        chrome.storage.local.set({[textId]: newLink}, function () {
            console.log('storage.local.value with id='+ textId + ' is set to ' + newLink);
        })
    });
});