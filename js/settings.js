function openSettings() {
    $.getJSON('manifest.json', function (json) {
        document.getElementById('version').innerText = 'v' + json['version']
    })
    $('.app-container').css('margin-right', '370px')
    $('.settings.window').css('right','0px')
    $('.settings.cancel-overlay').css('right', '370px')
}

function closeSettings() {
    $('.app-container').css('margin-right', '0px')
    $('.settings.window').css('right', '-500px')
    $('.settings.cancel-overlay').css('right', '5000px')
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
    if( $('#checkbox-new-tab').click().is(':checked') ) {
        chrome.storage.local.set({['new-tab']: true}, function () {})
    }
    else {
        chrome.storage.local.set({['new-tab']: false}, function () {})
    }
})

$('#new-tab.item-right.switch.slider-round').on('click', () => {
    console.log('#new-tab.item-right')
})

$('#show-quick').on('click', function (e) {
    e.stopPropagation()
    if( $('#checkbox-show-quick').click().is(':checked') ) {
        chrome.storage.local.set({['show-quick']: true}, function () {})
    }
    else {
        chrome.storage.local.set({['show-quick']: false}, function () {})
    }
    chrome.storage.local.get(['cols'], function (res) {
    updateBottomMenu(res['cols'])})
})