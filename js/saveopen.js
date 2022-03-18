// noinspection JSJQueryEfficiency
function getPureJSON(json){
    for (let r = 0; r < json['rows']; r++) {
        for (let c = 0; c < json['cols']; c++) {
            let id = r.toString() + c.toString()
            delete json[id][0]['cache-icon-link']
        }
    }
    for (let r = json['rows']; r < 10; r++) {
        for (let c = 0; c <  10; c++) {
            let id = r.toString() + c.toString()
            delete json[id]
        }
    }
    for (let r = 0; r < 10; r++) {
        for (let c = json['cols']; c < 10; c++) {
            let id = r.toString() + c.toString()
            delete json[id]
        }
    }
    return json
}


function saveToFile() {
    chrome.storage.local.get(null, (res) => {
        let now = new Date()
        let now_str = now.toLocaleDateString("ru-RU")
        let json = getPureJSON(res)
        $('<a></a>', {
            'download': 'pulchra-' + now_str + '.json',
            'href': 'data:application/json,' + encodeURIComponent(JSON.stringify(json, null, '\t'))
        }).appendTo('body').click(() => {
            $(this).remove()
        })[0].click()
        console.log('Save bookmarks to file')
    })
}

function loadFromFile() {
    try {
        let fileReader = new FileReader()
        let files = document.getElementById('upload_input').files[0]
        fileReader.readAsDataURL(files)
        fileReader.onload = () => {
            try {
                const cjson = JSON.parse(atob(fileReader.result.substring(29)))
                let json = getPureJSON(cjson)
                chrome.storage.local.clear()
                chrome.storage.local.set(json, () => {
                })
                initSettingsValues(true)
                console.log('Load bookmarks from file')
            } catch (e) {
                alert('Broken file!\n' + e.toString())
            }
        }
    } catch (e) {
        if (e instanceof TypeError) {
        } else {
            console.log(e)
        }
    }
}

function loadBackground() {
    try {
        let fileReader = new FileReader()
        let files = document.getElementById('upload_input').files[0]
        fileReader.readAsDataURL(files)
        fileReader.onload = () => {
            try {
                fileReader.result
                // const cjson = JSON.parse(atob(fileReader.result.substring(29)))
                // let json = getPureJSON(cjson)
                // chrome.storage.local.clear()
                chrome.storage.local.set({'background':fileReader.result}, () => {})
                // initSettingsValues(true)
                //console.log(fileReader.result)
                $('body').css('background-image', 'url('+fileReader.result+')')
            } catch (e) {
                alert('Broken file!\n' + e.toString())
            }
        }
    } catch (e) {
        if (e instanceof TypeError) {
        } else {
            console.log(e)
        }
    }
}

function saveToCloud() {
    chrome.storage.local.get(null, (res) => {
        let json = getPureJSON(res)
        chrome.storage.sync.set(json, () => {
            console.log('Save bookmarks in cloud')
            let save_icon = document.getElementById('icon-cloud-save')
            save_icon.setAttribute('src', 'images/icons/cloud_done.svg')
            setTimeout(function () {
                let load_icon = document.getElementById('icon-cloud-save')
                load_icon.setAttribute('src', 'images/icons/backup.svg')
            }, 1500);
        })
    })
}

function loadFromCloud() {
    chrome.storage.sync.get(null, (res) => {
        let json = getPureJSON(res)
        if (varDefined(json['rows'])) {
            console.log('Load bookmarks from cloud')
            chrome.storage.local.clear()
            chrome.storage.local.set(json, () => {
            })
            initSettingsValues(true)

            let load_icon = document.getElementById('icon-cloud-load')
            load_icon.setAttribute('src', 'images/icons/cloud_done.svg')
            setTimeout(function () {
                let load_icon = document.getElementById('icon-cloud-load')
                load_icon.setAttribute('src', 'images/icons/cloud_download.svg')
            }, 1500);
        } else {
            alert('Cloud hasn\'t any data')
        }
    })
}

$('#save-to-file').on('click', function (e) {
    e.stopPropagation()
    saveToFile()
})

$('#upload_input').on('change', function (e) {
    e.stopPropagation()
    // loadFromFile()
    loadBackground()
})

$('#save-to-cloud').on('click', function (e) {
    e.stopPropagation()
    saveToCloud()
})

$('#load-from-cloud').on('click', function (e) {
    e.stopPropagation()
    loadFromCloud()
})