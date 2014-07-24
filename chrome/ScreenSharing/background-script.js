// this background script is used to invoke desktopCapture API
// to capture screen-MediaStream.

var session = ['screen', 'window'];

chrome.runtime.onConnect.addListener(function (port) {

  port.onMessage.addListener(function(message) {
    if(message && message.method == 'getSourceId') {
      getSourceID(message.payload.requestId);
    }
  });

  function getSourceID(requestId) {
    chrome.desktopCapture.chooseDesktopMedia(session, port.sender.tab, function(sourceId) {
      console.log('sourceId', sourceId);
            
      // "sourceId" will be empty if permission is denied
      if(!sourceId || !sourceId.length) {
        return port.postMessage({ method: 'permissionDenied', payload: { requestId: requestId }});
      }
            
      // "ok" button is clicked; share "sourceId" with the
      // content-script which will forward it to the webpage
      port.postMessage({ method: 'sourceId', payload: { requestId: requestId, sourceId: sourceId } });
    });
  }

});
