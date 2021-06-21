var ad = window.top.document.getElementById('ad');
ad.style="margin-bottom: 20px;";


var el_div1 = document.createElement("div");
	el_div1.id ='inlinearea';
	el_div1.style = 'margin:auto; padding: 10px 0px;height:180px';

var el_div2 = document.createElement("div");
	el_div2.id ='adimg';

var el_div3 = document.createElement("div");
	el_div3.id ='endcard';
	el_div3.style = "display:none;position:absolute;background-color:rgba(0, 0, 0, 0.4);text-align:center;z-index:1;";


var el_div4 = document.createElement("div");
	el_div4.id ='endcardbtn';
	el_div4.style ='padding:20% 0 0 0;';


var el_img1 = document.createElement("image");
	el_img1.src = "https://keiiijim.github.io/demo/billboard/adg_video_button_replay.png";
	el_img1.width = "30%";
	el_img1.height = "30%";
	el_img1.id = "replay";

var el_img2 = document.createElement("image");
	el_img2.src = "https://keiiijim.github.io/demo/billboard/adg_video_button_detail.png";
	el_img2.width = "30%";
	el_img2.height = "30%";
	el_img2.id = "replay";

var el_video1 = document.createElement("video");
	el_video1.src = "https://keiiijim.github.io/demo/billboard/sample.mp4";
	el_video1.id = "advideo";
	el_video1.style = "width:320px;height:180px;";
	el_video1.autoplay = 1;
	el_video1.muted = 1;
	el_video1.playsinline = 1;


ad.appendChild(el_div1);
el_div1.appendChild(el_div2);
el_div2.appendChild(el_div3);
el_div3.appendChild(el_div4);
el_div4.appendChild(el_img1);
el_div4.appendChild(el_img2);
el_div2.appendChild(el_video1);





var el_div5 = document.createElement("div");
	el_div5.id = "wipearea";

var el_div6 = document.createElement("div");
	el_div6.id = "titlearea";
	el_div6.innerText='Advertisement';
	el_div6.style = "border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;margin:0 0 5px 0;padding:0 0 0 10px;background-color:#aaaaaa;height:35px;font-size:20px;";

var el_span1 = document.createElement("span");
	el_span1.id = "closearea";
	el_span1.style = "float:right;color:#555555;padding-right:10px;";
	el_span1.innerText='x';

var el_div7 = document.createElement("div");
	el_div7.id = "wipeadarea";

var el_div8 = document.createElement("div");
	el_div8.id = "wipevideoarea";
	el_div8.style = "float:left;";

var el_div9 = document.createElement("div");
	el_div9.id = "wipedetailarea";
	el_div9.innerText='詳しく見る';
	el_div9.style='float:left;width:160px;background-color: #888888;color:#ffffff;height:90px;';


ad.appendChild(el_div5);
el_div5.appendChild(el_div6);
el_div6.appendChild(el_span1);
el_div5.appendChild(el_div7);
el_div7.appendChild(el_div8);
el_div7.appendChild(el_div9);


var isClosed = false;
var isFinish = false;

const checkScroll = () => {
    var winScroll = window.scrollY;
    var inline = document.getElementById("inlinearea");
    var adImg = document.getElementById("adimg");
    var wipe = document.getElementById("wipearea");
    var adVideo = document.getElementById("advideo");
    var adWipe = document.getElementById("wipeadarea");
    var adWipeVideo = document.getElementById("wipevideoarea");
    var endCard = document.getElementById("endcard");
    var adTop = inline.getBoundingClientRect().top;
    
    inline.style.width = "320px"
    inline.style.height = "180px"
    wipe.style.width = "320px";
    wipe.style.height = "110px";
    adWipe.style.height = "90px";

    if(adTop < -1 && !isClosed){
        wipe.style.display ="block";
        wipe.style.position = 'fixed';
        wipe.style.top = "20px";
        wipe.style.left = "50%";
        wipe.style.marginLeft = "-160px"

        if(adImg.parentNode === inline){
            inline.removeChild(adImg)
            adWipeVideo.appendChild(adImg)
            endCard.style.width = adVideo.style.width = "160px"
            endCard.style.height = adVideo.style.height = "90px"
        }
    } else{
        adImg.style.position = 'relative';
        wipe.style.display ="none";
        if(adImg.parentNode === adWipeVideo){
            adWipeVideo.removeChild(adImg);
            inline.appendChild(adImg);
            endCard.style.width = adVideo.style.width = "320px"
            endCard.style.height = adVideo.style.height = "180px"
        }
    }
}

// x秒で消える用
var closeSec = 0

// スクロール距離で消える
/*
var pageSize = 0
var startY = 0
var vanishPer = 100
*/

// スクロール回数で消える
var startY = 0
var scrollCount = 0
var scrolling = false

const checkVanish = () => {

    // 3秒で消える
    // 再生中
    if(isFinish) {
        closeSec += 100
        if(closeSec >= 3000) {
            isClosed = true;
        }
    } else {
        closeSec = 0
    }

    // スクロール距離で消える
    /*
    if(pageSize < 1){
        pageSize = window.outerHeight;
    }
    if(document.getElementById("wipearea").style.display === "block" && startY < 1){
        startY = window.pageYOffset;
    }
    
    if(startY > 1 && window.pageYOffset > startY + pageSize * vanishPer / 100){
        isClosed = true;
    }
    */

    // スクロール回数で消える
    if(document.getElementById("wipearea").style.display === "block" && startY < 1){
        startY = window.pageYOffset;
    }
    if(startY > 1){
        if (window.pageYOffset > startY + 50){ // 50以上をスクロール扱いとする
            if(scrolling === false){
                scrolling = true
                scrollCount += 1
                if(scrollCount >= 3) {
                    isClosed = true
                }
            }
        } else {
            scrolling = false
        }
        startY = window.pageYOffset
    }
}

setInterval(checkScroll, 100);
setInterval(checkVanish, 100);

document.getElementById("closearea").addEventListener('click', function() {
    isClosed = true;
});

// inview判定
new IntersectionObserver(function (entries, observer) {
    if (entries[0].intersectionRatio >= 0.5 && isFinish == false){
        document.getElementById('advideo').play();
    } else {
        document.getElementById('advideo').pause();   
    }
},{threshold:[0.2 , 0.4 , 0.5 , 0.6 , 0.8]}).observe(document.getElementById("advideo"));

// swipe

var startX = 0;
document.getElementById("wipearea").addEventListener('mousedown', function(e) {
    startX = e.offsetX;
})
document.getElementById("wipearea").addEventListener('mouseup', function(e) {
    if (e.offsetX - startX > 100) {
        isClosed = true;
    }
})

// video finish
document.getElementById('advideo').addEventListener('ended', function() {
    isFinish = true;
    document.getElementById('endcard').style.display ="block";
});

// replay
document.getElementById('replay').addEventListener('click', function() {
    isFinish = false;
    document.getElementById('endcard').style.display ="none";
    document.getElementById('advideo').play();
});
