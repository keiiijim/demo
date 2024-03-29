        	var sizes = [
                [300, 250]
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
                      id: '147582', // upperBillboard ICON有り
                      // marginTop: '50px',
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
            var passbackTagHtml = 'NO AD';

