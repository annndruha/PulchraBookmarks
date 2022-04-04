function updateTime(){
    let now = new Date()
    $('#clock').text(now.toLocaleTimeString("ru-RU", {hour: '2-digit', minute:'2-digit'}))
    setTimeout(function () {
        updateTime()
    }, 100)
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
