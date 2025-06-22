import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form className="space-y-4 w-full max-w-sm bg-white shadow-md p-6 rounded" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          ログイン
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
