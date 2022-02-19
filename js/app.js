$.getJSON('manifest.json', function (json) {
    chrome.storage.local.set({'version': json['version']}, function () {
        console.log('Pulchra bookmarks v' + json['version'])
    })
})

chrome.storage.local.get(['cols', 'rows'], function (res) {
    makeGrid(parseInt(res['cols']), parseInt(res['rows']))
})


function pasteSettingsValues() {
    chrome.storage.local.get(['cols'], function (res) {
        document.getElementById('cols').innerText = res['cols']
        document.getElementById('range-cols').setAttribute('value', res['cols'])
    })
    chrome.storage.local.get(['rows'], function (res) {
        document.getElementById('rows').innerText = res['rows']
        document.getElementById('range-rows').setAttribute('value', res['rows'])
    })
    chrome.storage.local.get(['new-tab'], function (res) {
        if (res['new-tab']) {
            document.getElementById('checkbox-new-tab').setAttribute('checked', '')
        } else {
            document.getElementById('checkbox-new-tab').removeAttribute('checked')
        }
    })
    chrome.storage.local.get(['show-quick'], function (res) {
        if (res['show-quick']) {
            document.getElementById('checkbox-show-quick').setAttribute('checked', '')
        } else {
            document.getElementById('checkbox-show-quick').removeAttribute('checked')
        }
    })
}

$(window).on('ready load change', () => {
    pasteSettingsValues()
    beautyfyView()
})

$(window).on('resize', () => {
    beautyfyView()
})

$('.settings').on('transitionend', () => {
    beautyfyView()
})

$('.cancel-overlay').on('click', (e) => {
    e.stopPropagation()
    closeSettings()
})