
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-purple-500 text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <img
          src="/logo-lendstar.png"
          alt="LendStar Logo"
          className="w-32 h-32 mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">未来を見通す仮想通貨レンディング</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          あなたの仮想通貨が、新しい価値を生む。LendStarで始める安心・スマートな暗号資産運用。
        </p>
        <a href="/signup" className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow hover:bg-gray-100 transition">
          無料で今すぐ始める
        </a>
      </section>

      {/* Features Section */}
      <section className="bg-white text-purple-800 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">高利回り</h3>
            <p>年利最大12%。安心・安定の運用プランで着実に資産形成。</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">即時出金</h3>
            <p>いつでも資産を引き出し可能。柔軟性のある運用が可能です。</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">セキュリティ万全</h3>
            <p>ブロックチェーン技術＋マルチレイヤー保護で安心・安全。</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">いますぐLendStarで未来を始めよう</h2>
        <p className="text-lg mb-6">登録は無料・数分で完了。スマホからも簡単に利用可能。</p>
        <a href="/signup" className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow hover:bg-gray-100 transition">
          無料アカウントを作成
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-center py-6 text-sm text-gray-300">
        © 2025 LendStar. All rights reserved.
      </footer>
    </div>
  );
}
