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
    chrome.storage.local.set({["rows"]: rows}, function () {
        console.log("rows set:", rows)
    })
    makeGrid()
})

$('#range-cols').on('input', function (e){
    let cols = e.target.value
    document.getElementById("cols").innerText = cols
    chrome.storage.local.set({["cols"]: cols}, function () {
        console.log("cols set:", cols)
    })
    makeGrid()
})