import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../lib/firebase";
import { db } from "../lib/firestore";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
        address,
        phone,
        company,
      });

      router.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        router.push("/login");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-2">新規会員登録</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="氏名" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="住所" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <input type="tel" placeholder="電話番号" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="企業名（任意）" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <input type="password" placeholder="パスワード（確認）" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">登録</button>
      </form>
    </div>
  );
}
