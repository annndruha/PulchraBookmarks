$('#search').change(function () {
    $('#bookmarks').empty()
    dumpBookmarks($('#search').val())
})

function dumpBookmarks(query) {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes[0]["children"][0]["children"], query))
    })
}

function dumpTreeNodes(bookmarkNodes, query) {
    let list = $('<ul>')
    for (let i = 1; i < 2; i++) { //bookmarkNodes.length
        list.append(dumpNode(bookmarkNodes[i], query))
    }
    return list
}

function dumpNode(bookmarkNode, query) {
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
            li.append(dumpTreeNodes(bookmarkNode.children, query))
        }
        return li;
    }
}