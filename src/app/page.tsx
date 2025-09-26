import { client } from "../../libs/client";
import Link from "next/link";
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート

// 型定義を更新
export type BlogItem = {
  sys: { id: string; createdAt: string };
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    eyecatchImage: {
      fields: {
        file: {
          url: string;
          details: {
            image: { width: number; height: number };
          };
        };
        title: string;
      };
    };
    excerpt: string;
  };
};

type ContentfulResponse = {
  items: BlogItem[];
  includes?: { Asset: any[] }; // 画像アセットの型情報
};

export default async function Home() {
  const data: ContentfulResponse = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.publishDate", // 公開日で降順ソート
  });

  return (
    <section>
      <h1 className="text-4xl font-extrabold text-white mb-8">Latest Posts</h1>
      <ul className="space-y-10">
{data.items.map((item) => (
  <li key={item.sys.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
    <Link href={`/posts/${item.fields.slug}`} className="block">
      
      {/* ★★★ ここから修正 ★★★ */}
      {/* もしアイキャッチ画像が存在する場合のみ、Imageコンポーネントを表示する */}
      {item.fields.eyecatchImage && (
        <div className="relative">
          <Image
            src={`https:${item.fields.eyecatchImage.fields.file.url}`}
            alt={item.fields.eyecatchImage.fields.title}
            width={item.fields.eyecatchImage.fields.file.details.image.width}
            height={item.fields.eyecatchImage.fields.file.details.image.height}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {/* ★★★ ここまで修正 ★★★ */}
      
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-2">
          {new Date(item.fields.publishDate).toLocaleDateString()}
        </p>
        <h2 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
          {item.fields.title}
        </h2>

        {/* タグ表示 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {item.fields.tags?.map((tag: any) => (
            <span key={tag.sys.id} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tag.fields.name}
            </span>
          ))}
        </div>

        <p className="text-gray-300 mt-3">
          {item.fields.excerpt}
        </p>


        <p className="text-gray-300 mt-3">
          {item.fields.excerpt}
        </p>
      </div>
    </Link>
  </li>
))}
      </ul>
    </section>
  );
}