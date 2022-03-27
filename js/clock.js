function setTime(){
    let now = new Date()
    $('#clock').text(now.toLocaleTimeString("ru-RU", {hour: '2-digit', minute:'2-digit'}))
}


function updateTime(){
    setTime()
    setTimeout(function () {
        updateTime()
    }, 500)
}

function initClock(){
    chrome.storage.local.get(['show-clock'], function (res) {
        if (res['show-clock']) {
            $('.clock-div').css('display', 'block')
            $('.content').css('padding-top', '35px')
        } else {
            $('.clock-div').css('display', 'none')
            $('.content').css('padding-top', '120px')
        }
        updateTime()
    })
}


$('#show-clock').on('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
    chrome.storage.local.get(['show-clock'], function (res) {
        if (res['show-clock']) {
            chrome.storage.local.set({['show-clock']: false}, () => {})
            document.getElementById('checkbox-show-clock').removeAttribute('checked')
            $('.clock-div').css('display', 'none')
            $('.content').css('padding-top', '120px')

        } else {
            chrome.storage.local.set({['show-clock']: true}, () => {})
            document.getElementById('checkbox-show-clock').setAttribute('checked', '')
            $('.clock-div').css('display', 'block')
            $('.content').css('padding-top', '35px')
        }
    })
})
