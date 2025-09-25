import { client } from "../../../../libs/client";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'; // Rich Textのブロックタイプをインポート
import Link from "next/link";

// ページのパラメータの型を定義
type Props = {
  params: {
    slug: string;
  };
};

// Contentfulの型定義 (fields.content は RichTextDocument)
type BlogPost = {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    content: any; // RichTextDocument の型は any で仮置き
    // 必要に応じて他のフィールドを追加
  };
};

// 記事データを取得する関数
const getPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const data = await client.getEntries<BlogPost>({
      content_type: "blogPost", // ContentfulのコンテンツタイプID
      "fields.slug": slug,
      limit: 1, // 1件のみ取得
    });
    if (data.items.length === 0) {
      return null;
    }
    return data.items[0];
  } catch (error) {
    console.error("記事の取得に失敗しました:", error);
    return null;
  }
};

// Rich Textのレンダリングオプション（Tailwind CSSクラスを適用）
const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => <h1 className="text-3xl font-bold text-white mb-4 mt-6">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="text-2xl font-bold text-white mb-3 mt-5 border-b border-gray-700 pb-2">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => <h3 className="text-xl font-bold text-white mb-2 mt-4">{children}</h3>,
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4 leading-relaxed">{children}</p>,
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li className="mb-1">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-cyan-400 pl-4 py-2 my-4 bg-gray-800 italic text-gray-300">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    // 画像ブロックのレンダリング
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      if (file && file.url) {
        return (
          <div className="my-6 text-center">
            <img src={file.url} alt={title || 'embedded asset'} className="max-w-full h-auto mx-auto rounded-lg shadow-md" />
            {title && <p className="text-sm text-gray-400 mt-2">{title}</p>}
          </div>
        );
      }
      return null;
    },
  },
};


// 記事詳細ページ
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="text-red-500 text-center py-10">
        <h1 className="text-3xl font-bold mb-4">記事が見つかりませんでした。</h1>
        <Link href="/" className="text-cyan-400 hover:underline">
          トップページに戻る
        </Link>
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none"> {/* prose-invert はダークモード対応 */}
      <h1 className="text-4xl font-extrabold text-white mb-4">
        {post.fields.title}
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Published: {new Date(post.sys.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg leading-relaxed space-y-6">
        {documentToReactComponents(post.fields.content, options)}
      </div>
      <div className="mt-12">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}