function varDefined(v) {
    return v !== 'undefined' && v !== 'null' && v !== null && v !== undefined && v !== ''
}

function isNumeric(v) {
    return /^\d+$/.test(v)
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function setCheckbox(checkbox_name, v){
    if (v){
        $('#' + checkbox_name).attr('checked', '')
    }
    else {
        $('#' + checkbox_name).removeAttr('checked')
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