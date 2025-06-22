
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { db } from "../lib/firestore";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUser(user);
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        if (data.role === "admin") {
          setIsAdmin(true);
          const querySnapshot = await getDocs(collection(db, "users"));
          const userList = [];
          querySnapshot.forEach((doc) =>
            userList.push({ id: doc.id, ...doc.data() })
          );
          setUsers(userList);
        } else {
          router.push("/");
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    await updateDoc(doc(db, "users", userId), { role: newRole });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDelete = async (userId) => {
    if (confirm("本当に削除してよろしいですか？")) {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">管理者ページ</h1>
      <p className="mb-2">ようこそ、{userData?.name} さん（{userData?.role}）</p>
      <p className="mb-6">メール: {userData?.email}</p>

      <h2 className="text-xl font-semibold mb-4">会員一覧</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">氏名</th>
              <th className="p-2">メール</th>
              <th className="p-2">住所</th>
              <th className="p-2">電話</th>
              <th className="p-2">企業名</th>
              <th className="p-2">権限</th>
              <th className="p-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.address}</td>
                <td className="p-2">{u.phone}</td>
                <td className="p-2">{u.company}</td>
                <td className="p-2">
                  <select
                    value={u.role || "user"}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="user">一般</option>
                    <option value="moderator">モデレーター</option>
                    <option value="admin">管理者</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:underline"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
