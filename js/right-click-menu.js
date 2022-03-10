function bottomItemRightClick() {
    // $("#app-container").bind("contextmenu", function (event){
    //     $("#click-menu-bottom-menu").hide(100)
    // })
    $(".bm-item").bind("contextmenu", function (e) {
        e.preventDefault()
        e.stopPropagation()
        let link = $(this).attr('link').toString()
        $("#click-menu-bottom-menu").off('click').on('click', {param: 'link'}, function (e) {
            e.stopPropagation()
            $(this).hide(100)
            openLink(link, true)
        }).finish().toggle(100).css({top: e.pageY + "px", left: e.pageX + "px"})
    })
    //     .bind("mousedown", function (e) {
    //     //if (!$(e.target).parents("#click-menu-bottom-menu").length > 0) {
    //         $("#click-menu-bottom-menu").hide(100)
    //     //}
    // })
}


// function gridItemRightClick() {
//     $(".grid-item").bind("contextmenu", function (event) {
//         event.preventDefault()
//         let id = $(this).find('.grid-item-inside').attr('id').toString()
//         let link = $(this).find('.grid-item-inside').attr('link').toString()
//         $("#click-menu-grid-item").off('click').on('click', {param1: 'link', param2:'id'}, function (e) {
//             e.stopPropagation()
//             $(this).hide(100)
//             console.log($(this).attr('class'))
//             //console.log($(this).attr("data-action"))
//             switch ($(this).attr("data-action")) {
//                 case "new-tab":
//                     openLink(link, true)
//                     break
//                 case "edit":
//                     editBookmark('img-'+id)
//                     break
//                 case "delete":
//                     alert("delete");
//                     break
//             }
//         }).finish().toggle(100).css({top: event.pageY + "px", left: event.pageX + "px"})
//     }).bind("mousedown", function (e) {
//         if (!$(e.target).parents("#click-menu-grid-item").length > 0) {
//             $("#click-menu-grid-item").hide(100)
//         }
//     })
// }


// function gridItemRightClick(){
//     $('.grid-item').bind("contextmenu", function (event) {
//         event.preventDefault();
//         $("#click-menu-grid-item").finish().toggle(100).
//         css({
//             top: event.pageY + "px",
//             left: event.pageX + "px"
//         })
//         console.log(event.pageY)
//     }).bind("mousedown", function (e) {
//         if (!$(e.target).parents("#click-menu-grid-item").length > 0) {
//             $("#click-menu-grid-item").hide(100)
//         }
//     })
//     $("#click-menu-grid-item div").on('click', function(){
//         switch($(this).attr("data-action")) {
//             case "new-tab": alert("new-tab"); break;
//             case "edit": alert("edit"); break;
//             case "delete": alert("delete"); break;
//         }
//         $("#click-menu-grid-item").hide(100)
//     })
// }
