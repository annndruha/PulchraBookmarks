//function toggleText(id) {
//        var button = document.getElementById(id).firstChild;
//        button.innerText = "pressed"
//        button.data = button.data == "Lock" ? "Unlock" : "Lock";
//}
//
//chrome.commands.onCommand.addListener(function (command) {
//    if (command == "scroll") {
//        // alert("Test"); this works
//        window.scrollTo(0, 500); // this doesn't work
//    }
//});

//const tabId = getTabId();
//chrome.scripting.executeScript(
//    {
//      target: {tabId: tabId, allFrames: true},
//      files: ['js/newtab.js'],
//    },
//    () => { ... });

function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage
  });


let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Extention installed');
  chrome.tabs.create({"url": "chrome://newtab/"});
});
