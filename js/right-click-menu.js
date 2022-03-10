function updateRightClick(){
    clickMenuRoot()
}

function clickMenuRoot(){
    $('body').bind("contextmenu", function (event) {
        event.preventDefault();
        $(".click-menu-root").finish().toggle(100).
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        })
        console.log(event.pageY)
    }).bind("mousedown", function (e) {
        if (!$(e.target).parents(".click-menu-root").length > 0) {
            $(".click-menu-root").hide(100)
        }
    })

    $(".click-menu-root li").on('click', function(){
        switch($(this).attr("data-action")) {
            case "first": alert("first"); break;}
        $(".click-menu-root").hide(100);
    });
}
