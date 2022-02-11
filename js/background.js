chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.tabs.create({"url": "chrome://newtab/"});
})