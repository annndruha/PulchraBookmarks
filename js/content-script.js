$(document).ready(function(){
    $('#downloads').click(function() {
      chrome.tabs.create({"url": "chrome://downloads/"});
   });
    $('#bookmarks').click(function() {
      chrome.tabs.create({"url": "chrome://bookmarks/"});
   });
       $('#history').click(function() {
      chrome.tabs.create({"url": "chrome://history/"});
   });
       $('#settings').click(function() {
      chrome.tabs.create({"url": "chrome://settings/"});
   });
});