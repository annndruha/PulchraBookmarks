chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.tabs.create({"url": "chrome://newtab/"});
});

//function toggleText() {
//        var button = document.getElementById("hhh").firstChild;
//        button.innerText = "pressed"
//        button.data = button.data == "Lock" ? "Unlock" : "Lock";
//}
//
//function reddenPage() {
//  document.body.style.backgroundColor = 'red';
//}

//async function getCurrentTab() {
//  let queryOptions = { active: true, currentWindow: true };
//  let [tab] = await chrome.tabs.query(queryOptions);
//  return tab;
//}
//
//let tab = await getCurrentTab();
//
//chrome.scripting.executeScript({
//  target: {tabId: tab.id},
//  files: ['content-script.js']
//});


//function hellYeah(text) {
//  document.getElementById("text-holder").innerHTML = text;
//}

//document.addEventListener('DOMContentLoaded', function() {
//    var link = document.getElementById('link');
//    link.addEventListener('click', function() {
//        hellYeah('xxx');
//    });
//});

//chrome.action.onClicked.addListener((tab) => {
//  chrome.scripting.executeScript({
//    target: { tabId: tab.id },
//    function: reddenPage
//  });
//});