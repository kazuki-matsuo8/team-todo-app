import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const Login: React.FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のデフォルトのページリロードを防ぐ
    setError(null);

    try {
      const response = await apiClient.post<LoginResponse>("/login", {
        user: {
          email,
          password,
        },
      });
      // レスポンスにトークンが含まれていれば、ログイン成功
      if (response.data.token) {
        // 受け取ったトークンをブラウザに保存
        localStorage.setItem("jwt_token", response.data.token);
        navigate("/");
        // Webページを強制的に再読み込み（リロード）させるための命令
        window.location.reload();
      }
    } catch (err) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="title">ログイン</h2>
        <div>
            <label>メール</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div>
            <label>パスワード</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでないですか？ <Link to="/signup">新規登録</Link>
      </p>
      <p className="errorMessage">{error || ""}</p>     
    </div>
  );
};
export default Login;
