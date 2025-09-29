
(function() {
  console.log('[inspector.js] 監視を開始します。');

  // 1. window.APVがなければ、先に空のオブジェクトを作成しておく
  if (!window.APV) {
    window.APV = {};
    console.log('[inspector.js] window.APVを初期化しました。');
  }

  // 2. APV.VideoAd プロパティの変更を監視
  let _videoAd;
  Object.defineProperty(window.APV, 'VideoAd', {
    configurable: true,
    get: function() {
      console.log('[inspector.js] APV.VideoAd が参照されました。');
      return _videoAd;
    },
    set: function(originalConstructor) {
      console.log('[inspector.js] APV.VideoAd の定義を検知。コンストラクタを書き換えます。');
      
      // 元のコンストラクタをラップした新しいコンストラクタを作成
      const hookedConstructor = function(config) {
        const adInstance = new originalConstructor(config);
        console.log('4. [inspector.js] ラップしたコンストラクタが実行されました。');

        const originalOnCompletion = adInstance.onCompletion;
        adInstance.onCompletion = function(event) {
          console.log('★[inspector.js] 再生完了イベントを検知しました！');
          /**
           * ここに、再生完了時に実行したい処理を追加します。
           */

          if (originalOnCompletion) {
            originalOnCompletion.apply(this, arguments);
          }
        };
        return adInstance;
      };
      
      _videoAd = hookedConstructor;
    }
  });

})();
