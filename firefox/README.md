Screen Sharing Extension for Firefox
====================================

This extension allows you to use the screen-sharing support in Firefox with the [OpenTok.js][ot] client library.

Note: Instead of using a Firefox extension for screen sharing, you can have Mozilla add your domain
to the browser's screen-sharing whitelist. See [this Mozilla.org page][whitelist] for details.
Note that it can take a number of weeks for Mozilla to approve your domain's inclusion in
the screen-sharing whitelist and include it in a shipping version of Firefox.

## Prerequisites for building your extension

To build your screen-sharing extension for Firefox, you need to install Node Package Manager (npm) and the jpm Node library.

Then, navigate to the ScreenSharing subdirectory, and run the following:

`./node_modules/jpm xpi`

This generates the screen-sharing extension.

## Customizing the extension for your website

1. Fork (or simply download) this repo.

2. Edit the `package.json` file

   Change the values for following fields:

   * `id` -- The unique ID for the extension. See [this documentation][package-json-id].
   * `title` -- The name of the extension, to be displayed in the Firefox UI.
   * `description` -- The description of the extension, to be displayed in the
     Firefox UI.
   * `version` -- The version.
   * `creator` -- The name of the creator, to be displayed in the Firefox UI.

   See the Mozilla [Add-on package.json documenation][package-json].

3. Edit the index.js file. Set the `gDomain` property to match the domain(s)
   your screen-sharing extension supports.

4. Package the extension by running the following on the
   command line:

         ./node_modules/.bin/jpm xpi

5. Firefox now requires that extensions be signed. For more information, see
   [this page on extension signing at mozilla.org][extension-signing]. However, you can test an
   unsigned extension in the Developer Edition and Nightly versions of Firefox (see the next
   section).

## Installing your extension

Firefox now requires that extensions be signed. However, for testing the Developer Edition
and Nightly versions of Firefox include a setting to disable signature enforcement:

* Load the `about:config` page in Firefox.
* In the Search box, type `xpinstall.signatures.required`.
* Double-click the preference to set the value to `false`.

Install your extension in one of these ways:

   * Drag the file it onto a browser window in Firefox. You can also navigate to
     `about:addons`, click the settings button, and select "Install add-on from file".

   * Add a link to the file in a web page (such as the page that uses OpenTok screen-sharing).

     ```
      <a href="my-screensharing-extension.xpi">Install extension</a><br>
     ```

     Clicking the link installs the extension.

   * Publish your extension to the [Mozilla add-on site][add-ons].

## Testing your extension

1. Locate the screensharing-test.html file in the root of this repo. Copy the file to a
   web server. (Screen-sharing access requires that the file be installed on a web server.
   You cannot load the file from a file: URL.)

2. Edit the following values in the file:

   * `apiKey` -- Set this to your OpenTok API key. See https://dashboard.tokbox.com
   * `sessionId` -- An OpenTok session ID
   * `token` -- A valid token for the OpenTok session

   Note that the `extensionId` property applies to screen-sharing support for Chrome.

3. In Firefox, navigate to the screensharing-test.html URL on your server. Be sure to load
   the page via HTTPS. (Screen-sharing requires HTTPS.)

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. Click the **Share your screen** button to publish a screen-sharing
   stream.

4. Open a new Firefox window or tab and navigate to the HTTPS screensharing-test.html URL.

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. It also subscribes to the two streams published by the other page
   (the camera stream and the screen-sharing stream).

## Useful information:

* [Mozilla Add-on SDK][add-on-sdk] -- Mozilla documentation on developing add-ons
   for Firefox

* [Developer hub][mozilla-add-on-hub] -- The Mozilla developer hub for add-ons.

* [add-on-sdk][add-on-sdk] -- Mozilla add-on SDK documentation.

[ot]: http://tokbox.com/opentok/libraries/client/js/
[whitelist]: https://wiki.mozilla.org/Screensharing
[package-json]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/package_json
[package-json-id]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/package_json#id
[add-on-sdk]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest
[add-ons]: https://addons.mozilla.org/en-US/firefox/extensions/
[add-on-sdk]: https://developer.mozilla.org/en-US/Add-ons/SDK
[mozilla-add-on-hub]: https://addons.mozilla.org/en-US/developers/
[extension-signing]: https://wiki.mozilla.org/Add-ons/Extension_Signing

## Using the extension with OpenTok.js

To publish a screen:

```javascript
var publisher = OT.initPublisher('target-element-id', {
  name: 'Screen',
  audioSource: null,
  videoSource: 'screen',
  maxResolution: { width: 1280, height: 720 }, // max resolution to encode screen in
  width: 1280, // width of preview
  height: 720, // height of preview
}, function(error) {
  if(error) {
    // handle the error
  }
  // resize the publisher preview to match the encoded video
  pub.element.style.width = pub.videoWidth() + 'px';
  pub.element.style.height = pub.videoHeight() + 'px';
});
```

## More information

See the [OpenTok.js screen-sharing documentation][ot-screensharing].

[ot-screensharing]: https://tokbox.com/opentok/tutorials/screen-sharing/js/

## License

Released under the [MIT license](http://opensource.org/licenses/MIT).
