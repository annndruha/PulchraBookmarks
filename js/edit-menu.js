function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('img-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let placeholder = varDefined(link) ? link : ''

    let newLink = prompt('Enter new link:\n(Erase line to delete)', placeholder)
    if (newLink === null) {return}
    if (newLink === ''){
        deleteMark(id)
        return
    }
    bookmark.setAttribute('link', newLink)

    // let newIconLink = prompt('Enter link for icon:\n(Erase line to delete)', '')
    // console.log(newIconLink)
    // if (newIconLink === null) {return}
    // if (varDefined(newIconLink))
    // {
    //     bookmark.setAttribute('icon-link', newIconLink)
    //     chrome.storage.local.set({[id]: {0: {"link": newLink, "icon-link": newIconLink}}}, () => {})
    // }
    chrome.storage.local.set({[id]: {0: {'link': newLink}}}, () => {})
    recreateMark(bookmark)
    loadIcon(id)
}