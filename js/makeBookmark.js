function makeMark(c,r){
    // Big bookmark
    let itemInside = document.createElement("div");
    itemInside.id = r.toString() + c.toString();

    // SubMenu
    let subMenu = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "icons/build_black_24dp.svg")
    img.setAttribute("alt", "Edit")
    img.setAttribute("par-id", itemInside.id)

    // img.setAttribute("link", "https://vk.com/im?sel=c" + itemInside.id)
    subMenu.appendChild(img).className = "grid-item-inside-menu"

    // Bookmark
    itemInside.setAttribute("link", "")
    itemInside.appendChild(subMenu).className = "grid-item-inside-menu"
    return itemInside
}



$(document).ready(function(){
$('.grid-item-inside-menu').click(function (e) {
    e.stopPropagation();
    let id = this.getAttribute("par-id")
    bookmark = document.getElementById(id);
    let link = bookmark.getAttribute("link");

    console.log("Edit id:" + this.id + " with link:"+ link)

    // var myName = prompt("Name Here:","")
    let newLink = prompt("Enter new link:",link)

    bookmark.setAttribute("link", newLink)
    bookmark.innerHTML = newLink.toString().replace("https://", "").replace("http://", "")
    console.log("End edit id:" + this.id + " with new link:"+ newLink)
});
});