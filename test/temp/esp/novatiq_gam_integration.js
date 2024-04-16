/* 
Novatiq Technologies Ltd ("COMPANY") CONFIDENTIAL
Unpublished Copyright (c) 2022 Novatiq Technologies Ltd, All Rights Reserved.
NOTICE:  All information contained herein is, and remains the property of COMPANY. The intellectual and technical
concepts contained herein are proprietary to COMPANY and may be covered by U.S. and Foreign Patents, patents in
process, and are protected by trade secret or copyright law. Dissemination of this information or reproduction of
this material is strictly forbidden unless prior written permission is obtained
from COMPANY.  Access to the source code contained herein is hereby forbidden to anyone except current COMPANY
employees, managers or contractors who have executed Confidentiality and Non-disclosure agreements explicitly
covering such access.
The copyright notice above does not evidence any actual or intended publication or disclosure  of  this source code,
which includes information that is confidential and/or proprietary, and is a trade secret, of  COMPANY.
ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC  PERFORMANCE, OR PUBLIC DISPLAY OF OR THROUGH USE  OF THIS
SOURCE CODE  WITHOUT  THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED, AND IN VIOLATION OF APPLICABLE
LAWS AND INTERNATIONAL TREATIES.  THE RECEIPT OR POSSESSION OF  THIS SOURCE CODE AND/OR RELATED INFORMATION DOES NOT
CONVEY OR IMPLY ANY RIGHTS TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS CONTENTS, OR TO MANUFACTURE, USE, OR SELL
ANYTHING THAT IT  MAY DESCRIBE, IN WHOLE OR IN PART.
*/

"use strict";

window.googletag = window.googletag || {cmd: []};

///////////////////////////////////////////////////////
// Default values
var adform_sspId = "Fip";
var sspId = 'Fij';
var pubId = 'Pubverse';
var dspUser = 'uaedprfi';
var clientID = "mesouth";

// possible values
// none = no adform integration
// adform = one sync call made with a shared id
// both = 2 sync calls made, one for programmatic, one for adform
var adformIntegration = "both"
///////////////////////////////////////////////////////

const uuidFormat = [1e7] + -1e3 + -4e3 + -8e3 + -1e11 + 1e3;

// Must be updated with your account code
const GOOGLE_NETWORK_CODE = "18339668";

var novatiq_version = "1.2";

var nova_debug = false;
var urlParams_init = false;
var nova_demo = false;
var onOrOffnet = "offnet";

novatiq_setURLParams();

var hyperId = generateUUID();

var consumORUrl = "https://" + clientID + ".consumor.io/segments/v1/" + dspUser + "/" + hyperId + "?v=2";

// cookie expiry in days
var consumORCookieExpiry = "30";

// max wait time for request urls (ms)
var maxHttpWait = 350;

var storageName = "cOR_" + clientID + "_" + dspUser;
var sharedIdCookieName = "_nov_shared";
var sharedIdExpiry = 90;

var emptyConsumORResponse = '{"segments":[]}'; 

const hyperIdSignalCollector = () => {
    return new Promise((resolve, reject) => {
        resolve(hyperId);
    });
}

function initialiseEncryptedSignals() {
    window.googletag = window.googletag || {cmd: []};

    googletag.cmd.push(function () {
        googletag.secureSignalProviders = window.googletag.secureSignalProviders || [];

        googletag.secureSignalProviders.push({
            id: 'novatiq.com',
            networkCode: GOOGLE_NETWORK_CODE,
            collectorFunction: hyperIdSignalCollector
        });
        googletag.secureSignalProviders.clearAllCache();
    });
}

