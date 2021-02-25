/*! AppVador JS SDK 2016-06-07 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d,e,f,g,h;e=a("./UABrowser.coffee"),f=a("./UADevice.coffee"),g=a("./UAOs.coffee"),h=a("./Ua.coffee"),d=function(){function a(){}var b,c,d;return c=null,d=Date.now(),a.getInstance=function(){return null!=c?c:c=new b},a.getStartTime=function(){return d},b=function(){function a(){this.userAgent=navigator.userAgent}var b;return a.prototype.isDesktop=function(){return!this.isMobile()&&!this.isTablet()},a.prototype.isIpad=function(){return"iPad"===this.getDevice().model||/iPad/i.test(this.getUA())},a.prototype.isTablet=function(){return"tablet"===this.getDevice().type||this.isIpad()||this.isAndroid()&&!/(m|M)obile/.test(this.getUA())},a.prototype.isMobile=function(){return"mobile"===this.getDevice().type||this.isIos()&&!this.isIpad()||this.isAndroid()&&/(m|M)obile/.test(this.getUA())},a.prototype.isChromeIos=function(){return/CriOS/i.test(this.getUA())},a.prototype.isFacebookWebview=function(){return"Facebook"===this.getBrowser().name||/FBAN|FBIOS|FBAV|FBBV|FBDV|FBMD|FBSN|FBSV|FBSS|FBCR|FBID|FBLC|FBOP/i.test(this.getUA())},a.prototype.isAndroidNative=function(){return"Android Browser"===this.getBrowser().name},a.prototype.isAndroid=function(){return"Android"===this.getOS().name||/Android/i.test(this.getUA())},a.prototype.isIos=function(){return"iOS"===this.getOS().name||this.isIpad()||this.isIphone()},a.prototype.isIphone=function(){return"iPhone"===this.getDevice().model||/iPhone/i.test(this.getUA())},a.prototype.isAndroidMobile=function(){return this.isAndroid()&&this.isMobile()},a.prototype.isOldIE=function(a){return void 0===a&&(a=9),this.isIE()&&this.getBrowser().major&&parseInt(this.getBrowser().major,10)<=a},a.prototype.isIE=function(){return"IE"===this.getBrowser().name||/MSIE|Trident/.test(this.getUA())},a.prototype.isChrome=function(){return"Chrome"===this.getBrowser().name||!!window.chrome},a.prototype.isFirefox=function(){return"Firefox"===this.getBrowser().name||/Firefox/i.test(this.getUA())},a.prototype.isAmp=function(){return!!window._teads_amp},a.prototype.isAmpObserveIntersection=function(){return this.isAmp()&&!(!window.context||!window.context.observeIntersection)},a.prototype.getIEVersion=function(){return this.isIE()&&this.getBrowser().major?parseInt(this.getBrowser().major,10):null},a.prototype.getAndroidVersion=function(){var a;return this.isAndroid()?(a=this.getOS().version.split(".").join(""),a.length<3&&(a+="0"),parseInt(a,10)):null},a.prototype.getIosVersion=function(){return this.isIos()?parseInt(this.getOS().version.split(".").join(),10):null},a.prototype.isUIWebview=function(){return(this.isIphone()||this.isIpad())&&!/Safari/i.test(this.getUA())&&!window.navigator.standalone},b=function(a){return!!a.createElement("video").canPlayType},a.prototype.positionFixedSupport=function(){return this.isIos()||this.getAndroidVersion()>500||!this.isAndroidNative()&&this.getAndroidVersion()>422},a.prototype.getLanguage=function(){return window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage||"en"},a.prototype.getUA=function(){return this.userAgent},a.prototype.getDevice=function(){return this.device||(this.device=new f(h.mapper.rgx.apply(this,h.regexes.device))),this.device},a.prototype.getOS=function(){return this.os||(this.os=new g(h.mapper.rgx.apply(this,h.regexes.os))),this.os},a.prototype.getBrowser=function(){return this.browser||(this.browser=new e(h.mapper.rgx.apply(this,h.regexes.browser))),this.browser},a}(),a}(),b.exports=d},{"./UABrowser.coffee":5,"./UADevice.coffee":6,"./UAOs.coffee":7,"./Ua.coffee":8}],2:[function(a,b,c){var d,e;e=a("./Util.coffee"),d=function(){function a(){}return a.isWindow=function(a){return null!==a&&a===a.window},a.getWindow=function(a){return this.isWindow(a)?a:9===a.nodeType&&a.defaultView},a.offset=function(a){var b,c,d,e;return a.getClientRects().length?(d=a.getBoundingClientRect(),d.width||d.height?(b=a.ownerDocument,e=this.getWindow(b),c=b.documentElement,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):d):{top:0,left:0}},a.isIframe=function(){return window!==window.top},a.isNotFriendlyIframe=function(){return this.isIframe()&&!this.isFriendlyIframe()},a.isFriendlyIframe=function(){var a,b;try{return window.top.document.getElementsByTagName("BODY")[0],this.isIframe()}catch(b){a=b}return!1},a.getFirstFrame=function(){var a,b,c,d,e,f,g,h;d=this.getFirstWindow();try{for(a=window.top.document.getElementsByTagName("BODY")[0],f=a.getElementsByTagName("IFRAME"),g=0,h=f.length;h>g;g++)if(e=f[g],e.contentWindow===d)return e}catch(c){b=c}return null},a.getFirstWindow=function(){var a,b,c,d;if(!this.isIframe)return null;try{for(a=window,d=null;;){if(!a.parent)break;if(a.parent===window.top)return a;a=window.parent}}catch(c){b=c}return null},a.getCurrentScript=function(a){var b,c,d;for(d=window.top.document.getElementsByTagName("script"),b=d.length-1;b>-1;){if(c=d[b],""!==c.src&&new RegExp(a).test(c.src))return c;b-=1}return null},a.getCurrentStyleByElement=function(a){return a.currentStyle||document.defaultView.getComputedStyle(a,"")},a.getComputedStyle=function(a){return a.currentStyle||document.defaultView.getComputedStyle(a,"")},a.getComputedStyleTransformMatrix=function(a){var b,c,d,e,f,g,h,i;for(h=this.getComputedStyle(a),e=["transform","webkitTransform","MozTransform","msTransform","OTransform"],g=[0,e.length],c=0,d=g.length;d>c;c++)if(b=g[c],void 0!==h[e[b]]&&(i=h[e[b]],f=i.match(/^matrix3d\((.+)\)$/)||i.match(/^matrix\((.+)\)$/)))return f[1].split(", ");return null},a.getComputedStyleTransformMatrixX=function(a){var b;if(b=this.getComputedStyleTransformMatrix(a)){if(16===b.length)return parseFloat(b[12]);if(6===b.length)return parseFloat(b[4])}return null},a.getComputedStyleTransformMatrixY=function(a){var b;if(b=this.getComputedStyleTransformMatrix(a)){if(16===b.length)return parseFloat(b[13]);if(6===b.length)return parseFloat(b[5])}return null},a.isHidden=function(a){var b;return b=this.getComputedStyle(a),"0px"===b.width&&"hidden"===b.overflowX?!1:"0px"===b.height&&"hidden"===b.overflowY?!1:"0px"!==b.width&&"0px"!==b.height||"hidden"!==b.overflow?"none"===b.display||"hidden"===b.visibility?!1:void 0:!1},a.findOffsetParent=function(a){var b,c;for(b=a.offsetParent,c=a.parentElement;;){if(!c)return null;if(this.isOffsetElement(c))return c;if(b===c)return b;c=c.parentElement}},a.isOffsetElement=function(a){var b;return b=this.getComputedStyle(a),"relative"===b.position||"absolute"===b.position||"fixed"===b.position},a.appendChildWithJS=function(a,b){var c,d,e,f;for(f=document.createElement("div"),f.innerHTML=b,c=null,d=[];c=f.firstChild;)"SCRIPT"===c.tagName?(e=document.createElement("script"),c.type&&(e.type=c.type),c.async&&(e.async=c.async),c.defer&&(e.defer=c.defer),c.src?e.src=c.src:e.text=c.text,a.appendChild(e),d.push(f.removeChild(c))):d.push(a.appendChild(c));return d},a.appendChildWithFrame=function(b,c,d,e){var f,g,h;return g=document.createElement("iframe"),g.src="javascript:\"<html><body style='background:transparent'></body></html>\"",g.style.position="relative",g.style.width=d+"px",g.style.height=e+"px",g.style.marginLeft="auto",g.style.marginRight="auto",g.style.border="none",g.style.outline="none",g.style.webkitTapHighlightColor="rgba(0,0,0,0)",g.style.opacity=1,g.style.zIndex=1,g.scrolling="no",g.frameborder="no",b.appendChild(g),f=a.getFrameDocument(g),f.open(),f.write('<head></head><body style="margin:0;padding:0;">'+c+"</body>"),f.close(),h=function(){return setTimeout(function(){var a,c;for(c=1,a=b;;)if(a.style.zoom&&(c=a.style.zoom),a=a.parentNode,!a.parentNode)break;return g.style.webkitTransformOrigin="center top",g.style.webkitTransform="scale("+c+")"},101)},h(),window.addEventListener("resize",h,!0)},a.getFrameDocument=function(a){var b;return b=a.document,a.contentDocument?b=a.contentDocument:a.contentWindow&&(b=a.contentWindow.document),b},a}(),b.exports=d},{"./Util.coffee":9}],3:[function(a,b,c){var d,e;d=a("./Context.coffee"),e=function(){function a(a){f=null!=a?a:a="APVAD"}var b,c,e,f;return a.LogLevel={EMERG:0,ALERT:1,CRIT:2,ERROR:3,WARN:4,NOTICE:5,INFO:6,DEBUG:7},e=null,f=null,a.setLogLevel=function(b){return e=null!=b?b:b=a.LogLevel.ERROR},a.prototype.log=function(a,b){var c,g,h,i,j,k;if(b.length&&!(a>e)){j=d.getStartTime(),i=Date.now()-j,k=(i/1e3).toFixed(3)+"s",d.getInstance().isIE()?b=[k+" ["+f+"] "+b.join(" ")]:b.unshift("%c"+k+" ["+f+"]","color:#7ebde5;"),h=_console[a]||_console.log;try{return h.apply(_console,b)}catch(g){return c=g,Function.prototype.apply.apply(h,[_console,b])}}},a.prototype.debug=function(){var c;return c=b(arguments),this.log(a.LogLevel.DEBUG,c)},a.prototype.error=function(){var c;return c=b(arguments),this.log(a.LogLevel.ERROR,c)},a.prototype.info=function(){var c;return c=b(arguments),this.log(a.LogLevel.INFO,c)},a.prototype.warn=function(){var c;return c=b(arguments),this.log(a.LogLevel.WARN,c)},c=function(a){switch(a){case 0:return"EMERG";case 1:return"ALERT";case 2:return"CRIT";case 3:return"ERROR";case 4:return"WARN";case 5:return"NOTICE";case 6:return"INFO";case 7:return"DEBUG";default:return""}},b=function(a){var b,c;for(c=[],b=0;b<a.length;)c[b-0]=a[b],b++;return c},a}(),b.exports=e},{"./Context.coffee":1}],4:[function(a,b,c){var d,e,f;e=a("./Logger.coffee"),d=a("./ElementUtil.coffee"),f=function(){function a(){}var b;return b=new e("ScriptLoader"),a.inject=function(a){var c,e;return d.isNotFriendlyIframe()?void b.error("iFrame is not friendly."):(e=d.isIframe()?d.getFirstFrame():d.getCurrentScript("ScriptLoader.*.js"),c=document.createElement("script"),c.type="text/javascript",c.src=a,c.async=!0,e.parentNode.insertBefore(c,e))},a}(),window.APV||(window.APV={}),window.APV.ScriptLoader=f},{"./ElementUtil.coffee":2,"./Logger.coffee":3}],5:[function(a,b,c){var d,e;d=a("./Util/StringHelper.coffee"),e=function(){function a(a){this.name=a.name||"",this.version=a.version||"",this.major="string"==typeof this.version?this.version.split(".")[0]:""}return a.prototype.toString=function(){return d.separate("|",this.name,this.version).toLowerCase()},a}(),b.exports=e},{"./Util/StringHelper.coffee":10}],6:[function(a,b,c){var d,e,f;e=a("./UAOs.coffee"),f=a("./Ua.coffee"),d=function(){function a(b){var c;this.model=b.model||"",c=new e(f.mapper.rgx.apply(this,f.regexes.os)),this.type=b.type||(a.typeRegExp.test(c.name)?teads.Ua.DESKTOP:""),this.vendor=b.vendor||""}return a.prototype.toString=function(){return teads.StringHelper.separate("|",this.model,this.type,this.vendor).toLowerCase()},a.typeRegExp=/^windows|mac\s+os|linux|bsd|dragonfly|chromium\s+os|haiku|ubuntu|slackware|gentoo|solaris|debian|fedora|arch|beos|mint|gnu|os\/2$/i,a}(),b.exports=d},{"./UAOs.coffee":7,"./Ua.coffee":8}],7:[function(a,b,c){var d,e;d=a("./Util/StringHelper.coffee"),e=function(){function a(a){this.name=a.name||"",this.version=a.version||""}return a.prototype.toString=function(){return d.separate("|",this.name,this.version).toLowerCase()},a}(),b.exports=e},{"./Util/StringHelper.coffee":10}],8:[function(a,b,c){var d;d=function(){function a(){}return a.MODEL="model",a.NAME="name",a.TYPE="type",a.VENDOR="vendor",a.VERSION="version",a.CONSOLE="console",a.MOBILE="mobile",a.TABLET="tablet",a.SMARTTV="smarttv",a.WEARABLE="wearable",a.DESKTOP="desktop",a.util={extend:function(a,b){var c;for(c in b)-1!=="browser device os".indexOf(c)&&b[c].length%2===0&&(a[c]=b[c].concat(a[c]));return a},has:function(a,b){return"string"==typeof a?-1!==b.toLowerCase().indexOf(a.toLowerCase()):!1},lowerize:function(a){return a.toLowerCase()}},a.mapper={rgx:function(){var a,b,c,d,e,f,g,h,i,j,k,l;for(k=void 0,b=0,c=void 0,d=void 0,g=void 0,i=void 0,f=void 0,e=void 0,a=arguments,l=navigator.userAgent;b<a.length&&!f;){if(j=a[b],h=a[b+1],"undefined"==typeof k){k={};for(g in h)g=g,i=h[g],"object"==typeof i?k[i[0]]=void 0:k[i]=void 0}for(c=d=0;c<j.length&&!f;)if(f=j[c++].exec(l))for(g=0;g<h.length;)e=f[++d],i=h[g],"object"==typeof i&&i.length>0?2===i.length?"function"==typeof i[1]?k[i[0]]=i[1].call(this,e):k[i[0]]=i[1]:3===i.length?"function"!=typeof i[1]||i[1].exec&&i[1].test?k[i[0]]=e?e.replace(i[1],i[2]):void 0:k[i[0]]=e?i[1].call(this,e,i[2]):void 0:4===i.length&&(k[i[0]]=e?i[3].call(this,e.replace(i[1],i[2])):void 0):k[i]=e?e:void 0,g++;b+=2}return k},str:function(a,b){var c,d;for(c in b)if("object"==typeof b[c]&&b[c].length>0)for(d=0;d<b[c].length;){if(this.util.has(b[c][d],a))return"?"===c?void 0:c;d++}else if(this.util.has(b[c],a))return"?"===c?void 0:c;return a}},a.maps={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},a.regexes={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[a.NAME,a.VERSION],[/\s(opr)\/([\w\.]+)/i],[[a.NAME,"Opera"],a.VERSION],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i],[a.NAME,a.VERSION],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[a.NAME,"IE"],a.VERSION],[/(edge)\/((\d+)?[\w\.]+)/i],[a.NAME,a.VERSION],[/(yabrowser)\/([\w\.]+)/i],[[a.NAME,"Yandex"],a.VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[a.NAME,/_/g," "],a.VERSION],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],[a.NAME,a.VERSION],[/(dolfin)\/([\w\.]+)/i],[[a.NAME,"Dolphin"],a.VERSION],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[a.NAME,"Chrome"],a.VERSION],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[a.VERSION,[a.NAME,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[a.VERSION,[a.NAME,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[a.VERSION,[a.NAME,"Facebook"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[a.VERSION,[a.NAME,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[a.VERSION,a.NAME],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[a.NAME,[a.VERSION,a.mapper.str,a.maps.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[a.NAME,a.VERSION],[/(navigator|netscape)\/([\w\.-]+)/i],[[a.NAME,"Netscape"],a.VERSION],[/fxios\/([\w\.-]+)/i],[a.VERSION,[a.NAME,"Firefox"]],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[a.NAME,a.VERSION]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[a.MODEL,a.VENDOR,[a.TYPE,a.TABLET]],[/applecoremedia\/[\w\.]+ \((ipad)/],[a.MODEL,[a.VENDOR,"Apple"],[a.TYPE,a.TABLET]],[/(apple\s{0,1}tv)/i],[[a.MODEL,"Apple TV"],[a.VENDOR,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[a.VENDOR,a.MODEL,[a.TYPE,a.TABLET]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[a.MODEL,[a.VENDOR,"Amazon"],[a.TYPE,a.TABLET]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[a.MODEL,a.mapper.str,a.maps.device.amazon.model],[a.VENDOR,"Amazon"],[a.TYPE,a.MOBILE]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[a.MODEL,a.VENDOR,[a.TYPE,a.MOBILE]],[/\((ip[honed|\s\w*]+);/i],[a.MODEL,[a.VENDOR,"Apple"],[a.TYPE,a.MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[a.VENDOR,a.MODEL,[a.TYPE,a.MOBILE]],[/\(bb10;\s(\w+)/i],[a.MODEL,[a.VENDOR,"BlackBerry"],[a.TYPE,a.MOBILE]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[a.MODEL,[a.VENDOR,"Asus"],[a.TYPE,a.TABLET]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[a.VENDOR,"Sony"],[a.MODEL,"Xperia Tablet"],[a.TYPE,a.TABLET]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[[a.VENDOR,"Sony"],[a.MODEL,"Xperia Phone"],[a.TYPE,a.MOBILE]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[a.VENDOR,a.MODEL,[a.TYPE,a.CONSOLE]],[/android.+;\s(shield)\sbuild/i],[a.MODEL,[a.VENDOR,"Nvidia"],[a.TYPE,a.CONSOLE]],[/(playstation\s[3portablevi]+)/i],[a.MODEL,[a.VENDOR,"Sony"],[a.TYPE,a.CONSOLE]],[/(sprint\s(\w+))/i],[[a.VENDOR,a.mapper.str,a.maps.device.sprint.vendor],[a.MODEL,a.mapper.str,a.maps.device.sprint.model],[a.TYPE,a.MOBILE]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[a.VENDOR,a.MODEL,[a.TYPE,a.TABLET]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[a.VENDOR,[a.MODEL,/_/g," "],[a.TYPE,a.MOBILE]],[/(nexus\s9)/i],[a.MODEL,[a.VENDOR,"HTC"],[a.TYPE,a.TABLET]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[a.MODEL,[a.VENDOR,"Microsoft"],[a.TYPE,a.CONSOLE]],[/(kin\.[onetw]{3})/i],[[a.MODEL,/\./g," "],[a.VENDOR,"Microsoft"],[a.TYPE,a.MOBILE]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i],[a.MODEL,[a.VENDOR,"Motorola"],[a.TYPE,a.MOBILE]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[a.MODEL,[a.VENDOR,"Motorola"],[a.TYPE,a.TABLET]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[a.VENDOR,"Samsung"],a.MODEL,[a.TYPE,a.TABLET]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[a.VENDOR,"Samsung"],a.MODEL,[a.TYPE,a.MOBILE]],[/(samsung);smarttv/i],[a.VENDOR,a.MODEL,[a.TYPE,a.SMARTTV]],[/\(dtv[\);].+(aquos)/i],[a.MODEL,[a.VENDOR,"Sharp"],[a.TYPE,a.SMARTTV]],[/sie-(\w+)*/i],[a.MODEL,[a.VENDOR,"Siemens"],[a.TYPE,a.MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[a.VENDOR,"Nokia"],a.MODEL,[a.TYPE,a.MOBILE]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[a.MODEL,[a.VENDOR,"Acer"],[a.TYPE,a.TABLET]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[a.VENDOR,"LG"],a.MODEL,[a.TYPE,a.TABLET]],[/(lg) netcast\.tv/i],[a.VENDOR,a.MODEL,[a.TYPE,a.SMARTTV]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[a.MODEL,[a.VENDOR,"LG"],[a.TYPE,a.MOBILE]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[a.MODEL,[a.VENDOR,"Lenovo"],[a.TYPE,a.TABLET]],[/linux;.+((jolla));/i],[a.VENDOR,a.MODEL,[a.TYPE,a.MOBILE]],[/((pebble))app\/[\d\.]+\s/i],[a.VENDOR,a.MODEL,[a.TYPE,a.WEARABLE]],[/android.+;\s(glass)\s\d/i],[a.MODEL,[a.VENDOR,"Google"],[a.TYPE,a.WEARABLE]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],[[a.MODEL,/_/g," "],[a.VENDOR,"Xiaomi"],[a.TYPE,a.MOBILE]],[/(mobile|tablet);.+rv\:.+gecko\//i],[[a.TYPE,a.util.lowerize],a.VENDOR,a.MODEL]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[a.NAME,a.VERSION],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[a.NAME,[a.VERSION,a.mapper.str,a.maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[a.NAME,"Windows"],[a.VERSION,a.mapper.str,a.maps.os.windows.version]],[/\((bb)(10);/i],[[a.NAME,"BlackBerry"],a.VERSION],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[a.NAME,a.VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[a.NAME,"Symbian"],a.VERSION],[/\((series40);/i],[a.NAME],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[a.NAME,"Firefox OS"],a.VERSION],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[a.NAME,a.VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[a.NAME,"Chromium OS"],a.VERSION],[/(sunos)\s?([\w\.]+\d)*/i],[[a.NAME,"Solaris"],a.VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[a.NAME,a.VERSION],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[a.NAME,"iOS"],[a.VERSION,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[a.NAME,"Mac OS"],[a.VERSION,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[a.NAME,a.VERSION]]},a}(),b.exports=d},{}],9:[function(a,b,c){var d;d=function(){function a(){}return a.getAudioContext=function(){return window.AudioContext||window.webkitAudioContext},a.requestAnimationFrame=function(a){return window.requestAnimationFrame?window.requestAnimationFrame(a):window.webkitRequestAnimationFrame?window.webkitRequestAnimationFrame(a):window.mozRequestAnimationFrame?window.mozRequestAnimationFrame(a):window.oRequestAnimationFrame?window.oRequestAnimationFrame(a):window.msRequestAnimationFrame?window.msRequestAnimationFrame(a):setTimeout(a,1e3/60)},a.now=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow),a.getTime=function(){return a.now&&a.now.call(performance)||(new Date).getTime()},a.timeToFrame=function(a,b,c){return Math.floor(1e3*a/(1e3/b)%c)},a.uuid=function(){var a,b,c,d;for(d="",a=b=0;31>=b;a=++b)c=16*Math.random()|0,8!==a&&12!==a&&16!==a&&20!==a||(d+="-"),d+=(12===a?4:16===a?3&c|8:c).toString(16);return d},a.documentIsReady=function(){return/interactive|loaded|complete/.test(document.readyState)},a.round=function(a,b){var c;return c=Math.pow(10,b),a*=c,a=Math.round(a),a/=c},a}(),b.exports=d},{}],10:[function(a,b,c){var d;d=function(){function a(){}return a.secondToTimecode=function(a){var b,c;return c="00",a>60&&(b=Math.floor(a/60),c=10>b?"0":""),c+=":"+(10>a?"0":"")+a},a.isURL=function(a){var b;return b=/^\(?((?:(http|https|ftp):\/\/)|\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#]*))?([\#][^\s\n]*)?\)?$/i,"string"==typeof a&&b.test(a)},a.pad=function(a,b){var c;return void 0===b&&(b="00"),c=String(a),b.substring(0,b.length-c.length)+c},a.ucfirst=function(a){return a.charAt(0).toUpperCase()+a.substr(1)},a.rand=function(a,b){var c,d,e;for(void 0===b&&(b=!0),c=b?"0123456789":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e="",d=0;a>d;)e+=c.charAt(Math.floor(Math.random()*c.length)),d++;return e},a.trim=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},a.separate=function(a){var b,c,d,e;for(void 0===a&&(a="|"),e=[],b=1;b<arguments.length;)e[b-1]=arguments[b],b++;for(c=!0,d=0;c&&d<e.length;)c=c&&!e[d],d++;return c?"":e.join(a)},a}(),b.exports=d},{}]},{},[4]);