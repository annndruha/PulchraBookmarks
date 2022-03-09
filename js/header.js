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
        let root = bookmarkTreeNodes[0]["children"][0]["children"]
        console.log(root)
        for (let i = 0; i < root.length; i++) {
            let root_item = $('<div class="header-item" id="root-header-' + root[i].id + '">')
            root_item.text(root[i].title)
            if (hasChields(root[i])) {
                root_item.append(getListIcon('closed', 'none', 'header-icon'))
            }
            $('#bookmarks').append(root_item)
            $('#root-header-' + root[i].id).on('click', createRootElementTree)
            $('.app-container').on('click', deleteRootElementTree)
        }
    })
}

function hasChields(item){
    return !!(item.children && item.children.length > 0);
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

function getListIcon(status='closed', link='none', cl='list-icon'){
    let pseudofoldericon = $('<div class="pseudo-list-icon">')
    let foldericon = $('<img alt="" class='+cl+'>')
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
        // foldericon.attr('src', 'images/icons/language.svg')
        if (cl !== 'list-icon')
        {
            foldericon.attr('class', cl)
        }
        else {
            foldericon.attr('class', 'site-icon')
        }
        foldericon.attr('src', 'https://s2.googleusercontent.com/s2/favicons?domain=' + getOpenLink(link) + '&sz=128')
        pseudofoldericon.append(foldericon)
    }
    return pseudofoldericon
}

function dumpNode(bookmarkNode) {
    if (bookmarkNode.title) {
        let anchor = $('<div class="header-text">')
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
            pseudoli.append(getListIcon('site', anchor.attr('link')))
        }
        return pseudoli.append(li);
    }
}