function openSettings(){
    // let favDialog = document.getElementById('favDialog');
    // favDialog.showModal();
    let overlay = document.getElementsByClassName("settings-overlay")
    overlay.right = "0px"
}

function closeSettings(){
    let favDialog = document.getElementById('favDialog');
    favDialog.close();
}