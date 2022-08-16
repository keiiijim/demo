/*
/*	スマホナビゲーション
*/

// state
var isOpen = 'is-open';

// element
var $menuBtn = $('.nav-trigger'),
		$spNav = $('.spnav'),
		$spNav_open = $('#nav-button-open, #nav-trigger-close'), // btn in to nav
		$spNav_close = $('#nav-button-close'),
		$accordion = $('.js-accordion');

// メニューボタン操作（オープン時）
$spNav_close.on('click', function() {
	$spNav_close.addClass(isOpen);
	$spNav.addClass(isOpen);

	// setTimeout(function() {
		$spNav_open.css({ opacity: 1 }); // ナビ内のロゴアイコンをアクティブへ
		$spNav_close.css({ zIndex: 99 }); // ハンバーガーアイコンのアニメーション終わりにz-indexをメニューの下へ
	// }, 1000);
});

// メニューの中のボタンを操作した場合（クローズ時）
$spNav_open.on('click', function() {
	$spNav_close.removeClass(isOpen);
	$spNav.removeClass(isOpen);

	$spNav_open.css({ opacity: 0 }); // 即座に消す
	$spNav_close.css({ zIndex: 101 }); // z-indexを元に戻す
	$spNav.delay(400).animate({scrollTop:0}, 100); // 閉じてからスクロール値を0へ
});

$spNav.scroll(function() {
	console.log();
});

// アコーディオン操作
(function($) {
	$.fn.accordion = function() {
		this.toggleClass(isOpen);

		if( this.hasClass(isOpen) ) {
			this.siblings('.accordion-detail').slideToggle(300);
		} else {
			this.siblings('.accordion-detail').slideToggle(300);
		}
	}
})(jQuery);

$accordion.on('click', '.btn-trigger', function() {
	$(this).accordion();
});



/*
/*	カプセル化したもの
*/

var SS = SS || {};

(function($, window, SS) {

	'use strict';

	/*
	/*	メソッド
	*/

	SS.METHODS = {

		// スムーススクロール
		smoothScroll: function() {
			$('a[href*="#"]:not([href="#"])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=" + this.hash.slice(1) +"]');
					if (target.length) {
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 800);
						return false;
					}
				}
			});
		}

	};


	/*
	/*	実行
	*/

	$(function() {

		$(function() {
			SS.METHODS.smoothScroll();
		});

	});

}($, window, SS));
