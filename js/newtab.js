function toggleText(id) {
        var button = document.getElementById(id).firstChild;
        button.innerText = "pressed"
        button.data = button.data == "Lock" ? "Unlock" : "Lock";