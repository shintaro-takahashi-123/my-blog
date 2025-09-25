import { client } from "../../libs/client";

export default async function Home() {
  // サーバーサイドでの取得に戻します
  const data = await client.getEntries({ content_type: "blogPost" });

  return (
    <div>
      <h1>ブログ一覧 (Contentful)</h1>
      <ul>
        {data.items.map((item: any) => (
          <li key={item.sys.id}>{item.fields.title}</li>
        ))}
      </ul>
      <ul>
        {data.items.map((item: any) => (
          <li key={item.sys.id}>
            {/* Linkのhrefを修正 */}
            <a href={`/posts/${item.fields.slug}`}>
              {item.fields.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}