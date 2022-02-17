function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('img-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let placeholder = varDefined(link) ? link : ''

    let newLink = prompt('Enter new link:\n(Erase line to delete)', placeholder)
    if (newLink === null) {
        return
    }

    bookmark.setAttribute('link', newLink)
    chrome.storage.local.set({[id]: {0: {"link": newLink}}}, () => {})

    fillMark(bookmark)
    updateBinds()
    loadIcon(id)
}