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

function deleteRootElementTree(){
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
            $(root_popup).css('left', root_item.offsetLeft +'px')
            $(root_popup).append(dumpTreeNodes(rootitemNodes[0]['children']))
        } else {
            chrome.tabs.create({url: rootitemNodes[0].url})
        }
    })
}

function dumpTreeNodes(bookmarkNodes) {
    let list = $('<ul>')
    for (let i = 0; i < bookmarkNodes.length; i++) { //bookmarkNodes.length
        list.append(dumpNode(bookmarkNodes[i]))
    }
    return list
}

function dumpNode(bookmarkNode) {
    if (bookmarkNode.title) {
        let anchor = $('<a>');
        anchor.attr('href', bookmarkNode.url);
        anchor.text(bookmarkNode.title);

        // anchor.click(function () {
        //     chrome.tabs.create({ url: bookmarkNode.url })
        // })

        let span = $('<span>')
        span.hover().append(anchor)
        let li = $(bookmarkNode.title ? '<li>' : '<div>').append(span)

        if (bookmarkNode.children && bookmarkNode.children.length > 0) {
            li.append(dumpTreeNodes(bookmarkNode.children))
        }
        return li;
    }
}