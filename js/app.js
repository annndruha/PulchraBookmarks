chrome.storage.local.get(['cols', 'rows'], function (res) {
    makeGrid(parseInt(res['cols']), parseInt(res['rows']))
    loadAllIcons()
})
beautyfyView()

function pasteSettingsValues() {
    chrome.storage.local.get(['cols'], function (result) {
        document.getElementById('cols').innerText = result['cols']
        document.getElementById('range-cols').setAttribute('value', result['cols'])
    })
    chrome.storage.local.get(['rows'], function (result) {
        document.getElementById('rows').innerText = result['rows']
        document.getElementById('range-rows').setAttribute('value', result['rows'])
    })
    chrome.storage.local.get(['new-tab'], function (result) {
        if (result['new-tab']){document.getElementById('checkbox-new-tab').setAttribute('checked', '')}
        else {document.getElementById('checkbox-new-tab').removeAttribute('checked')}
    })
    chrome.storage.local.get(['show-quick'], function (result) {
        if (result['show-quick']){document.getElementById('checkbox-show-quick').setAttribute('checked', '')}
        else {document.getElementById('checkbox-show-quick').removeAttribute('checked')}
    })
}

function updateBinds(){
    $('.grid-item-inside').unbind('click').on('click', function () {
        let link = this.getAttribute('link')
        let openLink = getOpenLink(link)

        if (!(openLink === '')) {
            chrome.storage.local.get(['new-tab'], function (result) {
                if(result['new-tab']){
                    chrome.tabs.create({'url': openLink})
                }else {
                    chrome.tabs.update({active: true, url: openLink})
                }
            })
            console.log('User open: ' + openLink)
        } else {
            alert('Empty link')
        }
    })
    $('.grid-item-inside-menu-img').unbind('click').on('click', function (e) {
        e.stopPropagation()
        editBookmark(this.id)
    })
    $('#chrome-downloads').unbind('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://downloads/'})
    })
    $('#chrome-bookmarks').unbind('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://bookmarks/'})
    })
    $('#chrome-history').unbind('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://history/'})
    })
    $('#chrome-settings').unbind('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://settings/'})
    })
    $('#settings-open-button').unbind('click').on('click', function (e) {
        e.stopPropagation()
        openSettings()
        console.log('Open Settings')
    })

    $('#close-settings-button').unbind('click').on('click', function (e) {
        e.stopPropagation()
        closeSettings()
        console.log('Close Settings')
    })
    $('#checkbox-new-tab').unbind('click').on('click', function (e) {
        e.stopPropagation()
        if( $(this).is(':checked') ) {
            chrome.storage.local.set({['new-tab']: true}, function () {})
        }
        else {
            chrome.storage.local.set({['new-tab']: false}, function () {})
        }
    })
    $('#checkbox-show-quick').unbind('click').on('click', function (e) {
        e.stopPropagation()
        if( $(this).is(':checked') ) {
            chrome.storage.local.set({['show-quick']: true}, function () {})
        }
        else {
            chrome.storage.local.set({['show-quick']: false}, function () {})
        }
    })
}

$(window).on('load', function () {
    updateBinds()
    pasteSettingsValues()
    loadAllIcons()
    openSettings()
    console.log('window on load')
})

$(window).on('change', function () {
    updateBinds()
    console.log('window on change')
})

$(window).on('resize', function () {
    beautyfyView()
    console.log('window on resize')
})

$('.settings').on('transitionend', function (){
    beautyfyView()
    console.log('settings on transitionend')
})

$('.cancel-overlay').on('click', function (e) {
    e.stopPropagation()
    closeSettings()
    console.log('Close Settings by overlay')
})