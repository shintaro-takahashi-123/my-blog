import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Awesome Blog", // ブログのタイトルを適宜変更
  description: "A blog about my thoughts and tech.", // 説明を適宜変更
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* <body>タグにTailwind CSSのクラスを追加 */}
      {/* 背景: ダークグレー, テキスト: オフホワイト, フォント: inter */}
      <body className={`${inter.className} bg-gray-900 text-gray-200 antialiased`}>
        {/* ヘッダー */}
        <header className="py-6 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
              maeda-blog {/* ブログのロゴまたはタイトル */}
            </a>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-cyan-400 transition-colors">About</a></li> {/* 仮のリンク */}
                <li><a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a></li> {/* 仮のリンク */}
              </ul>
            </nav>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* フッター */}
        <footer className="py-8 mt-10 border-t border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            © {new Date().getFullYear()} maeda-blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}