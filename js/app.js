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
        if (res['new-tab']){document.getElementById('checkbox-new-tab').setAttribute('checked', '')}
        else {document.getElementById('checkbox-new-tab').removeAttribute('checked')}
    })
    chrome.storage.local.get(['show-quick'], function (res) {
        if (res['show-quick']){document.getElementById('checkbox-show-quick').setAttribute('checked', '')}
        else {document.getElementById('checkbox-show-quick').removeAttribute('checked')}
    })
}

function updateBinds(){
    $('.grid-item-inside').off('click').on('click', function (e) {
        e.stopPropagation()
        let link = this.getAttribute('link')
        let openLink = getOpenLink(link)

        if (!(openLink === '')) {
            chrome.storage.local.get(['new-tab'], function (res) {
                if(res['new-tab']){
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
    $('.grid-item-inside-menu-img').off('click').on('click', function (e) {
        e.stopPropagation()
        editBookmark(this.id)
        updateBinds()
    })
    $('.grid-item-inside-add-img').off('click').on('click', function (e) {
        e.stopPropagation()
        editBookmark(this.id)
        updateBinds()
    })
    $('#chrome-downloads').off('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://downloads/'})
    })
    $('#chrome-bookmarks').off('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://bookmarks/'})
    })
    $('#chrome-history').off('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://history/'})
    })
    $('#chrome-settings').off('click').on('click', function () {
        chrome.tabs.create({'url': 'chrome://settings/'})
    })
    $('#settings-open-button').off('click').on('click', function (e) {
        e.stopPropagation()
        openSettings()
        console.log('Open Settings')
    })
}

$(window).on('ready load change', () => {
    pasteSettingsValues()
    beautyfyView()
    updateBinds()
})

$(window).on('resize', () => {
    beautyfyView()
})

$('.settings').on('transitionend', () =>{
    beautyfyView()
})

$('.cancel-overlay').on('click', (e) => {
    e.stopPropagation()
    closeSettings()
})