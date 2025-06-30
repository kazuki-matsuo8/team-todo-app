// src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // バックエンドからのメッセージを保存するためのstate
  const [message, setMessage] = useState('');

  // コンポーネントがマウントされた時に一度だけ実行される
  useEffect(() => {
    // Rails APIのエンドポイントにfetchでリクエストを送る
    fetch('http://localhost:3000/api/v1/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1>チーム開発ToDoアプリ</h1>
      <div className="card">
        <p>
          {/* stateに保存されたメッセージを表示 */}
          {message || "バックエンドからのメッセージを読み込み中..."}
        </p>
      </div>
    </>
  );
}

export default App;