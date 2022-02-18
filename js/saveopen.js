function saveToFile(){
    chrome.storage.local.get(null, (res) => {
        $('<a />', {
            'download': 'pulchra-' + moment().format('DD.MM.YYYY') + '.json',
            'href' : 'data:application/json,' + encodeURIComponent(JSON.stringify(res, null, '\t'))
        }).appendTo('body')
            .click(function() {
                $(this).remove()
            })[0].click()
    })
}

$('#save-to-file').on('click', function (e) {
    e.stopPropagation()
    saveToFile()
})

$('#save-to-file.item-left').on('click', function (e) {
    e.stopPropagation()
    saveToFile()
})

$('#save-to-file.item-right').on('click', function (e) {
    e.stopPropagation()
    saveToFile()
})

$('#load-from-file').on('click', function (e) {
    e.stopPropagation()
    // loadFromFile()
    // chrome.storage.local.clear()
    // alert('Function not finished')
    // alert('Function not finished')
})

// $('#load-from-file.item-left').on('click', function (e) {
//     e.stopPropagation()
//     // alert('Function not finished')
// })
//
// $('#load-from-file.item-right').on('click', function (e) {
//     e.stopPropagation()
//     // alert('Function not finished')
// })