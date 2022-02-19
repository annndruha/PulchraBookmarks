// noinspection JSJQueryEfficiency

function saveToFile() {
    chrome.storage.local.get(null, (res) => {
        let now = new Date()
        let months = now.getMonth() + 1
        let now_str = now.getDate() + '.' + months + '.' + now.getFullYear()
        $('<a></a>', {
            'download': 'pulchra-' + now_str + '.json',
            'href': 'data:application/json,' + encodeURIComponent(JSON.stringify(res, null, '\t'))
        }).appendTo('body').click(function () {
            $(this).remove()
        })[0].click()
    })
}

function loadFromFile() {
    let fileReader = new FileReader()
    fileReader.readAsDataURL($('#upload_input').prop('files')[0])
    fileReader.onload = () => {
        let dataURI = fileReader.result
        const decoded = atob(dataURI.substring(29))
        const json = JSON.parse(decoded)
        chrome.storage.local.clear()
        chrome.storage.local.set(json, function () {
        })
        console.log(json['cols'])
        makeGrid(parseInt(json['cols']), parseInt(json['rows']), true)
        initSettingsValues()
    }
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

$('#upload_input').on('change', function (e) {
    e.stopPropagation()
    loadFromFile()
})