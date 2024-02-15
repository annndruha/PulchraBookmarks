function setStorageAndReload(storageData, message) {
    chrome.storage.local.set(storageData, () => {
        console.log(message)
        initSettingsValues()
        initClock()
        compareJson()
        setTimeout(loadAllIcons, 200)
    })
}

function firstInstall() { // Storage clear
    chrome.storage.sync.get(null, (res) => {
        if (varDefined(res['rows'])) {
            setStorageAndReload(res, 'Bookmarks loaded from cloud')
        } else {
            $.getJSON('default-icons.json', function (json) {
                setStorageAndReload(json, 'Bookmarks loaded from template')
            })
        }
    })
}

function initSettingsValues(fromfile = false) {
    if (!fromfile) {
        $.getJSON('manifest.json', function (json) {
            console.log('Pulchra Bookmarks v' + json['version'])
            $('#version').text('v' + json['version'])
            chrome.storage.local.set({'version': json['version']}, () => {
            })
        })
    }
    chrome.storage.local.get(['cols', 'rows', 'new-tab', 'show-quick', 'show-header', 'show-clock', 'keybinds'], function (res) {
        $('#cols').text(res['cols'])
        $('#range-cols').attr('value', res['cols'])
        $('#rows').text(res['rows'])
        $('#range-rows').attr('value', res['rows'])
        setCheckbox('checkbox-new-tab', res['new-tab'])
        setCheckbox('checkbox-keybinds', res['keybinds'])
        setCheckbox('checkbox-show-quick', res['show-quick'])
        setCheckbox('checkbox-show-header', res['show-header'])
        setCheckbox('checkbox-show-clock', res['show-clock'])
        makeGrid(parseInt(res['cols']), parseInt(res['rows']), fromfile)
        loadAllIcons()
    })
    chrome.storage.local.get(['background'], function (res) {
        if (varDefined(res['background'])) {
            $('body').css('background-image', 'url(' + res['background'] + ')')
        } else {
            $('body').css('background-image', 'url(../images/backgrounds/windows.jpg)')
            $('#reset-background').css('display', 'none')
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['rows'], function (res) {
        if (varDefined(res['rows'])) {
            initSettingsValues()
            initClock()
            compareJson()
        } else {
            firstInstall()
        }
    })
})

document.addEventListener('scroll', function () {
    hideAllRightClick()
}, true)


window.addEventListener('resize', () => {
    initClock()
})

$(document).on('keyup', function (e) {
    if (e.key === "Escape") {
        closeSettings()
        deleteEditPopup()
        hideAllRightClick()
        deleteRootElementTree()
    }
    if ($('#edit_popup').attr('data-status') === 'closed') {
        console.log('Pressed', e.code)
        chrome.storage.local.get(['keybinds'], function (res) {
            if (res['keybinds']) {
                $(keybinds_codes[e.code]).click()
            }
        })
    } else {
        if (e.key === "Enter") {
            saveEdit()
        }
    }
})
