var pageMod = require("sdk/page-mod");
var gDomains = ['*.ngrok.io'];
//var {Cc, Ci, Cu} = require("chrome");

var allowDomainsPrefKey = 'media.getusermedia.screensharing.allowed_domains';
var prefsService = require("sdk/preferences/service")

exports.main = function (options, callbacks) {

  if (options.loadReason === 'install' || 'enable') {
    var allowDomainsPrefKey = 'media.getusermedia.screensharing.allowed_domains';

    var curPref = prefsService.get(allowDomainsPrefKey);

    var gDomains = ['*.ngrok.io'];
    gDomains.forEach(function(domain){
      //var curPref = prefs.getCharPref(allowDomainsPrefKey);
      if (curPref.contains(domain)) {
        return;
      }
      prefsService.set(allowDomainsPrefKey, curPref + ',' + domain);
    });
  }
};

exports.onUnload = function (reason) {
  if (reason === 'uninstall' || 'disable') {
    var gDomains = ['*.ngrok.io'];
    gDomains.forEach(function(domain){
      var curPref = prefsService.get(allowDomainsPrefKey);
      var newPref = curPref.split(',').filter((pref) => pref.trim() != domain).join(',');
      prefsService.set(allowDomainsPrefKey, newPref);
    });

  }
};

pageMod.PageMod({
  include: gDomains,
  contentScript: 'unsafeWindow.OTScreenSharing = cloneInto({}, unsafeWindow);'
});
