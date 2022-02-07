function makeRows(rows, cols) {
    const container = document.getElementById("container");
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    //cell.innerText = (c + 1);
    container.appendChild(cell).className = "grid-item";
  };
};

makeRows(3, 5);

//value = 5;
//chrome.storage.local.set({key: value}, function() {
//  console.log('Value is set to ' + value);
//});
//chrome.storage.local.get(['key'], function(result) {
//  console.log('Value currently is ' + result.key);
//});