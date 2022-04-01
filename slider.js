for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min === '' ? '0' : e.min);
    e.style.setProperty('--max', e.max === '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

document.addEventListener("DOMContentLoaded", () => {

})

$('#theme').on('change', function () {
    let theme = $(this).val()
    if(theme === 'Windows 11 Light') {
        // $('body').css('background-color', '#000')
        document.getElementById('colorsheet').href = 'css/colorsheet_w11_light.css'
    }
    if (theme === 'Windows 11 Dark'){
        // $('body').css('background-color', '#fff')
        document.getElementById('colorsheet').href = 'css/colorsheet_w11_dark.css'
    }
})