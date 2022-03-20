function updateHeaderMenu() {
    deleteHeaderMenu()
    chrome.storage.local.get(['show-header'], function (res) {
        if (res['show-header']) {
            createBookmarks()
        }
    })
}

function deleteHeaderMenu() {
    $('#bookmarks').empty()
}

function createBookmarks() {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        let root = bookmarkTreeNodes[0]['children'][0]['children']
        for (let i = 0; i < root.length; i++) {
            let cl = ""
            if (hasChields(root[i]))
            {
                cl = "header-item header-folder"
            }
            else {
                cl = "header-item"
            }
            let root_item = $('<div class="'+cl+'" id="root-header-' + root[i].id + '">')
            root_item.text(root[i].title)
            if (hasChields(root[i])) {
                root_item.append(addListIcon(false, true))
            } else {
                root_item.attr('link', root[i].url)
                LinkRightClick(root_item)
            }
            $('#bookmarks').append(root_item)
            $('#root-header-' + root[i].id).on('click', createRootElementTree)
            $('.app-container').on('click', deleteRootElementTree)
        }
    })
}

function hasChields(item) {
    return !!(item.children && item.children.length > 0)
}

function deleteRootElementTree() {
    let root_popup = document.getElementById('root_popup')
    if (varDefined(root_popup)) {
        root_popup.remove()
    }
}

function createRootElementTree() {
    let root_id = this.id.replace('root-header-', '')
    chrome.bookmarks.getSubTree(root_id, (rootitemNodes) => {
        if (rootitemNodes[0].children) {
            let root_popup = document.createElement('div')
            let app_container = document.getElementById('app-container')
            root_popup.id = 'root_popup'
            app_container.appendChild(root_popup).className = 'root_popup'
            let root_item = document.getElementById(this.id)
            $(root_popup).css('left', root_item.offsetLeft + 10 + 'px')
            $(root_popup).append(dumpTreeNodes(rootitemNodes[0]['children']))
        } else {
            openLink(rootitemNodes[0].url)
        }
    })
}

function dumpTreeNodes(bookmarkNodes) {
    let list = $('<ul class="sublist">')
    for (let i = 0; i < bookmarkNodes.length; i++) {
        list.append(dumpNode(bookmarkNodes[i]))
    }
    return list
}

function addListIcon(link = false, header = false) {
    let cl = (header) ? 'header-icon' : 'list-icon'
    let pseudofoldericon = $('<div class="pseudo-list-icon">')
    let foldericon = $('<img alt="" src="" class=' + cl + '>')
    if (link) {
        foldericon.attr('src', 'https://s2.googleusercontent.com/s2/favicons?domain=' + getOpenLink(link) + '&sz=32')
    } else {
        foldericon.attr('src', 'images/icons/folder_open.svg')
    }
    pseudofoldericon.append(foldericon)
    return pseudofoldericon
}

function updateListIcon(pseudoli) {
    let status = $(pseudoli).attr('status')
    let icon = $(pseudoli).find('.list-icon')
    let src = (status === 'closed') ? 'folder_open.svg' : 'folder.svg'
    icon.attr('src', 'images/icons/' + src)
}

function dumpNode(bookmarkNode) {
    if (bookmarkNode.title) {
        let anchor = $('<div class="header-text">')
        anchor.text(bookmarkNode.title)
        let span = $('<span class="span-header">')
        span.hover().append(anchor) //

        let pseudoli = $('<div class="pseudoli">')
        let li = $(bookmarkNode.title ? '<li class="my-li">' : '<div>')
        li.attr('status', 'closed')
        pseudoli.attr('status', 'closed')
        li.append(span)
        if (bookmarkNode.children && bookmarkNode.children.length > 0) {
            li.on('click', (e) => {
                e.stopPropagation()
                if (li.attr('status') === 'closed') {
                    li.attr('status', 'opened')
                    pseudoli.attr('status', 'opened')
                    updateListIcon(pseudoli)
                    li.append(dumpTreeNodes(bookmarkNode.children, li.attr('status')))
                } else {
                    li.attr('status', 'closed')
                    pseudoli.attr('status', 'closed')
                    updateListIcon(pseudoli)
                    li.children('.sublist').remove()
                }
            })
            pseudoli.append(addListIcon())

        } else {
            anchor.attr('link', bookmarkNode.url)
            anchor.on('click', (e) => {
                e.stopPropagation()
                openLink(anchor.attr('link'))
            })
            pseudoli.append(addListIcon(anchor.attr('link')))
            pseudoli.attr('link', bookmarkNode.url)
            LinkRightClick(pseudoli)
        }
        return pseudoli.append(li)
    }
}