function doSync() {
    initialiseEncryptedSignals();

    var ssphost = window.location.hostname;
    var syncUrl = "https://spadsync.com/sync?sptoken=" + hyperId + "&sspid=" + sspId + "&pubid=" + pubId + "&ssphost=" + ssphost;

    var sharedId = getSharedId();

    if (adformIntegration === "adform") {
        if (adform_sspId != "") {
            syncUrl = "https://spadsync.com/sync?sptoken=" + hyperId + "&sspid=" + adform_sspId + "&pubid=" + pubId + "&ssphost=" + ssphost;
        }
        syncUrl += "&sharedId=" + sharedId;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", syncUrl);
    xhttp.timeout = maxHttpWait;
    xhttp.onload = function() {
        if (adformIntegration != "adform") {
            getSegments(xhttp.status);
        }
    };

    xhttp.onerror = function() {
        logError("Network error, showing ads with cookie or default value");

        startAds(getCookieValue(), showAd);
    };

    xhttp.ontimeout = function() {
        logError("Sync timed out, showing ads with cookie or default value");

        startAds(getCookieValue(), showAd);
    };

    xhttp.send();

    if (adformIntegration === "both") {
        if (adform_sspId != "") {
            syncUrl = "https://spadsync.com/sync?sptoken=" + hyperId + "&sspid=" + adform_sspId + "&pubid=" + pubId + "&ssphost=" + ssphost + "&sharedId=" + sharedId;
        } else {
            // need to make another call for adform
            syncUrl += "&sharedId=" + sharedId;
        }

        var xhttpAdform = new XMLHttpRequest();

        // fire and forget, no timeout required
        xhttpAdform.open("GET", syncUrl);
        xhttpAdform.send();
    }
}

function getSegments(syncStatus) {
    var syncResponse = 200;
    if (nova_debug) {
        if (onOrOffnet === "offnet") {
            syncResponse = 204;
        }        
    }

    // Only call the consumOR if the sync response shows on-net and successful
    if (syncStatus === syncResponse) {
        var xhttp = new XMLHttpRequest();    
        xhttp.open("GET", consumORUrl);
        xhttp.timeout = maxHttpWait;    
        xhttp.onload = function() {
            var segmentsResponse = this.responseText;

            if (xhttp.status === 200) {                
                logLine(segmentsResponse);

                // store the consumOR result in a cookie
                writeSegmentsToStorage(storageName, segmentsResponse);

                startAds(segmentsResponse, showAd);
            } else {
                logLine("Got consumOR result: " + xhttp.status + ", showing ads with cookie or default value");
                
                startAds(getCookieValue(), showAd);
            }
        };
    
        xhttp.onerror = function() {
            logError("ConsumOR: Network error, showing ads with cookie or default value");

            startAds(getCookieValue(), showAd);    
        };
    
        xhttp.ontimeout = function() {
            logError("ConsumOR timed out, showing ads with cookie or default value");

            startAds(getCookieValue(), showAd);
        };
    
        xhttp.send();
    } else {
        logError("sync failed to return success, showing ads with cookie or default value");

        startAds(getCookieValue(), showAd);
    }
}

function writeSegmentsToStorage(name, consumORResult) {
    logLine("Writing consumOR result into a cookie");

    // we want to expire these so save the time
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (consumORCookieExpiry * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + consumORResult + "; expires=" + expiry.toUTCString() + "; path=/";
}

function getSharedId() {
    if (!areCookiesEnabled()) {
        logLine("Cookies not enabled, cannot retrieve sharedId");
        return "";
    }

    var res = document.cookie.match('(^|;)\\s*' + sharedIdCookieName + '\\s*=\\s*([^;]+)');
    if (res !== null) {
        return res.pop();
    } else {
        logLine("SharedId not found");
        return writeNewsharedId();
    }
}

function writeNewsharedId() {
    logLine("Generating new sharedId and storing...");

    var uuid = generateUUID();

    // we want to expire these so save the time
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (sharedIdExpiry * 24 * 60 * 60 * 1000));
    document.cookie = sharedIdCookieName + "=" + uuid + "; expires=" + expiry.toUTCString() + "; path=/";

    return uuid;
}

function getCookieValue() {
    if (!areCookiesEnabled()) {
        logLine("Cookies not enabled, returning empty segments list");
        return emptyConsumORResponse;
    }

    var res = document.cookie.match('(^|;)\\s*' + storageName + '\\s*=\\s*([^;]+)');
    if (res !== null) {
        return res.pop();
    } else {
        logLine("Cookie value not found, returning empty segments list");
        return emptyConsumORResponse;
    }
}

function areCookiesEnabled() {
    var cookiesEnabled = navigator.cookieEnabled;
    if (!cookiesEnabled) {
        document.cookie = "testcookie";
        cookiesEnabled = document.cookie.indexOf("testcookie") !== -1;
    }
    if (cookiesEnabled) {
        logLine("cookies supported");
    }
    return cookiesEnabled;
}

function novatiq_setURLParams() {
    logVersion();

	if (urlParams_init === false) {
		urlParams_init = true;

		if (searchURL("novadebug=1")) {
			nova_debug = true;
			logLine("setting debug mode");
		}

		if (searchURL("novademo=offnet")) {
			nova_demo = true;
            onOrOffnet= "offnet";
			logLine("setting demo mode: OFF NET");
		} else {
            if (searchURL("novademo=onnet")) {
                nova_demo = true;
                onOrOffnet= "onnet";
                logLine("setting demo mode: ON NET");
            }
        }

        if (nova_demo) {
            // reset params to default
            sspId = 'xxx';
            pubId = 'demopublisher';
            dspUser = 'novademo';
            clientID = "novatiq";
            adformIntegration = "none";
        }
    }
}

function logVersion() {
    var nd = nova_debug;
    if (!nd) {
        nova_debug = true;
    }
    logLine("Novatiq core integration library version: " + novatiq_version);
    nova_debug = nd;
}

function searchURL(str) {
	return window.location.search.search(str) !== -1;
}

function logError(logMsg) {
    logLine(logMsg, true);
}

function logLine(logMsg, error=false) {
	if (nova_debug) {
		if (!error) {
			console.log("%cNovatiq: %c%s", "color:blue", "color:#997300", logMsg);
		} else {
			console.log("%cNovatiq: %c%s", "color:blue", "color:red", logMsg);
		}
	}
}

function startAds(data, callback) {
    logLine('startAds');
    data = JSON.parse(data);
    googletag.cmd.push(function () {
        var slot = googletag.defineSlot('/18339668/test-delivary/test_openbidding', [300, 250], 'banner-ad').addService(googletag.pubads());
        if (data != null && data['segments'].length > 0) {
            var p = JSON.stringify(data.segments);
            var o = JSON.parse(p);
            logLine("data: " + o);
            slot.clearTargeting(o);
            slot.setTargeting('novatiq_sgmnt_id', o);
            logLine("Added Segment Id: " + o);
        }
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();
        callback();
    });
}

function generateUUID() {
    if (nova_demo) {
        // This is an example uuid that we know matches
        return "45340f6d-d9ee-4ee9-b785-36f3e30ff1599999";
    }

    return (uuidFormat).replace(/[018]/g, c => {
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        }
    );
}

function showAd() {
    logLine('showAd');
    googletag.cmd.push(function () {
        googletag.display('banner-ad');
    });
}