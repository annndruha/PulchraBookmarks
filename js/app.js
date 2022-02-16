chrome.storage.local.get(['cols', 'rows'], function (res) {
    makeGrid(parseInt(res['cols']), parseInt(res['rows']))
})

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
}

$(window).on('ready load change', function () {
    pasteSettingsValues()
    beautyfyView()
    updateBinds()
})

$(window).on('resize', function () {
    beautyfyView()
})

$('.settings').on('transitionend', function (){
    beautyfyView()
})

$('.cancel-overlay').on('click', function (e) {
    e.stopPropagation()
    closeSettings()
})