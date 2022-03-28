function initSettingsValues(fromfile = false) {
    if (!fromfile) {
        $.getJSON('manifest.json', function (json) {
            console.log('Pulchra bookmarks v' + json['version'])
            $('#version').text('v' + json['version'])
            chrome.storage.local.set({'version': json['version']}, () => {})
        })
    }
    chrome.storage.local.get(['cols', 'rows', 'new-tab', 'show-quick', 'show-header', 'show-clock'], function (res) {
        $('#cols').text(res['cols'])
        $('#range-cols').attr('value', res['cols'])
        $('#rows').text(res['rows'])
        $('#range-rows').attr('value', res['rows'])
        setCheckbox('checkbox-new-tab', res['new-tab'])
        setCheckbox('checkbox-show-quick', res['show-quick'])
        setCheckbox('checkbox-show-header', res['show-header'])
        setCheckbox('checkbox-show-clock', res['show-clock'])
        makeGrid(parseInt(res['cols']), parseInt(res['rows']), fromfile)
    })
    chrome.storage.local.get(['background'], function (res) {
        if (varDefined(res['background'])){
            $('body').css('background-image', 'url('+res['background']+')')
        }
        else {
            $('body').css('background-image', 'url(../images/backgrounds/windows.jpg)')
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    initSettingsValues()
    beautyfyView()
    initClock()
})

window.addEventListener('resize', () => {
    beautyfyView()
})

$('.settings').on('transitionend', () => {
    beautyfyView()
})

$(document).on('keyup',function(e) {
    if(e.key === "Escape") {
        closeSettings()
        deleteEditPopup()
        deleteRootElementTree()
    }
    if ($('#edit_popup').attr('data-status') === 'closed'){
        $(keybinds[e.key]).click()
    }
    else {
        if(e.key === "Enter") {
            saveEdit()
        }
    }
})