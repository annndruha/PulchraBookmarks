let button = document.createElement('input');
button.type = 'button';
button.value = 'To RED';
let child = document.body.firstChild;
document.body.insertBefore(button, child);
button.addEventListener('click', button_click);

function button_click(){
document.body.style.backgroundColor = 'red';
}