function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('icon-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let iconlink = bookmark.getAttribute('icon-link')
    let placeholder = varDefined(link) ? link : ''
    createEditPopup(id, placeholder, iconlink)
    $('#edit_popup')
        .css('top','calc(50vh - 95px)')
        .css('left','calc(50vw - 300px)').attr('id-to-edit', id)
    $('.close-edit').css('display', 'block').on('click', function () {
        deleteEditPopup()
    })
}


function deleteEditPopup() {
    $('#edit_popup')
        .css('top','-500px')
        .css('left','-500px')
    $('.close-edit').css('display', 'none')
}

function updateIconPreview(){
    // // iconlink, currentlink
    // let currentlink = document.getElementById("edit-link-text").value
    // let iconlink = document.getElementById("edit-icon-text").value
    //
    //
    // let preview_div = document.getElementById("preview")
    // preview_div.setAttribute('link', currentlink)
    // let icon_value = document.getElementById("edit-icon-text")
    // icon_value.placeholder = 'Automatic icon'
    // if (varDefined(iconlink)){
    //     preview_div.setAttribute('icon-link', iconlink)
    //     icon_value.value = iconlink
    // }
    // else {
    //     preview_div.setAttribute('icon-link', '')
    //     icon_value.value = ''
    // }
    // loadIcon('preview', true)
}

function createEditPopup(id, placeholder, iconlink) {
    // Link for bookmark
    let link_value = document.getElementById("edit-link-text")
    link_value.value = placeholder
    link_value.placeholder = 'Link for this bookmark'

    // Title
    let bm_value = document.getElementById("edit-bookmark-text")
    chrome.storage.local.get([id], function (res) {
        bm_value.value = (varDefined(res[id][0]['title'])) ? res[id][0]['title'] : textFromLink(placeholder)
    })
    bm_value.placeholder = 'Bookmark text'

    // Text-link to icon
    let icon_value = document.getElementById("edit-icon-text")
    icon_value.placeholder = 'Automatic icon'
    icon_value.value = (varDefined(iconlink)) ? iconlink : ''

    // Icon itself
    let preview_div = document.getElementById("preview")
    preview_div.setAttribute('link', placeholder)
    preview_div.setAttribute('icon-link', (varDefined(iconlink)) ? iconlink : '')
    loadIcon('preview', true)

    $('.app-container').on('click', deleteEditPopup)
}


$('#edit-link-text').on('input', function (e) {
    let bm_value = document.getElementById("edit-bookmark-text")
    bm_value.value = textFromLink(e.target.value)
    updateIconPreview('', e.target.value)
})

$('#edit-icon-text').on('input', function () {
    // let bm_value = document.getElementById("edit-icon-text")
    // let iconlink = bm_value.value
    // let preview_div = document.getElementById("preview")
    // if (varDefined(iconlink)){
    //     preview_div.setAttribute('icon-link', iconlink)
    // }
    // else {
    //     preview_div.setAttribute('icon-link', '')
    // }
    // loadIcon('preview', true)
})

function saveEdit(){
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

    let storage_value = {0: {"link": newLink}}
    bookmark.setAttribute('link', newLink)
    if (varDefined(newIconLink))
    {
        bookmark.setAttribute('icon-link', newIconLink)
        storage_value[0]["icon-link"] = newIconLink
    }
    else {
        bookmark.removeAttribute('icon-link')
    }
    if (newText !== textFromLink(newLink)) {
        storage_value[0]["title"] = newText
    }
    chrome.storage.local.set({[id]: storage_value}, () => {})
    loadIcon(id, true)
    recreateMark(bookmark)
    deleteEditPopup()
}

$('#edit-save-button').on('click', function (e) {
    saveEdit(e)
})

$('#close-edit-button').on('click', function () {
    deleteEditPopup()
})