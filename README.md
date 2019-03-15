screensharing-extensions
========================

This project includes sample code for developing screen-sharing extensions for Opera and
older versions of Chrome (71 and lower). These extensions allow you to use screen-sharing
support in Opera and older versions of Chrome with the [OpenTok.js][1] library.

**Important:** In Chrome 72+ and Firefox 52+, an extension (or whitelist listing) is no longer
needed for screen sharing. The browser prompts the end user for access to the screen, as it would
for access to the camera. The extension in this repo is only included to support Opera and
older versions of Chrome.

For more information, see:

* The [OpenTok documentation on screen sharing][2]
* The README.md file for the [Opera and Chrome screen-sharing extension sample][3] in this repo

[1]: https://tokbox.com/opentok
[2]: https://tokbox.com/opentok/tutorials/screen-sharing/js/
[3]: chrome/ScreenSharing/README.md

**Note:** The Firefox screen-sharing extension in this repo is no longer supported in OpenTok,
which does not support versions of Firefox that require a screen-sharing extension.
