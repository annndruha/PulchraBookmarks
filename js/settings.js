function openSettings(){
    $(".settings").css("right", 0)
    $.getJSON("manifest.json", function(json) {
        console.log(json["version"]);
        let ver = document.getElementById("version")
        ver.innerText = "v"+json["version"]
    });
}

function closeSettings(){
    $(".settings").css("right", "-800px")
}

$('#range-rows').on('input', function (e){
    let rows = e.target.value
    document.getElementById("rows").innerText = rows
    chrome.storage.local.set({["rows"]: rows}, function () {})
})

$('#range-cols').on('input', function (e){
    let cols = e.target.value
    document.getElementById("cols").innerText = cols
    chrome.storage.local.set({["cols"]: cols}, function () {})
})
$(window).on("load", function () {
    pasteSettingsValues()
})

function pasteSettingsValues(){
    chrome.storage.local.get(["cols"], function (result) {
        document.getElementById("cols").innerText = result["cols"]
    })
    chrome.storage.local.get(["rows"], function (result) {
        document.getElementById("rows").innerText = result["rows"]
    })
}