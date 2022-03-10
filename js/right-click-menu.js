function updateRightClick(){
    //bottomItemRightClick()
    //gridItemRightClick()
}

function bottomItemRightClick(){
    $('.').bind("contextmenu", function (event) {
        event.preventDefault()
        $("#click-menu-bottom-menu").finish().toggle(100).
        css({top: event.pageY + "px", left: event.pageX + "px"})
    }).bind("mousedown", function (e) {
        if (!$(e.target).parents("#click-menu-bottom-menu").length > 0) {
            $("#click-menu-bottom-menu").hide(100)}
    })

    $("#click-menu-bottom-menu div").on('click', function(){
        switch($(this).attr("data-action")) {
            case "new-tab": alert("new-tab"); break;
            case "edit": alert("edit"); break;
            case "delete": alert("delete"); break;
        }
        $("#click-menu-bottom-menu").hide(100)
    })
}

function gridItemRightClick(){
    $('.grid-item').bind("contextmenu", function (event) {
        event.preventDefault();
        $("#click-menu-grid-item").finish().toggle(100).
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        })
        console.log(event.pageY)
    }).bind("mousedown", function (e) {
        if (!$(e.target).parents("#click-menu-grid-item").length > 0) {
            $("#click-menu-grid-item").hide(100)
        }
    })
    $("#click-menu-grid-item div").on('click', function(){
        switch($(this).attr("data-action")) {
            case "new-tab": alert("new-tab"); break;
            case "edit": alert("edit"); break;
            case "delete": alert("delete"); break;
        }
        $("#click-menu-grid-item").hide(100)
    })
}
