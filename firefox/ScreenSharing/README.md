Screen Sharing Extension for Firefox
====================================

This extension allows you to use the screen-sharing support in Firefox with the [OpenTok.js][ot] client library.

## Customizing the extension for your website

1. Fork (or simply download) this repo.

2. Edit the `install.rdf` file

   Change the values for following fields:

   * `id` -- The unique ID for the extension. See [this documentation][intall-manifests-id].
   * `name` -- The name of the extension, to be displayed in the Firefox UI.
   * `version` -- The version.
   * `creator` -- The name of the creator, to be displayed in the Firefox UI.
   * `targetApplication:maxVersion` -- Change this to the latest Firefox version listed on
     [this page][app-versions]. Note that Firefox will automatically perform
     [compatibility updates][compatibility-updates] for your extension.

   See the Mozilla [Install manifest documentation][install-manifests].

3. Edit the bootstrap.js file. Set the `gDomain` property to match the domain(s)
   your screen-sharing extension supports.

4. Package the extension by creating a zip file that contains the install.rdf and bootstrap.js
   files, with the file extension changed from zip to xpi. You can run the following on the
   command line:

        zip my-screensharing-extension.xpi install.rdf bootstrap.js

   Zipping up these two files is an easy way to create the extension (xpi) file. You can also use
   the [Mozilla Add-on SDK][add-on-sdk] to create the extension.

5. Firefox now requires that extensions be signed. For more information, see
   [this page on extension signing at mozilla.org][extension-signing]. However, you can test an
   unsigned extension in the Developer Edition and Nightly versions of Firefox (see the next
   section).

## Installing your extension

Install your extension in one of these ways:

   * Drag the file it onto a browser window in Firefox. You can also navigate to
     `about:addons`, click the settings button, and select "Install add-on from file".

   * Add a link to the file in a web page (such as the page that uses OpenTok screen-sharing).

     ```
      <a href="my-screensharing-extension.xpi">Install extension</a><br>
     ```

     Clicking the link installs the extension.

   * Publish your extension to the [Mozilla add-on site][add-ons].

Firefox now requires that extensions be signed. However, for testing the Developer Edition
and Nightly versions of Firefox include a setting to disable signature enforcement:

* Load the `about:config` page in Firefox.
* In the Search box, type `xpinstall.signatures.required`.
* Double-click the preference to set the value to `false`.

## Testing your extension

1. Locate the screensharing-test.html file in the root of this repo. Copy the file to a
   web server. (Screen-sharing access requires that the file be installed on a web server.
   You cannot load the file from a file: URL.)

2. Edit the following values in the file:

   * `apiKey` -- See this to your OpenTok API key. See https://dashboard.tokbox.com
   * `sessionId` -- An OpenTok session ID
   * `token` -- A valid token for the OpenTok session

   Note that the `extensionId` property applies to screen-sharing support for Chrome.

3. In Firefox, navigate to the screensharing-test.html URL on your server. Be sure to load
   the page via HTTPS. (Screen-sharing requires HTTPS.)

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. Click the **Share your screen** button to publish a screen-sharing
   stream.

4. Open a new Firefox window or tab and navigate to the HTTP screensharing-test.html URL.

   Upon connecting to the OpenTok session, the app publishes a stream using the camera
   as the video source. It also subscribes to the two streams published by the other page
   (the camera stream and the screen-sharing stream).

## Useful information:

* [Bootstrapped extensions][bootstrapped-extensions] -- Mozilla documentation on developing extensions
   for Firefox

* [Developer hub][mozilla-add-on-hub] -- The Mozilla developer hub for add-ons.

* [add-on-sdk][add-on-sdk] -- Mozilla add-on SDK documentation.

[ot]: http://tokbox.com/opentok/libraries/client/js/
[install-manifests]: https://developer.mozilla.org/en-US/Add-ons/Install_Manifests
[install-manifests-id]: https://developer.mozilla.org/en-US/Add-ons/Install_Manifests#id
[add-on-sdk]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest
[app-versions]: https://addons.mozilla.org/en-US/firefox/pages/appversions/
[add-ons]: https://addons.mozilla.org/en-US/firefox/extensions/
[bootstrapped-extensions]: https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
[mozilla-add-on-hub]: https://addons.mozilla.org/en-US/developers/
[compatibility-updates]: https://developer.mozilla.org/en-US/docs/Extension_Versioning,_Update_and_Compatibility#Compatibility_Updates
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
