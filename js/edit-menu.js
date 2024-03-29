function editBookmark(menu_img_id) {
    let id = menu_img_id.replace('icon-', '')
    let bookmark = document.getElementById(id)
    let link = bookmark.getAttribute('link')
    let icon_link = bookmark.getAttribute('icon-link')
    let placeholder = varDefined(link) ? link : ''
    createEditPopup(id, placeholder, icon_link)

    $('#edit_popup')
        .css('top', 'calc(50vh - 95px)')
        .css('left', 'calc(50vw - 300px)').attr('id-to-edit', id)
        .attr('data-status', 'opened')
    $('.close-edit').css('display', 'block').on('click', function () {
        deleteEditPopup()
    })
}

function deleteEditPopup() {
    let shortcut_value = document.getElementById("key-preview")
    shortcut_value.textContent = ''
    let link_value = document.getElementById("edit-link-text")
    link_value.value = ''
    let bm_value = document.getElementById("edit-bookmark-text")
    bm_value.value = ''
    let icon_value = document.getElementById("edit-icon-text")
    icon_value.value = ''
    $('#edit_popup')
        .css('top', '-500px')
        .css('left', '-500px')
        .attr('data-status', 'closed')
    $('.close-edit').css('display', 'none')
}

function updateIconPreview() {
    let link_value = document.getElementById("edit-link-text").value
    let icon_link = document.getElementById("edit-icon-text").value
    let preview_div = document.getElementById("preview")
    preview_div.setAttribute('link', link_value)
    if (varDefined(link_value) && varDefined(icon_link)){
        preview_div.setAttribute('icon-link', icon_link)
        loadIcon('preview', clear_cache=true)
    }
    else if (varDefined(link_value) && !varDefined(icon_link)){
        preview_div.removeAttribute('icon-link')
        loadIcon('preview', clear_cache=true)
    }
    else {
        setIcon('preview', 'images/icons/help.svg')
    }
}

function createEditPopup(id, placeholder, icon_link) {
    // Keyboard shortcut
    if (varDefined(getKeyByValue(keybinds, '#'+id))){
        let shortcut_value = document.getElementById("key-preview")
        shortcut_value.textContent = "Keyboard shortcut: '" + getKeyByValue(keybinds, '#'+id) +"'"
    }

    // Link for bookmark
    let link_value = document.getElementById("edit-link-text")
    link_value.value = placeholder
    link_value.placeholder = 'Link for this bookmark'

    // Title
    let bm_value = document.getElementById("edit-bookmark-text")
    chrome.storage.local.get([id], function (res) {
        bm_value.value = (varDefined(res[id][0]['title'])) ? res[id][0]['title'] : textFromLink(placeholder)
    })
    bm_value.placeholder = 'Bookmark title'

    // Text-link to icon
    let icon_value = document.getElementById("edit-icon-text")
    icon_value.placeholder = 'Link to icon (svg, png, jpg) or base64'
    icon_value.value = (varDefined(icon_link)) ? icon_link : ''

    // Icon itself
    let preview_div = document.getElementById("preview")
    preview_div.setAttribute('link', placeholder)
    preview_div.setAttribute('icon-link', (varDefined(icon_link)) ? icon_link : '')
    updateIconPreview()
}

function saveEdit() {
    let id = document.getElementById('edit_popup').getAttribute('id-to-edit')
    let bookmark = document.getElementById(id)

    let newLink = document.getElementById("edit-link-text").value
    let newText = document.getElementById("edit-bookmark-text").value
    let newIconLink = document.getElementById("edit-icon-text").value

    if (!varDefined(newLink)) {
        deleteMark(id)
        deleteEditPopup()
        return
    }

    let storage_value = {0: {"link": newLink}}
    bookmark.setAttribute('link', newLink)
    if (varDefined(newIconLink)) {
        bookmark.setAttribute('icon-link', newIconLink)
        storage_value[0]["icon-link"] = newIconLink
    } else {
        bookmark.removeAttribute('icon-link')
    }
    if (newText !== textFromLink(newLink)) {
        storage_value[0]["title"] = newText
    }
    chrome.storage.local.set({[id]: storage_value}, () => {})
    loadIcon(id, clear_cache=true)
    recreateMark(bookmark)
    deleteEditPopup()
}

$('#edit-link-text').on('input', function (e) {
    let bm_value = document.getElementById("edit-bookmark-text")
    bm_value.value = textFromLink(e.target.value)
    updateIconPreview()
})
$('#edit-icon-text').on('input', updateIconPreview)
$('#edit-save-button').on('click', saveEdit)
$('.app-container, #close-edit-button').on('click', deleteEditPopup)