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
    initKeybinds()
}

$('#store-link').on('click', function (e) {
    e.stopPropagation()
    openLink('https://chrome.google.com/webstore/detail/PulchraBookmarks/pknkgclggganidoalifaagfjikhcdolb')
})

$('#git-link').on('click', function (e) {
    e.stopPropagation()
    openLink('https://github.com/Annndruha/PulchraBookmarks')
})

$('#report_bug').on('click', function (e) {
    e.stopPropagation()
    openLink('https://docs.google.com/forms/d/e/1FAIpQLScgAqYmlH-e9z3mQJ6I3TBUKRn8ei6QfYDtC6d-dRpTwvqe3Q/viewform?usp=sf_link')
})

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

$('#new-tab').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['new-tab'], (res) => {
        if (res['new-tab']) {
            chrome.storage.local.set({['new-tab']: false}, () => {})
            setCheckbox('checkbox-new-tab', false)
        } else {
            chrome.storage.local.set({['new-tab']: true}, () => {})
            setCheckbox('checkbox-new-tab', true)
        }
    })
})

$('#show-quick').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['show-quick', 'cols'], function (res) {
        if (res['show-quick']) {
            chrome.storage.local.set({['show-quick']: false}, () => {})
            setCheckbox('checkbox-show-quick', false)
        } else {
            chrome.storage.local.set({['show-quick']: true}, () => {})
            setCheckbox('checkbox-show-quick', true)
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
            setCheckbox('checkbox-show-header', false)
        } else {
            chrome.storage.local.set({['show-header']: true}, () => {})
            setCheckbox('checkbox-show-header', true)
        }
        updateHeaderMenu()
    })
})

$('#keybinds').on('click', function (e) {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['keybinds'], function (res) {
        if (res['keybinds']) {
            chrome.storage.local.set({['keybinds']: false}, () => {})
            setCheckbox('checkbox-keybinds', false)
            disableKeybinds()
        } else {
            console.log('set keybinds')
            chrome.storage.local.set({['keybinds']: true}, () => {})
            setCheckbox('checkbox-keybinds', true)
            enableKeybinds()
        }
    })
}).hover(
    () => { // In hover
        enableKeybinds()
        $('.grid-item-inside-key').css('opacity', '1')},

    () => { // Out hover
        disableKeybinds()
        $('.grid-item-inside-key').css('opacity', '0')}
)


$('#reload-icons').on('click', function (e) {
    e.stopPropagation()
    loadAllIcons()
})

$('#reset-background').on('click', function (e) {
    e.stopPropagation()
    chrome.storage.local.remove(['background'])
    chrome.tabs.reload()
})

$('.changegrid').hover(
    () => { // In hover
        document.getElementById('emptysheet').href = 'css/empty-icon-bm-show.css'},

    () => { // Out hover
        document.getElementById('emptysheet').href = 'css/empty-icon-bm.css'}
)