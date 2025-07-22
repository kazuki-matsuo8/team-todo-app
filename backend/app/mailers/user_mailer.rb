class UserMailer < ApplicationMailer
  def password_reset(user, token)
    # コントローラから渡されたuserとtokenをインスタンス変数に格納
    # ビューのメール本文でこの値を使うため
    @user = user
    @token = token
    # mailメソッド toは宛先 subjectは件名
    # railsが対応するviewを探す
    mail(to: @user.email, subject: 'パスワードリセットのご案内')
  end
end
