function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('img-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let placeholder = varDefined(link) ? link : ''

    // let newLink = prompt('Enter new link:\n(Erase line to delete)', placeholder)
    createEditPopup(id, placeholder)
    // if (newLink === null) {return}
    // if (newLink === ''){
    //     deleteMark(id)
    //     return
    // }
    // bookmark.setAttribute('link', newLink)

    // let newIconLink = prompt('Enter link for icon:\n(Erase line to delete)', '')
    // console.log(newIconLink)
    // if (newIconLink === null) {return}
    // if (varDefined(newIconLink))
    // {
    //     bookmark.setAttribute('icon-link', newIconLink)
    //     chrome.storage.local.set({[id]: {0: {"link": newLink, "icon-link": newIconLink}}}, () => {})
    // }

    // chrome.storage.local.set({[id]: {0: {'link': newLink}}}, () => {})
    // loadIcon(id, true)
    // recreateMark(bookmark)
}


function deleteEditPopup() {
    $('#edit_popup')
        .css('top','-500px')
        .css('left','-500px')
}

function createEditPopup(id, placeholder) {
    $('#edit_popup')
        .css('top','calc(50vh - 125px)')
        .css('left','calc(50vw - 300px)')

    $('#edit-link-text').attr('value', placeholder)

    let text_to_show = makeText(placeholder)
    $('#edit-bookmark-text').attr('value', text_to_show.textContent)
    $('#preview').attr('link', placeholder)
    autoIcon('preview', true)
    $('.app-container').on('click', deleteEditPopup)
}


$('#edit-link-text').on('input', function (e) {
    let text_to_show = makeText(e.target.value)
    $('#edit-bookmark-text').attr('value', text_to_show.textContent)

    $('#preview').attr('link', e.target.value)
    autoIcon('preview', true)
    $('#icon-preview').attr('src', '')
})

function saveEdit(){

}

$('#close-edit-button').on('click', function (e) {
    deleteEditPopup()
})