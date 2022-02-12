function editBookmark(menu_img_id) {
    let id = menu_img_id.replace("img-", "")
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute("link")
    let placeholder = linkDefined(link) ? link : ""

    let newLink = prompt("Enter new link:", placeholder)
    if (newLink === null) {
        return
    }

    bookmark.setAttribute("link", newLink)
    chrome.storage.local.set({[id]: newLink}, function () {})
    document.getElementById("text-" + id).textContent = getDomain(newLink)

    // Remove icon and
    if (document.getElementById("icon-" + id)) {
        document.getElementById("icon-" + id).remove()
    }

    if (newLink !== "") { // If bookmark is not empty
        let iconDiv = makeIconTemplate(id) // Set template
        bookmark.appendChild(iconDiv).className = "grid-item-inside-icon"
        loadIcon(id) // And load real icon
    }
}