function openSettings() {
    $('.app-container').css('margin-right', '500px').css('overflow-y', 'hidden')
    $('.settings.window').css('right', '0px')
    $('.settings.cancel-overlay').css('right', '500px')
    $('#settings-open-button').css('opacity', '0')
}

function closeSettings() {
    $('.app-container').css('margin-right', '0px').css('overflow-y', 'auto')
    $('.settings.window').css('right', '-1000px')
    $('.settings.cancel-overlay').css('right', '5000px')
    $('#settings-open-button').css('opacity', '1')
}

$('#store-link').on('click', function (e) {
    e.stopPropagation()
    openLink('https://chrome.google.com/webstore/detail/pulchra-bookmarks/pknkgclggganidoalifaagfjikhcdolb')
})

$('#git-link').on('click', function (e) {
    e.stopPropagation()
    openLink('https://github.com/annndruha/pulchra-bookmarks')
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

$('#show-clock').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['show-clock'], function (res) {
        if (res['show-clock']) {
            chrome.storage.local.set({['show-clock']: false}, () => {})
            setCheckbox('checkbox-show-clock', false)
            $('.clock-div').css('display', 'none')
            $('.content').css('padding-top', '120px')

        } else {
            chrome.storage.local.set({['show-clock']: true}, () => {})
            setCheckbox('checkbox-show-clock', true)
            $('.clock-div').css('display', 'block')
            $('.content').css('padding-top', '35px')
        }
    })
})

$('#reload-icons').on('click', function (e) {
    e.stopPropagation()
    loadAllIcons()
})

$('.changegrid').hover(
    () => { // In hover
        let declaration = document.styleSheets[1].cssRules[0]
        console.log(declaration)
        declaration.style.setProperty('--empty-bm-border', "1px solid #fff")
    },
    () => { // Out hover
        let declaration = document.styleSheets[1].cssRules[0]
        declaration.style.setProperty('--empty-bm-border', "none")
    }
)


function initRange() {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value)
        e.style.setProperty('--min', e.min === '' ? '0' : e.min)
        e.style.setProperty('--max', e.max === '' ? '100' : e.max)
        e.addEventListener('input', () => e.style.setProperty('--value', e.value))
    }
}

function setTheme(theme){
    let theme_list ={'Windows 11 Light' : 'css/colorsheet_w11_light.css',
                     'Windows 11 Dark': 'css/colorsheet_w11_dark.css'}
    document.getElementById('colorsheet').href = theme_list[theme]
    chrome.storage.local.set({['theme']: theme}, () => {})
    document.getElementById('theme').value = theme
}

$('#theme').on('change', function () {
    let theme = $(this).val()
    setTheme(theme)
})