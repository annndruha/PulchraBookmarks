function openSettings() {
    $(".settings").css("right", 0)
    $(".app-container").css("margin-right", "370px")
    $.getJSON("manifest.json", function (json) {
        console.log(json["version"])
        let ver = document.getElementById("version")
        ver.innerText = "v" + json["version"]
    })
}

function closeSettings() {
    $(".settings").css("right", "-800px")
    $(".app-container").css("margin-right", "0px")
}

$('#range-rows').on('input', function (e) {
    let rows =parseInt(e.target.value)
    document.getElementById("rows").innerText = rows.toString()
    let cols = parseInt(document.getElementById("cols").innerText)
    chrome.storage.local.set({["rows"]: rows}, function () {
        console.log("rows set:", rows)
    })
    makeGrid(cols, rows)
    beautyfyView()
})

$('#range-cols').on('input', function (e) {
    let cols = parseInt(e.target.value)
    document.getElementById("cols").innerText = cols.toString()
    let rows = parseInt(document.getElementById("rows").innerText)
    chrome.storage.local.set({["cols"]: cols}, function () {
        console.log("cols set:", cols)
    })
    makeGrid(cols, rows)
    beautyfyView()
})