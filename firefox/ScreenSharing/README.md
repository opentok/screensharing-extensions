Screen Sharing Extension for Firefox
====================================

This extension allows you to use the screen-sharing support in Firefox with the [OpenTok.js][ot] client library.

You should fork (or simply download) this repo, and modify the following files:

1. Edit the `install.rdf` file

   Change the following fields: id, name, version, and creator properties. 

   See the Mozilla [Install manifest documentation][install-manifests].

2. Edit the bootstrap.js file. Set the `gDomain` property to match the domain(s)
   your screen-sharing extension supports.

3. Package the extension:

        zip my-screensharing-extension.xpi install.rdf bootstrap.js

   Zipping up these two files is an easy way to create the extension (xpi) file. You can also use
   the [Mozilla Add-on SDK][add-on-sdk] to create the extension.

4. Install your extension, in one of these ways:

   * Drag the file it onto a browser window in Firefox. You can also navigate to
     `about:addons`, click the settings button, and select "Install add-on from file".

   * Add a link to the file in a web page (such as the page that uses OpenTok screen-sharing).

     ```
      <a href="my-screensharing-extension.xpi">Install extension</a><br>
     ```

     Clicking the link installs the extension.

   * Publish your extension to the [Mozilla add-on site][add-ons].

Useful information:

* [Bootstrapped extensions][bootstrapped-extensions] -- Mozilla documentation on developing extensions
   for Firefox

* [Developer hub][mozilla-add-on-hub] -- The Mozilla developer hub for add-ons.

* [add-on-sdk][add-on-sdk] -- Mozilla add-on SDK documentation.

[ot]: http://tokbox.com/opentok/libraries/client/js/
[install-manifests]: https://developer.mozilla.org/en-US/Add-ons/Install_Manifests
[add-on-sdk]: https://addons.mozilla.org/en-US/developers/docs/sdk/latest
[add-ons]: https://addons.mozilla.org/en-US/firefox/extensions/
[bootstrapped-extensions]: https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
[mozilla-add-on-hub]: https://addons.mozilla.org/en-US/developers/

## Using the extension with OpenTok.js

To check if the extension is available, call the `OT.checkScreenSharingCapability()` method
(available in the ):

```javascript
OT.checkScreenSharingCapability(function(response) {
  if(response.supported) {
    // Screen sharing is available
  } {
    // This browser does not support screen sharing
  }
});
```

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

## License

Released under the [MIT license](http://opensource.org/licenses/MIT).
