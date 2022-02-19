function openSettings() {
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
    chrome.storage.local.set({['rows']: rows}, () => {})
    makeGrid(cols, rows)
})

$('#range-cols').on('input', function (e) {
    let cols = parseInt(e.target.value)
    document.getElementById('cols').innerText = cols.toString()
    let rows = parseInt(document.getElementById('rows').innerText)
    chrome.storage.local.set({['cols']: cols}, () => {})
    makeGrid(cols, rows)
})

$('#close-settings-button').on('click', function (e) {
    e.stopPropagation()
    closeSettings()
})

$('.cancel-overlay').on('click', (e) => {
    e.stopPropagation()
    closeSettings()
})

$('#new-tab').on('click', function (e) {
    e.stopPropagation()
    chrome.storage.local.get(['new-tab'], (res) => {
        if(res['new-tab']) {
            chrome.storage.local.set({['new-tab']: false}, function () {})
            document.getElementById('checkbox-new-tab').removeAttribute('checked')
        }
        else {
            chrome.storage.local.set({['new-tab']: true}, function () {})
            document.getElementById('checkbox-new-tab').setAttribute('checked', '')
        }
    })
})

$('#show-quick').on('click', function (e) {
    e.stopPropagation()
    chrome.storage.local.get(['show-quick', 'cols'], function (res) {
    if (res['show-quick']) {
        chrome.storage.local.set({['show-quick']: false}, function () {})
        document.getElementById('checkbox-show-quick').removeAttribute('checked')
    } else {
        chrome.storage.local.set({['show-quick']: true}, function () {})
        document.getElementById('checkbox-show-quick').setAttribute('checked', '')
    }
    updateBottomMenu(res['cols'])
    })
})