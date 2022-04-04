function setStorageAndReload(storageData, message){
    chrome.storage.local.set(storageData, () => {
        console.log(message)
        initSettingsValues()
        beautyfyView()
        initClock()
        setTimeout(loadAllIcons, 200)
    })
}

function firstInstall(){ // Storage clear
    chrome.storage.sync.get(null, (res)=> {
        if (varDefined(res['rows'])){
            setStorageAndReload(res, 'Bookmarks loaded from cloud')
        }
        else {
            $.getJSON('default-icons.json', function (json) {
                setStorageAndReload(json, 'Bookmarks loaded from template')
            })
        }
    })
}

function initSettingsValues(fromfile = false) {
    if (!fromfile) {
        $.getJSON('manifest.json', function (json) {
            console.log('Pulchra bookmarks v' + json['version'])
            $('#version').text('v' + json['version'])
            chrome.storage.local.set({'version': json['version']}, () => {})
        })
    }
    chrome.storage.local.get(null, function (res) {
        $('#cols').text(res['cols'])
        $('#range-cols').attr('value', res['cols'])
        $('#rows').text(res['rows'])
        $('#range-rows').attr('value', res['rows'])
        initRange()

        setCheckbox('checkbox-new-tab', res['new-tab'])
        setCheckbox('checkbox-show-quick', res['show-quick'])
        setCheckbox('checkbox-show-header', res['show-header'])
        setCheckbox('checkbox-show-clock', res['show-clock'])
        setTheme(res['theme'])
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
    chrome.storage.local.get(['rows'], function (res) {
        if (varDefined(res['rows'])){
            initSettingsValues()
            beautyfyView()
            initClock()
        }
        else {
            firstInstall()
        }
    })
})

document.addEventListener('scroll', function (event) {
    hideAllRightClick()
}, true)

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
        hideAllRightClick()
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