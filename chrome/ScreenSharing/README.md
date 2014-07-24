Screen Sharing Extension for Chrome
===================================

This extension allows you to use the Screen Sharing support in Chrome with the [OpenTok.js][ot] client library.

You should fork (or simply download) this repo, modify `manifest.json` (change name, author, and ensure `matches` is set to your own domains only) and then publish on the Google App Store.

Useful information:

* [Get started][getstarted] covers how to load the extension into Chrome on your own workstation.
* [Manifest][manifest] documentation for what properties mean what.
* [Publishing Your App][publish] walks you through publishing your extension in the Chrome Web Store.
* [Inline Installation][inline] makes installation smoother.

This is a variation of [the extension][mkext] created by [Muaz Khan][mkgh] with some tweaks to make it more suitable for use with the OpenTok API.

[ot]: http://tokbox.com/opentok/libraries/client/js/
[mkext]: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/Chrome-Extensions/desktopCapture
[mkgh]: https://github.com/muaz-khan
[getstarted]: https://developer.chrome.com/extensions/getstarted#unpacked
[manifest]: https://developer.chrome.com/extensions/manifest
[publish]: https://developer.chrome.com/webstore/publish
[inline]: https://developer.chrome.com/webstore/inline_installation

## How to use with OpenTok.js?

After installing the extension (either locally, or after publishing through the Chrome Web Store), get the extension ID from `chrome://extensions` (it looks like `ffngmcfincpecmcgfdpacbdbdlfeeokh`).

Include the OTChromeScreenSharingExtensionHelper.js file (found in the extension) in your website - you'll can't load it directly from the extension.

```html
<script src="//static.opentok.com/webrtc/v2.2/js/opentok.min.js"></script>
<script src="OTChromeScreenSharingExtensionHelper.js"></script>
```

Create a OTChromeScreenSharingExtensionHelper object:

```javascript
var screenSharing = OTChromeScreenSharingExtensionHelper('YOUR-EXTENSION-ID');
```

To test if the extension is available you can use the `isAvailable` method:

```javascript
screenSharing.isAvailable(function(extensionIsAvailable) {
    if(extensionIsAvailable) {
        // prompt the user to share their screen!
    } else {
        // prompt the user to install - see the publish your app & install inline links above.
    }
});
```

If you are using [Inline Installation][inline] their are additional APIs you can use.

To have the user pick the screen or window to share use:

```javascript
screenSharing.getVideoSource(function(error, source) {
    if (error) {
        // either the extension is not available or the user clicked cancel
    } else {
        // pass `source` to OT.initPublisher().
    }
});
```

To publish using that source:

```javascript
var el = document.createElement('div');
document.body.appendChild(el);
OT.initPublisher(el, {
    name: 'Screen',
    mirror: false,
    audioSource: null,
    videoSource: source, // from getVideoSource
    maxResolution: '1280x720', // max resolution to encode screen in
    width: 1280, // width of preview
    height: 720, // height of preview
}, function(error) {
    if(error) {
        // handle the error
    }
    // resize the publisher preview to match the encoded video
    pub.element.style.width = pub.videoWidth() + 'px';
    pub.element.style.height = pub.videoHeight() + 'px';
})
```

## How to test on HTTP?

Enable a command-line switch on chrome canary:

```
--allow-http-screen-capture
```

Ref: [http://kurtextrem.github.io/ChromiumFlags/#allow-http-screen-capture][kgh]
[kgh]: http://kurtextrem.github.io/ChromiumFlags/#allow-http-screen-capture

## Browser Support

Google Chrome (version 34+) only.

## License

TBD
