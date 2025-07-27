import axios from 'axios';

const apiClient = axios.create({
  // これから通信するAPIのURLの、共通部分を指定
  baseURL: 'http://localhost:3000/api/v1',
  // 送信するデータはJSON形式であることを、あらかじめヘッダーで指定
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosがリクエストを送信する「直前」に毎回実行する処理を定義
apiClient.interceptors.request.use(
  // configには、これから送信されるリクエストの設定が全て入っている
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        // リクエストのAuthorizationヘッダーに、"Bearer <token>"という形式でトークンをセット
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;