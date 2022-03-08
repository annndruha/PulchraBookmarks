function createBookmarks() {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        let root = bookmarkTreeNodes[0]["children"][0]["children"]
        console.log(root)
        for (let i=0; i < root.length; i++){
            let root_str = '<span class="header-item" id="root-header-' + root[i].id + '">'
            let root_item = $(root_str)
            $('#bookmarks').append(root_item.text(root[i].title))
            $('#root-header-'+root[i].id).on('click', createRootElementTree)
        }
        // dumpTreeNodes(bookmarkTreeNodes[0]["children"][0]["children"])
        //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes[0]["children"][0]["children"]))
    })
}

function createRootElementTree(){
    let root_id = this.id.replace('root-header-', '')
    chrome.bookmarks.getSubTree(root_id, (rootitemNodes) => {
        console.log(rootitemNodes[0])
    })
    // $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes[0]["children"][0]["children"]))
}

function dumpTreeNodes(bookmarkNodes) {
    let list = $('<ul hidden>')
    for (let i = 0; i < bookmarkNodes.length; i++) { //bookmarkNodes.length
        list.append(dumpNode(bookmarkNodes[i]))
    }
    return list
}

function dumpNode(bookmarkNode) {
    if (bookmarkNode.title){
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