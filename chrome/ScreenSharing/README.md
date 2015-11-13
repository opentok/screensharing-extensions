Screen Sharing Extension for Chrome
===================================

This extension allows you to use the screen sharing support in Chrome with the [OpenTok.js][ot] client library.

This is a variation of [the extension][mkext] created by [Muaz Khan][mkgh] with some tweaks to make it more suitable for use with the OpenTok API.

This is version 2 of the extension. With version 2, the client can use the extension immediately after installing it using the inline installation method, without reloading the page. When calling the `OT.registerScreenSharingExtension()` method (see below), you must now pass in the version number, 2.

## Customizing the extension for your website

1. Fork (or simply download) this github repo.

2. Edit the contents of the `manifest.json` file. Be sure to change the `name` and `author`
   settings, and ensure that `matches` is set to your own domains only. You will also want to
   replace the icon files (logo16.png, logo48.png, logo128.png, and logo128transparent.png)
   with your own website logos. You should change the `version` setting with each new version
   of your extension. And you may want to change the `description`.

For more information, see the [Chrome extension manifest documentation][manifest].

See the following sections for testing and deploying your extension.

[ot]: http://tokbox.com/opentok/libraries/client/js/
[mkext]: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/Chrome-Extensions/desktopCapture
[mkgh]: https://github.com/muaz-khan
[manifest]: https://developer.chrome.com/extensions/manifest

## Testing your extension

See the [Chrome extension documentation on loading and unpacked extension][load-unpacked].

In your app, you need to register the ID of the extension using the
<code>OT.registerScreenSharingExtension()</code> method (defined in the OpenTok.js library).

[load-unpacked]: https://developer.chrome.com/extensions/getstarted#unpacked

## Packaging and deploying your extension for use at your website

For your production website, you need to package your screen-sharing extension and register it
in the Chrome Web Store.


See the [Chrome documentation on publishing your app][publish] for details on publishing your extension in the Chrome Web Store.

You can use the [Chrome inline installation][inline] to initiate installation of your extension
"inline" from your site.

In your app, you need to register the ID of the extension using the
<code>OT.registerScreenSharingExtension()</code> method (defined in the OpenTok.js library).

[publish]: https://developer.chrome.com/webstore/publish
[inline]: https://developer.chrome.com/webstore/inline_installation

## Testing your extension

1. Locate the screensharing-test.html file in the root of this repo. Copy the file to a
   web server. (Screen-sharing access requires that the file be installed on a web server.
   You cannot load the file from a file: URL.)

2. Edit the following values in the file:

   * `apiKey` -- See this to your OpenTok API key. See https://dashboard.tokbox.com
   * `sessionId` -- An OpenTok session ID
   * `token` -- A valid token for the OpenTok session
   * `extensionId` -- The ID of your screen-sharing extension (see the previous two sections)

3. In Firefox, navigate to the screensharing-test.html URL on your server. Be sure to load
   the page via HTTPS. (Screen-sharing requires HTTPS.)

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. Click the **Share your screen** button to publish a screen-sharing
   stream.

4. Open a new Firefox window or tab and navigate to the HTTP screensharing-test.html URL.

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. It also subscribes to the two streams published by the other page
   (the camera stream and the screen-sharing stream).

## How to use with OpenTok.js?

After installing the extension (either locally, or after publishing through the Chrome Web Store), get the extension ID from `chrome://extensions` (it looks like `ffngmcfincpecmcgfdpacbdbdlfeeokh`).

```html
<script src="//static.opentok.com/v2/js/opentok.min.js"></script>
```

Register you extension:

```javascript

OT.registerScreenSharingExtension('chrome', 'YOUR-EXTENSION-ID', 2);

```

To test if the extension is available you can use the `OT.checkScreenSharingCapability()` method:

```javascript

OT.checkScreenSharingCapability(function(response) {
  if (!response.supported || response.extensionRegistered === false) {
    // This browser does not support screen sharing
  } else if (response.extensionInstalled === false) {
    // prompt to install the response.extensionRequired extension
  } else {
    // Screen sharing is available
  }
});

```

If you are using [Inline Installation][inline] their are additional APIs you can use.

To publish a screen:

```javascript
var el = document.createElement('div');
document.body.appendChild(el);
var pub = OT.initPublisher(el, {
  name: 'Screen',
  mirror: false,
  audioSource: null,
  videoSource: 'screen',
  maxResolution: { width: 1280, height: 720 }, // max resolution to encode screen in
  width: 1280, // width of preview
  height: 720, // height of preview
}, function(error) {
  if (error) {
    // handle the error
  }
  // resize the publisher preview to match the encoded video
  pub.element.style.width = pub.videoWidth() + 'px';
  pub.element.style.height = pub.videoHeight() + 'px';
})
```

## Browser Support

Google Chrome (version 34+) only.

## More information

See the [OpenTok.js screen-sharing documentation][ot-screensharing].

[ot-screensharing]: https://tokbox.com/opentok/tutorials/screen-sharing/js/

## License

Released under the [MIT license](http://opensource.org/licenses/MIT).
