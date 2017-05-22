screensharing-extensions
========================

This project includes sample code for developing screen-sharing extensions for Chrome and
older versions (51 and lower) of Firefox. These extensions allow you to use screen-sharing
support in Chrome and older versions of Firefox with the [OpenTok.js][1] library.

**Important:** As of Firefox 52, an extension (or whitelist listing) is no longer needed
for screen sharing. Firefox prompts the end user for access to a screen, window, or
application, as it would for access to the camera. For more information, see
[this Mozilla blog post][2]. The Firefox extension in this repo is only included
to support older versions of Firefox.

For more information, see:

* The [OpenTok documentation on screen sharing][3]
* The README.md file for the [Chrome screen-sharing extension sample][4] in this repo
* The README.md file for the [Firefox screen-sharing extension sample][5] in this repo

[1]: https://tokbox.com/opentok
[2]: https://wiki.mozilla.org/Screensharing
[3]: https://tokbox.com/opentok/tutorials/screen-sharing/js/
[4]: chrome/ScreenSharing/README.md
[5]: firefox/README.md
