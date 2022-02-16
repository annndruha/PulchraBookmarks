function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('img-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let placeholder = linkDefined(link) ? link : ''

    let newLink = prompt('Enter new link:', placeholder)
    if (newLink === null) {
        return
    }

    bookmark.setAttribute('link', newLink)
    chrome.storage.local.set({[id]: newLink}, function () {
    })

    fillMark(bookmark)
    loadIcon(id)
}