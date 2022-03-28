function getDomain(link) {
    if (varDefined(link)) {
        if (link.includes('://')) {
            return link.split('/')[2].replace('www.', '')
        } else if (link.includes(':\\\\')) {
            return link.split('\\')[2].replace('www.', '')
        } else return link
    } else return ''
}

function textFromLink(link) {
    let text = getDomain(link)
    let text_splitted= text.split('.')
    if (text_splitted.length === 1){
        return text
    }

    let result
    if (isNumeric(text_splitted[text_splitted.length - 1])){
        result = text
    }
    else {
        result = text_splitted.slice(0, -1)
        result = (result.length === 1) ? result[0].capitalize() : result.join('.')
    }
    return  result
}

function getOpenLink(link) {
    return (varDefined(link)) ? (!(link.includes('://'))) ? 'https://' + link : link : ''
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