function initSettingsValues(fromfile = false) {
    if (!fromfile) {
        $.getJSON('manifest.json', function (json) {
            document.getElementById('version').innerText = 'v' + json['version']
            console.log('Pulchra bookmarks v' + json['version'])
            chrome.storage.local.set({'version': json['version']}, () => {})
        })
    }
    chrome.storage.local.get(['cols', 'rows', 'new-tab', 'show-quick', 'show-header'], function (res) {
        document.getElementById('cols').innerText = res['cols']
        document.getElementById('range-cols').setAttribute('value', res['cols'])
        document.getElementById('rows').innerText = res['rows']
        document.getElementById('range-rows').setAttribute('value', res['rows'])
        if (res['new-tab']) {
            document.getElementById('checkbox-new-tab').setAttribute('checked', '')
        } else {
            document.getElementById('checkbox-new-tab').removeAttribute('checked')
        }
        if (res['show-quick']) {
            document.getElementById('checkbox-show-quick').setAttribute('checked', '')
        } else {
            document.getElementById('checkbox-show-quick').removeAttribute('checked')
        }
        if (res['show-header']) {
            document.getElementById('checkbox-show-header').setAttribute('checked', '')
        } else {
            document.getElementById('checkbox-show-header').removeAttribute('checked')
        }
        makeGrid(parseInt(res['cols']), parseInt(res['rows']), fromfile)
    })
}

$(window).on('ready', () => { // load change
    initSettingsValues()
    beautyfyView()
    updateRightClick()
})

$(window).on('resize', () => {
    beautyfyView()
})

$('.settings').on('transitionend', () => {
    beautyfyView()
})