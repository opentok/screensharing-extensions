"use strict"

var gDomain = "*.example.com";

function startup(aData, aReason) {
    if (aReason == APP_STARTUP) {
        return;
    }
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var curPref = prefs.getCharPref("media.getusermedia.screensharing.allowed_domains");
    if (curPref.contains(gDomain)) {
        return;
    }
    prefs.setCharPref("media.getusermedia.screensharing.allowed_domains", curPref + ", " + gDomain);
}

function shutdown(aData, aReason) {
    if (aReason == APP_SHUTDOWN) {
        return;
    }

    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);
    var curPref = prefs.getCharPref("media.getusermedia.screensharing.allowed_domains");
    var newPref = curPref.split(",").filter((pref) => pref.trim() != gDomain).join(",");
    prefs.setCharPref("media.getusermedia.screensharing.allowed_domains", newPref);
}

function install(aData, aReason) {}

function uninstall(aData, aReason) {}
