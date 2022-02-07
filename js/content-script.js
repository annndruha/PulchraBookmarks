//let button = document.createElement('input');
//button.type = 'button';
//button.value = 'To RED';
//let child = document.body;
//document.body.insertBefore(button, child);
//button.addEventListener('click', button_click);
//
//function button_click(){
//document.body.style.backgroundColor = 'red';
//}

//var button = document.getElementById("link")
//button.addEventListener('click', button_click);
//function button_click(){
//console.log("Fuck chrome")
//}

//$('#text').on('click', function() {
//   console.log("Fuck chrome")
//});


$(document).ready(function(){
   $('#text').click(function() {
      alert('You clicked a label named ' + $(this).html() +'!');
      console.log("Fuck chrome")
   });
});