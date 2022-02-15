function openSettings() {
    $('.settings').css('right', 0)
    $('.app-container').css('margin-right', '370px')
    $.getJSON('manifest.json', function (json) {
        let ver = document.getElementById('version')
        ver.innerText = 'v' + json['version']
    })
    $('#settings-open-button').css('cursor', 'not-allowed')
    $('#settings-cancel-overlay').css('right', '370px')
    updateBinds()
}

function closeSettings() {
    $('.settings').css('right', '-800px')
    $('.app-container').css('margin-right', '0px')
    $('#settings-open-button').css('cursor', 'pointer')
    $('#settings-cancel-overlay').css('right', '5000px')
    updateBinds()
}

$('#range-rows').unbind('input').on('input', function (e) {
    let rows =parseInt(e.target.value)
    document.getElementById('rows').innerText = rows.toString()
    let cols = parseInt(document.getElementById('cols').innerText)
    chrome.storage.local.set({['rows']: rows}, function () {
        console.log('rows set:', rows)
    })
    makeGrid(cols, rows)
    beautyfyView()
    updateBinds()
    loadAllIcons()
})

$('#range-cols').unbind('input').on('input', function (e) {
    let cols = parseInt(e.target.value)
    document.getElementById('cols').innerText = cols.toString()
    let rows = parseInt(document.getElementById('rows').innerText)
    chrome.storage.local.set({['cols']: cols}, function () {
        console.log('cols set:', cols)
    })
    makeGrid(cols, rows)
    beautyfyView()
    updateBinds()
    loadAllIcons()
})