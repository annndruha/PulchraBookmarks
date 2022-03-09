function openSettings() {
    $('.app-container').css('margin-right', '370px').css('overflow-y', 'hidden')
    $('.settings.window').css('right', '0px')
    $('.settings.cancel-overlay').css('right', '370px')
    $('#settings-open-button').css('opacity', '0')
}

function closeSettings() {
    $('.app-container').css('margin-right', '0px').css('overflow-y', 'auto')
    $('.settings.window').css('right', '-500px')
    $('.settings.cancel-overlay').css('right', '5000px')
    $('#settings-open-button').css('opacity', '1')
}

$('#range-rows').on('input', function (e) {
    let rows = parseInt(e.target.value)
    let cols = parseInt(document.getElementById('cols').innerText)
    document.getElementById('rows').innerText = rows.toString()
    chrome.storage.local.set({['rows']: rows}, () => {})
    makeGrid(cols, rows)
})

$('#range-cols').on('input', function (e) {
    let cols = parseInt(e.target.value)
    let rows = parseInt(document.getElementById('rows').innerText)
    document.getElementById('cols').innerText = cols.toString()
    chrome.storage.local.set({['cols']: cols}, () => {})
    makeGrid(cols, rows)
})

$('#close-settings-button, .cancel-overlay').on('click', function (e) {
    e.stopPropagation()
    closeSettings()
})

$('#checkbox-new-tab, #checkbox-show-quick, #checkbox-show-header').on('click', () => {}, true) // Super important string with true

$('#new-tab').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['new-tab'], (res) => {
        if (res['new-tab']) {
            chrome.storage.local.set({['new-tab']: false}, () => {})
            document.getElementById('checkbox-new-tab').removeAttribute('checked')
        } else {
            chrome.storage.local.set({['new-tab']: true}, () => {})
            document.getElementById('checkbox-new-tab').setAttribute('checked', '')
        }
    })
})

$('#show-quick').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['show-quick', 'cols'], function (res) {
        if (res['show-quick']) {
            chrome.storage.local.set({['show-quick']: false}, () => {})
            document.getElementById('checkbox-show-quick').removeAttribute('checked')
        } else {
            chrome.storage.local.set({['show-quick']: true}, () => {})
            document.getElementById('checkbox-show-quick').setAttribute('checked', '')
        }
        updateBottomMenu(res['cols'])
    })
})

$('#show-header').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['show-header'], function (res) {
        if (res['show-header']) {
            chrome.storage.local.set({['show-header']: false}, () => {})
            document.getElementById('checkbox-show-header').removeAttribute('checked')
        } else {
            chrome.storage.local.set({['show-header']: true}, () => {})
            document.getElementById('checkbox-show-header').setAttribute('checked', '')
        }
        updateHeaderMenu()
    })
})

// $('.changegrid').hover(
//     () => { // In hover
//     $('.empty-icon').css('border','1px solid #fff')},
//     () => { // Out hover
//         $('.empty-icon').css('border','none')
//         updateHovers()
//     // .css('filter', 'drop-shadow(0px 0px 3px #000)')
//     }
// )