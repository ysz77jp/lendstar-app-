
# LendStar - Crypto Lending Platform

これは Next.js + Firebase + Tailwind CSS を使用した仮想通貨レンディングアプリのフロントエンドプロジェクトです。

## 📦 主な技術スタック

- [Next.js](https://nextjs.org/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [Tailwind CSS](https://tailwindcss.com/)
- デプロイ先: [Vercel](https://vercel.com/)

## 🚀 デプロイ方法（Vercel使用）

1. このリポジトリを GitHub にアップロード
2. [https://vercel.com/import](https://vercel.com/import) にアクセスし、GitHubリポジトリを選択
3. フレームワークは `Next.js` として検出されます（変更不要）
4. `.env.local` に相当する以下の環境変数を Vercel の「Settings > Environment Variables」で設定:

```
NEXT_PUBLIC_FIREBASE_API_KEY=あなたのAPIキー
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx
```

5. 「Deploy」ボタンを押すだけで公開完了！

## 🧪 ローカル開発

```bash
npm install
npm run dev
```

## 📁 構成概要

- `pages/` - Next.js ページルーティング（`/signup`, `/login`, `/dashboard`, `/admin` など）
- `lib/firebase.js` - Firebase 設定と初期化
- `public/` - ロゴなどの静的アセット
- `styles/` - Tailwind CSS のスタイル設定

---

## 🔐 注意

このプロジェクトには Firebase の設定が必要です。  
Firestore にユーザーデータを保存します（usersコレクション）。

---

## 🙋‍♀️ 作者

本アプリは個人プロジェクトとして開発されました。
