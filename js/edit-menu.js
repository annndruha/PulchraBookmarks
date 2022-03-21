function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('icon-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let iconlink = bookmark.getAttribute('icon-link')
    let placeholder = varDefined(link) ? link : ''

    // let newLink = prompt('Enter new link:\n(Erase line to delete)', placeholder)
    createEditPopup(id, placeholder, iconlink)
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

function createEditPopup(id, placeholder, iconlink) {
    $('#edit_popup')
        .css('top','calc(50vh - 95px)')
        .css('left','calc(50vw - 300px)').attr('id-to-edit', id)
    let link_value = document.getElementById("edit-link-text")
    link_value.value = placeholder
    link_value.placeholder = 'Link for this bookmark'

    let bm_value = document.getElementById("edit-bookmark-text")
    bm_value.value = makeText('preview', placeholder).textContent
    bm_value.placeholder = 'Bookmark text'

    let icon_value = document.getElementById("edit-icon-text")
    icon_value.placeholder = 'Automatic icon'
    icon_value.value = ''

    let preview_div = document.getElementById("preview")
    preview_div.setAttribute('link', placeholder)

    if (varDefined(iconlink)){
        preview_div.setAttribute('icon-link', iconlink)
        icon_value.value = iconlink
    }
    else {
        preview_div.setAttribute('icon-link', '')
        icon_value.value = ''
    }
    loadIcon('preview', true)
    $('.app-container').on('click', deleteEditPopup)
}


$('#edit-link-text').on('input', function (e) {
    let bm_value = document.getElementById("edit-bookmark-text")
    bm_value.value = makeText('preview', e.target.value).textContent

    let preview_div = document.getElementById("preview")
    preview_div.setAttribute('link', e.target.value)
    loadIcon('preview', true)
})

$('#edit-icon-text').on('input', function (e) {
    let bm_value = document.getElementById("edit-icon-text")
    let iconlink = bm_value.value
    let preview_div = document.getElementById("preview")
    if (varDefined(iconlink)){
        preview_div.setAttribute('icon-link', iconlink)
    }
    else {
        preview_div.setAttribute('icon-link', '')
    }
    loadIcon('preview', true)
})

function saveEdit(e){
    let edit_popup = document.getElementById('edit_popup')
    let id = edit_popup.getAttribute('id-to-edit')
    let bookmark = document.getElementById(id)

    let link_value = document.getElementById("edit-link-text")
    let newLink = link_value.value
    if (!varDefined(newLink)){
        deleteMark(id)
        return
    }

    let icon_value = document.getElementById("edit-icon-text")
    let newIconLink = icon_value.value

    let bm_value = document.getElementById("edit-bookmark-text")
    let newText = bm_value.value

    let value_to_save = {0: {"link": newLink}}
    bookmark.setAttribute('link', newLink)
    if (varDefined(newIconLink))
    {
        bookmark.setAttribute('icon-link', newIconLink)
        value_to_save[0]["icon-link"] = newIconLink
    }
    else {
        bookmark.removeAttribute('icon-link')
    }
    // if (newText !== makeText('preview', newLink).textContent)
    // {
    value_to_save[0]["title"] = newText
    chrome.storage.local.set({[id]: value_to_save}, () => {
        chrome.storage.local.get([id], function (res) {
            console.log(res[id])
        })
    })

    loadIcon(id, true)
    recreateMark(bookmark)
    deleteEditPopup()
}

$('#edit-save-button').on('click', function (e) {
    saveEdit(e)
})

$('#close-edit-button').on('click', function (e) {
    deleteEditPopup()
})