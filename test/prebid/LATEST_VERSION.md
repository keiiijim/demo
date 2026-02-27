# Prebid.jsの最新版について

## 質問
Prebid.jsの最新版は幾つになってる？

## 回答
**Prebid.jsの最新版は 10.20.0 です**（2025年12月17日現在）

## 詳細情報

- **バージョン**: 10.20.0
- **リリース日**: 2025年12月12日
- **ファイル**: `prebid10.20.0.js`
- **ファイルサイズ**: 約3.0 MB
- **テストファイル**: `test_prebid10.20.0.html`

## 10.20.0の新機能

### 🚀 新機能
- Core: noBidレスポンスにtimeToRespondを追加

### 🐛 バグ修正
- YahooAdsAdapter: ネストされた構造を防ぐためのuser.extマージの修正
- RealTimeData: ファーストパーティデータが欠落するバグの修正

### 🛠 メンテナンス
- 複数のBid Adapterの改善と新規追加
- MyCodeMedia Bid Adapter: 初回リリース
- TRUSTX Bid Adapter: 初回リリース
- その他多数の改善

## 利用方法

1. **直接読み込み**:
   ```html
   <script async src="prebid10.20.0.js"></script>
   ```

2. **テストページで確認**:
   - `test_prebid10.20.0.html`をブラウザで開く
   - ブラウザのコンソールでPrebid.jsのログを確認
   - ページに表示されるバージョン番号を確認

## リポジトリ内の利用可能なバージョン

当リポジトリには以下のバージョンが保存されています：

- **v10.20.0** ← 最新版（2025年12月）
- v9.24.0
- v9.18.0
- v9.1.0
- v8.52.2
- v7.54.3
- v7.49.0
- v7.39.0
- v7.24.0
- v7.7.0
- その他多数

## 参考リンク

- [Prebid.js 公式ドキュメント](https://docs.prebid.org/)
- [Prebid.js GitHubリポジトリ](https://github.com/prebid/Prebid.js)
- [リリースノート](https://docs.prebid.org/dev-docs/release-notes.html)
- [GitHub Releases](https://github.com/prebid/Prebid.js/releases)

## 注意事項

- 新規実装には最新版の使用を推奨します
- 既存の実装を更新する場合は、リリースノートで互換性を確認してください
- 特定のアダプター要件がある場合は、対応するバージョンを使用してください

---

最終更新: 2025年12月17日
