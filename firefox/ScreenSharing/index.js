var pageMod = require('sdk/page-mod');
var prefsService = require('sdk/preferences/service');
var allowDomainsPrefKey = 'media.getusermedia.screensharing.allowed_domains';
var gDomains = ['*.example.com'];

exports.main = function (options) {

  if (options.loadReason === 'install' || 'enable') {
    var curPref = prefsService.get(allowDomainsPrefKey);

    gDomains.forEach(function(domain){
      if (curPref.indexOf(domain) !== -1) {
        return;
      }
      prefsService.set(allowDomainsPrefKey, curPref + ',' + domain);
    });
  }
};

exports.onUnload = function (reason) {
  if (reason === 'uninstall' || 'disable') {
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
