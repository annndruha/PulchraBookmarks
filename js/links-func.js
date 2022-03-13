function varDefined(link) {
    return link !== 'undefined' && link !== 'null' && link !== null && link !== undefined && link !== ''
}

function getDomain(link) {
    if (varDefined(link)) {
        if (link.includes('://')) {
            let name = link.split('/')
            return name[2].replace('www.', '')
        } else if (link.includes(':\\\\')) {
            let name = link.split('\\')
            return name[2].replace('www.', '')
        } else return link
    } else return ''
}

function getOpenLink(link) {
    let openlink = ''
    if (varDefined(link)) {
        if (!(link.includes('://'))) {
            openlink = 'https://' + link
        } else {
            openlink = link
        }
    }
    return openlink
}

function isNumeric(value) {
    return /^\d+$/.test(value)
}

function openLink(open_link, newtab='auto') {
    open_link = getOpenLink(open_link)
    if (varDefined(open_link)) {
        if (newtab === 'auto')
        {
            chrome.storage.local.get(['new-tab'], function (res) {
                if (res['new-tab']) {
                    chrome.tabs.create({'url': open_link})
                } else {
                    chrome.tabs.update({active: true, url: open_link})
                }})
        }
        else if (newtab === true) {
            chrome.tabs.create({'url': open_link})
        }
        else {
            chrome.tabs.update({active: true, url: open_link})
        }
    } else {
        alert('Empty link')
    }
}