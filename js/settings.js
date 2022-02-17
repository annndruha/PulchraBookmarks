function openSettings() {
    $('.app-container').css('margin-right', '370px')
    $.getJSON('manifest.json', function (json) {
        let ver = document.getElementById('version')
        ver.innerText = 'v' + json['version']
    })

    $('.settings.window').css('right','0px')
    $('.settings.cancel-overlay').css('right', '370px')
    updateBinds()
}

function closeSettings() {
    $('.app-container').css('margin-right', '0px')
    $('.settings.window').css('right', '-500px')
    $('.settings.cancel-overlay').css('right', '5000px')
    updateBinds()
}

$('#range-rows').on('input', function (e) {
    let rows =parseInt(e.target.value)
    document.getElementById('rows').innerText = rows.toString()
    let cols = parseInt(document.getElementById('cols').innerText)
    chrome.storage.local.set({['rows']: rows}, function () {
        console.log('rows set:', rows)
    })
    makeGrid(cols, rows)
})

$('#range-cols').on('input', function (e) {
    let cols = parseInt(e.target.value)
    document.getElementById('cols').innerText = cols.toString()
    let rows = parseInt(document.getElementById('rows').innerText)
    chrome.storage.local.set({['cols']: cols}, function () {
        console.log('cols set:', cols)
    })
    makeGrid(cols, rows)
})

$('#close-settings-button').on('click', function (e) {
    e.stopPropagation()
    closeSettings()
    console.log('Close Settings')
})

$('#new-tab').on('click', function (e) {
    e.stopPropagation()
    if( $('#checkbox-new-tab').is(':checked') ) {
        chrome.storage.local.set({['new-tab']: false}, function () {})
        document.getElementById('checkbox-new-tab').removeAttribute('checked')
    }
    else {
        chrome.storage.local.set({['new-tab']: true}, function () {})
        document.getElementById('checkbox-new-tab').setAttribute('checked', '') // checkbox-show-quick
    }
})

$('#show-quick').on('click', function (e) {
    e.stopPropagation()
    if( $('#checkbox-show-quick').is(':checked') ) {
        chrome.storage.local.set({['show-quick']: false}, function () {})
        document.getElementById('checkbox-show-quick').removeAttribute('checked')
    }
    else {
        chrome.storage.local.set({['show-quick']: true}, function () {})
        document.getElementById('checkbox-show-quick').setAttribute('checked', '')
    }
    chrome.storage.local.get(['cols'], function (res) {
    updateBottomMenu(res['cols'])})
})