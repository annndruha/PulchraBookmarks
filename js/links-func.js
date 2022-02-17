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
        if (!(link.startsWith('https://')) && !(link.startsWith('http://'))) {
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