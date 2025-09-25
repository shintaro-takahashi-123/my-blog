import 'dotenv/config'; // .env.localファイルを読み込む

// 環境変数を取得
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
const endpoint = 'blog'; // あなたが設定したエンドポイント名

if (!serviceDomain || !apiKey) {
  console.error("❌ Error! 環境変数が読み込めていません。");
  process.exit(1);
}

const url = `https://${serviceDomain}/api/v1/${endpoint}`;
const headers = { 'X-MICROCMS-API-KEY': apiKey };

console.log(`📡 接続テスト開始...`);
console.log(`URL: ${url}`);

fetch(url, { headers })
  .then(res => {
    if (!res.ok) {
      // レスポンスがエラーの場合
      throw new Error(`HTTPエラー！ステータス: ${res.status}`);
    }
    // 成功した場合
    return res.json();
  })
  .then(data => {
    console.log("✅ 接続成功！");
    console.log("取得した記事のタイトル一覧:");
    // 取得したデータのタイトルだけを抜き出して表示
    console.log(data.contents.map(item => `- ${item.title}`));
  })
  .catch(err => {
    // 通信自体が失敗した場合
    console.error("❌ 接続失敗！");
    console.error(err);
  });