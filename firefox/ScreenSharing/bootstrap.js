'use strict'

var gDomain = '*.example.com';
var allowDomainsPrefKey = 'media.getusermedia.screensharing.allowed_domains';

function startup(aData, aReason) {
  if (aReason == APP_STARTUP) {
    return;
  }
  var prefs = Components.classes['@mozilla.org/preferences-service;1']
      .getService(Components.interfaces.nsIPrefBranch);
  var curPref = prefs.getCharPref(allowDomainsPrefKey);
  if (curPref.contains(gDomain)) {
    return;
  }
  prefs.setCharPref(allowDomainsPrefKey, curPref + ',' + gDomain);
}

function shutdown(aData, aReason) {
  if (aReason == APP_SHUTDOWN) {
    return;
  }

  var prefs = Components.classes['@mozilla.org/preferences-service;1']
               .getService(Components.interfaces.nsIPrefBranch);
  var curPref = prefs.getCharPref(allowDomainsPrefKey);
  var newPref = curPref.split(',').filter((pref) => pref.trim() != gDomain).join(',');
  prefs.setCharPref(allowDomainsPrefKey, newPref);
}

function install(aData, aReason) {}

function uninstall(aData, aReason) {}
