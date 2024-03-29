// noinspection JSJQueryEfficiency
function getPureJSON(json){
    try{
        delete json['datetime']
        delete json['background']
        delete json["version"]
        for (let r = 0; r < json['rows']; r++) {
            for (let c = 0; c < json['cols']; c++) {
                let id = r.toString() + c.toString()
                delete json[id][0]['cache-icon']
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
    }
    // TODO: Validate json
    catch (e) {
        if (!(e instanceof TypeError))
        {console.log(e.message)}
    }
    return json
}

function setJsonToLocalStorage(json) {
    chrome.storage.local.get(['background'], function (val) {
        chrome.storage.local.clear(() => {
            chrome.storage.local.set(json, () => {
                if (varDefined(val['background'])){
                    chrome.storage.local.set({'background':val['background']}, () => {
                        initSettingsValues(true)
                        setTimeout(loadAllIcons, 200)
                    })
                }
                else {
                    initSettingsValues(true)
                    setTimeout(loadAllIcons, 200)
                }
            })
        })
    })
}


function saveToFile() {
    chrome.storage.local.get(null, (res) => {
        let now_str = new Date().toISOString()
        let json = getPureJSON(res)
        $.getJSON('manifest.json', function (r) {
            json['version'] = r['version']
            $('<a></a>', {
                'download': 'Pulchra-' + now_str.split('T')[0] + '.json',
                'href': 'data:application/json,' + encodeURIComponent(JSON.stringify(json, null, '\t'))
            }).appendTo('body').click(() => {
                $(this).remove()
            })[0].click()
            console.log('Save bookmarks to file')
        })
    })
}

function loadFromFile() {
    try {
        let files = document.getElementById('upload_input').files[0]
        let fileReader = new FileReader()
        fileReader.readAsDataURL(files)
        fileReader.onload = () => {
            try {
                const cjson = JSON.parse(b64DecodeUnicode(fileReader.result.substring(29)))
                let json = getPureJSON(cjson)
                setJsonToLocalStorage(json)
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
        let files = document.getElementById('upload_background').files[0]
        fileReader.readAsDataURL(files)
        fileReader.onload = () => {
            try {
                chrome.storage.local.set({'background':fileReader.result}, () => {})
                $('body').css('background-image', 'url('+fileReader.result+')')
                $('#reset-background').css('display', 'flex')
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

function compareJson(){
    chrome.storage.local.get(null, (res_local) => {
        chrome.storage.sync.get(null, (res_cloud) => {
            let lastsave = res_cloud['datetime']
            if (varDefined(lastsave)) {
                let ident = JSON.stringify(getPureJSON(res_cloud)) === JSON.stringify(getPureJSON(res_local))
                let status1 = $('#save-cloud-status')
                let status2 = $('#load-cloud-status')
                if (!ident) {
                    status1.text('Update cloud')
                    status2.text(timeSince(new Date(lastsave)))
                } else {
                    status1.text('')
                    status2.text('')
                }
            }
            else {
                let status1 = $('#save-cloud-status')
                status1.text('Update cloud')
            }
            setTimeout(function () {
                compareJson()
            }, 100)
        })
    })
}

function saveToCloud() {
    chrome.storage.local.get(null, (res) => {
        let json = getPureJSON(res)
        json['datetime'] = new Date().toISOString()
        $.getJSON('manifest.json', function (r) {
            json['version'] = r['version']
            chrome.storage.sync.get(null, (res_cloud_backup) => {
                chrome.storage.sync.clear(() => {
                    chrome.storage.sync.set(json, () => {
                        if (chrome.runtime.lastError){
                            chrome.storage.sync.set(res_cloud_backup, () => {
                                console.log('Runtime error while cloud save. Cloud restored to state before saving.')})
                                alert(chrome.runtime.lastError.message + '\n\nProbably icon-link (or base64) in some bookmark too big')
                        }
                        else{
                            console.log('Bookmarks saved in cloud')
                        }
                        let save_icon = document.getElementById('icon-cloud-save')
                        save_icon.setAttribute('src', 'images/icons/cloud_done.svg')
                        setTimeout(function () {
                            let load_icon = document.getElementById('icon-cloud-save')
                            load_icon.setAttribute('src', 'images/icons/backup.svg')
                        }, 1500)
                    })
                })
            })
        })
    })
}

function loadFromCloud() {
    chrome.storage.sync.get(null, (res) => {
        let json = getPureJSON(res)
        if (varDefined(json['rows'])) {
            console.log('Load bookmarks from cloud')
            setJsonToLocalStorage(json)
            let load_icon = document.getElementById('icon-cloud-load')
            load_icon.setAttribute('src', 'images/icons/cloud_done.svg')
            setTimeout(function () {
                let load_icon = document.getElementById('icon-cloud-load')
                load_icon.setAttribute('src', 'images/icons/cloud_download.svg')
            }, 1500)
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
    loadFromFile()
})

$('#upload_background').on('change', function (e) {
    e.stopPropagation()
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