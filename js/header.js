function createBookmarks() {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        let root = bookmarkTreeNodes[0]["children"][0]["children"]
        for (let i = 0; i < root.length; i++) {
            let root_str = '<span class="header-item" id="root-header-' + root[i].id + '">'
            let root_item = $(root_str)
            $('#bookmarks').append(root_item.text(root[i].title))
            $('#root-header-' + root[i].id).on('click', createRootElementTree)
            $('.app-container').on('click', deleteRootElementTree)
        }
    })
}

function deleteRootElementTree() {
    document.getElementById("root_popup").remove();
}

function createRootElementTree() {
    let root_id = this.id.replace('root-header-', '')
    chrome.bookmarks.getSubTree(root_id, (rootitemNodes) => {
        if (rootitemNodes[0].children) {
            let root_popup = document.createElement('div')
            let app_container = document.getElementById('app-container')
            root_popup.id = "root_popup"
            app_container.appendChild(root_popup).className = 'root_popup'
            let root_item = document.getElementById(this.id)
            $(root_popup).css('left', root_item.offsetLeft + 'px')
            $(root_popup).append(dumpTreeNodes(rootitemNodes[0]['children']))
        } else {
            openLink(rootitemNodes[0].url)
        }
    })
}

function dumpTreeNodes(bookmarkNodes) {
    let list = $('<ul class="sublist">')
    for (let i = 0; i < bookmarkNodes.length; i++) { //bookmarkNodes.length
        list.append(dumpNode(bookmarkNodes[i]))
    }
    return list
}

function getListIcon(status='closed', link='none'){
    let pseudofoldericon = $('<div class="pseudo-list-icon">')
    let foldericon = $('<img class="list-icon">')
    if (status === 'closed')
    {
        foldericon.attr('src', 'images/icons/arrow_right.svg')
        pseudofoldericon.append(foldericon)
    }
    else if (status === 'opened'){
        foldericon.attr('src', 'images/icons/arrow_drop.svg')
        pseudofoldericon.append(foldericon)
    }
    else if (status === 'site'){
        foldericon.attr('src', 'images/icons/language.svg')
        pseudofoldericon.append(foldericon)
    }
    return pseudofoldericon
}

function dumpNode(bookmarkNode) {
    if (bookmarkNode.title) {
        let anchor = $('<div>')
        anchor.text(bookmarkNode.title)
        let span = $('<span class="span-header">')
        span.hover().append(anchor) //

        let pseudoli = $('<div class="pseudoli">')
        let li = $(bookmarkNode.title ? '<li>' : '<div>')
        li.attr('status', 'closed')
        li.append(span)
        if (bookmarkNode.children && bookmarkNode.children.length > 0) {
            li.on('click', (e) => {
                e.stopPropagation()
                if (li.attr('status') === 'closed') {
                    li.attr('status', 'opened')
                    li.append(dumpTreeNodes(bookmarkNode.children, li.attr('status')))
                } else {
                    li.attr('status', 'closed')
                    li.children('.sublist').remove()
                }
            })
            pseudoli.append(getListIcon(li.attr('status')))

        } else {
            anchor.attr('link', bookmarkNode.url)
            anchor.on('click', (e) => {
                e.stopPropagation()
                openLink(anchor.attr('link'))
            })
            pseudoli.append(getListIcon('site'))
        }

        return pseudoli.append(li);
    }
}