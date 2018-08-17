var toggle = false;

chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('Icon clicked');
  toggle = !toggle;

  if(toggle)
  {
    chrome.browserAction.setIcon({path: "on.png"});
    var currTab;
    //Get current tab to pass in as argument. 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currTab = tabs[0];});
    chrome.tabs.executeScript(currTab, {file:"content.js"});
  }
  else
  {
    chrome.browserAction.setIcon({path: "off.png"});
  }

});

/*
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get('state', function(data) {
    if (data.state === 'on') {
      chrome.storage.sync.set({state: 'off'});
      //do something, removing the script or whatever
    } else {
      chrome.storage.sync.set({state: 'on'});
      //inject your script
    }
  });
});
*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab)
{
  if (changeInfo.status == 'complete' && toggle)
  {
    var scripts = [
      //'sorttable.js',
      'content.js'
    ];
    scripts.forEach(function(script)
    {
      chrome.tabs.executeScript(null, { file: script }, function(resp)
      {
        if (script!=='content.js') return;
        // Your callback code here
      });
    });
  }
})
