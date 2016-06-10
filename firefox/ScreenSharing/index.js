var pageMod = require('sdk/page-mod');
var prefsService = require('sdk/preferences/service');
var allowDomainsPrefKey = 'media.getusermedia.screensharing.allowed_domains';
var gDomains = ['*.example.com'];

exports.main = function (options) {

  if (options.loadReason !== 'startup') {
    var curPrefs = prefsService.get(allowDomainsPrefKey).replace(/\s/g, '').split(',');

    gDomains.forEach(function(domain){
      if (curPrefs.indexOf(domain) !== -1) {
        return;
      }
      curPrefs.push(domain);
    });
    prefsService.set(allowDomainsPrefKey, curPrefs.join(','));
  }
};

exports.onUnload = function (reason) {
  if (reason === 'uninstall' || reason === 'disable') {
    gDomains.forEach(function(domain){
      var curPref = prefsService.get(allowDomainsPrefKey);
      var newPref = curPref.split(',').filter((pref) => pref.trim() != domain).join(',');
      prefsService.set(allowDomainsPrefKey, newPref);
    });

  }
};

pageMod.PageMod({
  include: gDomains.map(domain => domain[0] === '*' ? domain : `https://${domain}/*`),
  contentScript: 'unsafeWindow.OTScreenSharing = cloneInto({}, unsafeWindow);'
});
