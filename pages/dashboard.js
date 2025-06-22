import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { db } from "../lib/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">ようこそ、{profile.name} さん</h1>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-3">
        <p><strong>氏名：</strong> {profile.name}</p>
        <p><strong>住所：</strong> {profile.address}</p>
        <p><strong>電話番号：</strong> {profile.phone}</p>
        <p><strong>企業名：</strong> {profile.company || "（未登録）"}</p>
        <p><strong>メールアドレス：</strong> {profile.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        ログアウト
      </button>
    </div>
  );
}
