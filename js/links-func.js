function varDefined(v) {
    return v !== 'undefined' && v !== 'null' && v !== null && v !== undefined && v !== ''
}

function getDomain(link) {
    if (varDefined(link)) {
        if (link.includes('://')) {
            return link.split('/')[2].replace('www.', '')
        } else if (link.includes(':\\\\')) {
            return link.split('\\')[2].replace('www.', '')
        } else return link
    } else return ''
}

function getOpenLink(link) {
    return (varDefined(link)) ? (!(link.includes('://'))) ? 'https://' + link : link : ''
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

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    },
    enumerable: false
})

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}