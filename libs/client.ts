import { createClient } from "microcms-js-sdk";

// 環境変数を取得
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// --- ここからデバッグログ ---
console.log("------------------------------------");
console.log("【デバッグ情報】");
console.log("サービスドメイン:", serviceDomain);
console.log("APIキー:", apiKey);
console.log("------------------------------------");
// --- ここまで ---

// 環境変数がなければエラーを投げる
if (!serviceDomain || !apiKey) {
  throw new Error("microCMSの環境変数が設定されていません。");
}

// クライアントを作成
export const client = createClient({
  serviceDomain,
  apiKey,
});