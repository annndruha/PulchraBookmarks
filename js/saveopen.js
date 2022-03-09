// noinspection JSJQueryEfficiency

function saveToFile() {
    chrome.storage.local.get(null, (res) => {
        let now = new Date()
        let months = now.getMonth() + 1
        let now_str = now.getDate() + '.' + months + '.' + now.getFullYear()
        $('<a></a>', {
            'download': 'pulchra-' + now_str + '.json',
            'href': 'data:application/json,' + encodeURIComponent(JSON.stringify(res, null, '\t'))
        }).appendTo('body').click(() => {
            $(this).remove()
        })[0].click()
        console.log('Save bookmarks to file')
    })
}

function loadFromFile() {
    try {
        let fileReader = new FileReader()
        fileReader.readAsDataURL($('#upload_input').prop('files')[0])
        fileReader.onload = () => {
            try {
                const json = JSON.parse(atob(fileReader.result.substring(29)))
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

function saveToCloud() {
    chrome.storage.local.get(null, (res) => {
        chrome.storage.sync.set(res, () => {
            console.log('Save bookmarks in cloud')
            let save_icon = document.getElementById('icon-cloud-save')
            save_icon.setAttribute("src", "images/icons/cloud_done.svg")
            setTimeout(function () {
                let load_icon = document.getElementById('icon-cloud-save')
                load_icon.setAttribute("src", "images/icons/backup.svg")
            }, 1500);
        })
    })
}

function loadFromCloud() {
    chrome.storage.sync.get(null, (res) => {
        if (varDefined(res['rows'])) {
            console.log('Load bookmarks from cloud')
            chrome.storage.local.clear()
            chrome.storage.local.set(res, () => {
            })
            initSettingsValues(true)

            let load_icon = document.getElementById('icon-cloud-load')
            load_icon.setAttribute("src", "images/icons/cloud_done.svg")
            setTimeout(function () {
                let load_icon = document.getElementById('icon-cloud-load')
                load_icon.setAttribute("src", "images/icons/cloud_download.svg")
            }, 1500);
        } else {
            alert("Cloud hasn't any data")
        }
    })
}

$('#save-to-file').on('click', function (e) {
    e.stopPropagation()
    saveToFile()
})

$('#upload_input').on('change', function (e) {
    e.stopPropagation()
    loadFromFile()
})

$('#save-to-cloud').on('click', function (e) {
    e.stopPropagation()
    saveToCloud()
})

$('#load-from-cloud').on('click', function (e) {
    e.stopPropagation()
    loadFromCloud()
})