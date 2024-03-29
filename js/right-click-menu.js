$(document).on('click', function () {
    $('.click-menu').hide(0)
})

$(document).bind('contextmenu', function (e) {
    e.preventDefault()
    $('.click-menu').hide(0)
})

function hideAllRightClick() {
    $('.click-menu').hide(0)
}

function LinkRightClick(what_to_attach) {
    $(what_to_attach).bind('contextmenu', function (e) {
        e.preventDefault()
        e.stopPropagation()
        hideAllRightClick()
        let link = $(this).attr('link').toString()
        $('#click-menu-bottom-menu').css({top: e.clientY + 'px', left: e.clientX + 'px'}).show(100)
        $('.click-menu-row').off('click').on('click', {param1: 'link'}, function (e) {
            e.stopPropagation()
            hideAllRightClick()
            switch ($(this).attr('data-action')) {
                case 'new-tab':
                    openLink(link, true)
                    break
            }
        })
    })
}

function gridItemRightClick() {
    $('.grid-item').unbind('contextmenu').bind('contextmenu', function (e) {
        e.preventDefault()
        e.stopPropagation()
        hideAllRightClick()
        let id = $(this).find('.grid-item-inside').attr('id').toString()
        let link = $(this).find('.grid-item-inside').attr('link').toString()

        if ($(this).find('.empty-icon').length !== 0) {
            $('#click-menu-grid-item-edit').css({top: e.clientY + 'px', left: e.clientX + 'px'}).show(100)
        } else {
            $('#click-menu-grid-item').css({top: e.clientY + 'px', left: e.clientX + 'px'}).show(100)
        }

        $('.click-menu-row').off('click').on('click', {param1: 'link', param2: 'id'}, function (e) {
            e.stopPropagation()
            hideAllRightClick()
            switch ($(this).attr('data-action')) {
                case 'new-tab':
                    openLink(link, true)
                    break
                case 'edit':
                    setTimeout(() => {
                        editBookmark('icon-' + id)
                    }, 20)
                    break
                case 'delete':
                    deleteMark(id)
                    break
            }
        })
    })
}