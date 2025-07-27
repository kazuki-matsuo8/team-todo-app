import React from "react";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axios';

const Signup: React.FC = () => {
  // フォームの入力値を管理するためのstate
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // エラーメッセージを管理するためのstate
  const [error, setError] = useState<string | null>(null);

  // 画面遷移を管理するためのフック
  const navigate = useNavigate();

  // フォームが送信されたときの処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信時のデフォルトのページリロードを防ぐ
    setError(null); // エラーメッセージをリセット

    // パスワードの一致を確認
    if (password !== passwordConfirmation) {
      setError('パスワードが一致しません');
      return;
    }

    try {
      // apiClientを使って、バックエンドの/usersエンドポイントにPOSTリクエストを送信
      await apiClient.post('/users', {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      // 登録成功後、ログインページに遷移
      navigate('/login');
    } catch (err) {
      setError('登録に失敗しました。メールアドレスが既に使用されている可能性があります。');
      console.error(err);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <h2 className="title">アカウント新規登録</h2>
        <div>
          <label>名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>メールアドレス</label>
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
        <div>
          <label>パスワード（確認）</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <p>
        アカウントをお持ちですか？ <Link to="/login">ログイン</Link>
      </p>
      {/* エラーがあれば表示 */}
      <p className="errorMessage">{error || ''}</p>
    </div>
  );
};

export default Signup;