import Link from "next/link";
import { client } from "../../libs/client";

// microCMSの型定義
// APIスキーマに合わせて型を定義します
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
};

type Props = {
  blogs: Array<Blog>;
};

export default async function Home() {

  console.log("Service Domain:", process.env.MICROCMS_SERVICE_DOMAIN);
  console.log("API Key:", process.env.MICROCMS_API_KEY);

  const data = await client.getList<Blog>({ endpoint: "blog" });

  return (
    <div>
      <h1>ブログ一覧</h1>
      <ul>
        {data.contents.map((blog) => (
          <li key={blog.id}>
            {/* 詳細ページはまだ作っていないので、一旦トップへのリンクにしています */}
            <Link href={`/`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}