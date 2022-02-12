function editBookmark(editId) {
    let bmId = editId.replace("img-", "")
    let bookmark = document.getElementById(bmId)
    let link = bookmark.getAttribute("link")
    let placeholder = linkDefined(link) ? link : ""

    console.log("Edit id: " + editId + " with stored link:" + link)
    let newLink = prompt("Enter new link:", placeholder)
    if (newLink === null) {
        return
    }

    bookmark.setAttribute("link", newLink)
    chrome.storage.local.set({[bmId]: newLink}, function () {
    })

    if (document.getElementById("icon-" + bmId)) {
        document.getElementById("icon-" + bmId).remove()
    }
    document.getElementById("text-" + bmId).textContent = getDomain(newLink)

    if (iconDefined(newLink)) {
        let iconDiv = makeIcon(newLink, bmId)
        bookmark.appendChild(iconDiv).className = "grid-item-inside-icon"
    }
}