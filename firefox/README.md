Screen Sharing Extension for Firefox
====================================

This extension allows you to use the screen-sharing support with the [OpenTok.js][ot]
client library in older versions of Firefox.

**Important:** As of Firefox 52, an extension (or whitelist listing) is no longer needed
for screen sharing. Firefox prompts the end user for access to a screen, window, or
application, as it would for access to the camera. For more information, see
[this Mozilla blog post](https://wiki.mozilla.org/Screensharing). The Firefox extension
in this repo is only included to support older versions of Firefox.

Note: Instead of using a Firefox extension for screen sharing, you can have Mozilla add your domain
to the browser's screen-sharing whitelist. See [this Mozilla.org page][whitelist] for details.
Note that it can take a number of weeks for Mozilla to approve your domain's inclusion in
the screen-sharing whitelist and include it in a shipping version of Firefox.

This is version 2 of the extension. With version 2, the `extensionsInstalled` property of the object passed into callback method of the
`OT.registerScreenSharingExtension()` method is set to `true` when the extension is installed and set to work in your site's domain.
OpenTok 2.8.0 or later is required for this version of the extension.

## Prerequisites for building your extension

To build your screen-sharing extension for Firefox, you need to [install Node and Node Package
Manager][npm] (npm). Then use npm to install the [jpm][jpm] package. In a command-line terminal,
enter the following:

    npm install jpm --global

## Customizing the extension for your website

1. Fork (or simply download) this repo.

2. Edit the `package.json` file in the firefox/ScreenSharing directory.

   Change the values for following fields:

   * `id` -- The unique ID for the extension. See [this documentation][package-json].
   * `title` -- The name of the extension, to be displayed in the Firefox UI.
   * `description` -- The description of the extension, to be displayed in the
     Firefox UI.
   * `version` -- The version.
   * `author` -- The name of the creator, to be displayed in the Firefox UI.
   * `private-browsing` -- Set this to `false` if you want to disable the extension
     in [private browsing mode][private-browsing].

   See the Mozilla [Add-on package.json documentation][package-json].

3. Edit the index.js file. Set the `gDomain` property to match the domain(s)
   your screen-sharing extension supports. Set this to an array of one or more strings.

   Use an asterisk at the beginning of the string to match multiple subdomains. For example,
   the following `gDomain` values match pages at `https://example.com/bar` and
   `https://foo.example.com/bar`:

         ['*.example.com']
         ['*.example.com', '*.another-domain.com']

   Omit the asterisk at the beginning of the string to match a specific subdomain. For example,
   the following `gDomain` values match `https://foo.example.com/bar` but not `https://example.com/bar`:

         ['foo.example.com']
         ['foo.example.com', '*.another-domain.com']

   Do _not_ include the protocol, `'https://'`, in the `gDomain` strings. And do _not_ include an
   asterisk before a _subdomain_ (as in `['*.foo.example.com’]`).

4. In the terminal, navigate to the firefox/ScreenSharing directory. Then package the extension
   by running the following on the command line:

         jpm xpi

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

[ot]: http://tokbox.com/opentok/libraries/client/js/
[whitelist]: https://wiki.mozilla.org/Screensharing
[npm]: https://nodejs.org/en/download/
[jpm]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm
[private-browsing]: https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history
[package-json]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/package_json
[add-on-sdk]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest
[add-ons]: https://addons.mozilla.org/en-US/firefox/extensions/
[add-on-sdk]: https://developer.mozilla.org/en-US/Add-ons/SDK
[mozilla-add-on-hub]: https://addons.mozilla.org/en-US/developers/
[extension-signing]: https://wiki.mozilla.org/Add-ons/Extension_Signing
[ot-screensharing]: https://tokbox.com/opentok/tutorials/screen-sharing/js/

## License

Released under the [MIT license](http://opensource.org/licenses/MIT).
