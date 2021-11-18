var el = document.createElement("script");
el.src = "https://keiiijim.github.io/demo/test/prebid/prebid6.1.0.js";
document.getElementsByTagName('head')[0].appendChild(el);
window.setTimeout(function(){
var sizes = [
                          [320, 180]
                      ];
                  	var PREBID_TIMEOUT = 1000;
          			var adUnits = [{
                          code: 'postbid_iframe',
                          mediaTypes: {
                              banner: {
                                  sizes: sizes
                              }
                          },
                          bids: [{
                            bidder: 'adg',
                            params: {
                                    id: 147582
                              }
                          }]
                      }];

                      var pbjs = pbjs || {};
                      pbjs.que = pbjs.que || [];

                      pbjs.que.push(function() {
                          pbjs.addAdUnits(adUnits);
                          pbjs.requestBids({
                              timeout: PREBID_TIMEOUT,
                              bidsBackHandler: function() {
                                  var iframe = document.getElementById('postbid_iframe');
                                  var iframeDoc = iframe.contentWindow.document;
                                  var adServerTargeting = pbjs.getAdserverTargetingForAdUnitCode('postbid_iframe');

                                  // If any bidders return any creatives
                                  if (adServerTargeting && adServerTargeting['hb_adid']) {
                                      pbjs.renderAd(iframeDoc, adServerTargeting['hb_adid']);
                                  } else {
                                      iframe.width = sizes[0][0];
                                      iframe.height = sizes[0][1];
                                      iframeDoc.write('<head></head><body>' + passbackTagHtml + '</body>');
                                      iframeDoc.close();
                                  }
                              }
                          });
                      });

                      // Define the passback HTML tag here.
                      // Note that this tag is usually in either Script tag form or iFrame form.
                      var passbackTagHtml = 'TO ADD';
  }, 1000);
                      var passbackTagHtml = 'TO ADD';
